import { RegionType, TransportMode } from '../types/tourism';

export interface StateInfo {
  name: string;
  type: RegionType;
  region: 'North' | 'South' | 'East' | 'West' | 'Central' | 'Northeast' | 'Islands';
  capital: string;
  citiesAndDistricts: string[];
  coordinates: { lat: number; lng: number };
  terrainFactor: number; // reflects hill/island/plains road & transit cost differences
  stateRtcName: string;
}

export const INDIAN_STATES_AND_UTS: StateInfo[] = [
  // 28 States
  {
    name: 'Andhra Pradesh',
    type: 'State',
    region: 'South',
    capital: 'Amaravati',
    citiesAndDistricts: ['Visakhapatnam', 'Araku Valley', 'Tirupati', 'Vijayawada', 'Amaravati', 'Lepakshi', 'Gandikota', 'Kondapalli', 'Anakapalli', 'Srikalahasti'],
    coordinates: { lat: 16.5062, lng: 80.648 },
    terrainFactor: 1.0,
    stateRtcName: 'APSRTC',
  },
  {
    name: 'Arunachal Pradesh',
    type: 'State',
    region: 'Northeast',
    capital: 'Itanagar',
    citiesAndDistricts: ['Tawang', 'Ziro Valley', 'Itanagar', 'Bomdila', 'Mechuka', 'Dirang', 'Roing'],
    coordinates: { lat: 27.0844, lng: 93.6053 },
    terrainFactor: 1.45,
    stateRtcName: 'APSTS',
  },
  {
    name: 'Assam',
    type: 'State',
    region: 'Northeast',
    capital: 'Dispur',
    citiesAndDistricts: ['Guwahati', 'Kaziranga', 'Majuli', 'Sualkuchi', 'Sivasagar', 'Jorhat', 'Haflong'],
    coordinates: { lat: 26.1445, lng: 91.7362 },
    terrainFactor: 1.15,
    stateRtcName: 'ASTC',
  },
  {
    name: 'Bihar',
    type: 'State',
    region: 'East',
    capital: 'Patna',
    citiesAndDistricts: ['Patna', 'Bodh Gaya', 'Nalanda', 'Rajgir', 'Madhubani', 'Bhagalpur', 'Kaimur'],
    coordinates: { lat: 25.5941, lng: 85.1376 },
    terrainFactor: 0.95,
    stateRtcName: 'BSRTC',
  },
  {
    name: 'Chhattisgarh',
    type: 'State',
    region: 'Central',
    capital: 'Raipur',
    citiesAndDistricts: ['Raipur', 'Jagdalpur (Bastar)', 'Kondagaon', 'Sirpur', 'Mainpat', 'Kanger Valley'],
    coordinates: { lat: 21.2514, lng: 81.6296 },
    terrainFactor: 1.0,
    stateRtcName: 'State Transport / Private Stage Carriers',
  },
  {
    name: 'Goa',
    type: 'State',
    region: 'West',
    capital: 'Panaji',
    citiesAndDistricts: ['Panaji', 'Old Goa', 'Palolem', 'Baga & Calangute', 'Canacona', 'Chorao Island', 'Netravali', 'Benaulim'],
    coordinates: { lat: 15.4909, lng: 73.8278 },
    terrainFactor: 1.15,
    stateRtcName: 'Kadamba Transport (KTCL)',
  },
  {
    name: 'Gujarat',
    type: 'State',
    region: 'West',
    capital: 'Gandhinagar',
    citiesAndDistricts: ['Ahmedabad', 'Bhuj & Kutch', 'Ekta Nagar (Kevadia)', 'Patan', 'Dwarka', 'Sasan Gir', 'Vadodara', 'Surat', 'Champaner'],
    coordinates: { lat: 23.2156, lng: 72.6369 },
    terrainFactor: 1.0,
    stateRtcName: 'GSRTC',
  },
  {
    name: 'Haryana',
    type: 'State',
    region: 'North',
    capital: 'Chandigarh',
    citiesAndDistricts: ['Kurukshetra', 'Gurugram', 'Faridabad', 'Panchkula (Morni Hills)', 'Jhajjar', 'Panipat'],
    coordinates: { lat: 30.7333, lng: 76.7794 },
    terrainFactor: 1.0,
    stateRtcName: 'Haryana Roadways',
  },
  {
    name: 'Himachal Pradesh',
    type: 'State',
    region: 'North',
    capital: 'Shimla',
    citiesAndDistricts: ['Manali', 'Shimla', 'Dharamshala & McLeod Ganj', 'Kullu', 'Spiti Valley', 'Chamba', 'Kangra (Masrur)', 'Bir Billing', 'Tirthan Valley'],
    coordinates: { lat: 31.1048, lng: 77.1734 },
    terrainFactor: 1.35,
    stateRtcName: 'HRTC',
  },
  {
    name: 'Jharkhand',
    type: 'State',
    region: 'East',
    capital: 'Ranchi',
    citiesAndDistricts: ['Ranchi', 'Netarhat', 'Deoghar', 'Dumka (Maluti)', 'Betla (Latehar)', 'Hazaribagh'],
    coordinates: { lat: 23.3441, lng: 85.3096 },
    terrainFactor: 1.0,
    stateRtcName: 'Jharkhand Tourism / Stage Carriers',
  },
  {
    name: 'Karnataka',
    type: 'State',
    region: 'South',
    capital: 'Bengaluru',
    citiesAndDistricts: ['Bengaluru', 'Mysuru', 'Hampi (Vijayanagara)', 'Coorg (Kodagu)', 'Chikkaballapur', 'Channapatna', 'Bidar', 'Gokarna & Uttara Kannada', 'Badami & Pattadakal', 'Chikmagalur'],
    coordinates: { lat: 12.9716, lng: 77.5946 },
    terrainFactor: 1.05,
    stateRtcName: 'KSRTC',
  },
  {
    name: 'Kerala',
    type: 'State',
    region: 'South',
    capital: 'Thiruvananthapuram',
    citiesAndDistricts: ['Kochi', 'Munnar', 'Alappuzha (Alleppey)', 'Wayanad', 'Kumarakom', 'Thiruvananthapuram', 'Kozhikode', 'Thrissur', 'Kannur', 'Varkala'],
    coordinates: { lat: 8.5241, lng: 76.9366 },
    terrainFactor: 1.1,
    stateRtcName: 'Kerala SRTC (KSRTC)',
  },
  {
    name: 'Madhya Pradesh',
    type: 'State',
    region: 'Central',
    capital: 'Bhopal',
    citiesAndDistricts: ['Bhopal', 'Khajuraho', 'Indore', 'Ujjain', 'Chanderi', 'Maheshwar', 'Mandu', 'Morena (Bateshwar)', 'Jabalpur (Bhedaghat)', 'Pachmarhi', 'Orchha'],
    coordinates: { lat: 23.2599, lng: 77.4126 },
    terrainFactor: 1.0,
    stateRtcName: 'MP City & Intercity Bus Services',
  },
  {
    name: 'Maharashtra',
    type: 'State',
    region: 'West',
    capital: 'Mumbai',
    citiesAndDistricts: ['Mumbai', 'Pune', 'Chhatrapati Sambhajinagar (Ajanta-Ellora)', 'Lonavala & Mahabaleshwar', 'Kolhapur', 'Ratnagiri (Konkan)', 'Nashik', 'Sindhudurg', 'Yeola (Paithan)'],
    coordinates: { lat: 19.076, lng: 72.8777 },
    terrainFactor: 1.08,
    stateRtcName: 'MSRTC',
  },
  {
    name: 'Manipur',
    type: 'State',
    region: 'Northeast',
    capital: 'Imphal',
    citiesAndDistricts: ['Imphal', 'Loktak (Bishnupur)', 'Ukhrul', 'Andro', 'Moirang', 'Tamenglong'],
    coordinates: { lat: 24.817, lng: 93.9368 },
    terrainFactor: 1.35,
    stateRtcName: 'MST',
  },
  {
    name: 'Meghalaya',
    type: 'State',
    region: 'Northeast',
    capital: 'Shillong',
    citiesAndDistricts: ['Shillong', 'Sohra (Cherrapunji)', 'Jowai (Jaintia Hills)', 'Mawlynnong', 'Dawki', 'Nongriat', 'Mawphlang'],
    coordinates: { lat: 25.5788, lng: 91.8933 },
    terrainFactor: 1.3,
    stateRtcName: 'MTC',
  },
  {
    name: 'Mizoram',
    type: 'State',
    region: 'Northeast',
    capital: 'Aizawl',
    citiesAndDistricts: ['Aizawl', 'Thenzawl', 'Reiek', 'Champhai', 'Lunglei'],
    coordinates: { lat: 23.7271, lng: 92.7176 },
    terrainFactor: 1.4,
    stateRtcName: 'Mizoram State Transport',
  },
  {
    name: 'Nagaland',
    type: 'State',
    region: 'Northeast',
    capital: 'Kohima',
    citiesAndDistricts: ['Kohima', 'Khonoma', 'Kisama', 'Mokokchung', 'Mon', 'Dzükou Valley'],
    coordinates: { lat: 25.6751, lng: 94.1086 },
    terrainFactor: 1.4,
    stateRtcName: 'NST',
  },
  {
    name: 'Odisha',
    type: 'State',
    region: 'East',
    capital: 'Bhubaneswar',
    citiesAndDistricts: ['Bhubaneswar', 'Puri', 'Konark', 'Raghurajpur', 'Chilika Lake', 'Sambalpur', 'Mayurbhanj (Simlipal)', 'Sundargarh'],
    coordinates: { lat: 20.2961, lng: 85.8245 },
    terrainFactor: 0.98,
    stateRtcName: 'OSRTC',
  },
  {
    name: 'Punjab',
    type: 'State',
    region: 'North',
    capital: 'Chandigarh',
    citiesAndDistricts: ['Amritsar', 'Patiala', 'Jalandhar', 'Ludhiana', 'Anandpur Sahib', 'Kapurthala'],
    coordinates: { lat: 30.7333, lng: 76.7794 },
    terrainFactor: 1.0,
    stateRtcName: 'PRTC / Punbus',
  },
  {
    name: 'Rajasthan',
    type: 'State',
    region: 'North',
    capital: 'Jaipur',
    citiesAndDistricts: ['Jaipur', 'Udaipur', 'Jodhpur', 'Jaisalmer', 'Pushkar & Ajmer', 'Bundi', 'Barmer (Kiradu)', 'Bikaner', 'Mount Abu', 'Sawai Madhopur (Ranthambore)', 'Abhaneri'],
    coordinates: { lat: 26.9124, lng: 75.7873 },
    terrainFactor: 1.02,
    stateRtcName: 'RSRTC',
  },
  {
    name: 'Sikkim',
    type: 'State',
    region: 'Northeast',
    capital: 'Gangtok',
    citiesAndDistricts: ['Gangtok', 'Pelling', 'Lachung & Yumthang', 'Dzongu', 'Namchi', 'Ravangla'],
    coordinates: { lat: 27.3389, lng: 88.6065 },
    terrainFactor: 1.4,
    stateRtcName: 'SNT',
  },
  {
    name: 'Tamil Nadu',
    type: 'State',
    region: 'South',
    capital: 'Chennai',
    citiesAndDistricts: ['Chennai', 'Madurai', 'Ooty (Nilgiris)', 'Kanchipuram', 'Thanjavur', 'Darasuram (Kumbakonam)', 'Mamallapuram', 'Karaikudi (Chettinad)', 'Kodaikanal', 'Rameswaram', 'Dhanushkodi'],
    coordinates: { lat: 13.0827, lng: 80.2707 },
    terrainFactor: 1.0,
    stateRtcName: 'TNSTC / SETC',
  },
  {
    name: 'Telangana',
    type: 'State',
    region: 'South',
    capital: 'Hyderabad',
    citiesAndDistricts: ['Hyderabad', 'Warangal & Mulugu (Ramappa)', 'Pochampally', 'Adilabad (Kuntala & Pochera)', 'Gadwal', 'Nirmal', 'Narayanpet', 'Pembarthi', 'Nagarjunasagar'],
    coordinates: { lat: 17.385, lng: 78.4867 },
    terrainFactor: 1.02,
    stateRtcName: 'TGSRTC',
  },
  {
    name: 'Tripura',
    type: 'State',
    region: 'Northeast',
    capital: 'Agartala',
    citiesAndDistricts: ['Agartala', 'Unakoti (Kailashahar)', 'Melaghar (Neermahal)', 'Jampui Hills', 'Udaipur (Tripura)'],
    coordinates: { lat: 23.8315, lng: 91.2868 },
    terrainFactor: 1.2,
    stateRtcName: 'TRTC',
  },
  {
    name: 'Uttar Pradesh',
    type: 'State',
    region: 'North',
    capital: 'Lucknow',
    citiesAndDistricts: ['Agra', 'Varanasi', 'Lucknow', 'Ayodhya', 'Mathura & Vrindavan', 'Prayagraj', 'Sarnath', 'Saharanpur', 'Jhansi', 'Dudhwa'],
    coordinates: { lat: 26.8467, lng: 80.9462 },
    terrainFactor: 0.95,
    stateRtcName: 'UPSRTC',
  },
  {
    name: 'Uttarakhand',
    type: 'State',
    region: 'North',
    capital: 'Dehradun',
    citiesAndDistricts: ['Rishikesh', 'Haridwar', 'Nainital & Corbett', 'Mussoorie', 'Auli', 'Munsiyari (Sarmoli)', 'Chopta', 'Valley of Flowers', 'Almora'],
    coordinates: { lat: 30.3165, lng: 78.0322 },
    terrainFactor: 1.3,
    stateRtcName: 'UTC',
  },
  {
    name: 'West Bengal',
    type: 'State',
    region: 'East',
    capital: 'Kolkata',
    citiesAndDistricts: ['Kolkata', 'Darjeeling', 'Kalimpong', 'Shantiniketan (Bolpur)', 'Bishnupur', 'Sundarbans', 'Murshidabad', 'Dooars'],
    coordinates: { lat: 22.5726, lng: 88.3639 },
    terrainFactor: 1.0,
    stateRtcName: 'WBTC / NBSTC',
  },

  // 8 Union Territories
  {
    name: 'Andaman and Nicobar Islands',
    type: 'Union Territory',
    region: 'Islands',
    capital: 'Sri Vijaya Puram (Port Blair)',
    citiesAndDistricts: ['Sri Vijaya Puram (Port Blair)', 'Swaraj Dweep (Havelock)', 'Shaheed Dweep (Neil)', 'Baratang & Diglipur', 'Wandoor'],
    coordinates: { lat: 11.6234, lng: 92.7265 },
    terrainFactor: 1.65,
    stateRtcName: 'STS / Inter-Island Ferry',
  },
  {
    name: 'Chandigarh',
    type: 'Union Territory',
    region: 'North',
    capital: 'Chandigarh',
    citiesAndDistricts: ['Sector 1 Capitol Complex', 'Sukhna Lake & Rock Garden', 'Sector 17', 'Kalagram'],
    coordinates: { lat: 30.7333, lng: 76.7794 },
    terrainFactor: 1.0,
    stateRtcName: 'CTU',
  },
  {
    name: 'Dadra and Nagar Haveli and Daman and Diu',
    type: 'Union Territory',
    region: 'West',
    capital: 'Daman',
    citiesAndDistricts: ['Diu', 'Daman', 'Silvassa', 'Khanvel & Dudhani'],
    coordinates: { lat: 20.3974, lng: 72.8328 },
    terrainFactor: 1.05,
    stateRtcName: 'UT Smart City / GSRTC Connector',
  },
  {
    name: 'Delhi',
    type: 'Union Territory',
    region: 'North',
    capital: 'New Delhi',
    citiesAndDistricts: ['New Delhi', 'Old Delhi (Chandni Chowk)', 'Mehrauli', 'Nizamuddin', 'Connaught Place', 'Hauz Khas'],
    coordinates: { lat: 28.6139, lng: 77.209 },
    terrainFactor: 1.05,
    stateRtcName: 'DTC / Delhi Metro',
  },
  {
    name: 'Jammu and Kashmir',
    type: 'Union Territory',
    region: 'North',
    capital: 'Srinagar / Jammu',
    citiesAndDistricts: ['Srinagar', 'Gulmarg', 'Pahalgam', 'Sonamarg', 'Gurez Valley', 'Jammu & Katra', 'Pampore'],
    coordinates: { lat: 34.0837, lng: 74.7973 },
    terrainFactor: 1.38,
    stateRtcName: 'JKRTC',
  },
  {
    name: 'Ladakh',
    type: 'Union Territory',
    region: 'North',
    capital: 'Leh',
    citiesAndDistricts: ['Leh', 'Pangong Tso', 'Nubra Valley', 'Zanskar & Kargil', 'Sham Valley', 'Turtuk'],
    coordinates: { lat: 34.1526, lng: 77.5771 },
    terrainFactor: 1.6,
    stateRtcName: 'Ladakh Shared Taxis / JKSRTC',
  },
  {
    name: 'Lakshadweep',
    type: 'Union Territory',
    region: 'Islands',
    capital: 'Kavaratti',
    citiesAndDistricts: ['Agatti Island', 'Bangaram Atoll', 'Kavaratti', 'Minicoy', 'Kalpeni'],
    coordinates: { lat: 10.5667, lng: 72.6417 },
    terrainFactor: 1.8,
    stateRtcName: 'SPORTS Passenger Vessels / Helicopter',
  },
  {
    name: 'Puducherry',
    type: 'Union Territory',
    region: 'South',
    capital: 'Puducherry',
    citiesAndDistricts: ['White Town (Puducherry)', 'Auroville', 'Chunnambar', 'Karaikal', 'Yanam & Mahe'],
    coordinates: { lat: 11.9416, lng: 79.8083 },
    terrainFactor: 1.0,
    stateRtcName: 'PRTC',
  },
];

