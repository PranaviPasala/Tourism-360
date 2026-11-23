import React, { useMemo, useState } from 'react';
import {
  Calendar,
  Check,
  Clock,
  Compass,
  ExternalLink,
  MapPin,
  Plus,
} from 'lucide-react';
import { POPULAR_DESTINATIONS } from '../data/destinations';
import { ExploreDetailPayload } from '../types/tourism';
import { DestinationVisual } from './DestinationVisual';
import { ExploreDetailModal } from './ExploreDetailModal';
import { GlobalIndiaSearchBar } from './GlobalIndiaSearchBar';

interface PopularDestinationsViewProps {
  selectedIds: string[];
  onToggleDestination: (id: string) => void;
}

export const PopularDestinationsView: React.FC<PopularDestinationsViewProps> = ({
  selectedIds,
  onToggleDestination,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState<string>('All');
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [activeModalItem, setActiveModalItem] = useState<ExploreDetailPayload | null>(null);

  const filteredDestinations = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const cityNorm = selectedCity.toLowerCase().replace(/\s*\(.*\)/, '').trim();

    return POPULAR_DESTINATIONS.filter((dest) => {
      if (selectedState !== 'All' && dest.state !== selectedState) return false;
      if (selectedCity !== 'All') {
        const hayCity = `${dest.city} ${dest.location} ${dest.name}`.toLowerCase();
        if (!hayCity.includes(cityNorm) && dest.city.toLowerCase() !== selectedCity.toLowerCase()) {
          return false;
        }
      }
      if (q) {
        const hay = `${dest.name} ${dest.state} ${dest.city} ${dest.regionType} ${dest.location} ${dest.category} ${dest.bestMonths} ${dest.description} ${dest.touristInfo} ${dest.nearbyAttractions.join(' ')}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [selectedState, selectedCity, searchQuery]);

  const toExplorePayload = (dest: (typeof POPULAR_DESTINATIONS)[number]): ExploreDetailPayload => ({
    id: dest.id,
    pillar: 'Popular Destinations',
    title: dest.name,
    categoryLabel: dest.category,
    state: dest.state,
    city: dest.city,
    location: dest.location,
    description: dest.description,
    imagePath: dest.imagePath,
    bestTime: dest.bestMonths,
    durationOrAccess: dest.recommendedDuration,
    highlights: dest.touristInfo,
    nearbyAttractions: dest.nearbyAttractions,
    googleMapsUrl: dest.googleMapsUrl,
  });

  const handleReset = () => {
    setSearchQuery('');
    setSelectedState('All');
    setSelectedCity('All');
  };

  return (
    <div className="space-y-6">
      {/* Centered Popular Destinations Heading + Related Quotation */}
      <div className="text-center max-w-3xl mx-auto space-y-2 pb-1">
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-slate-900">
          Popular Destinations
        </h1>
        <p className="text-sm sm:text-base text-slate-600 italic">
          “From timeless marble monuments and hill-station railways to sunlit shores and ancient temples — discover the landmarks that shape India’s journey.”
        </p>
      </div>

      {/* Single Unified Search Bar Covering All States, Union Territories, Cities & Regions */}
      <GlobalIndiaSearchBar
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        selectedState={selectedState}
        onSelectState={setSelectedState}
        selectedCity={selectedCity}
        onSelectCity={setSelectedCity}
        resultCount={filteredDestinations.length}
        onResetAll={handleReset}
      />

      {/* Results Grid */}
      {filteredDestinations.length === 0 ? (
        <div className="bg-white border border-emerald-100 rounded-xl p-10 text-center">
          <p className="font-display text-lg font-medium text-slate-900">
            No matching attractions found
          </p>
          <p className="text-sm text-slate-600 mt-1 mb-4">
            Try clearing your search to explore all 28 States, 8 Union Territories, and major cities across India.
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 bg-emerald-700 text-white text-sm font-medium rounded-lg hover:bg-emerald-800 transition-colors"
          >
            Show All Destinations
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredDestinations.map((dest) => {
            const isSelected = selectedIds.includes(dest.id);
            return (
              <article
                key={dest.id}
                className={`group bg-white border rounded-xl overflow-hidden flex flex-col transition-shadow ${
                  isSelected
                    ? 'border-emerald-600 shadow-md'
                    : 'border-emerald-100 hover:shadow-sm'
                }`}
              >
                <DestinationVisual
                  title={dest.name}
                  category={dest.category}
                  imagePath={dest.imagePath}
                />

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
                      <span className="font-semibold text-emerald-800">{dest.state}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-medium text-slate-700">{dest.city}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-orange-700 font-medium">{dest.category}</span>
                    </div>

                    <h2 className="font-display text-lg font-semibold text-slate-900 leading-snug">
                      {dest.name}
                    </h2>

                    <div className="flex items-center gap-1.5 text-xs text-slate-600">
                      <MapPin className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                      <span>{dest.location}</span>
                    </div>

                    <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                      {dest.description}
                    </p>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-slate-100">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-emerald-50/70 rounded-lg p-2.5">
                        <div className="flex items-center gap-1 text-emerald-900 font-medium mb-0.5">
                          <Calendar className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                          <span>Best Months</span>
                        </div>
                        <p className="text-slate-700 leading-snug">{dest.bestMonths}</p>
                      </div>
                      <div className="bg-orange-50/70 rounded-lg p-2.5">
                        <div className="flex items-center gap-1 text-orange-900 font-medium mb-0.5">
                          <Clock className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                          <span>Duration</span>
                        </div>
                        <p className="text-slate-700 leading-snug">{dest.recommendedDuration}</p>
                      </div>
                    </div>

                    {dest.nearbyAttractions.length > 0 && (
                      <div className="text-xs text-slate-600">
                        <span className="font-medium text-slate-800">Nearby: </span>
                        {dest.nearbyAttractions.join(' · ')}
                      </div>
                    )}

                    <div className="flex items-center gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setActiveModalItem(toExplorePayload(dest))}
                        className="inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap"
                      >
                        <Compass className="w-3.5 h-3.5" />
                        <span>Explore More</span>
                      </button>

                      <a
                        href={dest.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${dest.name} in Google Maps`}
                        className="inline-flex items-center justify-center gap-1 py-2 px-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium rounded-lg transition-colors"
                      >
                        <MapPin className="w-3.5 h-3.5 text-orange-600" />
                        <ExternalLink className="w-3 h-3" />
                      </a>

                      <button
                        type="button"
                        onClick={() => onToggleDestination(dest.id)}
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
