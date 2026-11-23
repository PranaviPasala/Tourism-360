import React, { useMemo, useState } from 'react';
import {
  Building2,
  Calendar,
  Check,
  Compass,
  ExternalLink,
  MapPin,
  Phone,
  Plus,
  Route,
  Search,
  Store,
  Utensils,
} from 'lucide-react';
import { HIDDEN_INDIA_PLACES } from '../data/hiddenIndiaPlaces';
import { INDIAN_STATES_AND_UTS } from '../data/indianStates';
import { ExploreDetailPayload, HiddenIndiaSubcategory } from '../types/tourism';
import { DestinationVisual } from './DestinationVisual';
import { ExploreDetailModal } from './ExploreDetailModal';

const HIDDEN_SUBCATEGORIES: Array<'All' | HiddenIndiaSubcategory> = [
  'All',
  'Hidden Ancient Temples',
  'Hidden Waterfalls',
  'Hidden Natural Places',
  'Hidden Beaches and Islands',
  'Hidden Historical Places',
  'Traditional Indian Foods & Cuisine',
  'Traditional Handlooms',
  'Traditional Handicrafts',
  'Indian Culture & Traditions',
];

interface HiddenIndiaViewProps {
  selectedIds: string[];
  onToggleDestination: (id: string) => void;
}