export interface FareEstimateResult {
  estimatedDistanceKm: number;
  farePerPersonInr: number;
  totalTransportFareInr: number;
  rateExplanation: string;
  isInterstateEstimate: boolean;
  minimumRealisticTripCostInr: number;
  breakdown: {
    transportation: number;
    food: number;
    accommodation: number;
    localTravel: number;
    other: number;
  };
}

export function haversineKm(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number }
): number {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;
  const sinDLat = Math.sin(dLat / 2);
  const sinDLng = Math.sin(dLng / 2);
  const c =
    2 *
    Math.atan2(
      Math.sqrt(sinDLat * sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLng * sinDLng),
      Math.sqrt(1 - (sinDLat * sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLng * sinDLng))
    );
  // Road distance in India averages ~1.28x straight-line distance
  return Math.max(40, Math.round(R * c * 1.28));
}

export function estimateStateAwareTripBudget(params: {
  startCoords?: { lat: number; lng: number };
  endCoords?: { lat: number; lng: number };
  destinationStateName?: string;
  days: number;
  travellers: number;
  transportMode: TransportMode;
  userTotalBudget: number;
}): FareEstimateResult {
  const stateInfo =
    INDIAN_STATES_AND_UTS.find((s) => s.name === params.destinationStateName) ||
    INDIAN_STATES_AND_UTS[20]; // Rajasthan default

  const distanceKm =
    params.startCoords && params.endCoords
      ? haversineKm(params.startCoords, params.endCoords)
      : 320;

  const roundTripKm = distanceKm * 2;
  const terrain = stateInfo.terrainFactor;

  let perPersonTransit = 0;
  let rateExplanation = '';

  switch (params.transportMode) {
    case 'Public Bus':
      perPersonTransit = Math.round(roundTripKm * 1.15 * terrain);
      rateExplanation = `Estimated stage-carrier / city bus slab (~₹1.15/km × ${terrain.toFixed(2)}x ${stateInfo.name} terrain factor).`;
      break;
    case 'Government Bus':
      perPersonTransit = Math.round(roundTripKm * 1.45 * terrain);
      rateExplanation = `Estimated ${stateInfo.stateRtcName} Express/Deluxe fare (~₹1.45/km × ${terrain.toFixed(2)}x terrain factor). Verify live fare on ${stateInfo.stateRtcName} portal.`;
      break;
    case 'Train':
      perPersonTransit = Math.round(roundTripKm * 0.95 * (terrain > 1.35 ? 1.15 : 1.0));
      rateExplanation = `Estimated Indian Railways Sleeper/2S class range (~₹0.95/km). Check exact IRCTC availability & tatkal/3AC differences.`;
      break;
    case 'Local Transport':
      perPersonTransit = Math.round((params.days * 350 + Math.min(roundTripKm, 250) * 2.2) * terrain);
      rateExplanation = `Estimated local metro, auto-rickshaw & shared cab fares in ${stateInfo.name} (₹350+/day base).`;
      break;
    case 'Bike Rental': {
      const bikesNeeded = Math.ceil(params.travellers / 2);
      const totalBikeCost = params.days * Math.round(750 * terrain) * bikesNeeded + Math.round(roundTripKm * 2.5);
      perPersonTransit = Math.round(totalBikeCost / params.travellers);
      rateExplanation = `Estimated two-wheeler rental (~₹${Math.round(750 * terrain)}/day per bike + fuel) across ${bikesNeeded} bike(s). Valid DL & helmet required.`;
      break;
    }
    case 'Car Rental': {
      const carsNeeded = Math.ceil(params.travellers / 4);
      const totalCarCost = Math.max(params.days * 2600, roundTripKm * 13 * terrain) * carsNeeded;
      perPersonTransit = Math.round(totalCarCost / params.travellers);
      rateExplanation = `Estimated hatchback/sedan cab rental (~₹${Math.round(13 * terrain)}/km or ₹2,600/day min) across ${carsNeeded} vehicle(s).`;
      break;
    }
  }

  const totalTransport = perPersonTransit * params.travellers;
  const realisticStayPerNightPerRoom = Math.round(1100 * terrain);
  const roomsNeeded = Math.ceil(params.travellers / 2);
  const nights = Math.max(0, params.days - 1);
  const realisticAccommodation = nights * realisticStayPerNightPerRoom * roomsNeeded;
  const realisticFood = params.days * params.travellers * Math.round(420 * (terrain > 1.3 ? 1.15 : 1.0));
  const realisticLocalTravel = params.days * params.travellers * 200;
  const realisticOther = params.days * params.travellers * 150;

  const minimumRealisticTripCostInr =
    totalTransport + realisticAccommodation + realisticFood + realisticLocalTravel + realisticOther;

  const basis = params.userTotalBudget > 0 ? params.userTotalBudget : minimumRealisticTripCostInr;
  const ratio = basis / Math.max(minimumRealisticTripCostInr, 1);

  const breakdown = {
    transportation: Math.round(totalTransport * ratio),
    food: Math.round(realisticFood * ratio),
    accommodation: Math.round(realisticAccommodation * ratio),
    localTravel: Math.round(realisticLocalTravel * ratio),
    other: Math.round(realisticOther * ratio),
  };

  return {
    estimatedDistanceKm: distanceKm,
    farePerPersonInr: perPersonTransit,
    totalTransportFareInr: totalTransport,
    rateExplanation,
    isInterstateEstimate: distanceKm > 250,
    minimumRealisticTripCostInr,
    breakdown,
  };
}
