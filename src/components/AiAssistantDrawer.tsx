import React, { useState } from 'react';
import { Loader2, MessageSquare, Send, Sparkles, X } from 'lucide-react';

interface AiAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDestinationsSummary: string;
}

interface RecommendationItem {
  destination: string;
  state: string;
  bestMonths: string;
  seasonMatch: string;
  budgetGuidance: string;
  communityTip: string;
}

export const AiAssistantDrawer: React.FC<AiAssistantDrawerProps> = ({
  isOpen,
  onClose,
  selectedDestinationsSummary,
}) => {
  const [tab, setTab] = useState<'recommend' | 'ask'>('recommend');

  // Recommender state
  const [travelMonth, setTravelMonth] = useState('November');
  const [budgetPerPerson, setBudgetPerPerson] = useState(3000);
  const [preferredRegion, setPreferredRegion] = useState('Any Region in India');
  const [interests, setInterests] = useState('Heritage, Hidden Culture, Hill Stations');
  const [recLoading, setRecLoading] = useState(false);
  const [recError, setRecError] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<RecommendationItem[]>([]);
  const [recSummary, setRecSummary] = useState('');

  // Q&A state
  const [question, setQuestion] = useState('');
  const [qaLoading, setQaLoading] = useState(false);
  const [qaError, setQaError] = useState<string | null>(null);
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'ai'; text: string }>>([]);

  if (!isOpen) return null;

  const handleGetRecommendations = async (e: React.FormEvent) => {
    e.preventDefault();
    setRecError(null);
    setRecLoading(true);
    try {
      const res = await fetch('/api/ai/recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          travelMonth,
          budgetPerPerson,
          interests,
          preferredRegion,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to get AI recommendations');
      setRecommendations(Array.isArray(data.recommendations) ? data.recommendations : []);
      setRecSummary(data.summary || '');
    } catch (err) {
      setRecError(err instanceof Error ? err.message : 'Unable to fetch recommendations.');
    } finally {
      setRecLoading(false);
    }
  };

  const handleAskQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    const q = question.trim();
    if (!q) return;
    setQaError(null);
    setMessages((prev) => [...prev, { role: 'user', text: q }]);
    setQuestion('');
    setQaLoading(true);
    try {
      const res = await fetch('/api/ai/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: q,
          context: `Selected trip stops: ${selectedDestinationsSummary || 'None yet'}`,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to answer question');
      setMessages((prev) => [...prev, { role: 'ai', text: data.answer || '' }]);
    } catch (err) {
      setQaError(err instanceof Error ? err.message : 'Unable to answer question right now.');
    } finally {
      setQaLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-[1px]">
      <div className="w-full max-w-lg bg-white h-full shadow-2xl border-l border-emerald-100 flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-emerald-100">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-orange-600" />
            <h2 className="font-display text-lg font-semibold text-slate-900">
              Tourism 360 AI Advisor
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close AI Advisor"
            className="p-1.5 rounded-lg text-slate-500 hover:bg-emerald-50 hover:text-slate-900"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="grid grid-cols-2 gap-1 p-2 bg-emerald-50 border-b border-emerald-100">
          <button
            type="button"
            onClick={() => setTab('recommend')}
            className={`py-2 px-3 text-xs font-semibold rounded-lg transition-colors ${
              tab === 'recommend' ? 'bg-white text-emerald-900 shadow-sm' : 'text-slate-600'
            }`}
          >
            Seasonal & Budget Finder
          </button>
          <button
            type="button"
            onClick={() => setTab('ask')}
            className={`py-2 px-3 text-xs font-semibold rounded-lg transition-colors ${
              tab === 'ask' ? 'bg-white text-emerald-900 shadow-sm' : 'text-slate-600'
            }`}
          >
            Travel Q&A
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {tab === 'recommend' ? (
            <>
              <form onSubmit={handleGetRecommendations} className="space-y-3.5">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="ai-month" className="block text-xs font-medium text-slate-700 mb-1">
                      Travel Month
                    </label>
                    <select
                      id="ai-month"
                      value={travelMonth}
                      onChange={(e) => setTravelMonth(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white"
                    >
                      {[
                        'January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December',
                      ].map((m) => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="ai-budget" className="block text-xs font-medium text-slate-700 mb-1">
                      Budget / Person (₹)
                    </label>
                    <input
                      id="ai-budget"
                      type="number"
                      min={1000}
                      step={500}
                      value={budgetPerPerson}
                      onChange={(e) => setBudgetPerPerson(Number(e.target.value) || 1000)}
                      className="w-full px-3 py-2 text-sm font-mono-tabular border border-slate-200 rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="ai-region" className="block text-xs font-medium text-slate-700 mb-1">
                    Preferred Region
                  </label>
                  <select
                    id="ai-region"
                    value={preferredRegion}
                    onChange={(e) => setPreferredRegion(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white"
                  >
                    <option value="Any Region in India">Any Region in India</option>
                    <option value="North India & Himalayas">North India & Himalayas</option>
                    <option value="South India & Backwaters">South India & Backwaters</option>
                    <option value="Northeast India">Northeast India</option>
                    <option value="West & Rajasthan/Goa/Gujarat">West & Rajasthan/Goa/Gujarat</option>
                    <option value="East & Central India">East & Central India</option>
                    <option value="Island Union Territories">Island Union Territories</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="ai-interests" className="block text-xs font-medium text-slate-700 mb-1">
                    Interests
                  </label>
                  <input
                    id="ai-interests"
                    type="text"
                    value={interests}
                    onChange={(e) => setInterests(e.target.value)}
                    placeholder="e.g., Handlooms, Waterfalls, Wildlife, Heritage"
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg"
                  />
                </div>

                <button
                  type="submit"
                  disabled={recLoading}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-orange-600 hover:bg-orange-700 disabled:opacity-60 text-white text-sm font-semibold rounded-lg transition-colors"
                >
                  {recLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  <span>{recLoading ? 'Finding Best Matches...' : 'Get AI Destination Recommendations'}</span>
                </button>
              </form>

              {recError && (
                <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg text-xs text-orange-900">
                  {recError}
                </div>
              )}

              {recSummary && (
                <p className="text-xs text-emerald-950 bg-emerald-50 border border-emerald-200 rounded-lg p-3 leading-relaxed">
                  {recSummary}
                </p>
              )}

              <div className="space-y-3">
                {recommendations.map((rec, i) => (
                  <div key={i} className="border border-emerald-100 rounded-xl p-4 space-y-1.5 bg-[#FBFDFB]">
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className="font-semibold text-emerald-800">{rec.state}</span>
                      <span className="text-orange-700 font-medium">{rec.bestMonths}</span>
                    </div>
                    <h3 className="font-display text-base font-semibold text-slate-900">
                      {rec.destination}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{rec.seasonMatch}</p>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      <strong>Budget Note:</strong> {rec.budgetGuidance}
                    </p>
                    <p className="text-xs text-emerald-800 leading-relaxed">
                      <strong>Community & Culture Tip:</strong> {rec.communityTip}
                    </p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col h-full space-y-4">
              {messages.length === 0 && (
                <div className="bg-emerald-50/70 border border-emerald-100 rounded-xl p-4 space-y-2 text-xs text-slate-700">
                  <div className="flex items-center gap-2 font-semibold text-emerald-900">
                    <MessageSquare className="w-4 h-4" />
                    <span>Ask any India travel question</span>
                  </div>
                  <p>
                    Ask about seasonal weather, state permits (ILP), train/bus options, hidden cultural crafts, or budget advice.
                  </p>
                </div>
              )}

              <div className="flex-1 space-y-3">
                {messages.map((m, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl text-xs leading-relaxed whitespace-pre-wrap ${
                      m.role === 'user'
                        ? 'bg-emerald-700 text-white ml-8'
                        : 'bg-emerald-50/70 border border-emerald-100 text-slate-800 mr-4'
                    }`}
                  >
                    {m.text}
                  </div>
                ))}
                {qaLoading && (
                  <div className="flex items-center gap-2 text-xs text-slate-500 p-2">
                    <Loader2 className="w-4 h-4 animate-spin text-orange-600" />
                    <span>Thinking...</span>
                  </div>
                )}
              </div>

              {qaError && (
                <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg text-xs text-orange-900">
                  {qaError}
                </div>
              )}

              <form onSubmit={handleAskQuestion} className="flex gap-2 pt-2 border-t border-slate-100">
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Ask about Kashmir season, trains, permits..."
                  className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
                <button
                  type="submit"
                  disabled={qaLoading || !question.trim()}
                  aria-label="Send travel question"
                  className="px-3.5 py-2 bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white rounded-lg transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
