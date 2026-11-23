import React, { useEffect, useMemo, useState } from 'react';
import {
  AlertTriangle,
  Bus,
  Calendar,
  CheckCircle2,
  Compass,
  IndianRupee,
  Loader2,
  MapPin,
  Plus,
  RefreshCw,
  Save,
  Sparkles,
  Train,
  Users,
  X,
} from 'lucide-react';
import { doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { COMMUNITY_INITIATIVES } from '../data/communityEmpowerment';
import { POPULAR_DESTINATIONS } from '../data/destinations';
import { HIDDEN_INDIA_CULTURE } from '../data/hiddenIndia';
import { HIDDEN_INDIA_PLACES } from '../data/hiddenIndiaPlaces';
import { INDIAN_STATES_AND_UTS, estimateStateAwareTripBudget } from '../data/indianStates';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { DayItineraryItem, TransportMode, TripPlan } from '../types/tourism';
import { MyTripMap } from './MyTripMap';

interface TripPlannerViewProps {
  userId: string;
  selectedDestinationIds: string[];
  onToggleDestination: (id: string) => void;
  editingTrip: TripPlan | null;
  onClearEditingTrip: () => void;
  onTripSaved: (tripId: string) => void;
  mapsApiKey: string;
}

const TRANSPORT_MODES: TransportMode[] = [
  'Train',
  'Government Bus',
  'Public Bus',
  'Local Transport',
  'Bike Rental',
  'Car Rental',
];

const DEFAULT_PER_PERSON_BUDGET = 1000;

interface ResolvedPlannerStop {
  id: string;
  name: string;
  location: string;
  state: string;
  bestMonths: string;
  description: string;
  coordinates?: { lat: number; lng: number };
}

export const TripPlannerView: React.FC<TripPlannerViewProps> = ({
  userId,
  selectedDestinationIds,
  onToggleDestination,
  editingTrip,
  onClearEditingTrip,
  onTripSaved,
  mapsApiKey,
}) => {
  const [title, setTitle] = useState('India Discovery Trip');
  const [startingPoint, setStartingPoint] = useState('New Delhi, Delhi');
  const [endingPoint, setEndingPoint] = useState('Jaipur, Rajasthan');
  const [days, setDays] = useState(3);
  const [travellers, setTravellers] = useState(2);
  const [startDate, setStartDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 14);
    return d.toISOString().split('T')[0];
  });
  const [transportationPreference, setTransportationPreference] = useState<TransportMode>('Train');
  const [budgetPerPerson, setBudgetPerPerson] = useState<number>(DEFAULT_PER_PERSON_BUDGET);
  const [customTotalBudget, setCustomTotalBudget] = useState<number | null>(null);
  const [replanReason, setReplanReason] = useState('');
  const [itinerary, setItinerary] = useState<DayItineraryItem[]>([]);
  const [aiNotes, setAiNotes] = useState('');
  const [alternatives, setAlternatives] = useState<Array<{ name: string; state: string; reason: string }>>([]);

  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [addDestId, setAddDestId] = useState('');

  // Populate when replanning an existing trip
  useEffect(() => {
    if (editingTrip) {
      setTitle(editingTrip.title);
      setStartingPoint(editingTrip.startingPoint);
      setEndingPoint(editingTrip.endingPoint);
      setDays(editingTrip.days);
      setTravellers(editingTrip.travellers);
      setStartDate(editingTrip.startDate);
      setTransportationPreference(editingTrip.transportationPreference);
      setBudgetPerPerson(editingTrip.budgetPerPerson);
      setCustomTotalBudget(editingTrip.totalBudget);
      setItinerary(editingTrip.itinerary || []);
      setAiNotes(editingTrip.aiNotes || '');
      setSuccessMsg(null);
      setError(null);
    }
  }, [editingTrip]);

  // Keep ending point aligned if user just picked destinations and is not editing
  const activeDestIds = useMemo(() => {
    if (editingTrip && editingTrip.selectedDestinationIds.length > 0 && selectedDestinationIds.length === 0) {
      return editingTrip.selectedDestinationIds;
    }
    return selectedDestinationIds;
  }, [editingTrip, selectedDestinationIds]);

  const selectedDestinations = useMemo<ResolvedPlannerStop[]>(() => {
    const map = new Map<string, ResolvedPlannerStop>();

    POPULAR_DESTINATIONS.forEach((d) =>
      map.set(d.id, {
        id: d.id,
        name: d.name,
        location: d.location,
        state: d.state,
        bestMonths: d.bestMonths,
        description: d.description,
        coordinates: d.coordinates,
      })
    );

    HIDDEN_INDIA_PLACES.forEach((p) => {
      if (map.has(p.id)) return;
      const stateMeta = INDIAN_STATES_AND_UTS.find((s) => s.name === p.state);
      map.set(p.id, {
        id: p.id,
        name: p.name,
        location: p.location,
        state: p.state,
        bestMonths: p.bestSeason,
        description: p.description,
        coordinates: p.coordinates || stateMeta?.coordinates,
      });
    });

    COMMUNITY_INITIATIVES.forEach((c) => {
      if (map.has(c.id)) return;
      const stateMeta = INDIAN_STATES_AND_UTS.find((s) => s.name === c.state);
      map.set(c.id, {
        id: c.id,
        name: c.name,
        location: c.location,
        state: c.state,
        bestMonths: 'October to March',
        description: c.description,
        coordinates: stateMeta?.coordinates,
      });
    });

    HIDDEN_INDIA_CULTURE.forEach((h) => {
      if (map.has(h.id)) return;
      const stateMeta = INDIAN_STATES_AND_UTS.find((s) => s.name === h.state);
      map.set(h.id, {
        id: h.id,
        name: h.title,
        location: h.location,
        state: h.state,
        bestMonths: h.bestMonths || 'October to March',
        description: h.description,
        coordinates: stateMeta?.coordinates,
      });
    });

    return activeDestIds
      .map((id) => map.get(id))
      .filter((stop): stop is ResolvedPlannerStop => Boolean(stop));
  }, [activeDestIds]);

  useEffect(() => {
    if (!editingTrip && selectedDestinations.length > 0) {
      const last = selectedDestinations[selectedDestinations.length - 1];
      setEndingPoint(`${last.location}, ${last.state}`);
      setTitle(
        selectedDestinations.length === 1
          ? `${selectedDestinations[0].name} Journey`
          : `${selectedDestinations[0].state} & ${last.state} Circuit`
      );
    }
  }, [selectedDestinations, editingTrip]);

  // Recalculate total budget whenever travellers or per-person budget changes
  const totalBudget = useMemo(() => {
    if (customTotalBudget !== null) return customTotalBudget;
    return Math.max(1, travellers) * Math.max(0, budgetPerPerson);
  }, [travellers, budgetPerPerson, customTotalBudget]);

  // Match coordinates for realistic state-aware fare estimation
  const fareEstimate = useMemo(() => {
    const startStateMatch = INDIAN_STATES_AND_UTS.find((s) =>
      startingPoint.toLowerCase().includes(s.name.toLowerCase()) ||
      startingPoint.toLowerCase().includes(s.capital.toLowerCase())
    );
    const lastDest = selectedDestinations[selectedDestinations.length - 1];
    const endStateMatch =
      INDIAN_STATES_AND_UTS.find((s) =>
        endingPoint.toLowerCase().includes(s.name.toLowerCase()) ||
        endingPoint.toLowerCase().includes(s.capital.toLowerCase())
      ) ||
      (lastDest ? INDIAN_STATES_AND_UTS.find((s) => s.name === lastDest.state) : undefined);

    return estimateStateAwareTripBudget({
      startCoords: startStateMatch?.coordinates,
      endCoords: lastDest?.coordinates || endStateMatch?.coordinates,
      destinationStateName: lastDest?.state || endStateMatch?.name,
      days: Math.max(1, days),
      travellers: Math.max(1, travellers),
      transportMode: transportationPreference,
      userTotalBudget: totalBudget,
    });
  }, [startingPoint, endingPoint, selectedDestinations, days, travellers, transportationPreference, totalBudget]);

  const isBudgetUnrealistic = totalBudget < fareEstimate.minimumRealisticTripCostInr;

  const handleTravellersChange = (newCount: number) => {
    const safeCount = Math.max(1, Math.min(50, newCount));
    setTravellers(safeCount);
    // Keep per-person sync automatic when travellers change (critical for Replan My Trip)
    setCustomTotalBudget(null);
  };

  const handleGenerateItinerary = async (reasonOverride?: string) => {
    setError(null);
    setSuccessMsg(null);
    if (!startingPoint.trim() || !endingPoint.trim()) {
      setError('Please enter both a Starting Point and an Ending Point.');
      return;
    }

    setGenerating(true);
    try {
      const response = await fetch('/api/ai/generate-itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          startingPoint: startingPoint.trim(),
          endingPoint: endingPoint.trim(),
          days,
          travellers,
          startDate,
          transportationPreference,
          destinations: selectedDestinations.map((d) => ({
            name: d.name,
            state: d.state,
            bestMonths: d.bestMonths,
          })),
          budgetPerPerson,
          totalBudget,
          realisticMinimumEstimate: fareEstimate.minimumRealisticTripCostInr,
          replanReason: reasonOverride || replanReason || undefined,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate AI itinerary');
      }

      if (Array.isArray(data.itinerary)) {
        setItinerary(data.itinerary);
      }
      if (typeof data.aiNotes === 'string') {
        setAiNotes(data.aiNotes);
      }
      if (Array.isArray(data.alternatives)) {
        setAlternatives(data.alternatives);
      }
      setSuccessMsg(
        editingTrip
          ? 'Trip itinerary and estimates recalculated. Click Update Saved Trip to persist changes.'
          : 'AI itinerary generated. Review the breakdown and click Save to My Trip.'
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to generate itinerary right now.');
    } finally {
      setGenerating(false);
    }
  };

  const handleSaveTrip = async () => {
    setError(null);
    setSuccessMsg(null);

    if (!startingPoint.trim() || !endingPoint.trim() || !title.trim()) {
      setError('Trip title, starting point, and ending point are required.');
      return;
    }

    const effectiveItinerary: DayItineraryItem[] =
      itinerary.length > 0
        ? itinerary
        : Array.from({ length: Math.min(days, 14) }, (_, idx) => {
            const dest = selectedDestinations[idx % Math.max(1, selectedDestinations.length)];
            return {
              day: idx + 1,
              title:
                idx === 0
                  ? `Departure from ${startingPoint.trim()}`
                  : dest
                    ? `Explore ${dest.name}`
                    : `Day ${idx + 1} in ${endingPoint.trim()}`,
              places: dest ? [dest.name, dest.location] : [endingPoint.trim()],
              timings: '08:00 AM – 06:30 PM',
              distanceKm: idx === 0 ? fareEstimate.estimatedDistanceKm : 35,
              transportSuggestion: transportationPreference,
              estimatedExpenseInr: Math.round(fareEstimate.minimumRealisticTripCostInr / Math.max(1, days)),
              highlights: dest ? dest.description : `Local heritage and community exploration around ${endingPoint.trim()}.`,
            };
          });

    setSaving(true);
    const safeTripId = editingTrip?.id || `trip_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    const tripPath = `users/${userId}/trips/${safeTripId}`;

    const payload = {
      id: safeTripId,
      userId,
      title: title.trim().slice(0, 160),
      startingPoint: startingPoint.trim().slice(0, 160),
      endingPoint: endingPoint.trim().slice(0, 160),
      days: Math.max(1, Math.min(60, Math.round(days))),
      travellers: Math.max(1, Math.min(100, Math.round(travellers))),
      startDate: startDate.slice(0, 32),
      transportationPreference,
      selectedDestinationIds: activeDestIds.slice(0, 30),
      budgetPerPerson: Math.round(totalBudget / Math.max(1, travellers)),
      totalBudget: Math.round(totalBudget),
      realisticMinimumEstimate: Math.round(fareEstimate.minimumRealisticTripCostInr),
      budgetBreakdown: fareEstimate.breakdown,
      itinerary: effectiveItinerary.slice(0, 60),
      aiNotes: (aiNotes || fareEstimate.rateExplanation).slice(0, 4000),
      status: editingTrip?.status || ('planned' as const),
      updatedAt: serverTimestamp(),
    };

    try {
      if (editingTrip) {
        await updateDoc(doc(db, 'users', userId, 'trips', safeTripId), {
          title: payload.title,
          startingPoint: payload.startingPoint,
          endingPoint: payload.endingPoint,
          days: payload.days,
          travellers: payload.travellers,
          startDate: payload.startDate,
          transportationPreference: payload.transportationPreference,
          selectedDestinationIds: payload.selectedDestinationIds,
          budgetPerPerson: payload.budgetPerPerson,
          totalBudget: payload.totalBudget,
          realisticMinimumEstimate: payload.realisticMinimumEstimate,
          budgetBreakdown: payload.budgetBreakdown,
          itinerary: payload.itinerary,
          aiNotes: payload.aiNotes,
          updatedAt: serverTimestamp(),
        });
      } else {
        await setDoc(doc(db, 'users', userId, 'trips', safeTripId), {
          ...payload,
          createdAt: serverTimestamp(),
        });
      }
      onClearEditingTrip();
      onTripSaved(safeTripId);
    } catch (err) {
      handleFirestoreError(err, editingTrip ? OperationType.UPDATE : OperationType.CREATE, tripPath);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center max-w-3xl mx-auto space-y-2 pb-1">
        {editingTrip && (
          <p className="text-xs font-medium text-emerald-700">
            Replan Existing Trip · Dynamic Recalculation
          </p>
        )}
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-slate-900">
          {editingTrip ? 'Replan My Trip' : 'Personalized Trip Planner'}
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          Configure your route, group size, transport mode, and budget. Default starting benchmark is ₹1,000 per person with honest feasibility checks.
        </p>

        {editingTrip && (
          <div className="pt-1 flex justify-center">
            <button
              type="button"
              onClick={onClearEditingTrip}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 whitespace-nowrap"
            >
              <X className="w-4 h-4" />
              Exit Replan Mode
            </button>
          </div>
        )}
      </div>

      {error && (
        <div role="alert" className="p-4 bg-orange-50 border border-orange-200 rounded-xl text-sm text-orange-900">
          {error}
        </div>
      )}

      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-sm text-emerald-900 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Trip Configuration Form */}
        <section className="lg:col-span-7 bg-white border border-emerald-100 rounded-xl p-5 sm:p-6 space-y-5">
          <h2 className="font-display text-lg font-semibold text-slate-900">
            1. Journey Details & Travellers
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label htmlFor="trip-title" className="block text-xs font-medium text-slate-700 mb-1">
                Trip Title
              </label>
              <input
                id="trip-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div>
              <label htmlFor="trip-start" className="block text-xs font-medium text-slate-700 mb-1">
                Starting Point
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-emerald-700 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="trip-start"
                  type="text"
                  value={startingPoint}
                  onChange={(e) => setStartingPoint(e.target.value)}
                  placeholder="City, State (e.g. Pune, Maharashtra)"
                  className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            </div>

            <div>
              <label htmlFor="trip-end" className="block text-xs font-medium text-slate-700 mb-1">
                Destination / Ending Point
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-orange-600 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="trip-end"
                  type="text"
                  value={endingPoint}
                  onChange={(e) => setEndingPoint(e.target.value)}
                  placeholder="City, State (e.g. Jaipur, Rajasthan)"
                  className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            </div>

            <div>
              <label htmlFor="trip-days" className="block text-xs font-medium text-slate-700 mb-1">
                Number of Days
              </label>
              <input
                id="trip-days"
                type="number"
                min={1}
                max={30}
                value={days}
                onChange={(e) => setDays(Math.max(1, Math.min(30, Number(e.target.value) || 1)))}
                className="w-full px-3.5 py-2 text-sm font-mono-tabular border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div>
              <label htmlFor="trip-travellers" className="block text-xs font-medium text-slate-700 mb-1">
                Number of Travellers
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleTravellersChange(travellers - 1)}
                  aria-label="Decrease travellers"
                  className="px-3 py-2 border border-slate-200 rounded-lg hover:bg-emerald-50 text-sm font-semibold"
                >
                  −
                </button>
                <div className="relative flex-1">
                  <Users className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    id="trip-travellers"
                    type="number"
                    min={1}
                    max={50}
                    value={travellers}
                    onChange={(e) => handleTravellersChange(Number(e.target.value) || 1)}
                    className="w-full pl-9 pr-3 py-2 text-sm font-mono-tabular border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleTravellersChange(travellers + 1)}
                  aria-label="Increase travellers"
                  className="px-3 py-2 border border-slate-200 rounded-lg hover:bg-emerald-50 text-sm font-semibold"
                >
                  +
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="trip-date" className="block text-xs font-medium text-slate-700 mb-1">
                Travel Start Date
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="trip-date"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm font-mono-tabular border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            </div>

            <div>
              <label htmlFor="trip-budget-pp" className="block text-xs font-medium text-slate-700 mb-1">
                Target Budget Per Person (₹)
              </label>
              <div className="relative">
                <IndianRupee className="w-4 h-4 text-emerald-700 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="trip-budget-pp"
                  type="number"
                  min={500}
                  step={500}
                  value={budgetPerPerson}
                  onChange={(e) => {
                    setBudgetPerPerson(Math.max(0, Number(e.target.value) || 0));
                    setCustomTotalBudget(null);
                  }}
                  className="w-full pl-9 pr-3 py-2 text-sm font-mono-tabular border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            </div>
          </div>

          {/* Transportation Preference */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="block text-xs font-medium text-slate-700">
              2. Transportation Preference (State & Distance-Aware Fares)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {TRANSPORT_MODES.map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setTransportationPreference(mode)}
                  className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-medium border transition-colors whitespace-nowrap ${
                    transportationPreference === mode
                      ? 'bg-emerald-700 text-white border-emerald-700'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-emerald-50'
                  }`}
                >
                  {mode === 'Train' ? (
                    <Train className="w-3.5 h-3.5 shrink-0" />
                  ) : mode.includes('Bus') ? (
                    <Bus className="w-3.5 h-3.5 shrink-0" />
                  ) : (
                    <Compass className="w-3.5 h-3.5 shrink-0" />
                  )}
                  <span>{mode}</span>
                </button>
              ))}
            </div>
            <p className="text-xs text-slate-600 bg-emerald-50/70 rounded-lg p-3 leading-relaxed">
              {fareEstimate.rateExplanation} Estimated road/rail leg: ~{fareEstimate.estimatedDistanceKm} km one-way (₹{fareEstimate.farePerPersonInr.toLocaleString('en-IN')}/person round-trip estimate).
            </p>
          </div>

          {/* Selected Tourist & Cultural Stops */}
          <div className="space-y-2.5 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between gap-2">
              <label className="block text-xs font-medium text-slate-700">
                3. Selected Stops ({selectedDestinations.length})
              </label>
            </div>

            <div className="flex gap-2">
              <select
                value={addDestId}
                onChange={(e) => setAddDestId(e.target.value)}
                aria-label="Add a destination or cultural stop to this trip"
                className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                <option value="">Add destination, Hidden India, or cultural stop...</option>
                <optgroup label="Popular Destinations (28 States & 8 UTs)">
                  {POPULAR_DESTINATIONS.filter((d) => !activeDestIds.includes(d.id)).map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} ({d.city}, {d.state})
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Hidden India and Culture (Temples, Waterfalls, Foods, Handlooms & Traditions)">
                  {HIDDEN_INDIA_PLACES.filter((p) => !activeDestIds.includes(p.id)).map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} — {p.subcategory} ({p.state})
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Community Empowerment & Rural Tourism (Artisans, Guides, Homestays & Villages)">
                  {COMMUNITY_INITIATIVES.filter((c) => !activeDestIds.includes(c.id)).map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} — {c.category} ({c.state})
                    </option>
                  ))}
                </optgroup>
              </select>
              <button
                type="button"
                disabled={!addDestId}
                onClick={() => {
                  if (addDestId) {
                    onToggleDestination(addDestId);
                    setAddDestId('');
                  }
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 text-white text-xs font-semibold rounded-lg transition-colors whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                Add Stop
              </button>
            </div>

            {selectedDestinations.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {selectedDestinations.map((dest) => (
                  <button
                    key={dest.id}
                    type="button"
                    onClick={() => onToggleDestination(dest.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs font-medium text-emerald-950 hover:border-orange-300"
                  >
                    <span>{dest.name}</span>
                    <span className="text-slate-400">·</span>
                    <span className="text-emerald-700">{dest.state}</span>
                    <span className="ml-1 text-slate-500">×</span>
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500">
                No stops selected yet. Add stops above or click &ldquo;Add to My Trip&rdquo; on Popular Destinations and Hidden India &amp; Culture.
              </p>
            )}
          </div>

          {editingTrip && (
            <div className="pt-2 border-t border-slate-100">
              <label htmlFor="replan-note" className="block text-xs font-medium text-slate-700 mb-1">
                Replan Note (e.g., traveller dropped out, shifting dates, changing transport)
              </label>
              <input
                id="replan-note"
                type="text"
                value={replanReason}
                onChange={(e) => setReplanReason(e.target.value)}
                placeholder="e.g., 1 traveller dropped out, optimize for 2 travellers on train"
                className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="button"
              disabled={generating}
              onClick={() => handleGenerateItinerary()}
              className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-orange-600 hover:bg-orange-700 disabled:opacity-60 text-white text-sm font-semibold rounded-lg transition-colors whitespace-nowrap"
            >
              {generating ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : editingTrip ? (
                <RefreshCw className="w-4 h-4" />
              ) : (
                <Sparkles className="w-4 h-4" />
              )}
              <span>
                {generating
                  ? 'Planning with Gemini AI...'
                  : editingTrip
                    ? 'Recalculate & Replan Itinerary'
                    : 'Generate AI Itinerary'}
              </span>
            </button>

            <button
              type="button"
              disabled={saving}
              onClick={handleSaveTrip}
              className="inline-flex items-center justify-center gap-2 py-2.5 px-5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-60 text-white text-sm font-semibold rounded-lg transition-colors whitespace-nowrap"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>{editingTrip ? 'Update Saved Trip' : 'Save to My Trip'}</span>
            </button>
          </div>
        </section>

        {/* Right: Dynamic Budget Calculator & Realism Check */}
        <aside className="lg:col-span-5 space-y-5">
          <div className="bg-white border border-emerald-100 rounded-xl p-5 sm:p-6 space-y-4">
            <div className="flex items-baseline justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <p className="text-xs text-slate-500">Planned Total Budget</p>
                <p className="font-mono-tabular text-2xl font-bold text-slate-900">
                  ₹{totalBudget.toLocaleString('en-IN')}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500">Per Person ({travellers} travellers)</p>
                <p className="font-mono-tabular text-base font-semibold text-emerald-800">
                  ₹{Math.round(totalBudget / Math.max(1, travellers)).toLocaleString('en-IN')}
                </p>
              </div>
            </div>

            {isBudgetUnrealistic && (
              <div
                role="status"
                className="p-3.5 bg-orange-50 border border-orange-200 rounded-xl space-y-2"
              >
                <div className="flex items-start gap-2 text-orange-900">
                  <AlertTriangle className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                  <div className="text-xs leading-relaxed">
                    <p className="font-semibold">
                      Budget Feasibility Notice: ₹{Math.round(totalBudget / Math.max(1, travellers)).toLocaleString('en-IN')}/person is below realistic estimates
                    </p>
                    <p className="mt-1 text-orange-800">
                      For {days} day(s) and {travellers} traveller(s) using {transportationPreference} across ~{fareEstimate.estimatedDistanceKm} km, a realistic minimum estimate is{' '}
                      <strong className="font-mono-tabular">
                        ₹{fareEstimate.minimumRealisticTripCostInr.toLocaleString('en-IN')}
                      </strong>{' '}
                      (₹
                      {Math.round(
                        fareEstimate.minimumRealisticTripCostInr / Math.max(1, travellers)
                      ).toLocaleString('en-IN')}
                      /person).
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const recommendedPP = Math.ceil(
                      fareEstimate.minimumRealisticTripCostInr / Math.max(1, travellers) / 100
                    ) * 100;
                    setBudgetPerPerson(recommendedPP);
                    setCustomTotalBudget(null);
                  }}
                  className="w-full py-1.5 px-3 bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold rounded-lg transition-colors"
                >
                  Adjust Budget to Realistic Estimate
                </button>
              </div>
            )}

            <div className="space-y-2.5">
              <p className="text-xs font-semibold text-slate-800">
                Estimated Cost Breakdown (based on your ₹{totalBudget.toLocaleString('en-IN')} budget)
              </p>
              {[
                { label: 'Transportation', value: fareEstimate.breakdown.transportation },
                { label: 'Accommodation', value: fareEstimate.breakdown.accommodation },
                { label: 'Food & Dining', value: fareEstimate.breakdown.food },
                { label: 'Local Travel', value: fareEstimate.breakdown.localTravel },
                { label: 'Other Expenses', value: fareEstimate.breakdown.other },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between text-sm py-1.5 border-b border-slate-100 last:border-b-0">
                  <span className="text-slate-600">{row.label}</span>
                  <span className="font-mono-tabular font-semibold text-slate-900">
                    ₹{row.value.toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>

            <div className="text-xs text-slate-500 pt-1">
              Realistic Baseline Estimate:{' '}
              <span className="font-mono-tabular font-semibold text-slate-800">
                ₹{fareEstimate.minimumRealisticTripCostInr.toLocaleString('en-IN')}
              </span>{' '}
              total (excludes monument entry fees & peak-season surcharges).
            </div>
          </div>

          {alternatives.length > 0 && (
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-5 space-y-3">
              <h3 className="font-display text-base font-semibold text-emerald-950">
                AI Alternative & Nearby Suggestions
              </h3>
              <div className="space-y-2.5">
                {alternatives.map((alt, idx) => (
                  <div key={idx} className="bg-white border border-emerald-100 rounded-lg p-3 text-xs">
                    <p className="font-semibold text-slate-900">
                      {alt.name} · <span className="text-emerald-700">{alt.state}</span>
                    </p>
                    <p className="text-slate-600 mt-1 leading-relaxed">{alt.reason}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>

      {/* Day-Wise Itinerary + Live Google Map Side by Side After Planning */}
      {(itinerary.length > 0 || aiNotes) && (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          <section className="xl:col-span-7 bg-white border border-emerald-100 rounded-xl p-5 sm:p-6 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <h2 className="font-display text-xl font-semibold text-slate-900">
                Day-Wise Travel Itinerary
              </h2>
              <span className="text-xs font-mono-tabular text-emerald-800 font-medium">
                {itinerary.length} Days · {travellers} Travellers · {transportationPreference}
              </span>
            </div>

            {aiNotes && (
              <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-4 text-sm text-emerald-950 leading-relaxed">
                <strong className="font-semibold">Seasonal & Budget Guidance:</strong> {aiNotes}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {itinerary.map((dayItem) => (
                <div
                  key={dayItem.day}
                  className="border border-slate-200 rounded-xl p-4 space-y-2.5 bg-[#FBFDFB]"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-orange-700">
                      Day {dayItem.day} · {dayItem.timings}
                    </span>
                    <span className="font-mono-tabular text-xs font-semibold text-emerald-800">
                      ~₹{dayItem.estimatedExpenseInr.toLocaleString('en-IN')} · {dayItem.distanceKm} km
                    </span>
                  </div>
                  <h3 className="font-display text-base font-semibold text-slate-900">
                    {dayItem.title}
                  </h3>
                  <p className="text-xs text-slate-700">
                    <strong className="font-medium">Stops:</strong> {dayItem.places.join(' → ')}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">{dayItem.highlights}</p>
                  <p className="text-xs text-emerald-800 pt-1 border-t border-slate-100">
                    Transport: {dayItem.transportSuggestion}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <aside className="xl:col-span-5 xl:sticky xl:top-24 bg-white border border-emerald-100 rounded-xl p-5 sm:p-6">
            <MyTripMap
              trip={{
                id: editingTrip?.id || 'preview_planned_trip',
                userId,
                title: title.trim() || 'Planned Trip',
                startingPoint: startingPoint.trim() || 'New Delhi, Delhi',
                endingPoint: endingPoint.trim() || 'Jaipur, Rajasthan',
                days,
                travellers,
                startDate,
                transportationPreference,
                selectedDestinationIds: activeDestIds,
                budgetPerPerson: Math.round(totalBudget / Math.max(1, travellers)),
                totalBudget: Math.round(totalBudget),
                realisticMinimumEstimate: Math.round(fareEstimate.minimumRealisticTripCostInr),
                budgetBreakdown: fareEstimate.breakdown,
                itinerary,
                aiNotes,
                status: 'planned',
              }}
              mapsApiKey={mapsApiKey}
            />
          </aside>
        </div>
      )}
    </div>
  );
};
