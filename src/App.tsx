import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import {
  collection,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  where,
} from 'firebase/firestore';
import {
  Building2,
  Compass,
  HeartHandshake,
  Info,
  Loader2,
  LogOut,
  MapPin,
  Menu,
  Route,
  Sparkles,
  Luggage,
  X,
} from 'lucide-react';
import { AboutUsView } from './components/AboutUsView';
import { AiAssistantDrawer } from './components/AiAssistantDrawer';
import { CommunityEmpowermentView } from './components/CommunityEmpowermentView';
import { ErrorBoundary } from './components/ErrorBoundary';
import { HiddenIndiaView } from './components/HiddenIndiaView';
import { HotelsView } from './components/HotelsView';
import { LandingHomePage } from './components/LandingHomePage';
import { MyTripView } from './components/MyTripView';
import { PopularDestinationsView } from './components/PopularDestinationsView';
import { TripPlannerView } from './components/TripPlannerView';
import { COMMUNITY_INITIATIVES } from './data/communityEmpowerment';
import { POPULAR_DESTINATIONS } from './data/destinations';
import { HIDDEN_INDIA_CULTURE } from './data/hiddenIndia';
import { HIDDEN_INDIA_PLACES } from './data/hiddenIndiaPlaces';
import { auth, db, handleFirestoreError, OperationType } from './lib/firebase';
import { ModuleId, TripPlan } from './types/tourism';

const NAV_ITEMS: Array<{ id: ModuleId; label: string; icon: React.ComponentType<{ className?: string }> }> = [
  { id: 'destinations', label: 'Popular Destinations', icon: MapPin },
  { id: 'hidden-india', label: 'Hidden India and Culture', icon: Compass },
  { id: 'community', label: 'Community Empowerment & Rural Tourism', icon: HeartHandshake },
  { id: 'hotels', label: 'Hotels', icon: Building2 },
  { id: 'trip-planner', label: 'Trip Planner', icon: Route },
  { id: 'my-trip', label: 'My Trip', icon: Luggage },
  { id: 'about', label: 'About Us', icon: Info },
];

