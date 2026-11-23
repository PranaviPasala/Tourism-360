import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  APIProvider,
  AdvancedMarker,
  InfoWindow,
  Map as GoogleMap,
  Pin,
  useMap,
  useMapsLibrary,
} from '@vis.gl/react-google-maps';
import { Compass, ExternalLink, MapPin, Navigation, Route } from 'lucide-react';
import { COMMUNITY_INITIATIVES } from '../data/communityEmpowerment';
import { POPULAR_DESTINATIONS } from '../data/destinations';
import { HIDDEN_INDIA_CULTURE } from '../data/hiddenIndia';
import { HIDDEN_INDIA_PLACES } from '../data/hiddenIndiaPlaces';
import { INDIAN_STATES_AND_UTS } from '../data/indianStates';
import { TripPlan } from '../types/tourism';

interface WaypointMarker {
  id: string;
  label: string;
  role: 'Start' | 'Stop' | 'End';
  position: { lat: number; lng: number };
  subtitle: string;
}

interface NearbySpot {
  id: string;
  name: string;
  position: { lat: number; lng: number };
  rating?: number | null;
}

function resolvePlaceCoordinates(placeText: string): { lat: number; lng: number } {
  const q = placeText.toLowerCase();
  const destMatch = POPULAR_DESTINATIONS.find(
    (d) =>
      q.includes(d.name.toLowerCase()) ||
      q.includes(d.location.toLowerCase()) ||
      q.includes(d.state.toLowerCase())
  );
  if (destMatch) return destMatch.coordinates;

  const stateMatch = INDIAN_STATES_AND_UTS.find(
    (s) => q.includes(s.capital.toLowerCase()) || q.includes(s.name.toLowerCase())
  );
  if (stateMatch) return stateMatch.coordinates;

  // Fallback center of India
  return { lat: 22.9734, lng: 78.6569 };
}

interface ResolvedStop {
  id: string;
  name: string;
  location: string;
  state: string;
  bestMonths?: string;
  coordinates: { lat: number; lng: number };
}

function getAllResolvedStops(selectedIds: string[]): ResolvedStop[] {
  const byId = new Map<string, ResolvedStop>();

  POPULAR_DESTINATIONS.forEach((d) =>
    byId.set(d.id, {
      id: d.id,
      name: d.name,
      location: d.location,
      state: d.state,
      bestMonths: d.bestMonths,
      coordinates: d.coordinates,
    })
  );

  HIDDEN_INDIA_PLACES.forEach((p) => {
    if (byId.has(p.id)) return;
    byId.set(p.id, {
      id: p.id,
      name: p.name,
      location: p.location,
      state: p.state,
      bestMonths: p.bestSeason,
      coordinates: p.coordinates || resolvePlaceCoordinates(`${p.location}, ${p.state}`),
    });
  });

  COMMUNITY_INITIATIVES.forEach((c) => {
    if (byId.has(c.id)) return;
    byId.set(c.id, {
      id: c.id,
      name: c.name,
      location: c.location,
      state: c.state,
      bestMonths: 'October to March',
      coordinates: resolvePlaceCoordinates(`${c.location}, ${c.state}`),
    });
  });

  HIDDEN_INDIA_CULTURE.forEach((h) => {
    if (byId.has(h.id)) return;
    byId.set(h.id, {
      id: h.id,
      name: h.title,
      location: h.location,
      state: h.state,
      bestMonths: h.bestMonths,
      coordinates: resolvePlaceCoordinates(`${h.location}, ${h.state}`),
    });
  });

  return selectedIds
    .map((id) => byId.get(id))
    .filter((s): s is ResolvedStop => Boolean(s));
}

interface MapPolyline {
  setOptions: (opts: Record<string, unknown>) => void;
  setMap: (map: unknown) => void;
}

