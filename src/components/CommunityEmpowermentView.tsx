import React, { useMemo, useState } from 'react';
import {
  Check,
  Compass,
  ExternalLink,
  HeartHandshake,
  MapPin,
  Plus,
  Search,
} from 'lucide-react';
import { COMMUNITY_INITIATIVES } from '../data/communityEmpowerment';
import { INDIAN_STATES_AND_UTS } from '../data/indianStates';
import { CommunityCategory, ExploreDetailPayload } from '../types/tourism';
import { DestinationVisual } from './DestinationVisual';
import { ExploreDetailModal } from './ExploreDetailModal';

const COMMUNITY_CATEGORIES: Array<'All' | CommunityCategory> = [
  'All',
  'Local Artisans',
  'Local Guides',
  'Homestays',
  'Local Businesses',
  'Rural Tourism',
];

const mapsLink = (q: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

interface CommunityEmpowermentViewProps {
  selectedIds: string[];
  onToggleDestination: (id: string) => void;
}

export const CommunityEmpowermentView: React.FC<CommunityEmpowermentViewProps> = ({
  selectedIds,
  onToggleDestination,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | CommunityCategory>('All');
  const [selectedState, setSelectedState] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalItem, setActiveModalItem] = useState<ExploreDetailPayload | null>(null);

  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return COMMUNITY_INITIATIVES.filter((item) => {
      if (selectedCategory !== 'All' && item.category !== selectedCategory) return false;
      if (selectedState !== 'All' && item.state !== selectedState) return false;
      if (q) {
        const hay = `${item.name} ${item.state} ${item.location} ${item.category} ${item.craftOrService} ${item.description}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [selectedCategory, selectedState, searchQuery]);

  const toExplorePayload = (item: (typeof COMMUNITY_INITIATIVES)[number]): ExploreDetailPayload => ({
    id: item.id,
    pillar: 'Culture & Community Empowerment',
    title: item.name,
    categoryLabel: item.category,
    state: item.state,
    city: item.location,
    location: item.location,
    description: item.description,
    imagePath: item.imagePath,
    bestTime: 'Year-round / Seasonal Community Visits',
    highlights: item.craftOrService,
    howToSupport: item.howToSupport,
    contactInfo: item.contactNote,
    googleMapsUrl: mapsLink(`${item.name} ${item.location} ${item.state}`),
    officialUrl: item.officialReferenceUrl,
  });

  return (
    <div className="space-y-6">
      <div className="text-center max-w-3xl mx-auto space-y-2 pb-1">
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-slate-900">
          Community Empowerment &amp; Rural Tourism
        </h1>
        <p className="text-sm sm:text-base text-slate-600 italic">
          “When you travel with local artisans, certified village guides, family homestays, and rural tourism initiatives, every journey directly uplifts local livelihoods.”
        </p>
      </div>

      {/* Centered Search & State Bar + Community Empowerment & Rural Tourism Categories */}
      <div className="bg-white border border-emerald-100 rounded-xl p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-7 relative">
            <Search className="w-4 h-4 text-emerald-700 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search local artisans, guides, homestays, local businesses, rural villages..."
              aria-label="Search community empowerment and rural tourism"
              className="w-full pl-10 pr-3.5 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>
          <div className="md:col-span-5">
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              aria-label="Filter by state or union territory"
              className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              <option value="All">All 28 States &amp; 8 Union Territories</option>
              {INDIAN_STATES_AND_UTS.map((st) => (
                <option key={st.name} value={st.name}>
                  {st.name} ({st.type})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Dashboards: Local Artisans, Local Guides, Homestays, Local Businesses, Rural Tourism */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100">
          {COMMUNITY_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-emerald-700 text-white'
                  : 'bg-emerald-50/70 text-slate-700 hover:bg-emerald-100'
              }`}
            >
              {cat}
            </button>
          ))}
          <span className="ml-auto text-xs text-slate-500 font-mono-tabular">
            {filteredItems.length} Initiatives
          </span>
        </div>
      </div>

      {/* Cards Grid */}
      {filteredItems.length === 0 ? (
        <div className="bg-white border border-emerald-100 rounded-xl p-10 text-center">
          <p className="font-display text-lg font-medium text-slate-900">
            No community initiatives match these filters
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('All');
              setSelectedState('All');
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-2 bg-emerald-700 text-white text-sm font-medium rounded-lg hover:bg-emerald-800 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const isSelected = selectedIds.includes(item.id);
            const gmaps = mapsLink(`${item.name} ${item.location} ${item.state}`);
            return (
              <article
                key={item.id}
                className={`group bg-white border rounded-xl overflow-hidden flex flex-col transition-shadow ${
                  isSelected
                    ? 'border-emerald-600 shadow-md'
                    : 'border-emerald-100 hover:shadow-sm'
                }`}
              >
                <DestinationVisual
                  title={item.name}
                  category={item.category}
                  imagePath={item.imagePath}
                />

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
                      <span className="font-semibold text-emerald-800">{item.state}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-orange-700 font-medium">{item.category}</span>
                    </div>

                    <h2 className="font-display text-lg font-semibold text-slate-900 leading-snug">
                      {item.name}
                    </h2>

                    <div className="flex items-center gap-1.5 text-xs text-slate-600">
                      <MapPin className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                      <span>{item.location}</span>
                    </div>

                    <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>

                  <div className="space-y-2.5 pt-3 border-t border-slate-100 text-xs">
                    <p className="text-slate-700">
                      <strong className="font-semibold text-slate-900">Focus:</strong>{' '}
                      {item.craftOrService}
                    </p>

                    <div className="flex items-start gap-1.5 bg-emerald-50/70 rounded-lg p-2.5 text-slate-700">
                      <HeartHandshake className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                      <span>
                        <strong className="font-semibold text-slate-900">How to Support:</strong>{' '}
                        {item.howToSupport}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setActiveModalItem(toExplorePayload(item))}
                        className="inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap"
                      >
                        <Compass className="w-3.5 h-3.5" />
                        <span>Explore More</span>
                      </button>

                      <a
                        href={gmaps}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${item.name} on Google Maps`}
                        className="inline-flex items-center justify-center gap-1 py-2 px-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium rounded-lg transition-colors"
                      >
                        <MapPin className="w-3.5 h-3.5 text-orange-600" />
                        <ExternalLink className="w-3 h-3" />
                      </a>

                      <button
                        type="button"
                        onClick={() => onToggleDestination(item.id)}
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
