import React from 'react';
import {
  Building2,
  Calendar,
  Check,
  Clock,
  Compass,
  ExternalLink,
  HeartHandshake,
  MapPin,
  Phone,
  Plus,
  Sparkles,
  Utensils,
  X,
} from 'lucide-react';
import { ExploreDetailPayload } from '../types/tourism';
import { DestinationVisual } from './DestinationVisual';

interface ExploreDetailModalProps {
  item: ExploreDetailPayload | null;
  isSelectedInTrip: boolean;
  onToggleTrip: (id: string) => void;
  onClose: () => void;
}

export const ExploreDetailModal: React.FC<ExploreDetailModalProps> = ({
  item,
  isSelectedInTrip,
  onToggleTrip,
  onClose,
}) => {
  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="explore-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl border border-emerald-100 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <DestinationVisual
            title={item.title}
            category={item.categoryLabel}
            imagePath={item.imagePath}
            aspectClass="aspect-[16/9]"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close destination details"
            className="absolute top-3 right-3 p-2 rounded-full bg-white/95 text-slate-800 hover:bg-emerald-50 shadow-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-5">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
              <span className="text-emerald-800">{item.pillar}</span>
              <span className="text-slate-400">·</span>
              <span className="text-orange-700">{item.categoryLabel}</span>
              <span className="text-slate-400">·</span>
              <span className="text-slate-700">
                {item.city ? `${item.city}, ` : ''}
                {item.state}
              </span>
            </div>

            <h2
              id="explore-modal-title"
              className="font-display text-2xl font-semibold text-slate-900 leading-snug"
            >
              {item.title}
            </h2>

            <div className="flex items-center gap-1.5 text-xs text-slate-600">
              <MapPin className="w-3.5 h-3.5 text-orange-600 shrink-0" />
              <span>{item.location}</span>
            </div>
          </div>

          <p className="text-sm text-slate-700 leading-relaxed">{item.description}</p>

          {(item.bestTime || item.durationOrAccess) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {item.bestTime && (
                <div className="bg-emerald-50/80 border border-emerald-100 rounded-xl p-3">
                  <div className="flex items-center gap-1.5 font-semibold text-emerald-950 mb-1">
                    <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Best Time to Visit</span>
                  </div>
                  <p className="text-slate-700">{item.bestTime}</p>
                </div>
              )}
              {item.durationOrAccess && (
                <div className="bg-orange-50/80 border border-orange-100 rounded-xl p-3">
                  <div className="flex items-center gap-1.5 font-semibold text-orange-950 mb-1">
                    <Clock className="w-3.5 h-3.5 text-orange-600" />
                    <span>Duration & Accessibility</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed">{item.durationOrAccess}</p>
                </div>
              )}
            </div>
          )}

          {item.highlights && (
            <div className="bg-emerald-50/60 border border-emerald-100 rounded-xl p-3.5 text-xs text-emerald-950 flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold">Key Highlight & Visitor Tips:</strong>{' '}
                <span>{item.highlights}</span>
              </div>
            </div>
          )}

          {item.nearbyAttractions && item.nearbyAttractions.length > 0 && (
            <div className="space-y-1.5">
              <p className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-emerald-700" />
                <span>Nearby Tourist Attractions</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {item.nearbyAttractions.map((spot) => (
                  <span
                    key={spot}
                    className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-700"
                  >
                    {spot}
                  </span>
                ))}
              </div>
            </div>
          )}

          {(item.ingredients || item.culturalSignificance || item.whereToExperience) && (
            <div className="space-y-2.5 bg-orange-50/50 border border-orange-100 rounded-xl p-4 text-xs">
              {item.ingredients && (
                <div className="flex items-start gap-2">
                  <Utensils className="w-3.5 h-3.5 text-orange-600 shrink-0 mt-0.5" />
                  <p className="text-slate-700">
                    <strong className="font-semibold text-slate-900">Key Ingredients:</strong>{' '}
                    {item.ingredients}
                  </p>
                </div>
              )}
              {item.culturalSignificance && (
                <p className="text-slate-700">
                  <strong className="font-semibold text-slate-900">Cultural Significance:</strong>{' '}
                  {item.culturalSignificance}
                </p>
              )}
              {item.whereToExperience && (
                <p className="text-slate-700">
                  <strong className="font-semibold text-slate-900">
                    {item.categoryLabel.includes('Food')
                      ? 'Sweet Stalls & Authentic Eateries:'
                      : 'Where Tourists Can Experience It:'}
                  </strong>{' '}
                  {item.whereToExperience}
                </p>
              )}
            </div>
          )}

          {(item.addressOrVenue || item.contactInfo || item.howToSupport) && (
            <div className="space-y-2 text-xs text-slate-700 border-t border-slate-100 pt-3">
              {item.addressOrVenue && (
                <div className="flex items-start gap-2">
                  <Building2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                  <span>
                    <strong className="font-semibold text-slate-900">Address / Venue:</strong>{' '}
                    {item.addressOrVenue}
                  </span>
                </div>
              )}
              {item.contactInfo && (
                <div className="flex items-start gap-2">
                  <Phone className="w-3.5 h-3.5 text-orange-600 shrink-0 mt-0.5" />
                  <span>
                    <strong className="font-semibold text-slate-900">Verified Contact:</strong>{' '}
                    {item.contactInfo}
                  </span>
                </div>
              )}
              {item.howToSupport && (
                <div className="flex items-start gap-2">
                  <HeartHandshake className="w-3.5 h-3.5 text-orange-600 shrink-0 mt-0.5" />
                  <span>
                    <strong className="font-semibold text-slate-900">How to Support Community:</strong>{' '}
                    {item.howToSupport}
                  </span>
                </div>
              )}
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => onToggleTrip(item.id)}
              className={`flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-semibold rounded-lg transition-colors ${
                isSelectedInTrip
                  ? 'bg-emerald-700 hover:bg-emerald-800 text-white'
                  : 'bg-orange-600 hover:bg-orange-700 text-white'
              }`}
            >
              {isSelectedInTrip ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to My Trip (Remove)</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Add to My Trip</span>
                </>
              )}
            </button>

            {item.googleMapsUrl && (
              <a
                href={item.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 py-2.5 px-4 bg-white border border-emerald-200 hover:bg-emerald-50 text-emerald-900 text-sm font-semibold rounded-lg transition-colors"
              >
                <MapPin className="w-4 h-4 text-orange-600" />
                <span>Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {item.officialUrl && (
              <a
                href={item.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 py-2.5 px-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-medium rounded-lg transition-colors"
              >
                <span>Official Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