function TripRouteAndPlacesOverlay({
  waypoints,
  travelMode,
  onRouteSummary,
  onNearbyFound,
}: {
  waypoints: WaypointMarker[];
  travelMode: string;
  onRouteSummary: (summary: { distanceKm: number; durationMinutes: number } | null, errorMsg: string | null) => void;
  onNearbyFound: (spots: NearbySpot[]) => void;
}) {
  const map = useMap();
  const coreLib = useMapsLibrary('core');
  const routesLib = useMapsLibrary('routes');
  const placesLib = useMapsLibrary('places');
  const polylinesRef = useRef<MapPolyline[]>([]);

  useEffect(() => {
    if (!map || !coreLib || waypoints.length < 2) return;

    const bounds = new coreLib.LatLngBounds();
    waypoints.forEach((wp) => bounds.extend(wp.position));
    map.fitBounds(bounds, 60);
  }, [map, coreLib, waypoints]);

  useEffect(() => {
    if (!routesLib || !map || waypoints.length < 2) return;

    polylinesRef.current.forEach((p) => p.setMap(null));
    polylinesRef.current = [];

    const origin = waypoints[0].position;
    const destination = waypoints[waypoints.length - 1].position;
    const intermediates = waypoints.slice(1, -1).map((wp) => wp.position);

    const request: Record<string, unknown> = {
      origin,
      destination,
      travelMode,
      fields: ['path', 'distanceMeters', 'durationMillis', 'viewport'],
    };
    if (intermediates.length > 0) {
      request.intermediates = intermediates;
    }

    let cancelled = false;

    (routesLib.Route as any)
      .computeRoutes(request)
      .then((res: { routes?: any[] }) => {
        if (cancelled) return;
        const routes = res?.routes || [];
        if (routes.length === 0) {
          onRouteSummary(null, 'No direct road route available (for example, island ferry crossings).');
          return;
        }
        const primaryRoute = routes[0];
        const newPolylines: MapPolyline[] = primaryRoute.createPolylines();
        newPolylines.forEach((polyline) => {
          polyline.setOptions({
            strokeColor: '#047857',
            strokeWeight: 5,
            strokeOpacity: 0.9,
          });
          polyline.setMap(map);
        });
        polylinesRef.current = newPolylines;

        if (primaryRoute.viewport) {
          map.fitBounds(primaryRoute.viewport);
        }

        const distanceMeters = primaryRoute.distanceMeters ?? 0;
        const durationMillis = primaryRoute.durationMillis ?? 0;
        onRouteSummary(
          {
            distanceKm: Math.round(distanceMeters / 1000),
            durationMinutes: Math.round(durationMillis / 60000),
          },
          null
        );
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        const msg = err instanceof Error ? err.message : String(err);
        if (
          msg.includes('RESOURCE_EXHAUSTED') ||
          msg.includes('OVER_QUERY_LIMIT') ||
          msg.includes('Quota')
        ) {
          window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
        }
        onRouteSummary(null, 'Live road route could not be computed for this segment. Use Open in Google Maps for multimodal options.');
      });

    return () => {
      cancelled = true;
      polylinesRef.current.forEach((p) => p.setMap(null));
      polylinesRef.current = [];
    };
  }, [routesLib, map, waypoints, travelMode, onRouteSummary]);

  // Discover nearby tourist attractions around destination using Places API (New)
  useEffect(() => {
    if (!placesLib || waypoints.length === 0) return;
    const endWp = waypoints[waypoints.length - 1];
    let cancelled = false;

    const searchNearbyAttractions = async () => {
      try {
        const PlaceClass = (placesLib as any).Place;
        if (!PlaceClass?.searchNearby) return;
        const { places } = await PlaceClass.searchNearby({
          fields: ['displayName', 'location', 'rating'],
          locationRestriction: {
            center: endWp.position,
            radius: 15000,
          },
          includedPrimaryTypes: ['tourist_attraction'],
          maxResultCount: 5,
        });
        if (cancelled || !Array.isArray(places)) return;
        const mapped: NearbySpot[] = places
          .filter((p: any) => p.location)
          .map((p: any, idx: number) => ({
            id: p.id || `nearby-${idx}`,
            name: p.displayName || 'Nearby Attraction',
            position: {
              lat: typeof p.location.lat === 'function' ? p.location.lat() : p.location.lat,
              lng: typeof p.location.lng === 'function' ? p.location.lng() : p.location.lng,
            },
            rating: p.rating ?? null,
          }));
        onNearbyFound(mapped);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        if (msg.includes('RESOURCE_EXHAUSTED') || msg.includes('OVER_QUERY_LIMIT')) {
          window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
        }
      }
    };

    searchNearbyAttractions();
    return () => {
      cancelled = true;
    };
  }, [placesLib, waypoints, onNearbyFound]);

  return null;
}

