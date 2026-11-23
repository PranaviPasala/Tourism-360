export type ModuleId =
  | 'destinations'
  | 'hidden-india'
  | 'community'
  | 'hotels'
  | 'trip-planner'
  | 'my-trip'
  | 'about';

export type RegionType = 'State' | 'Union Territory';

export type DestinationCategory =
  | 'Heritage'
  | 'Fort & Palace'
  | 'Spiritual'
  | 'Beach'
  | 'Hill Station'
  | 'National Park'
  | 'Waterfall'
  | 'Lake & Scenic'
  | 'Museum'
  | 'Adventure'
  | 'City';

export interface Destination {
  id: string;
  name: string;
  state: string;
  city: string;
  regionType: RegionType;
  location: string;
  category: DestinationCategory;
  description: string;
  bestMonths: string;
  recommendedDuration: string;
  touristInfo: string;
  nearbyAttractions: string[];
  googleMapsUrl: string;
  coordinates: { lat: number; lng: number };
  imagePath?: string;
}

export type HiddenIndiaSubcategory =
  | 'Hidden Ancient Temples'
  | 'Hidden Waterfalls'
  | 'Hidden Natural Places'
  | 'Hidden Beaches and Islands'
  | 'Hidden Historical Places'
  | 'Traditional Indian Foods & Cuisine'
  | 'Traditional Handlooms'
  | 'Traditional Handicrafts'
  | 'Indian Culture & Traditions';

export interface HiddenIndiaPlace {
  id: string;
  name: string;
  subcategory: HiddenIndiaSubcategory;
  state: string;
  city: string;
  regionType: RegionType;
  location: string;
  description: string;
  bestSeason: string;
  accessibility: string;
  highlights: string;
  address?: string;
  sweetStallOrVenue?: string;
  ingredients?: string;
  culturalSignificance?: string;
  contactNumber?: string;
  eventLocation?: string;
  googleMapsUrl: string;
  coordinates?: { lat: number; lng: number };
  imagePath?: string;
}

export type CultureCommunitySubcategory =
  | 'Traditional Handlooms'
  | 'Traditional Handicrafts'
  | 'Traditional Indian Foods and Local Cuisine'
  | 'Indian Culture and Traditions'
  | 'Rural Tourism and Village Experiences'
  | 'Community Empowerment';

export interface CultureCommunityItem {
  id: string;
  title: string;
  subcategory: CultureCommunitySubcategory;
  state: string;
  city: string;
  regionType: RegionType;
  location: string;
  description: string;
  highlights: string;
  bestMonths?: string;
  // Culinary fields
  ingredients?: string;
  culturalSignificance?: string;
  whereToExperience?: string;
  // Handloom / Craft / Culture location & contact fields
  address?: string;
  contactNumber?: string;
  eventLocation?: string;
  // Rural / Empowerment fields
  craftOrService?: string;
  howToSupport?: string;
  contactNote?: string;
  officialReferenceUrl?: string;
  googleMapsUrl?: string;
  imagePath?: string;
}

export type HiddenCultureCategory =
  | 'Local Temples'
  | 'Handicrafts'
  | 'Handlooms'
  | 'Famous Streets'
  | 'Hidden Waterfalls'
  | 'Local Food'
  | 'Culture & Traditions';

export interface HiddenCultureItem {
  id: string;
  title: string;
  state: string;
  location: string;
  category: HiddenCultureCategory;
  description: string;
  bestMonths?: string;
  culturalHighlight: string;
  address?: string;
  contactNumber?: string;
  eventLocation?: string;
  imagePath?: string;
}

export type CommunityCategory =
  | 'Local Artisans'
  | 'Local Guides'
  | 'Homestays'
  | 'Local Businesses'
  | 'Rural Tourism';

export interface CommunityInitiative {
  id: string;
  name: string;
  state: string;
  regionType: RegionType;
  location: string;
  category: CommunityCategory;
  craftOrService: string;
  description: string;
  howToSupport: string;
  contactNote: string;
  officialReferenceUrl?: string;
  imagePath?: string;
}

export interface HotelItem {
  id: string;
  name: string;
  starRating: 4 | 4.5 | 5;
  address: string;
  city: string;
  state: string;
  contactInfo: string;
  facilities: string[];
  approxPricePerNightInr: number | null;
  priceNote: string;
  officialWebsite: string;
  imagePath?: string;
}

export type TransportMode =
  | 'Public Bus'
  | 'Government Bus'
  | 'Train'
  | 'Local Transport'
  | 'Bike Rental'
  | 'Car Rental';

export interface DayItineraryItem {
  day: number;
  title: string;
  places: string[];
  timings: string;
  distanceKm: number;
  transportSuggestion: string;
  estimatedExpenseInr: number;
  highlights: string;
}

export interface BudgetBreakdown {
  transportation: number;
  food: number;
  accommodation: number;
  localTravel: number;
  other: number;
}

export interface TripPlan {
  id: string;
  userId: string;
  title: string;
  startingPoint: string;
  endingPoint: string;
  days: number;
  travellers: number;
  startDate: string;
  transportationPreference: TransportMode;
  selectedDestinationIds: string[];
  budgetPerPerson: number;
  totalBudget: number;
  realisticMinimumEstimate: number;
  budgetBreakdown: BudgetBreakdown;
  itinerary: DayItineraryItem[];
  aiNotes: string;
  status: 'planned' | 'active' | 'completed';
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface UserProfile {
  uid: string;
  fullName: string;
  email: string;
  mobileNumber: string;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface ExploreDetailPayload {
  id: string;
  pillar: 'Popular Destinations' | 'Hidden India' | 'Culture & Community Empowerment';
  title: string;
  categoryLabel: string;
  state: string;
  city: string;
  location: string;
  description: string;
  imagePath?: string;
  bestTime?: string;
  durationOrAccess?: string;
  highlights?: string;
  nearbyAttractions?: string[];
  ingredients?: string;
  culturalSignificance?: string;
  whereToExperience?: string;
  addressOrVenue?: string;
  contactInfo?: string;
  howToSupport?: string;
  googleMapsUrl?: string;
  officialUrl?: string;
}
