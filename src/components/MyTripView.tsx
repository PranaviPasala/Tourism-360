import React, { useMemo, useState } from 'react';
import {
  Calendar,
  CheckCircle2,
  Compass,
  Edit3,
  IndianRupee,
  MapPin,
  Plus,
  RefreshCw,
  Trash2,
  Users,
} from 'lucide-react';
import { deleteDoc, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { COMMUNITY_INITIATIVES } from '../data/communityEmpowerment';
import { POPULAR_DESTINATIONS } from '../data/destinations';
import { HIDDEN_INDIA_CULTURE } from '../data/hiddenIndia';
import { HIDDEN_INDIA_PLACES } from '../data/hiddenIndiaPlaces';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { TripPlan } from '../types/tourism';
import { MyTripMap } from './MyTripMap';

interface MyTripViewProps {
  userId: string;
  trips: TripPlan[];
  loading: boolean;
  mapsApiKey: string;
  onReplanTrip: (trip: TripPlan) => void;
  onGoToPlanner: () => void;
}

export const MyTripView: React.FC<MyTripViewProps> = ({
  userId,
  trips,
  loading,
  mapsApiKey,
  onReplanTrip,
  onGoToPlanner,
}) => {
  const [selectedTripId, setSelectedTripId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [updatingStatusId, setUpdatingStatusId] = useState<string | null>(null);

  const activeTrip =
    trips.find((t) => t.id === selectedTripId) || trips[0] || null;

  const resolvedStops = useMemo(() => {
    if (!activeTrip?.selectedDestinationIds) return [];
    const byId = new Map<string, string>();
    POPULAR_DESTINATIONS.forEach((d) => byId.set(d.id, `${d.name} (${d.state})`));
    HIDDEN_INDIA_PLACES.forEach((p) => {
      if (!byId.has(p.id)) byId.set(p.id, `${p.name} (${p.state})`);
    });
    COMMUNITY_INITIATIVES.forEach((c) => {
      if (!byId.has(c.id)) byId.set(c.id, `${c.name} (${c.state})`);
    });
    HIDDEN_INDIA_CULTURE.forEach((h) => {
      if (!byId.has(h.id)) byId.set(h.id, `${h.title} (${h.state})`);
    });
    return activeTrip.selectedDestinationIds
      .map((id) => {
        const label = byId.get(id);
        return label ? { id, label } : null;
      })
      .filter((s): s is { id: string; label: string } => Boolean(s));
  }, [activeTrip]);

  const handleDeleteTrip = async (tripId: string) => {
    setDeletingId(tripId);
    const path = `users/${userId}/trips/${tripId}`;
    try {
      await deleteDoc(doc(db, 'users', userId, 'trips', tripId));
      if (selectedTripId === tripId) {
        setSelectedTripId(null);
      }
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, path);
    } finally {
      setDeletingId(null);
    }
  };

  const handleStatusChange = async (trip: TripPlan, nextStatus: 'planned' | 'active' | 'completed') => {
    if (trip.status === 'completed') return;
    setUpdatingStatusId(trip.id);
    const path = `users/${userId}/trips/${trip.id}`;
    try {
      await updateDoc(doc(db, 'users', userId, 'trips', trip.id), {
        status: nextStatus,
        updatedAt: serverTimestamp(),
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, path);
    } finally {
      setUpdatingStatusId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center max-w-3xl mx-auto space-y-2 pb-1">
        <p className="text-xs font-medium text-emerald-700">
          Saved Itineraries · Live Route Map · Replan & Budget Tracker
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-slate-900">
          My Trip
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          View your saved journeys across India alongside the live Google Maps route and nearby attractions, or replan anytime if group size or dates change.
        </p>

        <div className="pt-2 flex justify-center">
          <button
            type="button"
            onClick={() => (activeTrip ? onReplanTrip(activeTrip) : onGoToPlanner())}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold rounded-lg transition-colors whitespace-nowrap"
          >
            <RefreshCw className="w-4 h-4" />
            Replan My Trip
          </button>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-3 h-64 bg-white border border-emerald-100 rounded-xl animate-pulse" />
          <div className="lg:col-span-9 h-96 bg-white border border-emerald-100 rounded-xl animate-pulse" />
        </div>
      ) : trips.length === 0 ? (
        <div className="bg-white border border-emerald-100 rounded-xl p-10 text-center space-y-3">
          <Compass className="w-8 h-8 text-emerald-700 mx-auto" />
          <h2 className="font-display text-xl font-semibold text-slate-900">
            No saved trips yet
          </h2>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            Select destinations from Popular Destinations or Hidden India & Culture, or open the Trip Planner to calculate your route, budget, and day-wise itinerary.
          </p>
          <button
            type="button"
            onClick={onGoToPlanner}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-semibold rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Create Your First Trip
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Saved Trips Selector Row */}
          {trips.length > 1 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {trips.map((trip) => {
                const isSelected = activeTrip?.id === trip.id;
                return (
                  <div
                    key={trip.id}
                    onClick={() => setSelectedTripId(trip.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') setSelectedTripId(trip.id);
                    }}
                    className={`cursor-pointer rounded-xl p-3.5 border transition-all space-y-1.5 ${
                      isSelected
                        ? 'bg-emerald-50/80 border-emerald-600 shadow-sm'
                        : 'bg-white border-emerald-100 hover:border-emerald-300'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className="font-medium text-emerald-800 capitalize">{trip.status}</span>
                      <span className="font-mono-tabular text-slate-500">{trip.startDate}</span>
                    </div>
                    <h3 className="font-display text-sm font-semibold text-slate-900 truncate">
                      {trip.title}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-slate-600 font-mono-tabular">
                      <span>{trip.days}d · {trip.travellers} pax</span>
                      <span className="font-semibold text-orange-700">₹{trip.totalBudget.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Side-by-Side Trip Details (Left) + Live Google Map (Right) */}
          {activeTrip && (
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
              {/* Left: Trip Overview, Budget, & Itinerary */}
              <section className="xl:col-span-7 bg-white border border-emerald-100 rounded-xl p-5 sm:p-6 space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                      <span className="capitalize font-medium text-emerald-800">
                        Status: {activeTrip.status}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{activeTrip.transportationPreference}</span>
                    </div>
                    <h2 className="font-display text-2xl font-semibold text-slate-900">
                      {activeTrip.title}
                    </h2>
                    <p className="text-sm text-slate-600 mt-1">
                      {activeTrip.startingPoint} → {activeTrip.endingPoint}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    {activeTrip.status !== 'completed' && (
                      <>
                        <button
                          type="button"
                          onClick={() => onReplanTrip(activeTrip)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold rounded-lg transition-colors whitespace-nowrap"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          Replan My Trip
                        </button>
                        <button
                          type="button"
                          onClick={() => onReplanTrip(activeTrip)}
                          className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 hover:bg-emerald-50 text-slate-700 text-xs font-medium rounded-lg transition-colors whitespace-nowrap"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          Edit
                        </button>
                      </>
                    )}
                    <button
                      type="button"
                      disabled={deletingId === activeTrip.id}
                      onClick={() => handleDeleteTrip(activeTrip.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 hover:border-orange-300 hover:text-orange-700 text-slate-600 text-xs font-medium rounded-lg transition-colors whitespace-nowrap"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      {deletingId === activeTrip.id ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-emerald-50/70 rounded-lg p-3">
                    <div className="flex items-center gap-1 text-xs text-emerald-900 mb-0.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Start Date</span>
                    </div>
                    <p className="font-mono-tabular text-sm font-semibold text-slate-900">
                      {activeTrip.startDate}
                    </p>
                  </div>
                  <div className="bg-emerald-50/70 rounded-lg p-3">
                    <div className="flex items-center gap-1 text-xs text-emerald-900 mb-0.5">
                      <Users className="w-3.5 h-3.5" />
                      <span>Travellers / Days</span>
                    </div>
                    <p className="font-mono-tabular text-sm font-semibold text-slate-900">
                      {activeTrip.travellers} · {activeTrip.days} Days
                    </p>
                  </div>
                  <div className="bg-orange-50/70 rounded-lg p-3">
                    <div className="flex items-center gap-1 text-xs text-orange-900 mb-0.5">
                      <IndianRupee className="w-3.5 h-3.5" />
                      <span>Total Budget</span>
                    </div>
                    <p className="font-mono-tabular text-sm font-semibold text-slate-900">
                      ₹{activeTrip.totalBudget.toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div className="bg-orange-50/70 rounded-lg p-3">
                    <div className="flex items-center gap-1 text-xs text-orange-900 mb-0.5">
                      <IndianRupee className="w-3.5 h-3.5" />
                      <span>Per Person</span>
                    </div>
                    <p className="font-mono-tabular text-sm font-semibold text-slate-900">
                      ₹{activeTrip.budgetPerPerson.toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>

                {/* Status Controls */}
                {activeTrip.status !== 'completed' && (
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="text-slate-500">Trip Progress:</span>
                    {(['planned', 'active', 'completed'] as const).map((st) => (
                      <button
                        key={st}
                        type="button"
                        disabled={updatingStatusId === activeTrip.id}
                        onClick={() => handleStatusChange(activeTrip, st)}
                        className={`px-3 py-1 rounded-md font-medium capitalize transition-colors ${
                          activeTrip.status === st
                            ? 'bg-emerald-700 text-white'
                            : 'bg-slate-100 text-slate-700 hover:bg-emerald-100'
                        }`}
                      >
                        {st === 'completed' ? (
                          <span className="inline-flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Mark Completed
                          </span>
                        ) : (
                          st
                        )}
                      </button>
                    ))}
                  </div>
                )}

                {/* Selected Destinations & Cultural Stops */}
                {resolvedStops.length > 0 && (
                  <div className="space-y-1.5">
                    <p className="text-xs font-semibold text-slate-700">Selected Stops</p>
                    <div className="flex flex-wrap gap-2">
                      {resolvedStops.map((stop) => (
                        <span
                          key={stop.id}
                          className="inline-flex items-center gap-1 text-xs text-slate-700 bg-emerald-50/60 border border-emerald-100 rounded-md px-2.5 py-1"
                        >
                          <MapPin className="w-3 h-3 text-emerald-700" />
                          {stop.label}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Budget Breakdown */}
                <div className="pt-3 border-t border-slate-100 space-y-2.5">
                  <h3 className="font-display text-lg font-semibold text-slate-900">
                    Budget Breakdown
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                    {[
                      { label: 'Transport', value: activeTrip.budgetBreakdown.transportation },
                      { label: 'Stay', value: activeTrip.budgetBreakdown.accommodation },
                      { label: 'Food', value: activeTrip.budgetBreakdown.food },
                      { label: 'Local', value: activeTrip.budgetBreakdown.localTravel },
                      { label: 'Other', value: activeTrip.budgetBreakdown.other },
                    ].map((item) => (
                      <div key={item.label} className="border border-slate-200 rounded-lg p-2.5">
                        <p className="text-[11px] text-slate-500">{item.label}</p>
                        <p className="font-mono-tabular text-sm font-semibold text-slate-900 mt-0.5">
                          ₹{item.value.toLocaleString('en-IN')}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Guidance & Itinerary */}
                {activeTrip.aiNotes && (
                  <div className="bg-emerald-50/70 border border-emerald-200 rounded-lg p-3.5 text-xs text-emerald-950 leading-relaxed">
                    <strong className="font-semibold">Trip Notes & Advisories:</strong> {activeTrip.aiNotes}
                  </div>
                )}

                {activeTrip.itinerary?.length > 0 && (
                  <div className="space-y-3 pt-2">
                    <h3 className="font-display text-lg font-semibold text-slate-900">
                      Day-Wise Itinerary
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {activeTrip.itinerary.map((day) => (
                        <div
                          key={day.day}
                          className="border border-slate-200 rounded-xl p-3.5 space-y-1.5 bg-[#FBFDFB]"
                        >
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-semibold text-orange-700">
                              Day {day.day} · {day.timings}
                            </span>
                            <span className="font-mono-tabular text-emerald-800 font-medium">
                              ~₹{day.estimatedExpenseInr.toLocaleString('en-IN')}
                            </span>
                          </div>
                          <p className="font-display text-sm font-semibold text-slate-900">
                            {day.title}
                          </p>
                          <p className="text-xs text-slate-700">
                            {day.places?.join(' → ')}
                          </p>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            {day.highlights}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>

              {/* Right: Live Google Map Beside the Trip */}
              <aside className="xl:col-span-5 xl:sticky xl:top-24 bg-white border border-emerald-100 rounded-xl p-5 sm:p-6">
                <MyTripMap trip={activeTrip} mapsApiKey={mapsApiKey} />
              </aside>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