export const MyTripMap: React.FC<{ trip: TripPlan; mapsApiKey: string }> = ({
  trip,
  mapsApiKey,
}) => {
  const [routeSummary, setRouteSummary] = useState<{ distanceKm: number; durationMinutes: number } | null>(null);
  const [routeMsg, setRouteMsg] = useState<string | null>(null);
  const [nearbySpots, setNearbySpots] = useState<NearbySpot[]>([]);
  const [selectedMarker, setSelectedMarker] = useState<{
    id: string;
    title: string;
    subtitle: string;
    position: { lat: number; lng: number };
  } | null>(null);

  const waypoints = useMemo<WaypointMarker[]>(() => {
    const startCoords = resolvePlaceCoordinates(trip.startingPoint);
    const stopDestinations = getAllResolvedStops(trip.selectedDestinationIds);
    const endCoords =
      stopDestinations.length > 0 &&
      trip.endingPoint.toLowerCase().includes(stopDestinations[stopDestinations.length - 1].state.toLowerCase())
        ? stopDestinations[stopDestinations.length - 1].coordinates
        : resolvePlaceCoordinates(trip.endingPoint);

    const list: WaypointMarker[] = [
      {
        id: 'wp-start',
        label: `Start: ${trip.startingPoint}`,
        role: 'Start',
        position: startCoords,
        subtitle: 'Trip Origin',
      },
    ];

    stopDestinations.forEach((d, idx) => {
      list.push({
        id: `wp-stop-${d.id}`,
        label: `${idx + 1}. ${d.name}`,
        role: 'Stop',
        position: d.coordinates,
        subtitle: `${d.location}, ${d.state}${d.bestMonths ? ` · Best: ${d.bestMonths}` : ''}`,
      });
    });

    list.push({
      id: 'wp-end',
      label: `Destination: ${trip.endingPoint}`,
      role: 'End',
      position: endCoords,
      subtitle: 'Primary Destination / End Point',
    });

    return list;
  }, [trip]);

  const googleMapsExternalUrl = useMemo(() => {
    const origin = encodeURIComponent(trip.startingPoint);
    const destination = encodeURIComponent(trip.endingPoint);
    const stopNames = getAllResolvedStops(trip.selectedDestinationIds).map(
      (d) => `${d.name}, ${d.state}`
    );
    const waypointsParam =
      stopNames.length > 0 ? `&waypoints=${encodeURIComponent(stopNames.join('|'))}` : '';
    return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}${waypointsParam}`;
  }, [trip]);

  const travelMode = useMemo(() => {
    if (trip.transportationPreference === 'Bike Rental') return 'TWO_WHEELER';
    if (trip.transportationPreference === 'Train') return 'TRANSIT';
    return 'DRIVING';
  }, [trip.transportationPreference]);

  const handleRouteSummary = useCallback(
    (summary: { distanceKm: number; durationMinutes: number } | null, err: string | null) => {
      setRouteSummary(summary);
      setRouteMsg(err);
    },
    []
  );

  const handleNearbyFound = useCallback((spots: NearbySpot[]) => {
    setNearbySpots(spots);
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm text-slate-700">
          <Route className="w-4 h-4 text-emerald-700" />
          <span className="font-semibold text-slate-900">Live Trip Map & Route</span>
          {routeSummary && (
            <span className="font-mono-tabular text-xs text-emerald-800">
              · {routeSummary.distanceKm} km · ~{Math.floor(routeSummary.durationMinutes / 60)}h{' '}
              {routeSummary.durationMinutes % 60}m
            </span>
          )}
        </div>

        <a
          href={googleMapsExternalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold rounded-lg transition-colors whitespace-nowrap"
        >
          <Navigation className="w-3.5 h-3.5" />
          <span>Open in Google Maps</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {routeMsg && (
        <p className="text-xs text-slate-600 bg-emerald-50/70 border border-emerald-200 rounded-lg px-3 py-2">
          {routeMsg}
        </p>
      )}

      {mapsApiKey ? (
        <div className="w-full h-[380px] rounded-xl overflow-hidden border border-emerald-200 bg-emerald-50/40">
          <APIProvider apiKey={mapsApiKey} language="en" region="IN" libraries={['routes', 'places', 'marker']}>
            <GoogleMap
              defaultCenter={waypoints[0]?.position || { lat: 22.9734, lng: 78.6569 }}
              defaultZoom={6}
              mapId="DEMO_MAP_ID"
              gestureHandling="greedy"
              internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
              style={{ width: '100%', height: '100%' }}
            >
              <TripRouteAndPlacesOverlay
                waypoints={waypoints}
                travelMode={travelMode}
                onRouteSummary={handleRouteSummary}
                onNearbyFound={handleNearbyFound}
              />

              {waypoints.map((wp) => (
                <AdvancedMarker
                  key={wp.id}
                  position={wp.position}
                  title={wp.label}
                  onClick={() =>
                    setSelectedMarker({
                      id: wp.id,
                      title: wp.label,
                      subtitle: wp.subtitle,
                      position: wp.position,
                    })
                  }
                >
                  <Pin
                    background={
                      wp.role === 'Start' ? '#047857' : wp.role === 'End' ? '#EA580C' : '#0F172A'
                    }
                    borderColor="#FFFFFF"
                    glyphColor="#FFFFFF"
                  />
                </AdvancedMarker>
              ))}

              {nearbySpots.map((spot) => (
                <AdvancedMarker
                  key={spot.id}
                  position={spot.position}
                  title={spot.name}
                  onClick={() =>
                    setSelectedMarker({
                      id: spot.id,
                      title: spot.name,
                      subtitle: spot.rating
                        ? `Nearby Tourist Attraction · Rating ${spot.rating}★`
                        : 'Nearby Tourist Attraction',
                      position: spot.position,
                    })
                  }
                >
                  <Pin background="#F59E0B" borderColor="#FFFFFF" glyphColor="#FFFFFF" scale={0.85} />
                </AdvancedMarker>
              ))}

              {selectedMarker && (
                <InfoWindow
                  position={selectedMarker.position}
                  onCloseClick={() => setSelectedMarker(null)}
                >
                  <div className="p-1 max-w-[220px]">
                    <p className="text-xs font-semibold text-slate-900">{selectedMarker.title}</p>
                    <p className="text-[11px] text-slate-600 mt-0.5">{selectedMarker.subtitle}</p>
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          </APIProvider>
        </div>
      ) : (
        <div className="w-full rounded-xl border border-emerald-200 bg-emerald-50/50 p-6 text-center space-y-2">
          <Compass className="w-6 h-6 text-emerald-700 mx-auto" />
          <p className="text-sm font-medium text-slate-900">
            Interactive Map Canvas Initializing
          </p>
          <p className="text-xs text-slate-600 max-w-md mx-auto">
            Google Maps API key is loading from environment configuration. You can also launch turn-by-turn navigation directly using Open in Google Maps above.
          </p>
        </div>
      )}

      {/* Waypoint & Nearby Legend */}
      <div className="space-y-3 text-xs">
        <div className="bg-emerald-50/60 border border-emerald-100 rounded-lg p-3 space-y-1.5">
          <p className="font-semibold text-emerald-950">Route Waypoints</p>
          {waypoints.map((wp) => (
            <div key={wp.id} className="flex items-center gap-2 text-slate-700">
              <MapPin
                className={`w-3.5 h-3.5 shrink-0 ${
                  wp.role === 'Start'
                    ? 'text-emerald-700'
                    : wp.role === 'End'
                      ? 'text-orange-600'
                      : 'text-slate-700'
                }`}
              />
              <span className="truncate">{wp.label}</span>
            </div>
          ))}
        </div>

        <div className="bg-orange-50/60 border border-orange-100 rounded-lg p-3 space-y-1.5">
          <p className="font-semibold text-orange-950">
            Nearby Tourist Attractions ({nearbySpots.length})
          </p>
          {nearbySpots.length > 0 ? (
            nearbySpots.map((s) => (
              <div key={s.id} className="flex items-center justify-between gap-2 text-slate-700">
                <span className="truncate">{s.name}</span>
                {s.rating && <span className="font-mono-tabular text-orange-700 shrink-0">{s.rating}★</span>}
              </div>
            ))
          ) : (
            <p className="text-slate-600">
              Click pins on the map or pan around your destination to inspect nearby landmarks.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
