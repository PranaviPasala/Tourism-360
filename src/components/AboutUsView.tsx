import React from 'react';
import { CheckCircle2, Compass, HeartHandshake, Leaf, ShieldCheck, Wallet } from 'lucide-react';

const OBJECTIVES = [
  {
    title: '01. Accessible Travel Planning',
    description: 'Make travel planning easier and more accessible across every Indian state and Union Territory.',
    icon: Compass,
  },
  {
    title: '02. Famous & Hidden Destinations',
    description: 'Promote both celebrated national landmarks and lesser-known regional tourist treasures.',
    icon: CheckCircle2,
  },
  {
    title: '03. Cultural Heritage Preservation',
    description: 'Preserve and showcase India’s temples, handicrafts, handlooms, local cuisine, and folk traditions.',
    icon: ShieldCheck,
  },
  {
    title: '04. Artisan & Local Business Support',
    description: 'Support local artisans, weavers, homestays, local guides, and small community enterprises.',
    icon: HeartHandshake,
  },
  {
    title: '05. Transparent Budget Planning',
    description: 'Provide realistic, budget-friendly travel suggestions tailored to travellers and state transport.',
    icon: Wallet,
  },
  {
    title: '06. Responsible & Sustainable Tourism',
    description: 'Encourage eco-conscious travel that respects fragile Himalayan, coastal, forest, and rural ecosystems.',
    icon: Leaf,
  },
];

export const AboutUsView: React.FC = () => {
  return (
    <div className="max-w-5xl space-y-8">
      <div className="border-b border-emerald-100 pb-6">
        <p className="text-xs font-medium text-emerald-700 mb-1">
          Our Mission · Indian Heritage & Community Empowerment
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-slate-900">
          About Tourism 360
        </h1>
      </div>

      <section className="bg-white border border-emerald-100 rounded-xl p-6 sm:p-8 space-y-4 leading-relaxed text-slate-700 text-base">
        <p>
          <strong className="font-semibold text-slate-900">Tourism 360</strong> is an AI-powered personalized tourism and trip-planning platform designed to make travelling across India easier, smarter, and more enjoyable.
        </p>
        <p>
          Our platform brings popular tourist destinations, hidden cultural attractions, local traditions, verified hotels, state-aware transportation estimates, and personalized trip planning together in one place.
        </p>
        <p>
          It also focuses on community empowerment by promoting local artisans, handicrafts, handlooms, local businesses, homestays, and rural tourism across all 28 states and 8 Union Territories.
        </p>
        <p className="text-emerald-900 font-medium">
          Our main objective is to connect travellers with India’s rich cultural heritage while supporting local communities and encouraging sustainable tourism.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-2xl font-semibold text-slate-900">
          Our Objectives
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {OBJECTIVES.map((obj) => {
            const Icon = obj.icon;
            return (
              <div
                key={obj.title}
                className="bg-white border border-emerald-100 rounded-xl p-5 space-y-2.5"
              >
                <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-orange-600" />
                </div>
                <h3 className="font-display text-base font-semibold text-slate-900">
                  {obj.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {obj.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