function Tourism360Shell() {
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [activeModule, setActiveModule] = useState<ModuleId>('destinations');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aiDrawerOpen, setAiDrawerOpen] = useState(false);

  const [selectedDestinationIds, setSelectedDestinationIds] = useState<string[]>([]);
  const [trips, setTrips] = useState<TripPlan[]>([]);
  const [tripsLoading, setTripsLoading] = useState(true);
  const [editingTrip, setEditingTrip] = useState<TripPlan | null>(null);

  const [mapsApiKey, setMapsApiKey] = useState<string>(
    (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string) || ''
  );
  const [mapsQuotaExceeded, setMapsQuotaExceeded] = useState(false);

  // Listen to Google Maps Platform quota events
  useEffect(() => {
    const onQuota = () => setMapsQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', onQuota);
    return () => window.removeEventListener('gmp-quota-exceeded', onQuota);
  }, []);

  // Load Google Maps API key from server config if not baked into VITE_ env
  useEffect(() => {
    if (mapsApiKey) return;
    fetch('/api/public-config')
      .then((r) => r.json())
      .then((d) => {
        if (d?.mapsApiKey) setMapsApiKey(d.mapsApiKey);
      })
      .catch(() => {
        // Non-blocking
      });
  }, [mapsApiKey]);

  // Firebase Auth listener
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthReady(true);
      if (!currentUser) {
        setSelectedDestinationIds([]);
        setTrips([]);
        setTripsLoading(false);
      }
    });
    return () => unsub();
  }, []);

  // Firestore real-time listeners (strictly after auth is ready and user is signed in)
  useEffect(() => {
    if (!authReady || !user) return;

    const prefPath = `users/${user.uid}/preferences/planner`;
    const prefRef = doc(db, 'users', user.uid, 'preferences', 'planner');
    const unsubPrefs = onSnapshot(
      prefRef,
      (snap) => {
        if (snap.exists()) {
          const data = snap.data();
          if (Array.isArray(data?.selectedDestinationIds)) {
            setSelectedDestinationIds(data.selectedDestinationIds);
          }
        }
      },
      (err) => handleFirestoreError(err, OperationType.GET, prefPath)
    );

    setTripsLoading(true);
    const tripsPath = `users/${user.uid}/trips`;
    const tripsQuery = query(
      collection(db, 'users', user.uid, 'trips'),
      where('userId', '==', user.uid)
    );
    const unsubTrips = onSnapshot(
      tripsQuery,
      (snapshot) => {
        const list: TripPlan[] = snapshot.docs.map((d) => d.data() as TripPlan);
        list.sort((a, b) => (a.id < b.id ? 1 : -1));
        setTrips(list);
        setTripsLoading(false);
      },
      (err) => {
        setTripsLoading(false);
        handleFirestoreError(err, OperationType.LIST, tripsPath);
      }
    );

    return () => {
      unsubPrefs();
      unsubTrips();
    };
  }, [authReady, user]);

  const persistSelectedIds = useCallback(
    async (nextIds: string[]) => {
      if (!user) return;
      const clamped = nextIds.slice(0, 30);
      setSelectedDestinationIds(clamped);
      const path = `users/${user.uid}/preferences/planner`;
      try {
        await setDoc(doc(db, 'users', user.uid, 'preferences', 'planner'), {
          userId: user.uid,
          selectedDestinationIds: clamped,
          updatedAt: serverTimestamp(),
        });
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, path);
      }
    },
    [user]
  );

  const handleToggleDestination = useCallback(
    (id: string) => {
      const exists = selectedDestinationIds.includes(id);
      const next = exists
        ? selectedDestinationIds.filter((item) => item !== id)
        : [...selectedDestinationIds, id];
      persistSelectedIds(next);
    },
    [selectedDestinationIds, persistSelectedIds]
  );

  const selectedDestinationsSummary = useMemo(() => {
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
    return selectedDestinationIds
      .map((id) => byId.get(id))
      .filter((label): label is string => Boolean(label))
      .join(', ');
  }, [selectedDestinationIds]);

  const handleSignOut = async () => {
    await signOut(auth);
    setActiveModule('destinations');
    setEditingTrip(null);
  };

  if (!authReady) {
    return (
      <div className="min-h-screen bg-[#F9FBF9] flex items-center justify-center">
        <div className="flex items-center gap-3 text-emerald-800">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="text-sm font-medium">Loading Tourism 360...</span>
        </div>
      </div>
    );
  }

  // Strictly minimal Home Page when signed out
  if (!user) {
    return <LandingHomePage />;
  }

  const currentNav = NAV_ITEMS.find((n) => n.id === activeModule) || NAV_ITEMS[0];

  return (
    <div className="min-h-screen bg-[#F9FBF9] flex flex-col">
      {/* Maps Demo Key Quota Banner (Case A requirement) */}
      {mapsQuotaExceeded && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-50 shadow-sm">
          <span>
            Google Maps Platform quota reached. If you are the app owner, visit{' '}
            <a
              href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold text-amber-950 hover:text-amber-800"
            >
              maps developer site
            </a>{' '}
            for instructions to update your account.
          </span>
        </div>
      )}

      {/* Mobile Drawer Navigation (< lg) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/40"
            onClick={() => setMobileMenuOpen(false)}
          />
          <aside className="relative w-72 max-w-[85vw] bg-white h-full shadow-xl flex flex-col z-10">
            <div className="px-5 py-4 border-b border-emerald-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Compass className="w-6 h-6 text-orange-600" />
                <span className="font-display text-xl font-semibold text-emerald-950">
                  Tourism 360
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close navigation menu"
                className="p-1.5 text-slate-500 hover:text-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 p-3 space-y-1 overflow-y-auto" aria-label="Mobile dashboard navigation">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = activeModule === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setActiveModule(item.id);
                      if (item.id !== 'trip-planner') setEditingTrip(null);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between gap-2.5 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-emerald-700 text-white'
                        : 'text-slate-700 hover:bg-emerald-50'
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{item.label}</span>
                    </span>
                    {item.id === 'trip-planner' && selectedDestinationIds.length > 0 && (
                      <span className={`font-mono-tabular text-xs font-semibold ${isActive ? 'text-emerald-100' : 'text-orange-700'}`}>
                        {selectedDestinationIds.length}
                      </span>
                    )}
                    {item.id === 'my-trip' && trips.length > 0 && (
                      <span className={`font-mono-tabular text-xs font-semibold ${isActive ? 'text-emerald-100' : 'text-emerald-800'}`}>
                        {trips.length}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            <div className="p-4 border-t border-emerald-100 space-y-3">
              <div className="text-xs">
                <p className="font-semibold text-slate-900 truncate">
                  {user.displayName || 'Traveller'}
                </p>
                <p className="text-slate-500 truncate">{user.email}</p>
              </div>
              <button
                type="button"
                onClick={handleSignOut}
                className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 border border-slate-200 rounded-lg text-xs font-medium text-slate-700"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Top Horizontal Dashboard Bar */}
      <header className="bg-white border-b border-emerald-100 sticky top-0 z-30">
        <div className="max-w-[1600px] mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-3">
          {/* Left: Brand + Mobile Menu Button + All Horizontal Dashboards Beside Popular Destinations */}
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
              className="lg:hidden p-2 -ml-1 rounded-lg text-slate-700 hover:bg-emerald-50 shrink-0"
            >
              <Menu className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveModule('destinations');
                setEditingTrip(null);
              }}
              className="flex items-center gap-2 shrink-0 pr-3 lg:border-r lg:border-emerald-100"
            >
              <Compass className="w-6 h-6 sm:w-7 sm:h-7 text-orange-600 shrink-0" />
              <span className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-emerald-950 whitespace-nowrap">
                Tourism 360
              </span>
            </button>

            <span className="lg:hidden text-sm font-semibold text-slate-900 truncate">
              {currentNav.label}
            </span>

            {/* All Dashboards Across the Top Beside Popular Destinations */}
            <nav
              aria-label="Dashboard modules"
              className="hidden lg:flex items-center gap-1 overflow-x-auto no-scrollbar min-w-0"
            >
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = activeModule === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setActiveModule(item.id);
                      if (item.id !== 'trip-planner') setEditingTrip(null);
                    }}
                    className={`inline-flex items-center gap-1.5 px-2 py-2 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                      isActive
                        ? 'bg-emerald-700 text-white'
                        : 'text-slate-700 hover:bg-emerald-50 hover:text-emerald-950'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-white' : 'text-emerald-700'}`} />
                    <span>{item.label}</span>
                    {item.id === 'trip-planner' && selectedDestinationIds.length > 0 && (
                      <span
                        className={`font-mono-tabular text-[11px] font-semibold ${
                          isActive ? 'text-emerald-100' : 'text-orange-700'
                        }`}
                      >
                        ({selectedDestinationIds.length})
                      </span>
                    )}
                    {item.id === 'my-trip' && trips.length > 0 && (
                      <span
                        className={`font-mono-tabular text-[11px] font-semibold ${
                          isActive ? 'text-emerald-100' : 'text-emerald-800'
                        }`}
                      >
                        ({trips.length})
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right: User Account & Sign Out */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="hidden 2xl:inline text-xs font-medium text-slate-600 max-w-[160px] truncate px-1">
              {user.displayName || user.email}
            </span>

            <button
              type="button"
              onClick={handleSignOut}
              title={`Sign out (${user.displayName || user.email || 'Traveller'})`}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 border border-slate-200 hover:border-orange-300 hover:text-orange-700 rounded-lg text-xs font-medium text-slate-700 transition-colors whitespace-nowrap shrink-0"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Module Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-6 sm:py-8">
        {activeModule === 'destinations' && (
          <PopularDestinationsView
            selectedIds={selectedDestinationIds}
            onToggleDestination={handleToggleDestination}
          />
        )}

        {activeModule === 'hidden-india' && (
          <HiddenIndiaView
            selectedIds={selectedDestinationIds}
            onToggleDestination={handleToggleDestination}
          />
        )}

        {activeModule === 'community' && (
          <CommunityEmpowermentView
            selectedIds={selectedDestinationIds}
            onToggleDestination={handleToggleDestination}
          />
        )}

        {activeModule === 'hotels' && <HotelsView />}

        {activeModule === 'trip-planner' && (
          <TripPlannerView
            userId={user.uid}
            selectedDestinationIds={selectedDestinationIds}
            onToggleDestination={handleToggleDestination}
            editingTrip={editingTrip}
            onClearEditingTrip={() => setEditingTrip(null)}
            onTripSaved={() => setActiveModule('my-trip')}
            mapsApiKey={mapsApiKey}
          />
        )}

        {activeModule === 'my-trip' && (
          <MyTripView
            userId={user.uid}
            trips={trips}
            loading={tripsLoading}
            mapsApiKey={mapsApiKey}
            onReplanTrip={(trip) => {
              setEditingTrip(trip);
              setActiveModule('trip-planner');
            }}
            onGoToPlanner={() => {
              setEditingTrip(null);
              setActiveModule('trip-planner');
            }}
          />
        )}

        {activeModule === 'about' && <AboutUsView />}
      </main>

      {/* Bottom Bar with AI Travel Advisor Below the Website */}
      <footer className="bg-white border-t border-emerald-100 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 text-center sm:text-left">
            <Compass className="w-5 h-5 text-orange-600 shrink-0 hidden sm:block" />
            <div>
              <p className="font-display text-base font-semibold text-emerald-950">
                Tourism 360 — Personalized India Discovery &amp; Community Empowerment
              </p>
              <p className="text-xs text-slate-600">
                Need seasonal travel timing, route advice, permit alerts, or budget suggestions? Ask our AI Travel Advisor below.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setAiDrawerOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold rounded-xl shadow-sm transition-colors whitespace-nowrap shrink-0"
          >
            <Sparkles className="w-4 h-4" />
            <span>Open AI Travel Advisor</span>
          </button>
        </div>
      </footer>

      <AiAssistantDrawer
        isOpen={aiDrawerOpen}
        onClose={() => setAiDrawerOpen(false)}
        selectedDestinationsSummary={selectedDestinationsSummary}
      />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <Tourism360Shell />
    </ErrorBoundary>
  );
}
