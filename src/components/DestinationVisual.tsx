import React, { useState } from 'react';
import { Compass, Landmark, Mountain, Trees, Waves, Sparkles, Home, Building2 } from 'lucide-react';

interface DestinationVisualProps {
  title: string;
  subtitle?: string;
  category: string;
  imagePath?: string;
  coordinates?: { lat: number; lng: number };
  aspectClass?: string;
}

export const DestinationVisual: React.FC<DestinationVisualProps> = ({
  title,
  category,
  imagePath,
  aspectClass = 'aspect-[4/3]',
}) => {
  const [imgFailed, setImgFailed] = useState(false);

  if (imagePath && !imgFailed) {
    return (
      <div className={`relative w-full ${aspectClass} overflow-hidden bg-emerald-50`}>
        <img
          src={imagePath}
          alt={title}
          referrerPolicy="no-referrer"
          loading="lazy"
          onError={() => setImgFailed(true)}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </div>
    );
  }

  const getVisualTheme = () => {
    const lower = category.toLowerCase();
    if (lower.includes('hill') || lower.includes('mountain')) {
      return {
        bg: 'from-emerald-50 via-white to-emerald-100/70',
        Icon: Mountain,
      };
    }
    if (lower.includes('beach') || lower.includes('waterfall') || lower.includes('island')) {
      return {
        bg: 'from-emerald-50 via-teal-50/50 to-orange-50/40',
        Icon: Waves,
      };
    }
    if (lower.includes('park') || lower.includes('rural') || lower.includes('homestay')) {
      return {
        bg: 'from-emerald-100/60 via-white to-lime-50',
        Icon: lower.includes('homestay') ? Home : Trees,
      };
    }
    if (lower.includes('hotel')) {
      return {
        bg: 'from-orange-50/70 via-white to-emerald-50',
        Icon: Building2,
      };
    }
    if (lower.includes('temple') || lower.includes('spiritual') || lower.includes('heritage')) {
      return {
        bg: 'from-orange-50/60 via-white to-emerald-50/70',
        Icon: Landmark,
      };
    }
    if (lower.includes('handloom') || lower.includes('handicraft') || lower.includes('culture')) {
      return {
        bg: 'from-amber-50/60 via-white to-emerald-50',
        Icon: Sparkles,
      };
    }
    return {
      bg: 'from-emerald-50 via-white to-orange-50/60',
      Icon: Compass,
    };
  };

  const { bg, Icon } = getVisualTheme();

  return (
    <div
      className={`relative w-full ${aspectClass} overflow-hidden bg-gradient-to-br ${bg} border-b border-emerald-100/80 flex items-center justify-center`}
      aria-label={title}
    >
      <div className="w-12 h-12 rounded-xl bg-white/90 border border-emerald-200/80 flex items-center justify-center">
        <Icon className="w-6 h-6 text-emerald-700" />
      </div>
    </div>
  );
};
