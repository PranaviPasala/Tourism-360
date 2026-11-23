import React, { useMemo, useState } from 'react';
import { Building2, ExternalLink, MapPin, Phone, Search, Star } from 'lucide-react';
import { VERIFIED_HOTELS } from '../data/hotels';
import { DestinationVisual } from './DestinationVisual';

export const HotelsView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All');
  const [ratingFilter, setRatingFilter] = useState<'All' | '5' | '4.5' | '4'>('All');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc'>('default');

  const stateOptions = useMemo(
    () => Array.from(new Set(VERIFIED_HOTELS.map((h) => h.state))).sort(),
    []
  );

  const cityOptions = useMemo(() => {
    const base =
      selectedState === 'All'
        ? VERIFIED_HOTELS
        : VERIFIED_HOTELS.filter((h) => h.state === selectedState);
    return Array.from(new Set(base.map((h) => h.city))).sort();
  }, [selectedState]);

  const filteredHotels = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const list = VERIFIED_HOTELS.filter((hotel) => {
      if (selectedState !== 'All' && hotel.state !== selectedState) return false;
      if (selectedCity !== 'All' && hotel.city !== selectedCity) return false;
      if (ratingFilter === '5' && hotel.starRating !== 5) return false;
      if (ratingFilter === '4.5' && hotel.starRating !== 4.5) return false;
      if (ratingFilter === '4' && hotel.starRating !== 4) return false;
      if (q) {
        const hay = `${hotel.name} ${hotel.city} ${hotel.state} ${hotel.address}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    if (sortBy === 'price-asc') {
      return [...list].sort(
        (a, b) => (a.approxPricePerNightInr ?? Number.MAX_SAFE_INTEGER) - (b.approxPricePerNightInr ?? Number.MAX_SAFE_INTEGER)
      );
    }
    if (sortBy === 'price-desc') {
      return [...list].sort(
        (a, b) => (b.approxPricePerNightInr ?? -1) - (a.approxPricePerNightInr ?? -1)
      );
    }
    return list;
  }, [searchQuery, selectedState, selectedCity, ratingFilter, sortBy]);

  return (
    <div className="space-y-6">
      <div className="text-center max-w-3xl mx-auto space-y-2 pb-1">
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-slate-900">
          Verified Hotels Across India (4★ to 5★)
        </h1>
      </div>

      {/* Filters Toolbar */}
      <div className="bg-white border border-emerald-100 rounded-xl p-4 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <div className="lg:col-span-2 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search hotel name, city, or address..."
              aria-label="Search hotels by name"
              className="w-full pl-10 pr-3.5 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>

          <select
            value={selectedState}
            onChange={(e) => {
              setSelectedState(e.target.value);
              setSelectedCity('All');
            }}
            aria-label="Select state"
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
          >
            <option value="All">All States & UTs</option>
            {stateOptions.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>

          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            aria-label="Select city"
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
          >
            <option value="All">All Cities</option>
            {cityOptions.map((ct) => (
              <option key={ct} value={ct}>
                {ct}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'default' | 'price-asc' | 'price-desc')}
            aria-label="Sort by price"
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
          >
            <option value="default">Sort: Featured</option>
            <option value="price-asc">Indicative Price: Low to High</option>
            <option value="price-desc">Indicative Price: High to Low</option>
          </select>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-slate-600 mr-1">Star Rating:</span>
            {(['All', '5', '4.5', '4'] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRatingFilter(r)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  ratingFilter === r
                    ? 'bg-emerald-700 text-white'
                    : 'bg-emerald-50/70 text-slate-700 hover:bg-emerald-100'
                }`}
              >
                {r === 'All' ? 'All (4★ – 5★)' : `${r} Star`}
              </button>
            ))}
          </div>

          <span className="text-xs text-slate-500 font-mono-tabular">
            Showing {filteredHotels.length} Properties
          </span>
        </div>
      </div>

      {/* Hotels List */}
      {filteredHotels.length === 0 ? (
        <div className="bg-white border border-emerald-100 rounded-xl p-10 text-center">
          <p className="font-display text-lg font-medium text-slate-900">
            No hotels match your current selection
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedState('All');
              setSelectedCity('All');
              setRatingFilter('All');
              setSortBy('default');
            }}
            className="mt-4 px-4 py-2 bg-emerald-700 text-white text-sm font-medium rounded-lg hover:bg-emerald-800 transition-colors"
          >
            Reset Hotel Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredHotels.map((hotel) => (
            <article
              key={hotel.id}
              className="group bg-white border border-emerald-100 rounded-xl overflow-hidden flex flex-col hover:shadow-sm transition-shadow"
            >
              <DestinationVisual
                title={hotel.name}
                subtitle={`${hotel.city}, ${hotel.state}`}
                category={`${hotel.starRating}-Star Hotel`}
                imagePath={hotel.imagePath}
              />

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="font-medium text-emerald-800">
                      {hotel.city} · {hotel.state}
                    </span>
                    <span className="inline-flex items-center gap-1 font-mono-tabular font-semibold text-orange-700">
                      <Star className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
                      {hotel.starRating}
                    </span>
                  </div>

                  <h2 className="font-display text-lg font-semibold text-slate-900 leading-snug">
                    {hotel.name}
                  </h2>

                  <div className="flex items-start gap-1.5 text-xs text-slate-600 leading-relaxed">
                    <MapPin className="w-3.5 h-3.5 text-orange-600 shrink-0 mt-0.5" />
                    <span>{hotel.address}</span>
                  </div>

                  <div className="pt-1">
                    <p className="text-xs font-medium text-slate-500 mb-1">Key Facilities</p>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {hotel.facilities.join(' · ')}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 pt-3 border-t border-slate-100">
                  <div className="bg-emerald-50/70 rounded-lg p-3">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-xs font-medium text-emerald-900">
                        Indicative Nightly Tariff
                      </span>
                      <span className="font-mono-tabular text-sm font-semibold text-slate-900">
                        {hotel.approxPricePerNightInr
                          ? `From ₹${hotel.approxPricePerNightInr.toLocaleString('en-IN')}`
                          : 'Seasonal Tariff'}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1">{hotel.priceNote}</p>
                  </div>

                  <div className="flex items-start gap-1.5 text-xs text-slate-600">
                    <Phone className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                    <span>{hotel.contactInfo}</span>
                  </div>

                  <a
                    href={hotel.officialWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold rounded-lg transition-colors"
                  >
                    <Building2 className="w-4 h-4" />
                    <span>Official Website & Booking</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
