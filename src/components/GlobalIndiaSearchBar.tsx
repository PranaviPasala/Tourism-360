import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ChevronDown,
  MapPin,
  Search,
  X,
} from 'lucide-react';
import { COMMUNITY_INITIATIVES } from '../data/communityEmpowerment';
import { POPULAR_DESTINATIONS } from '../data/destinations';
import { HIDDEN_INDIA_PLACES } from '../data/hiddenIndiaPlaces';
import { INDIAN_STATES_AND_UTS } from '../data/indianStates';
import { ExploreDetailPayload, RegionType } from '../types/tourism';

export interface UnifiedSearchEntry {
  id: string;
  pillar: 'Popular Destinations' | 'Hidden India' | 'Culture & Community Empowerment';
  title: string;
  state: string;
  city: string;
  regionType: RegionType;
  category: string;
  bestMonths: string;
  description: string;
  imagePath?: string;
  detailPayload: ExploreDetailPayload;
}

const mapsLink = (q: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

export function buildUnifiedSearchDatabase(): UnifiedSearchEntry[] {
  const seenIds = new Set<string>();
  const entries: UnifiedSearchEntry[] = [];

  for (const d of POPULAR_DESTINATIONS) {
    if (seenIds.has(d.id)) continue;
    seenIds.add(d.id);
    entries.push({
      id: d.id,
      pillar: 'Popular Destinations',
      title: d.name,
      state: d.state,
      city: d.city,
      regionType: d.regionType,
      category: d.category,
      bestMonths: d.bestMonths,
      description: d.description,
      imagePath: d.imagePath,
      detailPayload: {
        id: d.id,
        pillar: 'Popular Destinations',
        title: d.name,
        categoryLabel: d.category,
        state: d.state,
        city: d.city,
        location: d.location,
        description: d.description,
        imagePath: d.imagePath,
        bestTime: d.bestMonths,
        durationOrAccess: d.recommendedDuration,
        highlights: d.touristInfo,
        nearbyAttractions: d.nearbyAttractions,
        googleMapsUrl: d.googleMapsUrl,
      },
    });
  }

  for (const h of HIDDEN_INDIA_PLACES) {
    if (seenIds.has(h.id)) continue;
    seenIds.add(h.id);
    entries.push({
      id: h.id,
      pillar: 'Hidden India',
      title: h.name,
      state: h.state,
      city: h.city,
      regionType: h.regionType,
      category: h.subcategory,
      bestMonths: h.bestSeason,
      description: h.description,
      imagePath: h.imagePath,
      detailPayload: {
        id: h.id,
        pillar: 'Hidden India',
        title: h.name,
        categoryLabel: h.subcategory,
        state: h.state,
        city: h.city,
        location: h.location,
        description: h.description,
        imagePath: h.imagePath,
        bestTime: h.bestSeason,
        durationOrAccess: h.accessibility,
        highlights: h.highlights,
        ingredients: h.ingredients,
        culturalSignificance: h.culturalSignificance,
        whereToExperience: h.sweetStallOrVenue,
        addressOrVenue: h.eventLocation || h.address,
        contactInfo: h.contactNumber,
        googleMapsUrl: h.googleMapsUrl,
      },
    });
  }

  for (const c of COMMUNITY_INITIATIVES) {
    if (seenIds.has(c.id)) continue;
    seenIds.add(c.id);
    entries.push({
      id: c.id,
      pillar: 'Culture & Community Empowerment',
      title: c.name,
      state: c.state,
      city: c.location,
      regionType: c.regionType,
      category: c.category,
      bestMonths: 'Year-round / Seasonal',
      description: c.description,
      imagePath: c.imagePath,
      detailPayload: {
        id: c.id,
        pillar: 'Culture & Community Empowerment',
        title: c.name,
        categoryLabel: c.category,
        state: c.state,
        city: c.location,
        location: c.location,
        description: c.description,
        imagePath: c.imagePath,
        bestTime: 'Year-round / Seasonal',
        highlights: c.craftOrService,
        howToSupport: c.howToSupport,
        contactInfo: c.contactNote,
        googleMapsUrl: mapsLink(`${c.name} ${c.location} ${c.state}`),
        officialUrl: c.officialReferenceUrl,
      },
    });
  }

  return entries;
}

interface GlobalIndiaSearchBarProps {
  searchQuery: string;
  onSearchQueryChange: (val: string) => void;
  selectedState: string;
  onSelectState: (state: string) => void;
  selectedCity: string;
  onSelectCity: (city: string) => void;
  resultCount: number;
  onResetAll: () => void;
}

export const GlobalIndiaSearchBar: React.FC<GlobalIndiaSearchBarProps> = ({
  searchQuery,
  onSearchQueryChange,
  selectedState,
  onSelectState,
  selectedCity,
  onSelectCity,
  resultCount,
  onResetAll,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown smoothly when clicking outside the search bar
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const allCitiesList = useMemo(() => {
    const list: Array<{ city: string; state: string }> = [];
    const statesToInspect =
      selectedState === 'All'
        ? INDIAN_STATES_AND_UTS
        : INDIAN_STATES_AND_UTS.filter((s) => s.name === selectedState);

    statesToInspect.forEach((s) => {
      s.citiesAndDistricts.forEach((c) => {
        list.push({ city: c, state: s.name });
      });
    });
    return list;
  }, [selectedState]);

  const matchingStatesAndCities = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const stateMatches = INDIAN_STATES_AND_UTS.filter(
      (s) =>
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.capital.toLowerCase().includes(q) ||
        s.region.toLowerCase().includes(q) ||
        s.citiesAndDistricts.some((c) => c.toLowerCase().includes(q))
    );

    const cityMatches = allCitiesList.filter(
      ({ city, state }) =>
        !q ||
        city.toLowerCase().includes(q) ||
        state.toLowerCase().includes(q)
    );

    return {
      stateMatches,
      cityMatches: q ? cityMatches.slice(0, 24) : cityMatches.slice(0, 20),
    };
  }, [searchQuery, allCitiesList]);

  const hasActiveFilter = Boolean(searchQuery.trim() || selectedState !== 'All' || selectedCity !== 'All');

  return (
    <div ref={containerRef} className="max-w-4xl mx-auto space-y-2.5">
      {/* Single Unified Search Bar Containing All 28 States, 8 UTs & All Cities/Regions */}
      <div className="relative">
        <Search className="w-4 h-4 text-emerald-700 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="search"
          value={searchQuery}
          onFocus={() => setDropdownOpen(true)}
          onChange={(e) => {
            onSearchQueryChange(e.target.value);
            setDropdownOpen(true);
          }}
          placeholder="Search any State, Union Territory, City, Region, monument, beach, temple, hill station, or month..."
          aria-label="Search destinations across all states, union territories, cities, and regions"
          className="w-full pl-11 pr-40 py-3.5 text-sm border border-emerald-200 rounded-2xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
        />

        <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
          {hasActiveFilter && (
            <button
              type="button"
              onClick={() => {
                onResetAll();
                setDropdownOpen(false);
              }}
              className="p-1.5 text-slate-400 hover:text-orange-600 rounded-md"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={() => setDropdownOpen((o) => !o)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs font-medium rounded-xl transition-colors whitespace-nowrap"
          >
            <span>States &amp; Cities</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Unified Searchable Dropdown: States, UTs, and Cities & Regions */}
        {dropdownOpen && (
          <div className="absolute left-0 right-0 top-full mt-2 z-40 bg-white border border-emerald-200 rounded-2xl shadow-xl p-4 sm:p-5 max-h-[420px] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-xs font-semibold text-emerald-900">
                All 28 States, 8 Union Territories &amp; Cities Across India
              </span>
              <div className="flex items-center gap-3">
                {hasActiveFilter && (
                  <button
                    type="button"
                    onClick={() => {
                      onResetAll();
                    }}
                    className="text-xs font-medium text-orange-700 hover:underline"
                  >
                    Reset
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setDropdownOpen(false)}
                  className="text-xs text-slate-500 hover:text-slate-800 font-medium"
                >
                  Close
                </button>
              </div>
            </div>

            {/* Cities & Regions inside Single Search */}
            {matchingStatesAndCities.cityMatches.length > 0 && (
              <div className="space-y-1.5">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-orange-700">
                  {selectedState === 'All'
                    ? 'Cities & Regions'
                    : `Cities & Districts in ${selectedState}`}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {matchingStatesAndCities.cityMatches.map(({ city, state }) => {
                    const active = selectedCity === city;
                    return (
                      <button
                        key={`${state}-${city}`}
                        type="button"
                        onClick={() => {
                          onSelectState(state);
                          onSelectCity(active ? 'All' : city);
                          onSearchQueryChange('');
                          setDropdownOpen(false);
                        }}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors ${
                          active
                            ? 'bg-orange-600 border-orange-600 text-white'
                            : 'bg-orange-50 hover:bg-orange-100 border-orange-200 text-orange-950'
                        }`}
                      >
                        <MapPin className={`w-3 h-3 ${active ? 'text-white' : 'text-orange-600'}`} />
                        <span>{city}</span>
                        {selectedState === 'All' && (
                          <span className={active ? 'text-orange-100' : 'text-orange-700/80'}>
                            ({state})
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* All 28 States & 8 Union Territories */}
            <div className="space-y-1.5">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-800">
                28 States &amp; 8 Union Territories ({matchingStatesAndCities.stateMatches.length})
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1.5">
                {matchingStatesAndCities.stateMatches.map((st) => {
                  const isActive = selectedState === st.name;
                  return (
                    <button
                      key={st.name}
                      type="button"
                      onClick={() => {
                        if (isActive) {
                          onSelectState('All');
                          onSelectCity('All');
                        } else {
                          onSelectState(st.name);
                          onSelectCity('All');
                          onSearchQueryChange('');
                        }
                        setDropdownOpen(false);
                      }}
                      className={`flex items-center justify-between text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                        isActive
                          ? 'bg-emerald-700 text-white font-semibold'
                          : 'hover:bg-emerald-50 text-slate-800'
                      }`}
                    >
                      <span className="truncate">{st.name}</span>
                      <span
                        className={`text-[10px] ml-1.5 shrink-0 ${
                          isActive ? 'text-emerald-100' : 'text-slate-400'
                        }`}
                      >
                        {st.type === 'Union Territory' ? 'UT' : st.region}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Subtle inline status line when filtered inside the single search bar */}
      {hasActiveFilter && (
        <div className="flex flex-wrap items-center justify-between gap-2 px-1 text-xs">
          <div className="flex flex-wrap items-center gap-1.5">
            {selectedState !== 'All' && (
              <button
                type="button"
                onClick={() => {
                  onSelectState('All');
                  onSelectCity('All');
                }}
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-100 text-emerald-900 rounded-md font-medium hover:bg-emerald-200"
              >
                <span>{selectedState}</span>
                <X className="w-3 h-3" />
              </button>
            )}
            {selectedCity !== 'All' && (
              <button
                type="button"
                onClick={() => onSelectCity('All')}
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-orange-100 text-orange-950 rounded-md font-medium hover:bg-orange-200"
              >
                <span>{selectedCity}</span>
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
          <span className="font-mono-tabular text-slate-500">
            Showing {resultCount} {resultCount === 1 ? 'Destination' : 'Destinations'}
          </span>
        </div>
      )}
    </div>
  );
};