export const HiddenIndiaView: React.FC<HiddenIndiaViewProps> = ({
  selectedIds,
  onToggleDestination,
}) => {
  const [selectedSubcategory, setSelectedSubcategory] = useState<'All' | HiddenIndiaSubcategory>('All');
  const [selectedState, setSelectedState] = useState<string>('All');
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalItem, setActiveModalItem] = useState<ExploreDetailPayload | null>(null);

  const cityOptions = useMemo(() => {
    const base =
      selectedState === 'All'
        ? HIDDEN_INDIA_PLACES
        : HIDDEN_INDIA_PLACES.filter((p) => p.state === selectedState);
    return Array.from(new Set(base.map((p) => p.city))).sort();
  }, [selectedState]);

  const filteredPlaces = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return HIDDEN_INDIA_PLACES.filter((place) => {
      if (selectedSubcategory !== 'All' && place.subcategory !== selectedSubcategory) return false;
      if (selectedState !== 'All' && place.state !== selectedState) return false;
      if (selectedCity !== 'All' && place.city !== selectedCity) return false;
      if (q) {
        const hay = `${place.name} ${place.state} ${place.city} ${place.location} ${place.subcategory} ${place.description} ${place.address || ''} ${place.sweetStallOrVenue || ''} ${place.ingredients || ''} ${place.accessibility}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [selectedSubcategory, selectedState, selectedCity, searchQuery]);

  const toExplorePayload = (place: (typeof HIDDEN_INDIA_PLACES)[number]): ExploreDetailPayload => ({
    id: place.id,
    pillar: 'Hidden India',
    title: place.name,
    categoryLabel: place.subcategory,
    state: place.state,
    city: place.city,
    location: place.location,
    description: place.description,
    imagePath: place.imagePath,
    bestTime: place.bestSeason,
    durationOrAccess: place.accessibility,
    highlights: place.highlights,
    ingredients: place.ingredients,
    culturalSignificance: place.culturalSignificance,
    whereToExperience: place.sweetStallOrVenue,
    addressOrVenue: place.eventLocation || place.address,
    contactInfo: place.contactNumber,
    googleMapsUrl: place.googleMapsUrl,
  });

  return (
    <div className="space-y-6">
      <div className="text-center max-w-3xl mx-auto space-y-2 pb-1">
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-slate-900">
          Hidden India and Culture
        </h1>
        <p className="text-sm sm:text-base text-slate-600 italic">
          “Beyond the highways lie ancient shrines, secret waterfalls, heritage handlooms, authentic regional foods and sweet stalls, and living local traditions.”
        </p>
      </div>

      {/* State, City & Search Filter + Hidden India & Culture Subcategories */}
      <div className="bg-white border border-emerald-100 rounded-xl p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-emerald-700 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search temples, waterfalls, foods, sweet stalls, handlooms..."
              aria-label="Search Hidden India and Culture"
              className="w-full pl-10 pr-3.5 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>

          <div className="md:col-span-4">
            <select
              value={selectedState}
              onChange={(e) => {
                setSelectedState(e.target.value);
                setSelectedCity('All');
              }}
              aria-label="Select State or Union Territory"
              className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              <option value="All">All 28 States &amp; 8 Union Territories</option>
              {INDIAN_STATES_AND_UTS.map((st) => (
                <option key={st.name} value={st.name}>
                  {st.name}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-3">
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              aria-label="Select City or District"
              className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              <option value="All">All Districts / Sub-Regions</option>
              {cityOptions.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Subcategory Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100">
          {HIDDEN_SUBCATEGORIES.map((sub) => (
            <button
              key={sub}
              type="button"
              onClick={() => setSelectedSubcategory(sub)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                selectedSubcategory === sub
                  ? 'bg-orange-600 text-white'
                  : 'bg-emerald-50/70 text-slate-700 hover:bg-emerald-100'
              }`}
            >
              {sub}
            </button>
          ))}
          <span className="ml-auto text-xs text-slate-500 font-mono-tabular">
            {filteredPlaces.length} Discoveries
          </span>
        </div>
      </div>

      {/* Places Grid */}
      {filteredPlaces.length === 0 ? (
        <div className="bg-white border border-emerald-100 rounded-xl p-10 text-center">
          <p className="font-display text-lg font-medium text-slate-900">
            No hidden treasures or cultural stops match these filters
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedSubcategory('All');
              setSelectedState('All');
              setSelectedCity('All');
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-2 bg-emerald-700 text-white text-sm font-medium rounded-lg hover:bg-emerald-800 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredPlaces.map((place) => {
            const isSelected = selectedIds.includes(place.id);
            const isFood = place.subcategory === 'Traditional Indian Foods & Cuisine';
            return (
              <article
                key={place.id}
                className={`group bg-white border rounded-xl overflow-hidden flex flex-col transition-shadow ${
                  isSelected
                    ? 'border-emerald-600 shadow-md'
                    : 'border-emerald-100 hover:shadow-sm'
                }`}
              >
                <DestinationVisual
                  title={place.name}
                  category={place.subcategory}
                  imagePath={place.imagePath}
                />

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
                      <span className="font-medium text-orange-700">{place.subcategory}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-semibold text-emerald-800">{place.state}</span>
                    </div>

                    <h2 className="font-display text-lg font-semibold text-slate-900 leading-snug">
                      {place.name}
                    </h2>

                    <div className="flex items-center gap-1.5 text-xs text-slate-600">
                      <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      <span>
                        {place.city} — {place.location}
                      </span>
                    </div>

                    <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                      {place.description}
                    </p>
                  </div>

                  <div className="space-y-2.5 pt-3 border-t border-slate-100 text-xs">
                    {isFood ? (
                      <>
                        {place.address && (
                          <div className="bg-emerald-50/70 rounded-lg p-2.5 flex items-start gap-2 text-emerald-950">
                            <Building2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                            <span className="leading-relaxed">
                              <strong className="font-semibold">Address:</strong> {place.address}
                            </span>
                          </div>
                        )}
                        {place.sweetStallOrVenue && (
                          <div className="bg-orange-50/70 border border-orange-100 rounded-lg p-2.5 flex items-start gap-2 text-slate-800">
                            <Store className="w-3.5 h-3.5 text-orange-600 shrink-0 mt-0.5" />
                            <span className="leading-relaxed">
                              <strong className="font-semibold text-slate-900">
                                Sweet Stalls &amp; Eateries:
                              </strong>{' '}
                              {place.sweetStallOrVenue}
                            </span>
                          </div>
                        )}
                        {place.ingredients && (
                          <div className="flex items-start gap-1.5 text-slate-600 px-1">
                            <Utensils className="w-3.5 h-3.5 text-orange-600 shrink-0 mt-0.5" />
                            <span className="line-clamp-2">
                              <strong className="font-semibold text-slate-800">Ingredients:</strong>{' '}
                              {place.ingredients}
                            </span>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        {place.eventLocation && (
                          <div className="bg-orange-50/60 rounded-lg p-2.5 flex items-start gap-2 text-slate-700">
                            <MapPin className="w-3.5 h-3.5 text-orange-600 shrink-0 mt-0.5" />
                            <span className="leading-relaxed">
                              <strong className="font-semibold text-slate-900">Where It Happens:</strong>{' '}
                              {place.eventLocation}
                            </span>
                          </div>
                        )}
                        {place.address && (
                          <div className="bg-emerald-50/70 rounded-lg p-2.5 flex items-start gap-2 text-emerald-950">
                            <Building2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                            <span className="leading-relaxed">
                              <strong className="font-semibold">Address:</strong> {place.address}
                            </span>
                          </div>
                        )}
                        {place.contactNumber && (
                          <div className="flex items-start gap-2 px-1 text-slate-700">
                            <Phone className="w-3.5 h-3.5 text-orange-600 shrink-0 mt-0.5" />
                            <span>
                              <strong className="font-semibold text-slate-900">Contact:</strong>{' '}
                              <span className="font-mono-tabular">{place.contactNumber}</span>
                            </span>
                          </div>
                        )}
                        <div className="bg-emerald-50/70 rounded-lg p-2.5 flex items-start gap-2 text-emerald-950">
                          <Calendar className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                          <span>
                            <strong className="font-semibold">Best Visiting Season:</strong>{' '}
                            {place.bestSeason}
                          </span>
                        </div>

                        <div className="bg-orange-50/60 rounded-lg p-2.5 flex items-start gap-2 text-slate-700">
                          <Route className="w-3.5 h-3.5 text-orange-600 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">
                            <strong className="font-semibold text-slate-900">Accessibility:</strong>{' '}
                            {place.accessibility}
                          </span>
                        </div>
                      </>
                    )}

                    <div className="flex items-center gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setActiveModalItem(toExplorePayload(place))}
                        className="inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap"
                      >
                        <Compass className="w-3.5 h-3.5" />
                        <span>Explore More</span>
                      </button>

                      <a
                        href={place.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${place.name} on Google Maps`}
                        className="inline-flex items-center justify-center gap-1 py-2 px-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium rounded-lg transition-colors"
                      >
                        <MapPin className="w-3.5 h-3.5 text-orange-600" />
                        <ExternalLink className="w-3 h-3" />
                      </a>

                      <button
                        type="button"
                        onClick={() => onToggleDestination(place.id)}
                        className={`flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                          isSelected
                            ? 'bg-emerald-700 hover:bg-emerald-800 text-white'
                            : 'bg-orange-600 hover:bg-orange-700 text-white'
                        }`}
                      >
                        {isSelected ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add to My Trip</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      <ExploreDetailModal
        item={activeModalItem}
        isSelectedInTrip={activeModalItem ? selectedIds.includes(activeModalItem.id) : false}
        onToggleTrip={onToggleDestination}
        onClose={() => setActiveModalItem(null)}
      />
    </div>
  );
};
