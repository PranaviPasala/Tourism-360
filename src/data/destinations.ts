import { Destination } from '../types/tourism';

const mapsLink = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

export const POPULAR_DESTINATIONS: Destination[] = [
  // ================= PRIORITY 20 CITIES + ALL 28 STATES & 8 UNION TERRITORIES =================
  // ANDHRA PRADESH
  {
    id: 'ap-visakhapatnam',
    name: 'RK Beach, Kailasagiri & INS Kursura Museum',
    state: 'Andhra Pradesh',
    city: 'Visakhapatnam',
    regionType: 'State',
    location: 'Beach Road & Kailasagiri, Visakhapatnam',
    category: 'Beach',
    description:
      'Coastal harbor city where sweeping Bay of Bengal shores meet Kailasagiri hilltop overlooks and India’s iconic decommissioned submarine museum.',
    bestMonths: 'October to March',
    recommendedDuration: '2–3 Days',
    touristInfo:
      'Evening ropeway rides up Kailasagiri offer bay panoramas; visit Submarine Museum before sunset.',
    nearbyAttractions: ['Rushikonda Beach', 'Simhachalam Temple', 'Kambalakonda Eco Park'],
    googleMapsUrl: mapsLink('RK Beach Kailasagiri Visakhapatnam Andhra Pradesh'),
    coordinates: { lat: 17.7141, lng: 83.3237 },
    imagePath: '/src/assets/images/dest_goa_coastline_1795249606869.jpg',
  },
  {
    id: 'ap-araku-valley',
    name: 'Araku Valley & Borra Caves',
    state: 'Andhra Pradesh',
    city: 'Araku Valley',
    regionType: 'State',
    location: 'Alluri Sitharama Raju District',
    category: 'Hill Station',
    description:
      'Misty Eastern Ghats coffee plantations, tribal craft museums, and million-year-old karst limestone Borra Caves along a scenic rail corridor.',
    bestMonths: 'October to March',
    recommendedDuration: '2–3 Days',
    touristInfo:
      'Vistadome train from Visakhapatnam is popular; carry light woollens on winter mornings.',
    nearbyAttractions: ['Padmapuram Gardens', 'Galikonda Viewpoint', 'Coffee Museum'],
    googleMapsUrl: mapsLink('Araku Valley Borra Caves Andhra Pradesh'),
    coordinates: { lat: 18.3273, lng: 82.8775 },
    imagePath: '/src/assets/images/dest_tea_hills_1795270500507.jpg',
  },
  {
    id: 'ap-tirupati-tirumala',
    name: 'Sri Venkateswara Temple, Tirumala',
    state: 'Andhra Pradesh',
    city: 'Tirupati',
    regionType: 'State',
    location: 'Tirumala Hills, Tirupati',
    category: 'Spiritual',
    description:
      'Revered Dravidian hilltop temple complex atop the seven sacred Seshachalam hills attracting pilgrims from around the globe.',
    bestMonths: 'September to March',
    recommendedDuration: '1–2 Days',
    touristInfo:
      'Reserve darshan slots online in advance via TTD official portal and adhere to traditional dress code.',
    nearbyAttractions: ['Silathoranam Rock Arch', 'Chandragiri Fort', 'Kapila Theertham'],
    googleMapsUrl: mapsLink('Tirumala Tirupati Andhra Pradesh'),
    coordinates: { lat: 13.6833, lng: 79.3472 },
    imagePath: '/src/assets/images/hi_temple_dravidian_1795272645440.jpg',
  },

  // ARUNACHAL PRADESH
  {
    id: 'ar-tawang-monastery',
    name: 'Tawang Monastery & Sela Pass',
    state: 'Arunachal Pradesh',
    city: 'Tawang',
    regionType: 'State',
    location: 'Tawang District',
    category: 'Spiritual',
    description:
      'India’s largest Buddhist monastery perched at 10,000 feet overlooking glacial valleys and snow-draped Himalayan passes.',
    bestMonths: 'March to June and September to November',
    recommendedDuration: '4–5 Days',
    touristInfo:
      'Inner Line Permit (ILP) is mandatory for domestic tourists; Protected Area Permit for foreign nationals.',
    nearbyAttractions: ['Madhuri Lake (Sangestar Tso)', 'Bum La Pass', 'Nuranang Falls'],
    googleMapsUrl: mapsLink('Tawang Monastery Arunachal Pradesh'),
    coordinates: { lat: 27.5861, lng: 91.8594 },
    imagePath: '/src/assets/images/dest_himalayan_monastery_1795270498156.jpg',
  },

  // ASSAM
  {
    id: 'as-kaziranga',
    name: 'Kaziranga National Park',
    state: 'Assam',
    city: 'Kaziranga',
    regionType: 'State',
    location: 'Golaghat & Nagaon',
    category: 'National Park',
    description:
      'UNESCO World Heritage wetland grassland home to the world’s largest population of the Indian one-horned rhinoceros.',
    bestMonths: 'November to April',
    recommendedDuration: '2–3 Days',
    touristInfo:
      'Park remains closed during monsoon (May to October). Book authorized jeep safaris in advance.',
    nearbyAttractions: ['Kohora Orchid & Biodiversity Park', 'Kakochang Waterfall', 'Brahmaputra River Cruise'],
    googleMapsUrl: mapsLink('Kaziranga National Park Assam'),
    coordinates: { lat: 26.5775, lng: 93.1711 },
    imagePath: '/src/assets/images/dest_kaziranga_wildlife_1795270499514.jpg',
  },
  {
    id: 'as-kamakhya-guwahati',
    name: 'Kamakhya Temple & Brahmaputra Riverfront',
    state: 'Assam',
    city: 'Guwahati',
    regionType: 'State',
    location: 'Nilachal Hill, Guwahati',
    category: 'Spiritual',
    description:
      'Ancient Nilachal hilltop Shakti Peetha overlooking the mighty Brahmaputra river and Umananda Peacock Island.',
    bestMonths: 'October to April',
    recommendedDuration: '2 Days',
    touristInfo:
      'Sunset ferry cruises depart from Fancy Bazaar / Kachari Ghat; dress modestly inside temple precincts.',
    nearbyAttractions: ['Umananda Island', 'Assam State Museum', 'Sualkuchi Silk Village'],
    googleMapsUrl: mapsLink('Kamakhya Temple Guwahati Assam'),
    coordinates: { lat: 26.1665, lng: 91.7056 },
    imagePath: '/src/assets/images/culture_ancient_temple_1795270499426.jpg',
  },

  // BIHAR
  {
    id: 'br-bodh-gaya',
    name: 'Mahabodhi Temple & Nalanda Ruins',
    state: 'Bihar',
    city: 'Bodh Gaya',
    regionType: 'State',
    location: 'Gaya & Nalanda Districts',
    category: 'Spiritual',
    description:
      'Twin UNESCO World Heritage landmarks honoring the sacred Bodhi tree of enlightenment and the ancient monastic university of Nalanda.',
    bestMonths: 'October to March',
    recommendedDuration: '2–3 Days',
    touristInfo:
      'Cameras and mobile phones are restricted inside the inner sanctum; dress modestly.',
    nearbyAttractions: ['Great Buddha Statue', 'Rajgir Vishwa Shanti Stupa', 'Sujata Stupa'],
    googleMapsUrl: mapsLink('Mahabodhi Temple Bodh Gaya Bihar'),
    coordinates: { lat: 24.6961, lng: 84.9914 },
    imagePath: '/src/assets/images/culture_ancient_temple_1795270499426.jpg',
  },

  // CHHATTISGARH
  {
    id: 'cg-chitrakote',
    name: 'Chitrakote Waterfalls',
    state: 'Chhattisgarh',
    city: 'Jagdalpur (Bastar)',
    regionType: 'State',
    location: 'Indravati River, Bastar',
    category: 'Waterfall',
    description:
      'India’s widest horseshoe-shaped waterfall spanning nearly 300 meters across the Indravati River through forested Bastar plateaus.',
    bestMonths: 'July to February',
    recommendedDuration: '2 Days',
    touristInfo:
      'Peak flow occurs post-monsoon (August–November); boat rides operate at the base in dry months.',
    nearbyAttractions: ['Tirathgarh Falls', 'Kotumsar Limestone Caves', 'Kanger Valley National Park'],
    googleMapsUrl: mapsLink('Chitrakote Waterfalls Bastar Chhattisgarh'),
    coordinates: { lat: 19.2072, lng: 81.7001 },
    imagePath: '/src/assets/images/dest_meghalaya_waterfalls_1795249605885.jpg',
  },

  // GOA
  {
    id: 'ga-palolem-beaches',
    name: 'Palolem Beach, Aguada Fort & Old Goa Heritage',
    state: 'Goa',
    city: 'Goa',
    regionType: 'State',
    location: 'South & North Goa (Panaji / Canacona)',
    category: 'Beach',
    description:
      'Palm-fringed crescent coves, 17th-century coastal Fort Aguada, and UNESCO-listed Baroque churches of Old Goa.',
    bestMonths: 'November to February',
    recommendedDuration: '3–4 Days',
    touristInfo:
      'Winter brings pleasant coastal evenings; monsoon (June–September) offers lush spice plantations and Dudhsagar waterfalls.',
    nearbyAttractions: ['Basilica of Bom Jesus', 'Fontainhas Latin Quarter', 'Dudhsagar Falls'],
    googleMapsUrl: mapsLink('Palolem Beach Fort Aguada Goa'),
    coordinates: { lat: 15.01, lng: 74.0232 },
    imagePath: '/src/assets/images/dest_goa_coastline_1795249606869.jpg',
  },

  // GUJARAT
  {
    id: 'gj-ahmedabad-heritage',
    name: 'Sabarmati Ashram, Adalaj Stepwell & Calico Museum',
    state: 'Gujarat',
    city: 'Ahmedabad',
    regionType: 'State',
    location: 'Ahmedabad Heritage City',
    category: 'Museum',
    description:
      'India’s first UNESCO World Heritage City uniting Sabarmati riverfront heritage, intricate 15th-century stepwells, and world-renowned textile museums.',
    bestMonths: 'October to March',
    recommendedDuration: '2–3 Days',
    touristInfo:
      'Book Calico Museum of Textiles slots well in advance; evening heritage food walks operate near Manek Chowk.',
    nearbyAttractions: ['Sidi Saiyyed Mosque', 'Kankaria Lake', 'Modhera Sun Temple'],
    googleMapsUrl: mapsLink('Sabarmati Ashram Adalaj Stepwell Ahmedabad Gujarat'),
    coordinates: { lat: 23.0607, lng: 72.5808 },
    imagePath: '/src/assets/images/hidden_stepwell_fort_1795279355813.jpg',
  },
  {
    id: 'gj-rann-of-kutch',
    name: 'Great Rann of Kutch',
    state: 'Gujarat',
    city: 'Bhuj & Kutch',
    regionType: 'State',
    location: 'Dhordo, Kutch District',
    category: 'Lake & Scenic',
    description:
      'Vast shimmering white salt desert stretching to the horizon, celebrated for Rann Utsav crafts, folk music, and moonlit horizons.',
    bestMonths: 'November to February',
    recommendedDuration: '2–3 Days',
    touristInfo:
      'Online entry permit required at Bhirandiyara check-post; carry government photo ID proof.',
    nearbyAttractions: ['Kala Dungar (Black Hill)', 'Bhujodi Weaving Village', 'Dholavira UNESCO Site'],
    googleMapsUrl: mapsLink('Great Rann of Kutch Dhordo Gujarat'),
    coordinates: { lat: 23.7337, lng: 69.8597 },
    imagePath: '/src/assets/images/dest_rann_kutch_1795270498509.jpg',
  },
  {
    id: 'gj-statue-of-unity',
    name: 'Statue of Unity & Sardar Sarovar',
    state: 'Gujarat',
    city: 'Ekta Nagar (Kevadia)',
    regionType: 'State',
    location: 'Narmada District',
    category: 'Heritage',
    description:
      'World’s tallest statue standing 182 meters beside the Narmada River, surrounded by Valley of Flowers and Jungle Safari reserves.',
    bestMonths: 'October to March',
    recommendedDuration: '1–2 Days',
    touristInfo:
      'Closed on Mondays for maintenance; book viewing gallery slots online in advance.',
    nearbyAttractions: ['Ekta Glow Garden', 'Cactus Garden', 'Zarwani Waterfall'],
    googleMapsUrl: mapsLink('Statue of Unity Ekta Nagar Gujarat'),
    coordinates: { lat: 21.838, lng: 73.7191 },
    imagePath: '/src/assets/images/dest_jaipur_heritage_1795249606084.jpg',
  },

  // HARYANA
  {
    id: 'hr-kurukshetra',
    name: 'Brahma Sarovar & Kurukshetra Heritage Complex',
    state: 'Haryana',
    city: 'Kurukshetra',
    regionType: 'State',
    location: 'Kurukshetra',
    category: 'Spiritual',
    description:
      'Ancient sacred water tank and interactive museum complex commemorating Vedic philosophy and the Bhagavad Gita heritage.',
    bestMonths: 'October to March',
    recommendedDuration: '1–2 Days',
    touristInfo:
      'International Gita Mahotsav takes place annually around November–December.',
    nearbyAttractions: ['Jyotisar Sacred Banyan', 'Krishna Museum', 'Sheikh Chilli Tomb'],
    googleMapsUrl: mapsLink('Brahma Sarovar Kurukshetra Haryana'),
    coordinates: { lat: 29.9695, lng: 76.8783 },
    imagePath: '/src/assets/images/culture_ancient_temple_1795270499426.jpg',
  },

  // HIMACHAL PRADESH
  {
    id: 'hp-manali',
    name: 'Manali, Solang Valley & Hadimba Temple',
    state: 'Himachal Pradesh',
    city: 'Manali',
    regionType: 'State',
    location: 'Kullu District',
    category: 'Adventure',
    description:
      'High-altitude Beas River town offering cedar forests, ancient pagoda temples, snow sports at Solang Valley, and Atal Tunnel access.',
    bestMonths: 'March to June and October to February',
    recommendedDuration: '3–4 Days',
    touristInfo:
      'Expect snowfall December–February; carry winter wear and check Solang/Atal Tunnel weather advisories.',
    nearbyAttractions: ['Vashisht Hot Springs', 'Old Manali Cafe Lanes', 'Sissu Lake'],
    googleMapsUrl: mapsLink('Manali Solang Valley Himachal Pradesh'),
    coordinates: { lat: 32.2432, lng: 77.1892 },
    imagePath: '/src/assets/images/dest_kashmir_himalayas_1795249606363.jpg',
  },
  {
    id: 'hp-shimla',
    name: 'Shimla Ridge & Kalka–Shimla Heritage Railway',
    state: 'Himachal Pradesh',
    city: 'Shimla',
    regionType: 'State',
    location: 'Shimla District',
    category: 'Hill Station',
    description:
      'Historic hill capital famed for the UNESCO Kalka–Shimla narrow-gauge toy train, pedestrian Mall Road, and deodar ridge walks.',
    bestMonths: 'March to June and October to February',
    recommendedDuration: '2–3 Days',
    touristInfo:
      'Private vehicles are restricted on Mall Road; enjoy pedestrian ridge walks and Jakhoo Ropeway.',
    nearbyAttractions: ['Jakhoo Temple', 'Kufri', 'Viceregal Lodge (IIAS)'],
    googleMapsUrl: mapsLink('The Ridge Shimla Himachal Pradesh'),
    coordinates: { lat: 31.1048, lng: 77.1734 },
    imagePath: '/src/assets/images/dest_tea_hills_1795270500507.jpg',
  },

  // JHARKHAND
  {
    id: 'jh-betla-netarhat',
    name: 'Netarhat Sunrise Point & Betla National Park',
    state: 'Jharkhand',
    city: 'Netarhat',
    regionType: 'State',
    location: 'Latehar District',
    category: 'National Park',
    description:
      'Known as the Queen of Chotanagpur, famous for pine-lined sunrise views at Magnolia Point and sal-forest wildlife safaris in Betla.',
    bestMonths: 'October to March',
    recommendedDuration: '2–3 Days',
    touristInfo:
      'Accessible from Ranchi by state highways; evenings remain cool even in spring.',
    nearbyAttractions: ['Lodh Falls', 'Upper Ghaghri Falls', 'Palamu Fort'],
    googleMapsUrl: mapsLink('Netarhat Betla National Park Jharkhand'),
    coordinates: { lat: 23.4702, lng: 84.2709 },
    imagePath: '/src/assets/images/dest_kaziranga_wildlife_1795270499514.jpg',
  },

  // KARNATAKA
  {
    id: 'ka-bengaluru',
    name: 'Bengaluru Palace, Lalbagh & Visvesvaraya Museum',
    state: 'Karnataka',
    city: 'Bengaluru',
    regionType: 'State',
    location: 'Bengaluru Urban',
    category: 'City',
    description:
      'India’s Garden City uniting 240-acre Lalbagh glasshouse flora, Tudor-style Bangalore Palace, Cubbon Park, and interactive science heritage.',
    bestMonths: 'September to March',
    recommendedDuration: '2 Days',
    touristInfo:
      'Namma Metro seamlessly links Lalbagh, Cubbon Park, and MG Road; morning garden hours start at 6 AM.',
    nearbyAttractions: ['Tipu Sultan Summer Palace', 'Bannerghatta Biological Park', 'Nandi Hills'],
    googleMapsUrl: mapsLink('Lalbagh Botanical Garden Bangalore Palace Bengaluru'),
    coordinates: { lat: 12.9507, lng: 77.5848 },
    imagePath: '/src/assets/images/hotel_heritage_courtyard_1795249606993.jpg',
  },
  {
    id: 'ka-mysuru',
    name: 'Mysuru Palace & Chamundi Hills',
    state: 'Karnataka',
    city: 'Mysuru',
    regionType: 'State',
    location: 'Mysuru City',
    category: 'Fort & Palace',
    description:
      'Indo-Saracenic Wodeyar royal residence illuminated by nearly 100,000 bulbs on Sundays and Dussehra, surrounded by heritage silk markets.',
    bestMonths: 'September to March',
    recommendedDuration: '2 Days',
    touristInfo:
      'Palace illumination runs Sunday evenings 7:00–7:45 PM and daily during Dasara.',
    nearbyAttractions: ['Brindavan Gardens', 'St. Philomena Cathedral', 'Srirangapatna Island'],
    googleMapsUrl: mapsLink('Mysuru Palace Chamundi Hills Karnataka'),
    coordinates: { lat: 12.3052, lng: 76.6552 },
    imagePath: '/src/assets/images/dest_jaipur_heritage_1795249606084.jpg',
  },
  {
    id: 'ka-hampi',
    name: 'Hampi UNESCO Ruins',
    state: 'Karnataka',
    city: 'Hampi (Vijayanagara)',
    regionType: 'State',
    location: 'Vijayanagara District',
    category: 'Heritage',
    description:
      'Boulderscape capital of the 14th-century Vijayanagara Empire featuring Vittala Temple’s iconic stone chariot and Tungabhadra river ghats.',
    bestMonths: 'October to February',
    recommendedDuration: '2–3 Days',
    touristInfo:
      'Rent bicycles or electric autos to explore the spread-out monuments; carry sun protection.',
    nearbyAttractions: ['Virupaksha Temple', 'Matanga Hill Sunrise', 'Lotus Mahal'],
    googleMapsUrl: mapsLink('Hampi UNESCO World Heritage Karnataka'),
    coordinates: { lat: 15.335, lng: 76.46 },
    imagePath: '/src/assets/images/dest_hampi_ruins_1795270498703.jpg',
  },

  // KERALA
  {
    id: 'kl-kochi',
    name: 'Fort Kochi, Chinese Fishing Nets & Mattancherry',
    state: 'Kerala',
    city: 'Kochi',
    regionType: 'State',
    location: 'Ernakulam / Fort Kochi',
    category: 'Heritage',
    description:
      'Historic Malabar spice port famed for towering cantilevered Chinese fishing nets, Mattancherry Palace murals, and vibrant art cafes.',
    bestMonths: 'October to March',
    recommendedDuration: '2 Days',
    touristInfo:
      'Kochi Water Metro offers scenic air-conditioned ferries connecting Fort Kochi and Marine Drive.',
    nearbyAttractions: ['Jew Town & Paradesi Synagogue', 'Cherai Beach', 'Kerala Folklore Museum'],
    googleMapsUrl: mapsLink('Fort Kochi Chinese Fishing Nets Kerala'),
    coordinates: { lat: 9.9658, lng: 76.2421 },
    imagePath: '/src/assets/images/street_coastal_latin_market_1795274715687.jpg',
  },
  {
    id: 'kl-munnar',
    name: 'Munnar Tea Estates & Eravikulam',
    state: 'Kerala',
    city: 'Munnar',
    regionType: 'State',
    location: 'Idukki District',
    category: 'Hill Station',
    description:
      'Rolling emerald Western Ghats tea gardens, Eravikulam National Park home to the Nilgiri Tahr, and misty Shola valleys.',
    bestMonths: 'September to March',
    recommendedDuration: '2–3 Days',
    touristInfo:
      'Eravikulam park closes briefly during Nilgiri Tahr calving season (usually Feb–March).',
    nearbyAttractions: ['Mattupetty Dam', 'Top Station', 'Tata Tea Museum'],
    googleMapsUrl: mapsLink('Munnar Tea Gardens Kerala'),
    coordinates: { lat: 10.0889, lng: 77.0595 },
    imagePath: '/src/assets/images/dest_tea_hills_1795270500507.jpg',
  },
  {
    id: 'kl-alleppey',
    name: 'Alappuzha Backwaters & Lagoons',
    state: 'Kerala',
    city: 'Alappuzha (Alleppey)',
    regionType: 'State',
    location: 'Alappuzha District',
    category: 'Lake & Scenic',
    description:
      'Network of tranquil palm-lined lagoons, canals, and coir villages best experienced via eco-certified kettuvallam houseboats.',
    bestMonths: 'November to February',
    recommendedDuration: '2 Days',
    touristInfo:
      'Choose Responsible Tourism certified houseboats and sunrise canoe tours through narrow village canals.',
    nearbyAttractions: ['Marari Beach', 'Vembanad Lake', 'Pathiramanal Island'],
    googleMapsUrl: mapsLink('Alleppey Backwaters Alappuzha Kerala'),
    coordinates: { lat: 9.4981, lng: 76.3388 },
    imagePath: '/src/assets/images/dest_kerala_backwaters_1795249606957.jpg',
  },

  // MADHYA PRADESH
  {
    id: 'mp-khajuraho',
    name: 'Khajuraho Group of Monuments',
    state: 'Madhya Pradesh',
    city: 'Khajuraho',
    regionType: 'State',
    location: 'Chhatarpur District',
    category: 'Heritage',
    description:
      '10th-century Chandela sandstone temples celebrated worldwide as a UNESCO site for extraordinary architectural artistry.',
    bestMonths: 'October to March',
    recommendedDuration: '2 Days',
    touristInfo:
      'Evening Sound & Light Show depicts Chandela history; Khajuraho Dance Festival takes place in February.',
    nearbyAttractions: ['Raneh Falls Canyon', 'Panna National Park', 'Orchha Cenotaphs'],
    googleMapsUrl: mapsLink('Khajuraho Group of Monuments Madhya Pradesh'),
    coordinates: { lat: 24.8318, lng: 79.9199 },
    imagePath: '/src/assets/images/culture_ancient_temple_1795270499426.jpg',
  },

  // MAHARASHTRA
  {
    id: 'mh-mumbai',
    name: 'Gateway of India, Marine Drive & Elephanta Caves',
    state: 'Maharashtra',
    city: 'Mumbai',
    regionType: 'State',
    location: 'South Mumbai Waterfront',
    category: 'City',
    description:
      'Bustling coastal metropolis linking the basalt Gateway arch, Art Deco Marine Drive promenade, UNESCO Elephanta Caves, and CSMVS Museum.',
    bestMonths: 'November to February',
    recommendedDuration: '2–3 Days',
    touristInfo:
      'Ferries to Elephanta Island depart hourly from Apollo Bunder (closed Mondays).',
    nearbyAttractions: ['Chhatrapati Shivaji Maharaj Vastu Sangrahalaya', 'Kala Ghoda', 'Bandra Worli Sea Link'],
    googleMapsUrl: mapsLink('Gateway of India Marine Drive Mumbai Maharashtra'),
    coordinates: { lat: 18.922, lng: 72.8347 },
    imagePath: '/src/assets/images/dest_goa_coastline_1795249606869.jpg',
  },
  {
    id: 'mh-pune',
    name: 'Shaniwar Wada, Sinhagad Fort & Kelkar Museum',
    state: 'Maharashtra',
    city: 'Pune',
    regionType: 'State',
    location: 'Pune City & Sahyadris',
    category: 'Fort & Palace',
    description:
      'Maratha Empire heartland blending 18th-century Shaniwar Wada ramparts, hilltop Sinhagad fort hikes, and Aga Khan Palace.',
    bestMonths: 'July to February',
    recommendedDuration: '2 Days',
    touristInfo:
      'Early morning climbs up Sinhagad Fort offer crisp Sahyadri valley views and rustic pithla-bhakri stalls.',
    nearbyAttractions: ['Aga Khan Palace', 'Raja Dinkar Kelkar Museum', 'Lonavala Hills'],
    googleMapsUrl: mapsLink('Shaniwar Wada Sinhagad Fort Pune Maharashtra'),
    coordinates: { lat: 18.5196, lng: 73.8554 },
    imagePath: '/src/assets/images/dest_hampi_ruins_1795270498703.jpg',
  },
  {
    id: 'mh-ajanta-ellora',
    name: 'Ajanta & Ellora Rock-Cut Caves',
    state: 'Maharashtra',
    city: 'Chhatrapati Sambhajinagar',
    regionType: 'State',
    location: 'Chhatrapati Sambhajinagar District',
    category: 'Heritage',
    description:
      'Monumental rock-cut Buddhist, Hindu, and Jain cave temples including the monolithic Kailasa Temple carved top-down from a basalt cliff.',
    bestMonths: 'October to March',
    recommendedDuration: '2–3 Days',
    touristInfo:
      'Ajanta Caves are closed on Mondays; Ellora Caves are closed on Tuesdays.',
    nearbyAttractions: ['Daulatabad Fort', 'Bibi Ka Maqbara', 'Grishneshwar Jyotirlinga'],
    googleMapsUrl: mapsLink('Ellora Caves Ajanta Caves Maharashtra'),
    coordinates: { lat: 20.0268, lng: 75.1771 },
    imagePath: '/src/assets/images/culture_ancient_temple_1795270499426.jpg',
  },

  // MANIPUR
  {
    id: 'mn-loktak-lake',
    name: 'Loktak Lake & Keibul Lamjao',
    state: 'Manipur',
    city: 'Loktak (Bishnupur)',
    regionType: 'State',
    location: 'Bishnupur District',
    category: 'Lake & Scenic',
    description:
      'Northeast India’s largest freshwater lake famous for circular floating biomass islands (phumdis) and the rare Sangai brow-antlered deer.',
    bestMonths: 'October to March',
    recommendedDuration: '2 Days',
    touristInfo:
      'Early morning boat rides offer clearest views of floating phumdis and migratory birds.',
    nearbyAttractions: ['INA War Memorial Moirang', 'Kangla Fort Imphal', 'Sendra Island'],
    googleMapsUrl: mapsLink('Loktak Lake Keibul Lamjao Manipur'),
    coordinates: { lat: 24.5579, lng: 93.8147 },
    imagePath: '/src/assets/images/dest_kerala_backwaters_1795249606957.jpg',
  },

  // MEGHALAYA
  {
    id: 'ml-sohra-nohkalikai',
    name: 'Sohra (Cherrapunji) & Nohkalikai Falls',
    state: 'Meghalaya',
    city: 'Sohra (Cherrapunji)',
    regionType: 'State',
    location: 'East Khasi Hills',
    category: 'Waterfall',
    description:
      'Dramatic canyon plateau featuring India’s tallest plunge waterfall, limestone Mawsmai caves, and living root bridges built by Khasi villages.',
    bestMonths: 'October to May',
    recommendedDuration: '2–3 Days',
    touristInfo:
      'Monsoon offers roaring waterfalls with dense mist; October–April ensures clear valley viewpoints.',
    nearbyAttractions: ['Seven Sisters Falls', 'Mawsmai Cave', 'Umiam Lake Shillong'],
    googleMapsUrl: mapsLink('Nohkalikai Falls Cherrapunji Meghalaya'),
    coordinates: { lat: 25.2756, lng: 91.6869 },
    imagePath: '/src/assets/images/dest_meghalaya_waterfalls_1795249605885.jpg',
  },

  // MIZORAM
  {
    id: 'mz-reiek-aizawl',
    name: 'Reiek Tlang & Aizawl Heritage Ridge',
    state: 'Mizoram',
    city: 'Aizawl',
    regionType: 'State',
    location: 'Mamit & Aizawl',
    category: 'Hill Station',
    description:
      'Lush ridge-top trekking peak near Aizawl offering panoramic misty hill views alongside reconstructed traditional Mizo village huts.',
    bestMonths: 'October to March',
    recommendedDuration: '2 Days',
    touristInfo:
      'Inner Line Permit (ILP) required for non-resident Indian citizens; Sunday markets remain closed.',
    nearbyAttractions: ['Mizoram State Museum', 'Durtlang Hills', 'Tam Dil Lake'],
    googleMapsUrl: mapsLink('Reiek Peak Aizawl Mizoram'),
    coordinates: { lat: 23.6914, lng: 92.6033 },
    imagePath: '/src/assets/images/dest_tea_hills_1795270500507.jpg',
  },

  // NAGALAND
  {
    id: 'nl-dzukou-kohima',
    name: 'Dzükou Valley & Kohima Heritage',
    state: 'Nagaland',
    city: 'Kohima',
    regionType: 'State',
    location: 'Kohima District',
    category: 'Adventure',
    description:
      'Emerald bamboo-carpeted valley perched along the Nagaland–Manipur border, famed for seasonal Dzükou lilies and Naga heritage trails.',
    bestMonths: 'June to September and November to February',
    recommendedDuration: '3 Days',
    touristInfo:
      'ILP required; hire local Viswema or Zakhama village guides for the valley ridge trek.',
    nearbyAttractions: ['Kisama Heritage Village', 'Kohima War Cemetery', 'Khonoma Village'],
    googleMapsUrl: mapsLink('Dzukou Valley Kohima Nagaland'),
    coordinates: { lat: 25.5567, lng: 94.0725 },
    imagePath: '/src/assets/images/dest_meghalaya_waterfalls_1795249605885.jpg',
  },

  // ODISHA
  {
    id: 'od-konark-puri',
    name: 'Konark Sun Temple & Jagannath Puri',
    state: 'Odisha',
    city: 'Puri & Konark',
    regionType: 'State',
    location: 'Puri District',
    category: 'Heritage',
    description:
      '13th-century UNESCO Kalinga architectural marvel sculpted as a colossal solar chariot on the Bay of Bengal shoreline near Puri.',
    bestMonths: 'October to March',
    recommendedDuration: '2–3 Days',
    touristInfo:
      'Marine Drive connecting Puri and Konark passes Chandrabhaga Blue Flag beach and coastal pine groves.',
    nearbyAttractions: ['Chandrabhaga Beach', 'Chilika Lake Bird Sanctuary', 'Udayagiri & Khandagiri Caves'],
    googleMapsUrl: mapsLink('Konark Sun Temple Odisha'),
    coordinates: { lat: 19.8876, lng: 86.0945 },
    imagePath: '/src/assets/images/culture_ancient_temple_1795270499426.jpg',
  },

  // PUNJAB
  {
    id: 'pb-golden-temple',
    name: 'Sri Harmandir Sahib (Golden Temple), Amritsar',
    state: 'Punjab',
    city: 'Amritsar',
    regionType: 'State',
    location: 'Amritsar Heritage Quarter',
    category: 'Spiritual',
    description:
      'Iconic Sikh sanctum shimmering over the Amrit Sarovar pool, renowned worldwide for serenity, architecture, and the community Langar.',
    bestMonths: 'October to March',
    recommendedDuration: '2 Days',
    touristInfo:
      'Head covering and footwear removal are mandatory; open 24 hours with free community meals.',
    nearbyAttractions: ['Partition Museum', 'Jallianwala Bagh', 'Attari–Wagah Border'],
    googleMapsUrl: mapsLink('Golden Temple Amritsar Punjab'),
    coordinates: { lat: 31.62, lng: 74.8765 },
    imagePath: '/src/assets/images/hero_india_panorama_1795249606332.jpg',
  },

  // RAJASTHAN
  {
    id: 'rj-jaipur',
    name: 'Jaipur — Amber Fort, Hawa Mahal & City Palace',
    state: 'Rajasthan',
    city: 'Jaipur',
    regionType: 'State',
    location: 'Pink City, Jaipur',
    category: 'Fort & Palace',
    description:
      'UNESCO-listed planned walled capital showcasing hilltop Amber Fort, honeycomb Hawa Mahal, Jantar Mantar observatory, and craft bazaars.',
    bestMonths: 'October to March',
    recommendedDuration: '2–3 Days',
    touristInfo:
      'Composite monument tickets cover Amber, Nahargarh, Hawa Mahal, and Albert Hall Museum.',
    nearbyAttractions: ['Nahargarh Fort Sunset', 'Jal Mahal', 'Albert Hall Museum'],
    googleMapsUrl: mapsLink('Amber Fort Hawa Mahal Jaipur Rajasthan'),
    coordinates: { lat: 26.9855, lng: 75.8513 },
    imagePath: '/src/assets/images/dest_jaipur_heritage_1795249606084.jpg',
  },
  {
    id: 'rj-udaipur',
    name: 'Udaipur — City Palace & Lake Pichola',
    state: 'Rajasthan',
    city: 'Udaipur',
    regionType: 'State',
    location: 'Old City, Udaipur',
    category: 'Lake & Scenic',
    description:
      'Aravalli-ringed City of Lakes famed for grand Mewar City Palace courtyards, Lake Pichola sunset cruises, and Sajjangarh vistas.',
    bestMonths: 'September to March',
    recommendedDuration: '2–3 Days',
    touristInfo:
      'Old city lanes are narrow; heritage walks and shared auto-rickshaws work best around Lake Pichola.',
    nearbyAttractions: ['Fateh Sagar Lake', 'Jagdish Temple', 'Sajjangarh Monsoon Palace'],
    googleMapsUrl: mapsLink('City Palace Lake Pichola Udaipur Rajasthan'),
    coordinates: { lat: 24.5764, lng: 73.6835 },
    imagePath: '/src/assets/images/hero_india_panorama_1795249606332.jpg',
  },

  // SIKKIM
  {
    id: 'sk-tsomgo-gangtok',
    name: 'Gangtok, Rumtek Monastery & Tsomgo Glacial Lake',
    state: 'Sikkim',
    city: 'Gangtok',
    regionType: 'State',
    location: 'East Sikkim',
    category: 'Hill Station',
    description:
      'Clean pedestrian-friendly Himalayan ridge capital leading to sacred Rumtek Monastery, alpine Tsomgo Lake, and Kanchenjunga viewpoints.',
    bestMonths: 'March to May and October to December',
    recommendedDuration: '3–4 Days',
    touristInfo:
      'Protected Area Permit required for Tsomgo Lake/Nathula Pass; Sikkim enforces strict single-use plastic bans.',
    nearbyAttractions: ['MG Marg Promenade', 'Tashi View Point', 'Banjhakri Falls'],
    googleMapsUrl: mapsLink('Gangtok Tsomgo Lake Sikkim'),
    coordinates: { lat: 27.3746, lng: 88.7634 },
    imagePath: '/src/assets/images/dest_himalayan_monastery_1795270498156.jpg',
  },

  // TAMIL NADU
  {
    id: 'tn-chennai',
    name: 'Chennai — Marina Beach, Kapaleeshwarar & Fort Museum',
    state: 'Tamil Nadu',
    city: 'Chennai',
    regionType: 'State',
    location: 'Mylapore & Marina Promenade, Chennai',
    category: 'City',
    description:
      'Cultural capital of South India where the expansive urban Marina coastline meets vibrant Mylapore gopurams and Fort St. George Museum.',
    bestMonths: 'November to February',
    recommendedDuration: '2 Days',
    touristInfo:
      'Visit Kapaleeshwarar Temple at dawn and attend the December Music & Dance Season sabhas.',
    nearbyAttractions: ['Santhome Basilica', 'Government Museum Egmore', 'DakshinaChitra Heritage Museum'],
    googleMapsUrl: mapsLink('Kapaleeshwarar Temple Marina Beach Chennai Tamil Nadu'),
    coordinates: { lat: 13.0338, lng: 80.2699 },
    imagePath: '/src/assets/images/culture_temples_handloom_1795249606587.jpg',
  },
  {
    id: 'tn-ooty',
    name: 'Ooty (Udhagamandalam) & Nilgiri Toy Train',
    state: 'Tamil Nadu',
    city: 'Ooty (Nilgiris)',
    regionType: 'State',
    location: 'Nilgiris District',
    category: 'Hill Station',
    description:
      'UNESCO Nilgiri Mountain Railway hill retreat surrounded by botanical gardens, Doddabetta Peak, emerald lakes, and tea estates.',
    bestMonths: 'March to June and September to November',
    recommendedDuration: '2–3 Days',
    touristInfo:
      'Book heritage Nilgiri Mountain Railway toy train seats weeks ahead via IRCTC.',
    nearbyAttractions: ['Ooty Botanical Gardens', 'Pykara Falls & Lake', 'Coonoor Sim’s Park'],
    googleMapsUrl: mapsLink('Ooty Nilgiri Hills Tamil Nadu'),
    coordinates: { lat: 11.4102, lng: 76.695 },
    imagePath: '/src/assets/images/dest_tea_hills_1795270500507.jpg',
  },
  {
    id: 'tn-mahabalipuram',
    name: 'Mamallapuram Shore Temple & Pancha Rathas',
    state: 'Tamil Nadu',
    city: 'Mamallapuram',
    regionType: 'State',
    location: 'Chengalpattu District',
    category: 'Heritage',
    description:
      '7th–8th century Pallava granite bas-reliefs, monolithic Pancha Rathas, and the coastal Shore Temple overlooking the Bay of Bengal.',
    bestMonths: 'November to February',
    recommendedDuration: '1–2 Days',
    touristInfo:
      'Easily reached along scenic East Coast Road from Chennai; visit early morning for soft coastal light.',
    nearbyAttractions: ['Arjuna’s Penance', 'Krishna’s Butterball', 'Covelong Beach'],
    googleMapsUrl: mapsLink('Shore Temple Mahabalipuram Tamil Nadu'),
    coordinates: { lat: 12.6168, lng: 80.1992 },
    imagePath: '/src/assets/images/hi_temple_dravidian_1795272645440.jpg',
  },

  // TELANGANA
  {
    id: 'ts-hyderabad-charminar',
    name: 'Charminar, Golconda Fort & Salar Jung Museum',
    state: 'Telangana',
    city: 'Hyderabad',
    regionType: 'State',
    location: 'Old City & Golconda, Hyderabad',
    category: 'Fort & Palace',
    description:
      'Hyderabad’s 400-year-old heritage spine uniting the iconic Charminar arches and Laad Bazaar with acoustic Golconda Fort and Salar Jung Museum.',
    bestMonths: 'October to March',
    recommendedDuration: '2–3 Days',
    touristInfo:
      'Climb Golconda before 10 AM to beat midday sun; Salar Jung Museum is closed on Fridays.',
    nearbyAttractions: ['Chowmahalla Palace', 'Hussain Sagar Lake', 'Qutb Shahi Heritage Park'],
    googleMapsUrl: mapsLink('Charminar Golconda Fort Hyderabad Telangana'),
    coordinates: { lat: 17.3616, lng: 78.4747 },
    imagePath: '/src/assets/images/dest_hyderabad_charminar_1795279356994.jpg',
  },

  // TRIPURA
  {
    id: 'tr-neermahal-tripura',
    name: 'Neermahal Water Palace & Ujjayanta Palace',
    state: 'Tripura',
    city: 'Agartala & Melaghar',
    regionType: 'State',
    location: 'Rudrasagar Lake & Agartala',
    category: 'Fort & Palace',
    description:
      'Rudrasagar Lake’s tranquil white-and-terracotta island summer palace complemented by Agartala’s domed Ujjayanta State Museum.',
    bestMonths: 'October to March',
    recommendedDuration: '2 Days',
    touristInfo:
      'Traditional boat ferries to Neermahal run regularly from Rajghat jetty.',
    nearbyAttractions: ['Sepahijala Wildlife Sanctuary', 'Tripura Sundari Temple', 'Heritage Park Agartala'],
    googleMapsUrl: mapsLink('Neermahal Water Palace Tripura'),
    coordinates: { lat: 23.4956, lng: 91.3075 },
    imagePath: '/src/assets/images/hero_india_panorama_1795249606332.jpg',
  },

  // UTTAR PRADESH
  {
    id: 'up-taj-mahal',
    name: 'Taj Mahal & Agra Fort',
    state: 'Uttar Pradesh',
    city: 'Agra',
    regionType: 'State',
    location: 'Tajganj, Agra',
    category: 'Heritage',
    description:
      'Ivory-white marble UNESCO mausoleum on the Yamuna riverbank paired with the massive red-sandstone Mughal imperial fortress nearby.',
    bestMonths: 'October to March',
    recommendedDuration: '1–2 Days',
    touristInfo:
      'Taj Mahal is closed on Fridays; book sunrise timed-entry mausoleum tickets online via ASI.',
    nearbyAttractions: ['Mehtab Bagh Sunset Point', 'Itmad-ud-Daulah', 'Fatehpur Sikri'],
    googleMapsUrl: mapsLink('Taj Mahal Agra Uttar Pradesh'),
    coordinates: { lat: 27.1751, lng: 78.0421 },
    imagePath: '/src/assets/images/dest_taj_agra_1795270493826.jpg',
  },
  {
    id: 'up-varanasi',
    name: 'Varanasi Ghats, Kashi Vishwanath & Sarnath',
    state: 'Uttar Pradesh',
    city: 'Varanasi',
    regionType: 'State',
    location: 'Varanasi Riverfront',
    category: 'Spiritual',
    description:
      'One of the world’s oldest living cities along the sacred Ganga ghats, paired with tranquil Buddhist stupas and museum at Sarnath.',
    bestMonths: 'October to March',
    recommendedDuration: '2–3 Days',
    touristInfo:
      'Sunrise wooden rowboat rides and evening Ganga Aarti at Dashashwamedh Ghat are signature experiences.',
    nearbyAttractions: ['Dashashwamedh Ghat', 'Sarnath Archaeological Museum', 'Ramnagar Fort'],
    googleMapsUrl: mapsLink('Dashashwamedh Ghat Varanasi Uttar Pradesh'),
    coordinates: { lat: 25.3176, lng: 83.0104 },
    imagePath: '/src/assets/images/dest_varanasi_ghats_1795270493917.jpg',
  },

  // UTTARAKHAND
  {
    id: 'uk-rishikesh-corbett',
    name: 'Rishikesh Ganga Adventure & Jim Corbett Park',
    state: 'Uttarakhand',
    city: 'Rishikesh',
    regionType: 'State',
    location: 'Tehri / Dehradun / Nainital',
    category: 'Adventure',
    description:
      'Himalayan Ganga foothills famed for white-water river rafting, yoga heritage, and India’s oldest tiger reserve in the Terai grasslands.',
    bestMonths: 'October to June',
    recommendedDuration: '3–4 Days',
    touristInfo:
      'Rafting runs September–June; Corbett Dhikala zone stays open mid-November to mid-June.',
    nearbyAttractions: ['Ram Jhula & Triveni Ghat', 'Corbett Tiger Reserve', 'Mussoorie Mall Road'],
    googleMapsUrl: mapsLink('Rishikesh Uttarakhand'),
    coordinates: { lat: 30.0869, lng: 78.2676 },
    imagePath: '/src/assets/images/dest_kaziranga_wildlife_1795270499514.jpg',
  },

  // WEST BENGAL
  {
    id: 'wb-kolkata',
    name: 'Victoria Memorial, Howrah Bridge & Indian Museum',
    state: 'West Bengal',
    city: 'Kolkata',
    regionType: 'State',
    location: 'Maidan & Hooghly Riverfront, Kolkata',
    category: 'Museum',
    description:
      'Cultural capital along the Hooghly uniting white-marble Victoria Memorial galleries, iconic cantilever Howrah Bridge, and India’s oldest museum.',
    bestMonths: 'October to March',
    recommendedDuration: '2–3 Days',
    touristInfo:
      'Indian Museum is closed Mondays; catch early morning flower markets below Howrah Bridge at Mullick Ghat.',
    nearbyAttractions: ['Dakshineswar Kali Temple', 'Princep Ghat', 'Kumartuli Potter Quarter'],
    googleMapsUrl: mapsLink('Victoria Memorial Howrah Bridge Kolkata West Bengal'),
    coordinates: { lat: 22.5448, lng: 88.3426 },
    imagePath: '/src/assets/images/hotel_heritage_courtyard_1795249606993.jpg',
  },
  {
    id: 'wb-darjeeling',
    name: 'Darjeeling Tiger Hill & Heritage Tea Gardens',
    state: 'West Bengal',
    city: 'Darjeeling',
    regionType: 'State',
    location: 'Darjeeling Hills',
    category: 'Hill Station',
    description:
      'UNESCO Darjeeling Himalayan Railway, Tiger Hill Kanchenjunga sunrise viewpoints, and world-famous first-flush tea estates.',
    bestMonths: 'March to May and October to December',
    recommendedDuration: '3 Days',
    touristInfo:
      'Book Tiger Hill sunrise cab early; avoid peak monsoon landslides (July–August).',
    nearbyAttractions: ['Batasia Loop', 'Padmaja Naidu Himalayan Zoo', 'Mirik Lake'],
    googleMapsUrl: mapsLink('Darjeeling Tiger Hill West Bengal'),
    coordinates: { lat: 27.041, lng: 88.2663 },
    imagePath: '/src/assets/images/dest_tea_hills_1795270500507.jpg',
  },

  // ================= 8 UNION TERRITORIES =================
  {
    id: 'an-havelock-radhanagar',
    name: 'Swaraj Dweep (Havelock) & Radhanagar Beach',
    state: 'Andaman and Nicobar Islands',
    city: 'Swaraj Dweep (Havelock)',
    regionType: 'Union Territory',
    location: 'South Andaman Archipelago',
    category: 'Beach',
    description:
      'Pristine coral reefs, turquoise lagoons, and Asia’s celebrated white-sand Radhanagar shoreline reached by ferry from Sri Vijaya Puram.',
    bestMonths: 'November to April',
    recommendedDuration: '4–5 Days',
    touristInfo:
      'Inter-island ferries depend on sea conditions; carry government photo ID for all boat transfers.',
    nearbyAttractions: ['Cellular Jail Heritage Complex', 'Elephant Beach Coral Reefs', 'Shaheed Dweep (Neil)'],
    googleMapsUrl: mapsLink('Radhanagar Beach Havelock Andaman'),
    coordinates: { lat: 11.9845, lng: 92.9509 },
    imagePath: '/src/assets/images/dest_goa_coastline_1795249606869.jpg',
  },
  {
    id: 'ch-rock-garden',
    name: 'Nek Chand Rock Garden & Sukhna Lake',
    state: 'Chandigarh',
    city: 'Sukhna Lake & Rock Garden',
    regionType: 'Union Territory',
    location: 'Sector 1, Chandigarh',
    category: 'City',
    description:
      'Le Corbusier’s planned modernist city featuring a 40-acre sculpture garden crafted entirely from recycled urban materials.',
    bestMonths: 'October to March',
    recommendedDuration: '1–2 Days',
    touristInfo:
      'Combine morning walks around Sukhna Lake with the Capitol Complex UNESCO architectural tour.',
    nearbyAttractions: ['Capitol Complex Open Hand', 'Zakir Hussain Rose Garden', 'Government Museum Sector 10'],
    googleMapsUrl: mapsLink('Rock Garden Sukhna Lake Chandigarh'),
    coordinates: { lat: 30.7525, lng: 76.8101 },
    imagePath: '/src/assets/images/hero_india_panorama_1795249606332.jpg',
  },
  {
    id: 'dn-diu-fort',
    name: 'Diu Fort & Nagoa Arabian Coast',
    state: 'Dadra and Nagar Haveli and Daman and Diu',
    city: 'Diu',
    regionType: 'Union Territory',
    location: 'Diu Island & Daman',
    category: 'Fort & Palace',
    description:
      '16th-century coastal stone fortress surrounded by Arabian Sea waves, crescent Nagoa beach, and tranquil Dudhani lakefront.',
    bestMonths: 'October to March',
    recommendedDuration: '2 Days',
    touristInfo:
      'Rent bicycles to tour Diu’s coastal promenade and Naida Caves comfortably.',
    nearbyAttractions: ['Naida Caves', 'St. Paul’s Church Diu', 'Ghoghla Blue Flag Beach'],
    googleMapsUrl: mapsLink('Diu Fort Nagoa Beach'),
    coordinates: { lat: 20.7144, lng: 70.9874 },
    imagePath: '/src/assets/images/dest_goa_coastline_1795249606869.jpg',
  },
  {
    id: 'dl-qutub-humayun',
    name: 'Red Fort, Humayun’s Tomb & Qutub Minar',
    state: 'Delhi',
    city: 'New Delhi',
    regionType: 'Union Territory',
    location: 'New & Old Delhi',
    category: 'Heritage',
    description:
      'Twin UNESCO Sultanate and Mughal landmarks paired with sandstone Red Fort, India Gate boulevard, and the National Museum.',
    bestMonths: 'October to March',
    recommendedDuration: '2–3 Days',
    touristInfo:
      'Delhi Metro links almost every monument rapidly; Red Fort & National Museum remain closed on Mondays.',
    nearbyAttractions: ['India Gate & Kartavya Path', 'Lodhi Gardens', 'National Museum Janpath'],
    googleMapsUrl: mapsLink('Humayun Tomb Qutub Minar Red Fort New Delhi'),
    coordinates: { lat: 28.5933, lng: 77.2507 },
    imagePath: '/src/assets/images/dest_taj_agra_1795270493826.jpg',
  },
  {
    id: 'jk-kashmir-dal',
    name: 'Srinagar Dal Lake, Mughal Gardens & Gulmarg',
    state: 'Jammu and Kashmir',
    city: 'Srinagar',
    regionType: 'Union Territory',
    location: 'Srinagar & Baramulla',
    category: 'Lake & Scenic',
    description:
      'Iconic Dal Lake shikara cruises, terraced Nishat & Shalimar Mughal gardens, and Gulmarg’s alpine meadows & high-altitude gondola.',
    bestMonths: 'March to October',
    recommendedDuration: '4–5 Days',
    touristInfo:
      'March–October brings spring tulips, summer meadows, and golden chinar autumn; Dec–Feb caters to winter snow sports.',
    nearbyAttractions: ['Shalimar Bagh', 'Gulmarg Gondola', 'Pahalgam Betaab Valley'],
    googleMapsUrl: mapsLink('Dal Lake Srinagar Jammu and Kashmir'),
    coordinates: { lat: 34.1106, lng: 74.8683 },
    imagePath: '/src/assets/images/dest_kashmir_himalayas_1795249606363.jpg',
  },
  {
    id: 'la-pangong-leh',
    name: 'Leh Monasteries, Pangong Tso & Nubra Valley',
    state: 'Ladakh',
    city: 'Leh',
    regionType: 'Union Territory',
    location: 'Leh District',
    category: 'Adventure',
    description:
      'High-altitude trans-Himalayan desert with cliffside Thiksey & Hemis gompas, Nubra’s silver sand dunes, and sapphire Pangong Lake.',
    bestMonths: 'May to September',
    recommendedDuration: '5–6 Days',
    touristInfo:
      'Rest 48 hours in Leh (3,500m) for acclimatization before crossing Khardung La or Chang La.',
    nearbyAttractions: ['Thiksey Monastery', 'Khardung La Pass', 'Shanti Stupa Leh'],
    googleMapsUrl: mapsLink('Pangong Tso Leh Ladakh'),
    coordinates: { lat: 33.7595, lng: 78.6674 },
    imagePath: '/src/assets/images/dest_himalayan_monastery_1795270498156.jpg',
  },
  {
    id: 'ld-agatti-bangaram',
    name: 'Agatti & Bangaram Coral Atolls',
    state: 'Lakshadweep',
    city: 'Agatti Island',
    regionType: 'Union Territory',
    location: 'Lakshadweep Archipelago',
    category: 'Beach',
    description:
      'Ring-shaped turquoise coral lagoons and marine sanctuaries offering calm kayaking, snorkeling, and serene island living.',
    bestMonths: 'October to May',
    recommendedDuration: '3–4 Days',
    touristInfo:
      'Mandatory Lakshadweep Entry Permit must be obtained before travel via SPORTS / ePermit portal.',
    nearbyAttractions: ['Thinnakara Island', 'Kavaratti Marine Aquarium', 'Kalpeni Lagoon'],
    googleMapsUrl: mapsLink('Agatti Bangaram Island Lakshadweep'),
    coordinates: { lat: 10.8588, lng: 72.1945 },
    imagePath: '/src/assets/images/hidden_secret_cove_1795279356930.jpg',
  },
  {
    id: 'py-white-town',
    name: 'White Town Promenade & Auroville',
    state: 'Puducherry',
    city: 'White Town (Puducherry)',
    regionType: 'Union Territory',
    location: 'Puducherry',
    category: 'City',
    description:
      'Mustard-walled French colonial quarter bordering the Bay of Bengal promenade, serene Aurobindo Ashram, and experimental Auroville.',
    bestMonths: 'October to March',
    recommendedDuration: '2 Days',
    touristInfo:
      'Book Matrimandir viewing passes online a few days prior; mornings along Goubert Avenue are breezy.',
    nearbyAttractions: ['Rock Beach Promenade', 'Paradise Beach Chunnambar', 'Matrimandir Auroville'],
    googleMapsUrl: mapsLink('White Town Promenade Puducherry'),
    coordinates: { lat: 11.9338, lng: 79.8378 },
    imagePath: '/src/assets/images/street_coastal_latin_market_1795274715687.jpg',
  },
];
