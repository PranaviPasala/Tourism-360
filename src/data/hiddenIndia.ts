import { HiddenCultureCategory, HiddenCultureItem } from '../types/tourism';

const IMG = {
  templeAncient: '/src/assets/images/culture_ancient_temple_1795270499426.jpg',
  templeDravidian: '/src/assets/images/hi_temple_dravidian_1795272645440.jpg',
  templeHimalayan: '/src/assets/images/dest_himalayan_monastery_1795270498156.jpg',
  templeHampi: '/src/assets/images/dest_hampi_ruins_1795270498703.jpg',
  templeVaranasi: '/src/assets/images/dest_varanasi_ghats_1795270493917.jpg',
  handloomSilk: '/src/assets/images/hi_handloom_silk_1795272645269.jpg',
  handloomHeritage: '/src/assets/images/culture_temples_handloom_1795249606587.jpg',
  loomNortheast: '/src/assets/images/loom_northeast_backstrap_1795274648606.jpg',
  loomHimalayan: '/src/assets/images/loom_kashmir_pashmina_kullu_1795274648627.jpg',
  craftWorkshop: '/src/assets/images/hi_handicraft_pottery_1795272649777.jpg',
  craftAssorted: '/src/assets/images/culture_indian_crafts_1795270498428.jpg',
  craftBamboo: '/src/assets/images/craft_northeast_bamboo_cane_1795274714860.jpg',
  craftPainting: '/src/assets/images/craft_painting_madhubani_pattachitra_1795274649438.jpg',
  craftKashmir: '/src/assets/images/craft_kashmir_walnut_papier_1795274648414.jpg',
  craftMetal: '/src/assets/images/craft_metal_dhokra_bronze_1795274648292.jpg',
  streetMarket: '/src/assets/images/hi_street_food_market_1795272648762.jpg',
  streetBazaar: '/src/assets/images/culture_bazaar_street_1795270498646.jpg',
  streetMountain: '/src/assets/images/street_mountain_hill_bazaar_1795274648139.jpg',
  streetCoastal: '/src/assets/images/street_coastal_latin_market_1795274715687.jpg',
  streetNightFood: '/src/assets/images/street_night_food_chowk_1795274715367.jpg',
  waterfallForest: '/src/assets/images/hi_waterfall_forest_1795272648553.jpg',
  waterfallCascade: '/src/assets/images/dest_meghalaya_waterfalls_1795249605885.jpg',
  waterfallCoast: '/src/assets/images/dest_goa_coastline_1795249606869.jpg',
  foodThali: '/src/assets/images/hi_local_food_thali_1795272649168.jpg',
  foodSpices: '/src/assets/images/culture_indian_food_1795270499395.jpg',
  foodPunjabi: '/src/assets/images/food_north_sarson_kulcha_1795274639615.jpg',
  foodLitti: '/src/assets/images/food_east_litti_chokha_1795274639380.jpg',
  foodDalBaati: '/src/assets/images/food_west_dalbaati_farsan_1795274639843.jpg',
  foodHimalayan: '/src/assets/images/food_himalayan_thukpa_momos_1795274713256.jpg',
  foodKashmir: '/src/assets/images/food_kashmir_wazwan_kahwa_1795274649474.jpg',
  foodStreetChaat: '/src/assets/images/food_street_chaat_misal_1795274648510.jpg',
  foodCoastalCurry: '/src/assets/images/food_coastal_fish_curry_1795274647886.jpg',
  foodAndhraPutharekulu: '/src/assets/images/food_andhra_putharekulu_sweet_1795274713885.jpg',
  foodNortheastBamboo: '/src/assets/images/food_northeast_bamboo_rice_1795274647616.jpg',
  cultureFolk: '/src/assets/images/culture_folk_tradition_1795270498956.jpg',
  cultureVillage: '/src/assets/images/hi_community_homestay_1795272649463.jpg',
} as const;

const STATE_TOURISM_CONTACTS: Record<string, string> = {
  'Andhra Pradesh': '1800-4254-5454 / 0866-2552969 (APTDC)',
  'Arunachal Pradesh': '+91-360-2214745 / +91-360-2217534 (Arunachal Tourism)',
  Assam: '+91-361-2547102 (ATDC)',
  Bihar: '0612-2225411 / 0612-2222622 (BSTDC)',
  Chhattisgarh: '1800-102-6415 / +91-771-4224600 (Chhattisgarh Tourism)',
  Goa: '0832-2437132 / 0832-2438866 (GTDC)',
  Gujarat: '1800-203-1111 / 079-23977219 (Gujarat Tourism)',
  Haryana: '0172-2702956 / 0172-2702957 (Haryana Tourism)',
  'Himachal Pradesh': '0177-2658302 / 0177-2800073 (HPTDC)',
  Jharkhand: '0651-2331828 / +91-9102403884 (JTDC)',
  Karnataka: '080-42775575 / 080-43344334 (KSTDC)',
  Kerala: '1800-4250-123 / +91-9400008585 (KTDC)',
  'Madhya Pradesh': '1800-233-7777 / 0755-4027132 (MPSTDC)',
  Maharashtra: '1800-267-1975 / 022-41580902 (MTDC)',
  Manipur: '0385-2421794 (Manipur Tourism)',
  Meghalaya: '1800-599-2026 / +91-7640003050 (Meghalaya Tourism)',
  Mizoram: '0389-2333475 (Mizoram Tourism)',
  Nagaland: '+91-7085345563 / 1800-11-1363 (Nagaland Tourism)',
  Odisha: '+91-674-2432177 / 1800-11-1363 (Odisha Tourism)',
  Punjab: '0183-5217666 / 0172-2375466 (Punjab Tourism)',
  Rajasthan: '0141-2209860 / 0141-2209866 (RTDC)',
  Sikkim: '03592-232218 (Sikkim Tourism)',
  'Tamil Nadu': '1800-123-2255 (TTDC)',
  Telangana: '1800-425-46464 (TGTDC)',
  Tripura: '0381-2325930 / 0381-2317878 (Tripura Tourism)',
  'Uttar Pradesh': '0522-2304870 / 1800-11-1363 (UP Tourism)',
  Uttarakhand: '1364 / 0135-2559898 (Uttarakhand Tourism)',
  'West Bengal': '033-22144428 (WBTDCL)',
  'Andaman and Nicobar Islands': '03192-232694 (Andaman Tourism)',
  Chandigarh: '1800-180-2116 / 0172-2700225 (Chandigarh Tourism)',
  'Dadra and Nagar Haveli and Daman and Diu': '0260-2250002 / 02875-252653 (UT Tourism)',
  Delhi: '011-23365358 / 011-23363607 (Delhi Tourism)',
  'Jammu and Kashmir': '1800-890-8457 / 0194-2502279 (J&K Tourism)',
  Ladakh: '01982-257788 / 01985-233968 (Ladakh Tourist Info)',
  Lakshadweep: '+91-484-2666789 / +91-484-2668387 (SPORTS Lakshadweep)',
  Puducherry: '+91-413-2358570 / 0413-2339497 (Puducherry Tourism)',
};

function formatSiteAddress(
  category: HiddenCultureCategory,
  title: string,
  location: string,
  state: string,
): string {
  switch (category) {
    case 'Local Temples':
      return `${title} Heritage Precinct, ${location}, ${state}`;
    case 'Handicrafts':
      return `Artisan Workshop Clusters & Craft Emporium, ${location}, ${state}`;
    case 'Handlooms':
      return `Handloom Weavers Cooperative & Cluster, ${location}, ${state}`;
    case 'Famous Streets':
      return `${title} Old Market Quarter, ${location}, ${state}`;
    case 'Hidden Waterfalls':
      return `${title} Forest Eco-Trail & Viewpoint, ${location}, ${state}`;
    case 'Local Food':
      return `Traditional Culinary Lane & Local Eateries, ${location}, ${state}`;
    case 'Culture & Traditions':
    default:
      return `${location}, ${state}`;
  }
}

type CompactEntry = [
  category: HiddenCultureCategory,
  slug: string,
  title: string,
  location: string,
  description: string,
  bestMonths: string,
  culturalHighlight: string,
  imagePath: string,
];

function buildStateCulture(state: string, code: string, entries: CompactEntry[]): HiddenCultureItem[] {
  const tourismContact = STATE_TOURISM_CONTACTS[state] || '1800-11-1363 (Incredible India Helpline)';

  return entries.map(([category, slug, title, location, description, bestMonths, culturalHighlight, imagePath]) => {
    const isTradition = category === 'Culture & Traditions';
    return {
      id: `hi-${code}-${slug}`,
      title,
      state,
      location,
      category,
      description,
      bestMonths,
      culturalHighlight,
      imagePath,
      ...(isTradition
        ? {
            eventLocation: `${location}, ${state} (Traditional Festival Grounds & Community Spaces)`,
          }
        : {
            address: formatSiteAddress(category, title, location, state),
            contactNumber: `${tourismContact} · 24x7 Helpline: 1800-11-1363`,
          }),
    };
  });
}

export const HIDDEN_INDIA_CULTURE: HiddenCultureItem[] = [
  // 1. Andhra Pradesh
  ...buildStateCulture('Andhra Pradesh', 'ap', [
    ['Local Temples', 'lepakshi', 'Veerabhadra Temple, Lepakshi', 'Sri Sathya Sai District', '16th-century Vijayanagara granite temple celebrated for its hanging pillar, monolithic Nandi bull, and natural-pigment ceiling murals.', 'October to February', 'Vijayanagara stone iconography and fresco painting', IMG.templeDravidian],
    ['Handicrafts', 'kondapalli', 'Kondapalli Wooden Toys & Etikoppaka Lacquerware', 'Kondapalli & Etikoppaka', 'GI-tagged softwood toys carved from Tella Poniki and Ankudu timber and painted exclusively with natural vegetable lac.', 'October to March', 'Zero-synthetic natural mineral & seed-dye woodwork', IMG.craftWorkshop],
    ['Handlooms', 'uppada', 'Uppada Jamdani & Mangalagiri Cotton Handlooms', 'East Godavari & Guntur', 'Featherlight handwoven silk Jamdani motifs and signature Nizam-bordered Mangalagiri pure cotton fabrics crafted on pit looms.', 'November to February', 'GI-registered non-mechanical Jamdani brocade weaving', IMG.handloomSilk],
    ['Famous Streets', 'bezawada', 'Governorpet & Besant Road Spice Markets', 'Vijayawada & Tirupati', 'Bustling heritage avenues famous for Guntur chilli spices, brassware shops, Kalamkari textile stalls, and traditional sweet kitchens.', 'October to March', 'Historic coastal Andhra spice & handloom bazaars', IMG.streetBazaar],
    ['Hidden Waterfalls', 'talakona', 'Talakona & Katiki Forest Waterfalls', 'Sri Venkateswara Sanctuary & Araku', '270-foot rainforest waterfall dropping amidst sandalwood slopes alongside Araku Valley’s misty karst limestone cascades.', 'September to February', 'Medicinal flora slopes and Eastern Ghats streams', IMG.waterfallForest],
    ['Local Food', 'putharekulu', 'Atreyapuram Putharekulu & Gongura Pachadi', 'Konaseema & Rayalaseema', 'Paper-thin rice-starch wafer sweets filled with jaggery and ghee alongside tangy hibiscus-leaf Gongura chutneys and Pesarattu dosas.', 'Year-round', 'Traditional earthen-pot heated starch sheet sweet-making', IMG.foodAndhraPutharekulu],
    ['Culture & Traditions', 'kuchipudi', 'Kuchipudi Classical Dance & Tholu Bommalata', 'Kuchipudi Village & Nimmalakunta', 'Graceful dance-drama originating from Kuchipudi agraharam alongside luminous leather shadow-puppet theatre storytelling.', 'December to March', 'Living Telugu classical theatre and folk puppetry', IMG.cultureFolk],
  ]),

  // 2. Arunachal Pradesh
  ...buildStateCulture('Arunachal Pradesh', 'ar', [
    ['Local Temples', 'malinithan', 'Malinithan Stone Ruins & Tawang Monastery', 'Likabali & Tawang', '14th-century sculpted granite temple plinths in the foothills paired with Asia’s largest 17th-century hilltop Mahayana monastery.', 'March to June & October to November', 'Rare Brahmaputra-foothill stone carvings & Monpa Buddhism', IMG.templeHimalayan],
    ['Handicrafts', 'cane-wood', 'Wancho Woodcarving & Apatani Bamboo Basketry', 'Tirap & Ziro Valley', 'Hand-carved ceremonial pipes, bamboo water flasks, and rain-proof cane baskets woven without nails by indigenous artisans.', 'October to April', 'Traditional tribal split-cane and hardwood craft', IMG.craftBamboo],
    ['Handlooms', 'adi-gale', 'Adi Gale & Apatani Loin-Loom Textiles', 'Along & Ziro Valley', 'Vibrant handwoven wrap skirts and ceremonial shawls created on portable backstrap tension looms using geometric clan motifs.', 'October to April', 'Backstrap tension-loom weaving passed across generations', IMG.loomNortheast],
    ['Famous Streets', 'ganga-market', 'Ganga Market & Ziro Old Bazaar', 'Itanagar & Hapoli', 'Lively mountain market lanes showcasing handwoven Monpa carpets, wild forest honey, Sichuan pepper, and steamed street dumplings.', 'October to April', 'Local hill-produce stalls and tribal textile lanes', IMG.streetMountain],
    ['Hidden Waterfalls', 'nuranang', 'Nuranang (Jang) & Bap Teng Kang Falls', 'Tawang District', '100-meter alpine waterfall tucked below Jang town amid misty pine cliffs and wild rhododendron slopes.', 'March to June & September to November', 'High-altitude glacial stream cascade', IMG.waterfallCascade],
    ['Local Food', 'zan-bamboo', 'Apatani Bamboo-Shoot Dishes, Thukpa & Khura', 'Ziro & Tawang', 'Oil-free steamed dishes flavored with fermented bamboo shoot (ekung), buckwheat pancakes (khura), and butter tea.', 'Year-round', 'Zero-oil Himalayan fermentation & millet culinary heritage', IMG.foodHimalayan],
    ['Culture & Traditions', 'losar-solung', 'Ziro Moko, Solung & Tawang Losar', 'Ziro, Pasighat & Tawang', 'Harvest festivals celebrating bamboo-grove altars, Yak Cham masked dances, and Monpa carpet fairs.', 'February to April & September', 'Vibrant oral ballads of 26 indigenous communities', IMG.cultureFolk],
  ]),

  // 3. Assam
  ...buildStateCulture('Assam', 'as', [
    ['Local Temples', 'da-parbatia', 'Da-Parbatia Gupta Temple & Kamakhya Nilachal Shrines', 'Tezpur & Guwahati', '6th-century sculpted Gupta-era doorframe carvings beside Nilachal Hill’s ancient stone shakti architecture overlooking the Brahmaputra.', 'October to April', 'Earliest surviving stone temple reliefs in Northeast India', IMG.templeAncient],
    ['Handicrafts', 'majuli-mukha', 'Majuli Clay-Bamboo Mukha Masks & Sarthebari Bell-Metal', 'Majuli & Barpeta', 'Articulated theatre masks crafted at Samaguri Satra alongside hand-forged bell-metal xorai trays from Sarthebari.', 'October to April', 'Vaishnavite Satra mask-making and Kansa brass craft', IMG.craftMetal],
    ['Handlooms', 'sualkuchi', 'Sualkuchi Golden Muga & Eri Peace Silk', 'Sualkuchi, Kamrup', 'Home to thousands of pit looms weaving shimmering natural golden Muga silk (exclusive to Assam) and cruelty-free Eri shawls.', 'October to April', 'GI-tagged golden Muga silk Mekhela Chador weaving', IMG.handloomSilk],
    ['Famous Streets', 'fancy-bazaar', 'Pan Bazaar & Sualkuchi Weaver Lanes', 'Guwahati & Sualkuchi', 'Historic bookshops, Assam tea merchants, silk weaving alleys, and traditional street stalls serving pitha rice cakes.', 'October to April', 'Brahmaputra riverside spice, tea, and silk quarters', IMG.streetBazaar],
    ['Hidden Waterfalls', 'kakochang', 'Kakochang & Akashiganga Forest Waterfalls', 'Bokakhat & Nagaon', 'Lush tea-estate and rubber-plantation waterfall hidden near Kaziranga overlooking ancient Numaligarh stone ruins.', 'October to March', 'Sub-Himalayan forest cascade bordering tea gardens', IMG.waterfallForest],
    ['Local Food', 'khar-masor', 'Assamese Khar, Masor Tenga & Jolpan Pitha', 'Brahmaputra Valley', 'Alkaline sun-dried banana-peel Khar starters, tangy elephant-apple fish curries, and sticky Bora rice Jolpan breakfasts.', 'Year-round', 'Distinctive non-spicy herb and bamboo-shoot cuisine', IMG.foodNortheastBamboo],
    ['Culture & Traditions', 'bihu-sattriya', 'Rongali Bihu & Majuli Sattriya Monastic Dance', 'Upper Assam & Majuli', 'April spring festival celebrated with dhol-pepa folk songs alongside 15th-century Vaishnavite dance-dramas.', 'Mid-April & November (Raas)', 'Living Satra monastery culture and folk instruments', IMG.cultureVillage],
  ]),

  // 4. Bihar
  ...buildStateCulture('Bihar', 'br', [
    ['Local Temples', 'mundeshwari', 'Mundeshwari Devi Temple & Vishnupad Stone Shrines', 'Kaimur & Gaya', 'One of India’s oldest functional stone temples dating back to the 4th century CE atop Powra Hill featuring octagonal Nagara geometry.', 'October to March', 'Rare octagonal stone plan from the Gupta-era Kaimur hills', IMG.templeAncient],
    ['Handicrafts', 'madhubani', 'Jitwarpur Madhubani Art & Sujini Quilting', 'Madhubani & Muzaffarpur', 'Women-led village households painting vivid Mithila folklore with bamboo nibs and natural turmeric-indigo dyes alongside fine Sujini stitches.', 'October to March', 'GI-tagged Mithila natural-pigment painting tradition', IMG.craftPainting],
    ['Handlooms', 'bhagalpur', 'Bhagalpuri Tussar Silk & Nepura Katan Looms', 'Bhagalpur & Nalanda', 'Rich textured wild Tussar silk fabrics spun and woven along the Ganga banks in Champanagar weaving clusters.', 'October to March', 'GI-protected Bhagalpuri wild silk pit-loom clusters', IMG.handloomHeritage],
    ['Famous Streets', 'khaja-lane', 'Patna City Chowk & Silao Khaja Heritage Lanes', 'Patna & Nalanda', 'Centuries-old bazaar streets lined with brassware shops, Lac bangle ateliers, and traditional wood-fired Silao Khaja sweet makers.', 'October to March', '52-layered crisp wheat-ghee Khaja street heritage', IMG.streetNightFood],
    ['Hidden Waterfalls', 'kakolat', 'Kakolat & Telhar Kund (Kaimur) Waterfalls', 'Nawada & Kaimur Plateau', '160-foot emerald plunge pool cascade in the wooded Kaimur-Nawada escarpment cooled year-round by rocky streams.', 'September to February', 'Kaimur sandstone plateau cliff waterfall', IMG.waterfallForest],
    ['Local Food', 'litti-chokha', 'Litti Chokha, Sattu Paratha & Thekua', 'Patna, Bhojpur & Gaya', 'Charcoal-roasted wheat balls stuffed with spiced roasted gram flour paired with smoked brinjal chokha and jaggery Thekua.', 'Year-round', 'Rustic ember-baked Gangetic plain nourishment', IMG.foodLitti],
    ['Culture & Traditions', 'chhath-sama', 'Chhath Puja Surya Arghya & Sama-Chakeva Folk Craft', 'Gangetic Ghats & Mithilanchal', 'Ancient eco-friendly sun worship along riverbanks paired with clay-figurine folk songs celebrating seasonal migration.', 'October–November & March', 'Maithili and Bhojpuri seasonal folk songs', IMG.cultureFolk],
  ]),

  // 5. Chhattisgarh
  ...buildStateCulture('Chhattisgarh', 'cg', [
    ['Local Temples', 'bhoramdeo', 'Bhoramdeo 11th-Century Temple & Sirpur Brick Shrines', 'Kawardha & Mahasamund', 'Intricately carved Nagara stone temple nestled in Maikal Hills alongside 6th-century Laxman red-brick temple ruins at Sirpur.', 'October to March', 'Fine Kalachuri stone sculpture & Gupta brick architecture', IMG.templeAncient],
    ['Handicrafts', 'bastar-dhokra', 'Bastar Dhokra Bell-Metal & Wrought Iron Craft', 'Kondagaon & Ektaal', '4,000-year-old lost-wax brass casting creating expressive tribal figurines and ritual lamps alongside hammered wrought-iron art.', 'October to March', 'GI-registered cire-perdue beeswax casting craft', IMG.craftMetal],
    ['Handlooms', 'kosa-champa', 'Champa Kosa Silk & Bastar Pata Handlooms', 'Janjgir-Champa & Jagdalpur', 'Golden-toned natural Kosa tussar silk woven with temple-border geometry and hand-dyed with local madder roots (Aal).', 'October to March', 'Natural tree-root dyed Kosa tussar weaving clusters', IMG.handloomSilk],
    ['Famous Streets', 'jagdalpur-haat', 'Bastar Weekly Haat Bazaars & Raipur Gol Bazaar', 'Jagdalpur & Raipur', 'Traditional open-air tribal market lanes selling forest mahua flowers, red-ant chutney, terracotta lamps, and handwoven gamchhas.', 'October to March', 'Vibrant weekly haat barter & craft crossroads', IMG.streetMountain],
    ['Hidden Waterfalls', 'tirathgarh', 'Tirathgarh & Mendri Ghoomar Waterfalls', 'Kanger Valley, Bastar', 'Stepped limestone waterfall descending through dense sal rainforest in Kanger Valley National Park.', 'September to February', 'Lush multi-tiered Bastar forest cascade', IMG.waterfallCascade],
    ['Local Food', 'chila-fara', 'Chila, Muthia, Fara & Mahua Delicacies', 'Raipur & Bastar', 'Steamed rice-flour dumplings tempered with sesame and mustard seeds alongside crispy lentil Bara and seasonal bamboo shoots.', 'Year-round', 'Forest-to-table millet & rice culinary traditions', IMG.foodSpices],
    ['Culture & Traditions', 'bastar-dussehra', 'Bastar Madai & Raut Nacha Folk Traditions', 'Jagdalpur & Bilaspur', '75-day community-led autumn celebration centered on Sal-forest deities, gourd-pipe music, and Raut Nacha stick dances.', 'September to February', 'Unbroken 600-year tribal festival calendar', IMG.cultureFolk],
  ]),

  // 6. Goa
  ...buildStateCulture('Goa', 'ga', [
    ['Local Temples', 'tambdi-surla', 'Tambdi Surla 12th-Century Basalt Temple', 'Bhagwan Mahaveer Sanctuary, Sanguem', 'Goa’s oldest surviving Kadamba stone shrine sculpted from dark Deccan basalt inside misty Western Ghats forest.', 'October to March', 'Rare pre-colonial Kadamba stone lotus ceiling', IMG.templeDravidian],
    ['Handicrafts', 'azulejos-terracotta', 'Goan Terracotta Pottery & Kaavi Lime-Plaster Art', 'Bicholim & Canacona', 'Red-oxide Kaavi wall etchings seen on rural temple walls alongside hand-thrown earthen cooling pots and shell-craft lanterns.', 'October to March', 'Indigenous red-laterite Kaavi graffito art', IMG.craftWorkshop],
    ['Handlooms', 'kunbi-saree', 'Kunbi Checked Cotton Handloom Weaves', 'Salcete & Quepem Hinterland', 'Historic red-and-white checkered handloom cotton saree revived for Goa’s indigenous agrarian Kunbi community.', 'November to March', 'Dobby-border woven cotton suited for humid tropics', IMG.handloomHeritage],
    ['Famous Streets', 'fontainhas-mapusa', 'Fontainhas Latin Lanes & Mapusa Friday Market', 'Panaji & Mapusa', 'Ochre-and-indigo heritage lanes paired with Mapusa’s bustling spice market filled with Goan chorizo, salted fish, and kokum.', 'November to March', 'Living Indo-Portuguese bakeries and village markets', IMG.streetCoastal],
    ['Hidden Waterfalls', 'harvalem-sada', 'Harvalem (Arvalem) & Tambdi Surla Forest Cascades', 'Sanquelim & Sanguem', 'Secluded forest streams tucked beside ancient rock-cut Arvalem caves away from coastal beaches.', 'July to December', 'Laterite forest gorge cascade near ancient rock caves', IMG.waterfallForest],
    ['Local Food', 'xacuti-bebinca', 'Goan Fish Curry, Sannas, Khatkhate & Bebinca', 'Panaji, Margao & Old Goa', 'Coconut-kokum spiced curries, steamed toddy-fermented Sannas, festive vegetable Khatkhate, and 16-layer coconut milk Bebinca.', 'Year-round', 'Unique Saraswat-Konkani and Lusitanian spice synergy', IMG.foodCoastalCurry],
    ['Culture & Traditions', 'shigmo-fado', 'Shigmo Spring Folk Festival & Mando Music', 'Ponda & Margao', 'Traditional Romta Mel drum processions, Fugdi circle dances, and soulful Konkani Mando ballads accompanied by ghumot clay drums.', 'March (Shigmo) & Dec–Feb', 'Ghumot earthenware percussion and Konkani folk heritage', IMG.cultureVillage],
  ]),

  // 7. Gujarat
  ...buildStateCulture('Gujarat', 'gj', [
    ['Local Temples', 'modhera', 'Modhera Sun Temple & Rani ki Vav', 'Mehsana & Patan', '11th-century Solanki sandstone shrine aligned to the equinox sunrise beside the 108-shrine stepped Surya Kund.', 'October to March', 'Equinox solar alignment & Solanki sandstone craftsmanship', IMG.templeAncient],
    ['Handicrafts', 'rogan-mata', 'Nirona Rogan Painting & Kutchi Terracotta', 'Bhuj & Nirona, Kutch', 'Castor-oil vegetable-paste Rogan painting practiced by master families alongside delicate Lippan mud-mirror murals.', 'October to March', '300-year-old castor-oil thread-painting tradition', IMG.craftPainting],
    ['Handlooms', 'patan-patola', 'Patan Double-Ikat Patola & Tangaliya Shawls', 'Patan & Surendranagar', 'Sacred silk sarees where warp and weft threads are resist-dyed before weaving so patterns appear crisp on both sides.', 'October to March', 'Double-ikat mathematical precision by Salvi weavers', IMG.handloomSilk],
    ['Famous Streets', 'manek-chowk', 'Manek Chowk Night Food Bazaar & Law Garden Craft Lane', 'Ahmedabad', 'Jewellery square by day turning into a bustling midnight street-food street beside mirror-work Chaniya Choli craft stalls.', 'October to March', 'Historic Pol-quarter nocturnal culinary street', IMG.streetNightFood],
    ['Hidden Waterfalls', 'girmal', 'Girmal & Zarwani Forest Waterfalls', 'Dang District & Narmada', 'Gujarat’s tallest waterfall dropping 100 feet deep inside Dang bamboo forests alongside Shoolpaneshwar sanctuary cascades.', 'July to October', 'Monsoon forest cascades of South Gujarat hills', IMG.waterfallForest],
    ['Local Food', 'undhiyu-farsan', 'Surati Undhiyu, Handvo, Khaman & Kutchi Dabeli', 'Ahmedabad, Surat & Bhuj', 'Earthen-pot winter vegetable medley slow-cooked underground alongside savoury fermented lentil cakes and spiced Dabeli buns.', 'Year-round (Undhiyu Dec–Feb)', 'Matlu-pot slow cooking and zero-waste farsan craft', IMG.foodDalBaati],
    ['Culture & Traditions', 'rann-garba', 'Navratri Garba & Bhavai Folk Theatre', 'Vadodara, Ahmedabad & Kutch', 'Nine nights of rhythmic concentric folk dancing around earthen garbo lamps paired with traditional Bhavai storytelling.', 'October (Navratri) & Nov–Feb', 'UNESCO Intangible Cultural Heritage Garba tradition', IMG.cultureFolk],
  ]),

  // 8. Haryana
  ...buildStateCulture('Haryana', 'hr', [
    ['Local Temples', 'bhima-devi', 'Bhima Devi Temple Ruins & Pehowa Prachi Shrines', 'Pinjore & Kurukshetra', '8th–11th century Gurjara-Pratihara stone sculptures preserved in an open-air archaeological complex beside ancient Kurukshetra tirthas.', 'October to March', 'North Indian Gurjara-Pratihara sandstone sculpture', IMG.templeAncient],
    ['Handicrafts', 'jhaajjar-pottery', 'Jhajjar Terracotta, Sarkanda Reed Craft & Copperwork', 'Jhajjar & Rewari', 'Delicate grass-reed baskets, painted clay vessels, and traditional hammered copper-brass tiffin ware crafted by rural families.', 'October to March', 'Eco-friendly Sarkanda grass & wheel-thrown pottery', IMG.craftWorkshop],
    ['Handlooms', 'panipat-durrie', 'Panipat Handloom Punja Durries & Bagh Shawls', 'Panipat & Rohtak', 'Heavyweight geometric cotton floor rugs woven on wooden pit looms paired with bright Haryanvi Bagh woollen odhnis.', 'October to March', 'Historic textile weaving clusters of Panipat', IMG.loomHimalayan],
    ['Famous Streets', 'surajkund-haat', 'Surajkund Craft Fair Lanes & Ambala Spice Bazaars', 'Faridabad & Ambala', 'Stepped amphitheatre artisan lanes gathering weavers and street kitchens alongside old Ambala cloth and sweet markets.', 'February (Mela) & Oct–Mar', 'Living crossroads of rustic North Indian craft streets', IMG.streetBazaar],
    ['Hidden Waterfalls', 'morni-cascade', 'Morni Hills Seasonal Cascade & Tikkar Taal Streams', 'Panchkula Shivalik Foothills', 'Shivalik ridge forest stream and tranquil twin lakes tucked above Chandigarh in Haryana’s sole Himalayan foothill pocket.', 'July to October & Feb–Mar', 'Forested Shivalik gorge springs & pine trails', IMG.waterfallCascade],
    ['Local Food', 'bajra-khichdi', 'Bajra Khichdi, Kachri Chutney & Hand-Pounded Churma', 'Rohtak, Hisar & Bhiwani', 'Hearty pearl-millet porridge drizzled with homemade white butter (tindi ghee), wild cucumber chutney, and sweet wheat churma.', 'Year-round (best winter)', 'Nutritious agrarian dairy-and-millet cuisine', IMG.foodPunjabi],
    ['Culture & Traditions', 'saang-ragini', 'Haryanvi Saang Theatre & Teej Monsoon Swing Fairs', 'Sonipat & Rohtak', 'Open-air musical folk drama performed without stage curtains alongside monsoon Teej swings and dhol-nagara folk Ragini songs.', 'July–August & October–March', 'Oral epic ballads and rural folk stage heritage', IMG.cultureVillage],
  ]),

  // 9. Himachal Pradesh
  ...buildStateCulture('Himachal Pradesh', 'hp', [
    ['Local Temples', 'masroor', 'Masroor Rock-Cut Temples & Hadimba Cedar Shrine', 'Kangra Valley & Manali', '8th-century monolithic Nagara temple carved out of one sandstone ridge paired with deodar pagoda-roof wood architecture.', 'March to June & Sept–Nov', 'Only monolithic rock-cut Himalayan shrine complex', IMG.templeHimalayan],
    ['Handicrafts', 'chamba-rumal', 'Chamba Rumal Miniature Embroidery & Kangra Paintings', 'Chamba & Dharamshala', 'Double-sided silk needle-painting depicting Pahari folklore alongside mineral-pigment Kangra miniature artworks.', 'March to October', 'GI-tagged double-satin stitch embroidered story cloths', IMG.craftPainting],
    ['Handlooms', 'kullu-kinnaur', 'Kullu & Kinnauri Geometrical Handwoven Shawls', 'Bhuntar (Kullu) & Reckong Peo', 'Warm Himalayan sheep and angora wool shawls bordered with vibrant eight-color Buddhist and Pahari geometric bands.', 'March to June & Sept–Dec', 'GI-registered multi-colored Patti border weaving', IMG.loomHimalayan],
    ['Famous Streets', 'mcleod-mall', 'Chamba Chogan Market & Old Manali Wooden Lanes', 'Chamba & Manali', 'Slate-roofed heritage market streets lined with copper smiths, Tibetan prayer-flag ateliers, and steaming siddu stalls.', 'March to June & Sept–Nov', 'Mountain cedar streetscapes and craft bazaars', IMG.streetMountain],
    ['Hidden Waterfalls', 'jana-jibhi', 'Jana Falls & Rahni-Jibhi Forest Cascades', 'Naggar & Tirthan Valley', 'Tucked-away wooden footbridge waterfall surrounded by deodar and apple orchards, serving hot local millet meals beside the stream.', 'March to November', 'Pristine Tirthan & Beas forest waterfall hamlets', IMG.waterfallForest],
    ['Local Food', 'siddu-dham', 'Himachali Dham, Steamed Siddu & Chana Madra', 'Kangra, Mandi & Kullu', 'Fermented wheat buns stuffed with walnut paste served with pure ghee, slow-cooked yogurt chickpea curry, and leafy-brass-plate Dham.', 'Year-round', 'Zero-cutlery community Dham feasts cooked in brass charotis', IMG.foodHimalayan],
    ['Culture & Traditions', 'kullu-dussehra', 'Kullu Devta Rath Yatra & Spiti Cham Masked Dances', 'Kullu & Tabo/Key', 'Centuries-old procession of hundreds of valley village deities accompanied by long copper ransingha horns.', 'October (Dussehra) & Summer', 'Living Pahari Devta and Himalayan monastic heritage', IMG.cultureFolk],
  ]),

  // 10. Jharkhand
  ...buildStateCulture('Jharkhand', 'jh', [
    ['Local Temples', 'maluti', 'Maluti Terracotta Temples & Tanginath Carved Shrines', 'Dumka & Gumla', 'Cluster of 72 surviving 17th-century terracotta-panelled temples nestled in a quiet village alongside ancient carved pillars at Tanginath.', 'October to March', 'Elaborate mythological narrative panels baked in village terracotta', IMG.templeAncient],
    ['Handicrafts', 'sohrai-pyatkar', 'Sohrai Khovar Wall Art & Amadubi Pyatkar Scrolls', 'Hazaribagh & East Singhbhum', 'GI-tagged monochrome earth-ochre mural art painted by rural women alongside narrative cloth-scroll singing traditions.', 'October to March', 'GI-protected natural soil-pigment cave & mud-wall art', IMG.craftPainting],
    ['Handlooms', 'kuchai-tussar', 'Kuchai Organic Tussar Silk & Santhali Panchi Weaves', 'Seraikela-Kharsawan', 'Golden wild silk spun from Arjuna-forest cocoons woven into bright checked Santhali sarees with contrast borders.', 'October to March', 'Forest-regenerative silk sericulture by tribal collectives', IMG.loomNortheast],
    ['Famous Streets', 'jharkraft-haat', 'Amadubi Craft Lane & Ranchi Upper Bazaar Spices', 'Amadubi & Ranchi', 'Traditional village art lanes and urban spice-bamboo markets offering wild mahua sweets, brass anklets, and lac ornaments.', 'October to March', 'Authentic tribal craft and forest-produce markets', IMG.streetBazaar],
    ['Hidden Waterfalls', 'lodh-jonha', 'Lodh Falls (Budha Ghagh) & Panchghagh', 'Latehar & Khunti', 'Jharkhand’s highest 143-meter tiered forest cascade dropping down stepped Chotanagpur basalt ledges.', 'September to February', 'Dramatic multi-step Chotanagpur plateau canyon falls', IMG.waterfallCascade],
    ['Local Food', 'dhuska-chilka', 'Dhuska with Ghugni, Chilka Roti & Rugra Curry', 'Ranchi & Hazaribagh', 'Crisp deep-fried rice-lentil pancakes served with spicy black gram and monsoon-foraged forest truffle (Rugra) delicacies.', 'Year-round (Rugra July–Sept)', 'Seasonal Sal-forest foraging culinary wisdom', IMG.foodLitti],
    ['Culture & Traditions', 'chhau-sarhul', 'Seraikela Chhau Mask Dance & Sarhul Spring Festival', 'Seraikela & Chotanagpur', 'Graceful martial dance performed without dialogue using sculpted paper-mâché masks alongside sacred Sal-blossom Sarhul worship.', 'March to April', 'UNESCO-listed Chhau dance & ecological Sal tree festival', IMG.cultureFolk],
  ]),

  // 11. Karnataka
  ...buildStateCulture('Karnataka', 'ka', [
    ['Local Temples', 'hoysala-belur', 'Belur, Halebidu & Somnathapura Hoysala Temples', 'Hassan & Mysuru District', 'UNESCO-listed 12th-century chloritic schist star-shaped shrines sculpted with lathe-turned pillars and micro-detailed reliefs.', 'October to March', 'Masterpiece Hoysala soapstone miniature carving heritage', IMG.templeHampi],
    ['Handicrafts', 'bidri-channapatna', 'Bidriware Silver Inlay & Channapatna Wooden Toys', 'Bidar & Ramanagara', 'Blackened zinc-copper metalware inlaid with fine silver wire alongside non-toxic vegetable-dyed ivory-wood toys.', 'October to March', 'Two globally celebrated GI-tagged Karnataka crafts', IMG.craftMetal],
    ['Handlooms', 'ilkal-mysore', 'Ilkal Kasuti Handloom & Mysore Mulberry Silk', 'Bagalkot & Mysuru', 'Distinctive red-bordered Ilkal sarees featuring Kondi looped joins and delicate white Kasuti geometric embroidery.', 'October to March', 'Traditional three-shuttle Kondi joinery & Kasuti stitch', IMG.handloomHeritage],
    ['Famous Streets', 'vv-puram', 'VV Puram Food Street & Devaraja Heritage Market', 'Bengaluru & Mysuru', 'Aromatic evening culinary street serving hot rava idli, holige, and avarekai dishes alongside Mysuru’s fragrant flower-sandalwood lanes.', 'Year-round', 'Centuries-old Kannada flower, spice & tiffin avenues', IMG.streetNightFood],
    ['Hidden Waterfalls', 'sathodi-unchalli', 'Sathodi & Unchalli (Lushington) Forest Falls', 'Uttara Kannada (Yellapur & Siddapur)', 'Deep rainforest waterfalls plunging down Western Ghats gorges inside Malnad evergreen spice belts.', 'September to February', 'Unspoiled Kali & Aghanashini river basin cascades', IMG.waterfallForest],
    ['Local Food', 'jolada-bisi', 'Bisi Bele Bath, Uttara Karnataka Jolada Rotti & Mysore Pak', 'Mysuru, Hubballi & Bengaluru', 'Millet-sorghum flatbreads with stuffed brinjal ennegayi, slow-simmered lentil-spice rice, and pure-ghee Mysore Pak.', 'Year-round', 'Rich contrast between Malnad coastal, Old Mysuru & North millet diets', IMG.foodThali],
    ['Culture & Traditions', 'yakshagana', 'Yakshagana Overnight Folk Theatre & Kambala', 'Udupi, Mangaluru & Mysuru', 'Vibrant all-night coastal folk theatre blending Carnatic melodies, maddale drumming, and towering golden crowns.', 'November to May', 'Living coastal Kannada dance-drama oral tradition', IMG.cultureFolk],
  ]),

  // 12. Kerala
  ...buildStateCulture('Kerala', 'kl', [
    ['Local Temples', 'vadakkunnathan', 'Vadakkunnathan & Thirunelli Forest Temple', 'Thrissur & Wayanad', 'UNESCO-recognized timber-and-laterite Nalukettu temple architecture adorned with ancient Rama-katha wall murals.', 'September to March', 'Authentic Kerala sloped-roof timber & copper temple craft', IMG.templeDravidian],
    ['Handicrafts', 'aranmula-kannadi', 'Aranmula Kannadi Metal Mirror & Bell-Metal Nilavilakku', 'Pathanamthitta & Palakkad', 'GI-tagged secret-alloy bronze mirrors polished over days for distortion-free front-surface reflection without glass.', 'October to March', 'World’s only traditional front-surface bronze mirror craft', IMG.craftMetal],
    ['Handlooms', 'balaramapuram', 'Balaramapuram Kasavu & Chendamangalam Handlooms', 'Thiruvananthapuram & Ernakulam', 'Unbleached organic cotton mundus and sarees finished with pure gold-silver kasavu zari borders on traditional throw-shuttle looms.', 'October to March', 'Crisp ivory-and-gold handwoven Kerala kasavu tradition', IMG.handloomHeritage],
    ['Famous Streets', 'jew-town', 'Jew Town Spice Street & SM (Mittayi Theruvu) Street', 'Mattancherry (Kochi) & Kozhikode', 'Historic maritime pepper-cardamom trading lane alongside Kozhikode’s century-old Sweetmeat Street famous for black halwa.', 'November to March', 'Living Malabar spice-route warehouses & sweet lanes', IMG.streetCoastal],
    ['Hidden Waterfalls', 'meenvallam-athirapilly', 'Meenvallam & Kuthumkal Hidden Forest Falls', 'Palakkad & Idukki', 'Secluded multi-step granite waterfalls hidden inside cardamom estates and Palakkad community-protected forest groves.', 'September to March', 'Local tribal-managed rainforest stream trails', IMG.waterfallForest],
    ['Local Food', 'sadya-appam', 'Banana-Leaf Sadya, Puttu Kadala & Malabar Thalassery Feast', 'Kochi, Kozhikode & Kottayam', 'Fermented rice-coconut appams, steamed rice-coconut puttu cylinders, jackfruit payasam, and aromatic coconut-oil curries.', 'Year-round', '24-dish harmonic Sadya feast & coastal fermentation mastery', IMG.foodThali],
    ['Culture & Traditions', 'theyyam-kathakali', 'North Malabar Theyyam & Koodiyattam Heritage', 'Kannur & Thrissur', '800-year-old sacred village grove ritual art alongside UNESCO-protected Sanskrit temple theatre with chenda percussion.', 'November to May', 'Living village kavu folklore and classical mudra traditions', IMG.cultureFolk],
  ]),

  // 13. Madhya Pradesh
  ...buildStateCulture('Madhya Pradesh', 'mp', [
    ['Local Temples', 'bhojpur-ateshwar', 'Bateshwar 200-Shrine Cluster & Bhojeshwar Shiva Temple', 'Morena & Raisen', 'Restored valley cluster of over 200 Gurjara-Pratihara sandstone shrines alongside Raja Bhoj’s monumental unfinished 11th-century sanctum.', 'October to March', 'Remarkable archaeological sandstone temple valley', IMG.templeAncient],
    ['Handicrafts', 'gond-bagh', 'Gond Tribal Art & Bagh Hand-Block Printing', 'Patangarh (Dindori) & Dhar', 'Intricate dot-and-line storytelling art on paper alongside iron-jaggery natural-dyed Bagh cotton printing.', 'October to March', 'GI-tagged Gond nature paintings & river-washed Bagh blocks', IMG.craftPainting],
    ['Handlooms', 'chanderi-maheshwari', 'Chanderi & Maheshwari Sheer Silk-Cotton Looms', 'Chanderi & Maheshwar', 'Featherweight handwoven textiles patterned with Narmada-wave borders and golden zari coins.', 'October to March', 'Living riverside loom clusters revived by Rani Ahilyabai Holkar', IMG.handloomSilk],
    ['Famous Streets', 'sarafa-chowk', 'Indore Sarafa Night Street & Chhappan Dukan', 'Indore & Bhopal Chowk', 'Jewellery promenade that turns after 8 PM into India’s vibrant open-air food lane serving bhutte ka kees, garadu, and poha-jalebi.', 'Year-round (Oct–Mar evenings)', 'Unique daytime-gold / night-street-food heritage bazaar', IMG.streetNightFood],
    ['Hidden Waterfalls', 'raneh-patalpani', 'Raneh Canyon Falls & Tincha-Patalpani Cascades', 'Panna & Mhow', 'Crystal basalt canyon waterfalls glowing in volcanic pinks and greys along the Ken River beside Panna forest reserve.', 'September to February', 'Volcanic crystalline granite gorge waterfall', IMG.waterfallCascade],
    ['Local Food', 'dal-bafla-poha', 'Indori Poha-Jalebi, Dal Bafla & Malwa Bhutte Ka Kees', 'Indore, Ujjain & Bhopal', 'Steamed-and-roasted wheat dumplings dipped in ghee alongside grated sweet-corn bhutte ka kees garnished with grated coconut.', 'Year-round', 'Heartland Malwa & Bundeli culinary balance', IMG.foodStreetChaat],
    ['Culture & Traditions', 'khajuraho-malwa', 'Khajuraho Classical Dance & Bhagoria Spring Fairs', 'Khajuraho & Jhabua', 'Open-air classical dance festival illuminated against 10th-century sandstone shrines alongside colourful tribal Bhagoria haats.', 'February to March', 'Classical heritage stages and rural folk fairs', IMG.cultureFolk],
  ]),

  // 14. Maharashtra
  ...buildStateCulture('Maharashtra', 'mh', [
    ['Local Temples', 'ambarnath-lonar', '11th-Century Ambarnath Shiva Temple & Daitya Sudan', 'Thane & Lonar Crater', 'Intricately carved Hemadpanti basalt stone architecture resting quietly beside volcanic crater lakes and Sahyadri passes.', 'October to March', 'Mortarless Hemadpanti interlocking black-basalt temple craft', IMG.templeDravidian],
    ['Handicrafts', 'sawantwadi-kolhapuri', 'Sawantwadi Wooden Lacquer Craft & Kolhapuri Leather', 'Sindhudurg & Kolhapur', 'Hand-painted Ganjifa playing cards and wooden fruits alongside vegetable-tanned GI-tagged Kolhapuri chappals.', 'October to March', 'Royal Konkan lacquerware & heritage leather craftsmanship', IMG.craftWorkshop],
    ['Handlooms', 'paithani-himroo', 'Yeola Pure Silk Paithani & Aurangabad Himroo', 'Yeola (Nashik) & Chhatrapati Sambhajinagar', 'Handwoven tapestry-technique silk sarees featuring peacock and lotus pallus created with metallic zari threads without Jacquards.', 'October to March', 'GI-tagged tapestry-woven pure silk Paithani artistry', IMG.handloomSilk],
    ['Famous Streets', 'tulshibaug-khau', 'Pune Tulshibaug-Laxmi Road & Mumbai Khau Gallis', 'Pune & Mumbai', 'Historic pedestrian shopping lanes tucked behind Maratha wadas offering brass samais, spices, puneri pagdis, and hot vada-pav.', 'October to March', 'Centuries-old Peshwa-era trading and snack lanes', IMG.streetNightFood],
    ['Hidden Waterfalls', 'devkund-thoseghar', 'Devkund Jungle Cascade & Thoseghar Multi-Tier Falls', 'Raigad & Satara', 'Emerald mineral plunge pool inside Sahyadri forest beside Kaas plateau’s tall stepped basalt falls.', 'August to January', 'Deep Konkan forest trek waterfall', IMG.waterfallForest],
    ['Local Food', 'misal-puranpoli', 'Misal Pav, Kothimbir Vadi, Puran Poli & Sol Kadhi', 'Pune, Kolhapur & Konkan', 'Spiced sprouted-lentil Misal, crisp coriander cakes, jaggery-stuffed flatbreads, and cooling kokum-coconut Sol Kadhi.', 'Year-round', 'Vibrant Sahyadri, Vidarbha, and Konkan regional kitchens', IMG.foodStreetChaat],
    ['Culture & Traditions', 'wari-lavani', 'Pandharpur Wari Pilgrimage, Powada & Lavani Folk', 'Pune, Satara & Pandharpur', 'Centuries-old egalitarian walking musical procession accompanied by tal-mridanga cymbals and folk Lavani rhythms.', 'June–July & October–March', 'Bhakti Abhang poetry and folk percussion', IMG.cultureFolk],
  ]),

  // 15. Manipur
  ...buildStateCulture('Manipur', 'mn', [
    ['Local Temples', 'bishenpur-govindajee', '15th-Century Bishenpur Vishnu Brick Temple & Govindajee', 'Bishnupur & Imphal', 'Built in 1467 under King Kyamba in rare conical brick architecture alongside Imphal’s golden twin-domed palace shrine.', 'October to April', 'Rare 15th-century terracotta brickwork of Eastern India', IMG.templeAncient],
    ['Handicrafts', 'longpi-kauna', 'Longpi Ham Black Stone Pottery & Kauna Reed Craft', 'Ukhrul & Imphal Valley', 'Wheel-less black cookware moulded from weathered serpentinite rock and clay alongside braided Kauna wetland reed mats.', 'November to April', 'Wheel-less Tangkhul Naga stone-clay pottery heritage', IMG.craftBamboo],
    ['Handlooms', 'moirang-phee', 'Moirang Phee & Shaphee Lanphee Traditional Weaves', 'Moirang & Imphal', 'Crisp handwoven Manipuri cotton textiles featuring distinctive pointed temple-tooth Moirang Phee borders.', 'October to April', 'GI-tagged symbolic Manipuri Phanek & Innaphi weaving', IMG.loomNortheast],
    ['Famous Streets', 'ima-keithel', 'Ima Keithel (500-Year-Old Women’s Market)', 'Imphal City Center', 'World’s largest market operated exclusively by over 4,000 Manipuri women selling handloom phanek, organic herbs, and fermented produce.', 'October to April', 'Empowered women-led heritage street marketplace', IMG.streetMountain],
    ['Hidden Waterfalls', 'sadu-chiru', 'Sadu Chiru (Leimaram) Three-Tier Waterfall', 'Kangpokpi District', 'Scenic three-tiered foothill cascade surrounded by pine and wild orchid hills just outside the Imphal Valley.', 'October to March', 'Accessible multi-drop forest stream sanctuary', IMG.waterfallCascade],
    ['Local Food', 'eromba-chakhao', 'Singju Herb Salad, Eromba & Black Rice Chak-Hao Kheer', 'Imphal & Loktak Belt', 'Nutty purple-black GI-tagged Chak-Hao rice pudding served alongside crunchy lotus-stem Singju and fiery U-morok chutneys.', 'Year-round', 'Aromatic GI-tagged aromatic black rice heritage', IMG.foodNortheastBamboo],
    ['Culture & Traditions', 'raslila-thangta', 'Manipuri Raas Leela & Thang-Ta Martial Dance', 'Imphal & Moirang', 'Graceful classical dance in glittering Kumil skirts alongside rhythmic Pung Cholom drum acrobatics and Sagol Kangjei polo heritage.', 'October to March', 'Birthplace of modern polo and classical Pung drumming', IMG.cultureFolk],
  ]),

  // 16. Meghalaya
  ...buildStateCulture('Meghalaya', 'ml', [
    ['Local Temples', 'nartiang', 'Nartiang 500-Year Monoliths & Durga Temple', 'West Jaintia Hills', 'Historic hilltop shrine housing towering upright stone monoliths erected by ancient Jaintia rulers alongside traditional groves.', 'October to April', 'Largest cluster of monolithic menhirs in Northeast India', IMG.templeAncient],
    ['Handicrafts', 'khasi-bamboo', 'Khasi Bamboo Rain-Shields (Knup) & Garo Woodcraft', 'East Khasi Hills & Tura', 'Tightly interlaced split-bamboo weaving crafted without adhesives alongside intricately carved wooden Garo ceremonial stools.', 'October to April', 'Weatherproof architectural bamboo weaving craft', IMG.craftBamboo],
    ['Handlooms', 'ryndia-eri', 'Ryndia Peace Silk & Dakmanda Cotton Weaves', 'Ri Bhoi & Garo Hills', 'Naturally hand-spun Eri peace silk dyed using lac, turmeric, and local tree bark in community-led zero-waste weaver huts.', 'October to April', 'GI-tagged Ryndia organic peace-silk textile tradition', IMG.loomNortheast],
    ['Famous Streets', 'police-bazaar', 'Bara Bazaar (Iewduh) Traditional Khasi Market', 'Shillong', 'One of Northeast India’s oldest indigenous markets run prominently by Khasi women traders selling organic spices, betel leaves, and pottery.', 'October to April', 'Indigenous matrilineal trading hub of the Khasi Hills', IMG.streetMountain],
    ['Hidden Waterfalls', 'krang-suri', 'Krang Suri & Phe Phe Turquoise Waterfalls', 'West Jaintia Hills', 'Crystal-clear sapphire plunge pool nestled deep inside bamboo trails maintained by local village eco-committees.', 'October to April', 'Vivid turquoise limestone canyon waterfall', IMG.waterfallForest],
    ['Local Food', 'jadoh-dohneiiong', 'Jadoh Spiced Red Rice, Dohneiiong & Pukhlein', 'Shillong & Cherrapunji', 'Fragrant red hill rice simmered with ginger and turmeric, rich roasted black-sesame gravy, and crisp rice-jaggery fritters.', 'Year-round', 'Hearty hill-rice and black-sesame culinary artistry', IMG.foodNortheastBamboo],
    ['Culture & Traditions', 'nongkrem-wangala', 'Nongkrem Dance, Wangala 100-Drums & Kongthong Tunes', 'Smit, Tura & Kongthong', 'Harvest thanksgiving festivals featuring Garo 100-drum ensembles and Kongthong’s unique musical lullaby names.', 'October to December', 'Oral Khasi & Garo musical village traditions', IMG.cultureVillage],
  ]),

  // 17. Mizoram
  ...buildStateCulture('Mizoram', 'mz', [
    ['Local Temples', 'solomon-vankal', 'Reiek Heritage Village & Vankal Archaeological Megaliths', 'Aizawl & Champhai Districts', 'Centuries-old Mizo carved hero memorial stones (Lungphun) and peaceful hillside heritage chapels set amid bamboo peaks.', 'October to March', 'Ancient Mizo engraved stone monoliths and village zawlbuk halls', IMG.templeHimalayan],
    ['Handicrafts', 'khumbeu-bamboo', 'Khumbeu Waterproof Bamboo Hats & Cane Baskets', 'Aizawl & Lunglei', 'Double-walled woven bamboo rain hats lined with wild hnahthial leaves alongside finely pleated storage baskets.', 'October to March', 'Leaf-lined indigenous rainproof craft', IMG.craftBamboo],
    ['Handlooms', 'puanchei', 'Thenzawl Puanchei & Pawndum Handloom Textiles', 'Thenzawl, Serchhip District', 'GI-tagged Mizo ceremonial wrap textiles bursting with crisp geometric stripes woven by women cooperatives on fly-shuttle looms.', 'October to March', 'Protected Mizo Puan weaving clusters of Thenzawl', IMG.loomNortheast],
    ['Famous Streets', 'bara-bazar-aizawl', 'Bara Bazar (Dawrpui) & Zarkawt Artisan Lanes', 'Aizawl', 'Hilltop pedestrian market staircases packed with fresh mountain herbs, smoked chillies, woven puan drapes, and cozy sanpiau carts.', 'October to March', 'Discipline-clean hill market lanes of Mizoram', IMG.streetMountain],
    ['Hidden Waterfalls', 'vantawng', 'Vantawng & Tuirihiau Two-Tiered Waterfalls', 'Thenzawl Valley', 'Mizoram’s tallest 229-meter cascade plunging cleanly into thick emerald bamboo ravines near Thenzawl.', 'October to March', '229-meter bamboo valley canyon cascade', IMG.waterfallCascade],
    ['Local Food', 'bai-sanpiau', 'Mizo Vegetable Bai, Bamboo Shoot Sawhchiar & Sanpiau', 'Aizawl & Champhai', 'Soothing steamed herb-and-bamboo-shoot stews (Bai) and popular street rice-porridge Sanpiau topped with coriander and roasted chilli.', 'Year-round', 'Fresh zero-oil herb-infused mountain comfort cooking', IMG.foodNortheastBamboo],
    ['Culture & Traditions', 'chapchar-kut', 'Chapchar Kut & Cheraw Bamboo Dance', 'Aizawl & Champhai', 'Joyous March spring festival featuring rhythmic Cheraw clapping-bamboo dances performed across community grounds.', 'March (Chapchar Kut)', 'Iconic synchronized bamboo-pole dance heritage', IMG.cultureFolk],
  ]),

  // 18. Nagaland
  ...buildStateCulture('Nagaland', 'nl', [
    ['Local Temples', 'dimapur-kachari', '13th-Century Kachari Mushroom Monoliths & Dzuleke', 'Dimapur & Kohima', 'Mysterious chessman-shaped carved sandstone monoliths of the ancient Dimasa Kachari Kingdom alongside sacred village gates.', 'October to April', 'Medieval carved monolith ruins of the Brahmaputra corridor', IMG.templeAncient],
    ['Handicrafts', 'naga-woodcraft', 'Naga Hornbill Woodcarvings & Bead Jewellery', 'Mon, Mokokchung & Khonoma', 'Hand-chiselled alder wood totems, bamboo drinking mugs, and multi-strand carnelian bead necklaces symbolizing clan lineage.', 'October to April', 'Symbolic woodcarving and traditional shell-bead work', IMG.craftBamboo],
    ['Handlooms', 'tsungkotepsu', 'Chakhesang & Ao Naga Ceremonial Backstrap Shawls', 'Kohima & Mokokchung', 'Bold crimson, black, and white loin-loom woollen shawls decorated with embroidered cowrie motifs and geometric borders.', 'October to April', 'GI-tagged Chakhesang & tribal identity textiles', IMG.loomNortheast],
    ['Famous Streets', 'kohima-mao', 'Kohima Mao Market & Kisama Craft Lanes', 'Kohima', 'Mountain market stalls packed with organic mountain kiwi, fermented bamboo shoots, smoked chillies, and tribal textile stalls.', 'October to April', 'Vibrant organic produce and indigenous culinary bazaar', IMG.streetMountain],
    ['Hidden Waterfalls', 'shilloi-triple', 'Triple Falls & Dzükou Valley Stream Cascades', 'Dimapur & Viswema Trail', 'Secluded three-stepped jungle waterfall tumbling 280 feet down rocky cliffs into natural swimming basins.', 'October to March', 'Hidden hill forest cascade away from main highways', IMG.waterfallForest],
    ['Local Food', 'axone-galho', 'Galho Sticky Rice Stew, Anishi & Bamboo Shoot Curries', 'Kohima & Dimapur', 'Hearty fermented-soybean (Axone) and fermented yam-leaf (Anishi) stews paired with fresh greens and fiery King Chilli.', 'Year-round', 'Fermented protein culinary mastery of the Naga hills', IMG.foodNortheastBamboo],
    ['Culture & Traditions', 'hornbill-moatsu', 'Hornbill Festival & Khonoma Morung Folk Songs', 'Kisama & Khonoma', 'December gathering of 17 Naga tribes sharing log-drum rhythms, polyphonic harvest songs, and zero-hunting village conservation.', 'December (1–10) & April', 'Living Morung oral heritage & India’s first green village', IMG.cultureVillage],
  ]),

  // 19. Odisha
  ...buildStateCulture('Odisha', 'od', [
    ['Local Temples', 'rajarani-mukteswar', 'Mukteswar & Rajarani Sandstone Temples', 'Bhubaneswar Old Town', '10th-century Kalinga sandstone jewels sculpted with intricate torana arches and temple floral scroll motifs.', 'October to March', 'Refined Kalinga Rekha-Deula stone carving craftsmanship', IMG.templeDravidian],
    ['Handicrafts', 'raghurajpur', 'Raghurajpur Pattachitra & Pipili Appliqué Craft', 'Puri District', 'Natural-pigment mythological cloth scrolls, etched Tala-patra palm-leaf manuscripts, and vibrant Chandua canopy patchwork.', 'October to March', 'Every household in Raghurajpur is a practicing atelier', IMG.craftPainting],
    ['Handlooms', 'sambalpuri', 'Sambalpuri Bandha (Ikat) & Bomkai Silk Sarees', 'Bargarh, Sonepur & Ganjam', 'Crisp double-ikat tie-and-dye cotton and silk weaves displaying shankha (conch), chakra, and rudraksha woven motifs.', 'October to March', 'GI-registered Sambalpuri Bandha precision loom art', IMG.handloomSilk],
    ['Famous Streets', 'ekamra-grand', 'Puri Grand Road (Bada Danda) & Ekamra Haat', 'Puri & Bhubaneswar', 'Traditional temple-town bazaar avenues bustling with brass bell-metal ware, temple mahaprasad kitchens, and silver filigree.', 'October to March', 'Centuries-old sacred corridor and artisan bazaar', IMG.streetBazaar],
    ['Hidden Waterfalls', 'khandadhar-barehipani', 'Khandadhar & Joranda Forest Waterfalls', 'Sundargarh & Simlipal', '244-meter horsetail cascade plunging off forested hills in northern Odisha alongside Simlipal biosphere canyon falls.', 'September to February', 'Lush Simlipal & Bonai forest biodiversity cascades', IMG.waterfallForest],
    ['Local Food', 'pakhala-chhena', 'Pakhala Bhata, Dalma & Caramelized Chhena Poda', 'Puri, Cuttack & Coastal Belt', 'Cooling fermented rice steeped in spiced curd water paired with roasted-cumin lentil-vegetable Dalma and baked cottage-cheese Chhena Poda.', 'Year-round', 'Temple-inspired oil-free culinary elegance', IMG.foodSpices],
    ['Culture & Traditions', 'gotipua-odissi', 'Gotipua Folk Acrobatics & Konark Odissi Festival', 'Raghurajpur & Konark', 'Precursor folk tradition to classical Odissi performed by rural youth ensembles alongside Chhau masked storytelling.', 'December to March', 'Living Kalinga classical-to-folk artistic lineage', IMG.cultureFolk],
  ]),

  // 20. Punjab
  ...buildStateCulture('Punjab', 'pb', [
    ['Local Temples', 'durgiana-devi', 'Durgiana Silver Temple & Ancient Sunet-Nurpur Shrines', 'Amritsar & Ludhiana-Pathankot Belt', 'Historic golden-domed lake shrine modeled on classic Sikh-Punjabi marble inlay alongside ancient terracotta mound remains.', 'October to March', 'Punjabi marble pietra-dura and gilded copper craft', IMG.templeVaranasi],
    ['Handicrafts', 'patiala-jutti', 'Punjabi Hand-Embroidered Jutti & Kartarpur Wood Inlay', 'Patiala, Muktsar & Hoshiarpur', 'Hand-stitched leather shoes embroidered with golden tilla wire alongside ivory-alternative bone inlay carpentry of Hoshiarpur.', 'October to March', 'GI-tagged tilla-worked footwear & Hoshiarpur inlay', IMG.craftAssorted],
    ['Handlooms', 'phulkari', 'Patiala Bagh & Phulkari Handloom Embroidery', 'Patiala & Nabha Villages', 'Vibrant geometric silk-floss embroidery stitched meticulously from the reverse side onto handspun organic khaddar cloth.', 'October to March', 'Heirloom Bagh & Chope needlework by women collectives', IMG.loomHimalayan],
    ['Famous Streets', 'hall-bazaar', 'Hall Bazaar, Guru Bazaar & Lawrence Road Food Walk', 'Amritsar', 'Heritage sandstone colonnades ringing with brass utensils, phulkari shops, peda sweets, and sizzling tandoori kulcha ovens.', 'October to March', 'Lively walled-city culinary and craft corridors', IMG.streetNightFood],
    ['Hidden Waterfalls', 'hoshiarpur-kukanet', 'Kukanet & Dhar Kalan Shivalik Foothill Cascades', 'Hoshiarpur & Pathankot Shivalik Ridge', 'Monsoon forest streams and seasonal rock cascades nestled inside Punjab’s lush Kandi foothill forests along the Ravi-Beas ridge.', 'July to October & Feb–Mar', 'Hidden green Shivalik valleys along Punjab’s northern hills', IMG.waterfallCascade],
    ['Local Food', 'sarson-kulcha', 'Amritsari Kulcha, Sarson da Saag & Makki di Roti', 'Amritsar, Jalandhar & Ludhiana', 'Tandoor-crisped stuffed flatbreads paired with slow-simmered winter mustard greens, white butter, and earthen-kulhad lassi.', 'Year-round (Saag Nov–Feb)', 'Wood-fired clay tandoor & rural winter harvest cuisine', IMG.foodPunjabi],
    ['Culture & Traditions', 'bhangra-baisakhi', 'Baisakhi Harvest Fair & Giddha-Bhangra Folk', 'Anandpur Sahib & Rural Malwa', 'Exuberant April harvest celebrations energized by two-headed dhol drums, Bhangra harvest leaps, and humorous Giddha boliyan songs.', 'April (Baisakhi) & Nov–Feb', 'Rhythmic Punjabi harvest folk poetry and tumbi strings', IMG.cultureVillage],
  ]),

  // 21. Rajasthan
  ...buildStateCulture('Rajasthan', 'rj', [
    ['Local Temples', 'ranakpur-kiradu', 'Ranakpur Marble Chaumukha & Kiradu Ruined Temples', 'Pali & Barmer', '15th-century white-marble temple featuring 1,444 uniquely carved pillars alongside remote desert Sandstone shrines in Kiradu.', 'October to March', '1,444 distinct marble pillars with zero identical carvings', IMG.templeAncient],
    ['Handicrafts', 'blue-pottery', 'Jaipur Quartz Blue Pottery & Sanganer Hand-Block', 'Jaipur & Sanganer', 'Zero-clay crushed-quartz pottery glazed in cobalt blue alongside wooden block-printed cottons dyed with natural indigo and madder.', 'October to March', 'Quartz-paste pottery & Chippa natural-dye printing', IMG.craftAssorted],
    ['Handlooms', 'kota-doria', 'Kaithoon Kota Doria & Pokaran Woollen Pattu', 'Kota & Jaisalmer', 'Gossamer checkered silk-cotton khat weaves woven in Kaithoon alongside bright geometric Marwari woollen looms in desert villages.', 'October to March', 'Featherlight airy khat check weaving suited to desert summers', IMG.handloomSilk],
    ['Famous Streets', 'johari-sadar', 'Johari Bazaar, Bapu Bazaar & Jodhpur Clock Tower Lanes', 'Jaipur & Jodhpur', 'Terracotta-pink arcades and blue-walled spice markets famed for lac bangles, camel-leather mojris, saffron lassi, and pyaaz kachori.', 'October to March', '18th-century planned craft & spice market avenues', IMG.streetMarket],
    ['Hidden Waterfalls', 'menal-bhimlat', 'Menal Canyon Falls & Bhimlat Cliff Cascade', 'Chittorgarh & Bundi', 'Dramatic 150-foot horseshoe sandstone canyon waterfall flanked by 11th-century stone temples in southern Hadoti.', 'July to October', 'Ancient sandstone canyon cascade beside medieval temples', IMG.waterfallCascade],
    ['Local Food', 'dal-baati', 'Dal Baati Churma, Ker Sangri & Ghevar', 'Jodhpur, Udaipur & Jaipur', 'Charcoal-baked wheat baatis soaked in clarified butter served with five-lentil dal, desert-foraged ker berries, and honeycomb Ghevar.', 'Year-round', 'Ingenious water-frugal desert gastronomy', IMG.foodDalBaati],
    ['Culture & Traditions', 'kalbelia-manganiyar', 'Manganiyar Folk Music & Kalbelia Desert Dance', 'Jaisalmer & Jodhpur Villages', 'UNESCO-recognized oral balladry accompanied by bowed kamaicha lutes, wooden khartal castanets, and sinuous folk dance.', 'October to March', 'Living oral poetry & desert acoustic instruments', IMG.cultureFolk],
  ]),

  // 22. Sikkim
  ...buildStateCulture('Sikkim', 'sk', [
    ['Local Temples', 'pemayangtse-kirateshwar', 'Pemayangtse Monastery & Kirateshwar Riverside Shrine', 'Pelling & Legship', '17th-century Nyingma hilltop monastery guarding seven-tiered wooden Zangdok Palri sculptures beside an ancient Rangeet river temple.', 'March to June & Oct–Dec', 'Intricate painted wooden Zangdok Palri sculpture craft', IMG.templeHimalayan],
    ['Handicrafts', 'choktse-thangka', 'Carved Choktse Wooden Tables & Thangka Scroll Art', 'Gangtok & Ravangla', 'Collapsible dragon-carved folding tables painted in mineral gold alongside meditative Buddhist scroll paintings on cotton.', 'March to June & Oct–Dec', 'Monastic woodcarving and mineral-pigment Thangka lineage', IMG.craftKashmir],
    ['Handlooms', 'lepcha-weave', 'Dzongu Lepcha Handwoven Cotton & Tibetan Carpets', 'North Sikkim & Gangtok', 'Vertically striped handwoven Lepcha Dumdyam fabrics alongside hand-knotted vegetable-dyed Himalayan sheep wool carpets.', 'March to May & Oct–Nov', 'Organic nettle-and-cotton indigenous weaving', IMG.loomNortheast],
    ['Famous Streets', 'mg-marg-lal', 'Lal Bazaar Organic Farmers Market & MG Marg', 'Gangtok', 'Multi-tiered weekend produce market brimming with wild mountain ferns (ningro), fermented churpi cheese, cardamom, and hand-knit woollens.', 'March to June & Oct–Dec', 'Clean pedestrian mountain market & organic farm stalls', IMG.streetMountain],
    ['Hidden Waterfalls', 'kanchenjunga-banjhakri', 'Kanchenjunga Falls & Rimbi Forest Cascade', 'Yuksom-Pelling Road', 'Thundering glacial-fed multi-drop waterfall roaring down moss-draped Himalayan boulders amidst dense rhododendron canopy.', 'March to November', 'Glacial Teesta & Rangeet tributary cascades', IMG.waterfallForest],
    ['Local Food', 'gundruk-kinema', 'Gundruk Fermented Greens, Kinema & Buckwheat Sel-Roti', 'Gangtok & West Sikkim', 'Probiotic mountain comfort bowls featuring sun-dried fermented mustard greens, soy Kinema soup, and crisp ring-shaped Sel-Roti.', 'Year-round', '100% organic chemical-free Himalayan state cuisine', IMG.foodHimalayan],
    ['Culture & Traditions', 'pang-lhabsol', 'Pang Lhabsol Warrior Dance & Losoong Harvest', 'Gangtok, Rumtek & Dzongu', 'Monastic Cham dances honoring Mount Kangchenjunga as guardian deity paired with Lepcha bamboo-archery celebrations.', 'August–Sept & December', 'Harmony of Lepcha, Bhutia, and Nepali Himalayan customs', IMG.cultureVillage],
  ]),

  // 23. Tamil Nadu
  ...buildStateCulture('Tamil Nadu', 'tn', [
    ['Local Temples', 'darasuram', 'Airavatesvara Temple (Darasuram) & Gangaikondacholapuram', 'Kumbakonam & Ariyalur', '12th-century UNESCO Chola limestone and granite masterpieces crafted like stone chariots with acoustic musical granite steps.', 'November to February', 'Great Living Chola bronze-and-granite iconography', IMG.templeDravidian],
    ['Handicrafts', 'thanjavur-bronze', 'Swamimalai Lost-Wax Bronzes & Thanjavur Gold Painting', 'Thanjavur & Swamimalai', 'Solid Chola-method cire-perdue bronze sculptures alongside jewel-encrusted 22-karat gold foil paintings on jackwood panels.', 'October to March', 'Unbroken 1,000-year Sthapathi bronze casting lineage', IMG.craftMetal],
    ['Handlooms', 'kanchipuram-sungudi', 'Kanchipuram Korvai Mulberry Silk & Madurai Sungudi', 'Kanchipuram & Madurai', 'Heavy three-shuttle interlocked pure silk sarees contrasted with fine tie-and-dye Madurai cotton Sungudi weaves.', 'November to March', 'GI-tagged Korvai border interlock weaving', IMG.handloomHeritage],
    ['Famous Streets', 'mylapore-chettinad', 'Mylapore Temple Mada Streets & Karaikudi Antique Row', 'Chennai & Karaikudi', 'Sacred temple tanks lined with jasmine garland vendors, brass filter-coffee tumblers, Athangudi tile workshops, and crispy sundal carts.', 'November to March', 'Living Sangam-heritage street rituals & kolam alleys', IMG.streetCoastal],
    ['Hidden Waterfalls', 'kumbakarai-monkey', 'Kumbakarai & Agaya Gangai (Kolli Hills) Falls', 'Theni & Namakkal (Kolli Hills)', 'Dramatic 300-foot waterfall plunging cleanly between emerald Eastern Ghats medicinal-herb cliffs in the Kolli Hills.', 'September to February', 'Sacred Kolli Malai medicinal forest canyon falls', IMG.waterfallForest],
    ['Local Food', 'chettinad-tiffin', 'Kumbakonam Degree Coffee, Chettinad Meals & Madurai Jigarthanda', 'Madurai, Karaikudi & Chennai', 'Aromatic star-anise kalpasi curries, crisp ghee pongal-vadai tiffins, and almond-gum-milk Jigarthanda street coolers.', 'Year-round', 'Global benchmark for fermentation, spice roasting & filter coffee', IMG.foodThali],
    ['Culture & Traditions', 'pongal-kolam', 'Thai Pongal Harvest, Bharatanatyam & Villupattu Ballads', 'Thanjavur, Madurai & Chennai', 'Four-day harvest thanksgiving painted in vibrant rice-flour Pulli Kolams paired with classical Margazhi music and folk Parai drums.', 'December to January', 'Ancient Sangam literature, classical dance & village folk arts', IMG.cultureFolk],
  ]),

  // 24. Telangana
  ...buildStateCulture('Telangana', 'ts', [
    ['Local Temples', 'ramappa', 'UNESCO Ramappa (Rudreshwara) Floating-Brick Temple', 'Palampet, Mulugu District', '13th-century Kakatiya temple featuring lightweight porous floating bricks and poised bracket-figure Madanika stone sculptures.', 'October to March', 'Seismic sandbox foundation & Perini warrior carvings', IMG.templeDravidian],
    ['Handicrafts', 'nirmal-pembarthi', 'Nirmal Toy & Paintings & Pembarthi Brass Sheet Craft', 'Nirmal & Jangaon', 'Light poniki-wood figures finished with golden duco-free herbal varnish alongside hand-chiseled brass temple repoussé panels.', 'October to March', 'GI-tagged Kakatiya-era sheet-metal embossing craft', IMG.craftMetal],
    ['Handlooms', 'pochampally-gadwal', 'Bhoodan Pochampally Ikat & Gadwal Kuttu Silk', 'Pochampally & Gadwal', 'UNWTO Best Tourism Village celebrated for crisp geometric tie-dye ikat weaves paired with Gadwal featherweight silk-cotton sarees.', 'October to March', 'Mathematically tie-dyed warp-and-weft ikat mastery', IMG.handloomSilk],
    ['Famous Streets', 'laad-bazaar', 'Laad Bazaar (Choodi Bazaar) & Charminar Chai Lanes', 'Hyderabad Old City', 'Glowing 16th-century pedestrian market famed for charcoal-crafted lac bangles, attar perfumes, Irani chai, and Osmania biscuits.', 'October to March', 'Centuries-old bangle ateliers and Irani café heritage', IMG.streetNightFood],
    ['Hidden Waterfalls', 'kuntala-bogatha', 'Bogatha (Telangana Niagara) & Gayatri Forest Falls', 'Mulugu & Adilabad', 'Horseshoe jungle cascade deep in the Godavari forest corridor alongside tucked-away Gond-village cliff falls in Adilabad.', 'August to January', 'Scenic Eastern Deccan forest rock falls', IMG.waterfallCascade],
    ['Local Food', 'sarva-pindi', 'Sarva Pindi Savoury Pancakes, Sakinalu & Hyderabadi Haleem', 'Warangal, Karimnagar & Hyderabad', 'Sesame-studded rice pancakes slow-cooked in copper handis alongside crisp spiralled Sakinalu and aromatic saffron-biryani feasts.', 'Year-round', 'Rustic millet-sesame kitchen & royal Deccani culinary fusion', IMG.foodSpices],
    ['Culture & Traditions', 'bathukamma-bonalu', 'Bathukamma Floral Festival & Perini Sivatandavam', 'Warangal & Hyderabad', 'Women singing folk chorus ballads while floating concentric towers of seasonal wild-celosia flowers in village tanks.', 'September to November', 'Ecological autumn flower celebration unique to Telangana', IMG.cultureFolk],
  ]),

  // 25. Tripura
  ...buildStateCulture('Tripura', 'tr', [
    ['Local Temples', 'unakoti-matabari', 'Unakoti Rock-Cut Colossi & Tripura Sundari (Matabari)', 'Kailashahar & Udaipur', 'Massive 7th–9th century cliffside Shiva bas-reliefs hidden in lush forest gorges alongside 1501 terracotta Matabari shrine.', 'October to March', 'Colossal open-air rock carvings amidst rainforest streams', IMG.templeAncient],
    ['Handicrafts', 'tripura-bamboo', 'Fine Split-Bamboo Furniture, Lamps & Cane Mats', 'Katlamara & Agartala', 'Ultra-fine woven bamboo blinds, eco-bottles, and structural cane furniture crafted cleanly without metal nails.', 'October to March', 'Precision bamboo crafting supporting thousands of rural artisans', IMG.craftBamboo],
    ['Handlooms', 'risa-rignai', 'GI-Tagged Risa, Rignai & Pachra Loin-Loom Textiles', 'Khowai & Agartala Clusters', 'Vibrant geometric upper-cloths and striped wrap-arounds woven on traditional backstrap looms across Tripuri rural households.', 'October to March', 'Protected cultural emblem Risa textile', IMG.loomNortheast],
    ['Famous Streets', 'battala-purbasha', 'Battala Morning Bazaar & Purbasha Craft Row', 'Agartala', 'Bustling market lanes filled with sweet Queen pineapples, jackfruit, handmade cane lanterns, and traditional sweet stalls.', 'October to March', 'Fresh tropical produce & artisan emporium quarter', IMG.streetMountain],
    ['Hidden Waterfalls', 'dumboor-saima', 'Saima & Jampui Betlingshib Hillside Cascades', 'North Tripura & Dhalai', 'Clear forest stream cascades pouring down Jampui orange-orchard ridges near the 48-island Dumboor lake basin.', 'September to February', 'Lush orange-hill valley cascades overlooking Dumboor', IMG.waterfallForest],
    ['Local Food', 'mui-borok', 'Mui Borok with Berma, Gudok & Wahan Mosdeng', 'Agartala & Udaipur', 'Oil-free steamed bamboo-shoot Gudok mash, roasted herb-chilli Mosdeng chutneys, and fragrant Tripuri bamboo-cooked rice.', 'Year-round', 'Clean oil-free bamboo-steamed indigenous cuisine', IMG.foodNortheastBamboo],
    ['Culture & Traditions', 'garia-hojagi', 'Garia Puja Bamboo Pole Dance & Reang Hojagiri', 'Dhalai & South Tripura', 'Balancing earthen pitchers and oil lamps atop bottles during graceful Reang Hojagiri dances performed to flute rhythms.', 'April (Garia) & October–Feb', 'Extraordinary balance folk choreography of the Reang community', IMG.cultureVillage],
  ]),

  // 26. Uttar Pradesh
  ...buildStateCulture('Uttar Pradesh', 'up', [
    ['Local Temples', 'jageshwar-bhitargaon', 'Bhitargaon 5th-Century Brick Temple & Bateshwar Ghats', 'Kanpur Dehat & Agra', 'Oldest surviving Gupta-era terracotta brick temple with vaulted arches alongside 101 serene Yamuna-bank shrines at Bateshwar.', 'October to March', 'Earliest intact Gupta terracotta brick shikhara', IMG.templeVaranasi],
    ['Handicrafts', 'varanasi-toys', 'Moradabad Brass, Firozabad Glass & Wooden Lacquer Toys', 'Varanasi, Agra & Moradabad', 'Engraved brassware, hand-carved softwood temple tableaux, and inlaid Agra marble Parchin Kari pietra-dura work.', 'October to March', 'Multi-craft ODOP artisan belts across the Ganga-Yamuna plains', IMG.craftMetal],
    ['Handlooms', 'banarasi-chikan', 'Varanasi Kadhua Silk Brocade & Lucknow Chikankari', 'Madanpura (Varanasi) & Chowk (Lucknow)', 'Opulent handwoven gold-zari Katan silk brocades contrasted with delicate 32-stitch white cotton Chikankari shadow-work.', 'October to March', 'Two world-famous GI-protected UP textile traditions', IMG.handloomSilk],
    ['Famous Streets', 'vishwanath-chowk', 'Kachori Gali, Thatheri Bazaar & Aminabad Market', 'Varanasi & Lucknow', 'Centuries-old narrow stone lanes echoing with copper hammerers, rose-milk malaiyo carts, tunday kebabs, and kachori brass cauldrons.', 'October to March', 'Living labyrinth of brasswork, perfume & street chaat', IMG.streetNightFood],
    ['Hidden Waterfalls', 'lakhaniya-rajdari', 'Rajdari, Devdari & Lakhaniya Dari Sandstone Falls', 'Chandauli & Mirzapur (Vindhya Hills)', 'Stepped red-sandstone waterfall dropping dramatically into quiet forested Vindhya valleys just outside Varanasi.', 'August to January', 'Ancient Vindhyachal escarpment cascades & rock art caves', IMG.waterfallCascade],
    ['Local Food', 'banarasi-awadhi', 'Banarasi Tamatar Chaat, Malaiyo & Awadhi Galouti-Tehri', 'Varanasi, Lucknow & Prayagraj', 'Dew-whipped winter saffron Malaiyo foam, clay-pot spicy Tamatar Chaat, and saffron-braised Awadhi vegetable Tehri.', 'Year-round (Malaiyo Nov–Feb)', 'Winter dew culinary alchemy and slow-cooked Awadhi dum', IMG.foodStreetChaat],
    ['Culture & Traditions', 'ramlila-kathak', 'Ramnagar Ramlila, Dev Deepavali & Lucknow Kathak', 'Varanasi, Ayodhya & Mathura', 'Month-long open-air folk theatre moving across palace courtyards alongside 10 lakh earthen diyas lighting Varanasi’s stone ghats.', 'October to March', 'UNESCO-recognized Ramlila and classical Lucknow Gharana', IMG.cultureFolk],
  ]),

  // 27. Uttarakhand
  ...buildStateCulture('Uttarakhand', 'uk', [
    ['Local Temples', 'jageshwar', 'Jageshwar 120-Shrine Deodar Valley & Katarmal Sun Temple', 'Almora District', '7th–12th century Katyuri stone shikhara complex standing silently inside dense Himalayan cedar groves along a mountain brook.', 'March to June & Sept–Nov', 'Intact medieval Katyuri Himalayan stone sanctuary', IMG.templeHimalayan],
    ['Handicrafts', 'aipan-ringal', 'Kumaoni Aipan Ritual Art & Ringal Bamboo Basketry', 'Almora & Chamoli', 'Intricate geometric rice-paste and red-ochre Geru floor paintings alongside durable dwarf-bamboo Ringal woven baskets.', 'March to November', 'GI-tagged Aipan folk threshold geometry', IMG.craftBamboo],
    ['Handlooms', 'bhotiya-panchachuli', 'Bhotiya Sheep-Wool Thulma & Panchachuli Cashmere', 'Munsiyari & Mana', 'Hand-carded and naturally dyed Himalayan wool shawls, Chutka blankets, and woven tweed jackets made by high-altitude women guilds.', 'March to June & Sept–Dec', 'Warm Bhotiya mountain pasture wool weaving', IMG.loomHimalayan],
    ['Famous Streets', 'bara-bazaar-almora', 'Almora 200-Year Flagstone Lala Bazaar & Rishikesh Lanes', 'Almora & Rishikesh', 'Slate-paved pedestrian hill market flanked by carved wooden facades serving roasted Bal Mithai chocolate-khoya fudge.', 'March to June & Sept–Nov', 'Iconic Kumaoni carved wooden merchant balconies', IMG.streetMountain],
    ['Hidden Waterfalls', 'birthi-vasudhara', 'Birthi, Tiger Falls (Chakrata) & Vasudhara Cascade', 'Munsiyari, Chakrata & Badrinath', '126-meter misty mountain fall plunging over dark slate cliffs amid oak and rhododendron valleys in Kumaon and Jaunsar-Bawar.', 'March to November', 'Towering glacial & spring-fed Himalayan falls', IMG.waterfallForest],
    ['Local Food', 'kafuli-balmithai', 'Garhwali Kafuli, Bhang ki Chutney & Almora Bal Mithai', 'Nainital, Almora & Garhwal', 'Iron-skillet slow-cooked spinach-fenugreek Kafuli, Bhatt ki Churkani black-soybean curry, and poppy-seed coated Bal Mithai.', 'Year-round', 'Nutritious iron-rich mountain pulses and wild herb condiments', IMG.foodHimalayan],
    ['Culture & Traditions', 'chholiya-phooldei', 'Chholiya Sword Dance, Phool Dei & Nanda Devi Raj Jat', 'Pithoragarh & Chamoli', 'Traditional spring festival where children decorate village doorsteps with yellow rhododendron blossoms alongside rhythmic Chholiya folk.', 'March–April & Sept–Nov', 'Living Garhwali and Kumaoni Himalayan folklore', IMG.cultureVillage],
  ]),

  // 28. West Bengal
  ...buildStateCulture('West Bengal', 'wb', [
    ['Local Temples', 'bishnupur', 'Bishnupur 17th-Century Terracotta Temples (Jor Bangla)', 'Bankura District', 'Malla-era burnt-clay temples clad from base to dome in crisp sculpted terracotta plaques recounting epics and rural river life.', 'October to March', 'Masterpiece Bengali Chala terracotta temple architecture', IMG.templeAncient],
    ['Handicrafts', 'panchmura-dokra', 'Bankura Terracotta Horses & Dariapur Dokra Metal', 'Panchmura & Bardhaman', 'Long-necked Panchmura clay horses fired in village kilns alongside Kalighat scroll paintings and Shantiniketan embossed leather.', 'October to March', 'Symbol of Indian handicrafts forged in village kilns', IMG.craftMetal],
    ['Handlooms', 'baluchari-jamdani', 'Baluchari Story-Woven Silk & Phulia Jamdani', 'Bishnupur & Nadia', 'Intricately brocaded silk sarees featuring mythological scenes across the pallu alongside gossamer handloom Dhakai Jamdani cottons.', 'October to March', 'GI-tagged narrative weaving in Bishnupur & Phulia', IMG.handloomSilk],
    ['Famous Streets', 'college-kumartuli', 'Kumartuli Clay-Artisan Lanes & Tiretti Morning Street', 'Kolkata', 'Historic narrow lanes filled with master idol sculptors shaping Durga statues beside dawn street stalls and heritage sweet shops.', 'October to March', 'Centuries-old River Hooghly clay-artisan street quarter', IMG.streetBazaar],
    ['Hidden Waterfalls', 'changey-bamni', 'Changey Forest Waterfall & Turga-Bamni Cascades', 'Kalimpong (Lava) & Ajodhya Hills', 'Quiet terraced forest waterfall cascading down misty Kalimpong orchid hills alongside red-laterite forest streams in Purulia.', 'October to April', 'Contrasting Eastern Himalaya and Chotanagpur forest cascades', IMG.waterfallForest],
    ['Local Food', 'mishti-shukto', 'Shukto Bitter-Herb Stew, Luchi-Aloor Dum & Nolen Gur Rasogolla', 'Kolkata, Nadia & Bankura', 'Balanced seasonal Bengali meals starting with bitter gourd Shukto and concluding with winter date-palm jaggery Nolen Gur sandesh.', 'Year-round (Nolen Gur Dec–Feb)', 'Philosophical bitter-to-sweet course progression & chhena craft', IMG.foodSpices],
    ['Culture & Traditions', 'baul-durga', 'UNESCO Durga Puja Artistry, Purulia Chhau & Baul Songs', 'Kolkata, Purulia & Birbhum', 'Wandering minstrels strumming one-stringed ektaras alongside festive Durga pandal craftsmanship and fierce Chhau mask dances.', 'October to March', 'UNESCO-inscribed Intangible Heritage celebrations', IMG.cultureFolk],
  ]),

  // 29. Andaman and Nicobar Islands
  ...buildStateCulture('Andaman and Nicobar Islands', 'an', [
    ['Local Temples', 'murugan-chatham', 'Sri Vetrimalai Murugan Shrine & Ross Island Heritage Ruins', 'Sri Vijaya Puram (Port Blair)', 'Hilltop Dravidian gopuram temple serving island communities since the 1920s alongside banyan-wrapped historic stone ruins.', 'November to April', 'Blending mainland South Indian temple craft with island sea breezes', IMG.templeDravidian],
    ['Handicrafts', 'island-shell', 'Nicobari Cane Weaving & Sustainable Coconut Shell Art', 'Sri Vijaya Puram & Car Nicobar', 'Intricate island lamps, bowls, and cane baskets crafted strictly from fallen coconut husks, bamboo, and regulated timber offcuts.', 'November to April', 'Conservation-safe island handicraft emporia', IMG.craftBamboo],
    ['Handlooms', 'island-handloom', 'Island Natural-Fibre Matting & Coir Loom Crafts', 'South Andaman Self-Help Guilds', 'Hand-braided pandanus leaf mats, coconut-coir ropes, and coastal hand-dyed cotton sarongs crafted by local women societies.', 'November to April', 'Eco-regulated island fibre weaving traditions', IMG.loomNortheast],
    ['Famous Streets', 'aberdeen-bazaar', 'Aberdeen Bazaar Spice & Island Sweet Lanes', 'Sri Vijaya Puram (Port Blair)', 'Bustling central island street market lined with freshly harvested clove, nutmeg, black pepper, and coastal coconut delicacies.', 'November to April', 'Vibrant multicultural island spice crossroads', IMG.streetCoastal],
    ['Hidden Waterfalls', 'white-surf', 'White Surf & Panchavati Rainforest Waterfalls', 'Little Andaman & Rangat', 'Tropical evergreen jungle waterfall dropping 30 meters into clear rainforest pools along winding forest footpaths.', 'November to April', 'Lush island rainforest cascade trails', IMG.waterfallForest],
    ['Local Food', 'island-coconut', 'Andaman Coconut Prawn Curry, Grilled Island Fish & Macher Jhol', 'Havelock, Neil & Port Blair', 'Fresh reef-to-table curries simmered with freshly pressed coconut milk, lemongrass, and island spices alongside tropical jackfruit sweets.', 'Year-round', 'Fresh tropical spice-infused coastal kitchen', IMG.foodCoastalCurry],
    ['Culture & Traditions', 'island-tourism', 'Nicobari Canoe Traditions & Subhash Mela Folk Nights', 'Diglipur & Sri Vijaya Puram', 'Traditional coastal boat races, community harvest dances, and Island Tourism Festival cultural nights uniting island heritage.', 'January to March', 'Harmonious multicultural maritime heritage', IMG.cultureVillage],
  ]),

  // 30. Chandigarh
  ...buildStateCulture('Chandigarh', 'ch', [
    ['Local Temples', 'chandi-mandir', 'Ancient Chandi Mandir & Open-Air Capitol Heritage', 'Chandi Mandir & Sector 1', 'Revered Shakti shrine tucked in the Shivalik foothills that lent Chandigarh its name, paired with UNESCO modernist architecture.', 'October to March', 'Historic foothills Devi shrine & Nek Chand’s recycled sculpture garden', IMG.templeAncient],
    ['Handicrafts', 'kalagram-craft', 'Kalagram Artisan Clayware & Nek Chand Sculpture Heritage', 'Manimajra & Sector 1', 'North Zone Cultural Centre studios hosting regional terracotta potters, woodcarvers, and upcycled ceramic mosaic craftsmanship.', 'October to March', 'Iconic Rock Garden upcycled ceramic and bangle art', IMG.craftAssorted],
    ['Handlooms', 'chandigarh-phulkari', 'Phulkari Artisan Emporium & Regional Handspun Khadi', 'Sector 17 & Sector 22', 'Certified cooperative showcases bringing authentic Patiala Phulkari shawls, Kullu woollens, and Haryanvi pit-loom dhurries together.', 'October to March', 'North Indian regional weaver cooperative showcase', IMG.loomHimalayan],
    ['Famous Streets', 'sector17-piazza', 'Sector 17 Pedestrian Piazza & Sector 15 Gedi Food Lanes', 'Chandigarh Sectors 15, 17 & 22', 'Le Corbusier’s pedestrian civic promenade glowing at dusk with fountains, bookshops, and sizzling Amritsari kulcha and chaat kiosks.', 'October to March', 'Iconic planned modernist pedestrian promenade', IMG.streetNightFood],
    ['Hidden Waterfalls', 'sukhana-shivalik', 'Morni-Kasauli Foothill Streams & Rock Garden Cascades', 'Sukhna Sanctuary Rim & Sector 1', 'Shivalik foothill forest springs along Sukhna Wildlife Sanctuary trails paired with Nek Chand’s tiered terraced stone waterfalls.', 'July to October & Feb–Mar', 'Eco-forest sanctuary trails & hand-laid stone cascades', IMG.waterfallCascade],
    ['Local Food', 'chole-kulche', 'Amritsari Kulcha, Chole Bhature & Sweet Malai Lassi', 'Sector 17, Sector 22 & Sector 34', 'Crisp potato-paneer stuffed tandoori kulchas, spiced chickpeas with pickled ginger, and tall brass tumblers of saffron lassi.', 'Year-round', 'Hearty Punjabi-Haryanvi urban street-food culture', IMG.foodPunjabi],
    ['Culture & Traditions', 'rose-festival', 'Chandigarh Rose Festival & Kalagram Folk Evenings', 'Zakir Hussain Rose Garden & Kalagram', 'Annual February flower and folk festival celebrating bhangra, himachali nati, and regional theatre across open-air lawns.', 'February & October–March', 'Open-air North Indian architectural and cultural crossroads', IMG.cultureFolk],
  ]),

  // 31. Dadra and Nagar Haveli and Daman and Diu
  ...buildStateCulture('Dadra and Nagar Haveli and Daman and Diu', 'dn', [
    ['Local Temples', 'somnath-bindrabasini', 'Bindrabasini Shrine & Somnath Mahadev Temple', 'Silvassa & Dabhel (Daman)', 'Centuries-old quiet riverbank shrine in Silvassa alongside ancient Somnath temple traditions framing Daman’s coastal heritage.', 'October to March', 'Peaceful riverside & coastal sanctuary architecture', IMG.templeAncient],
    ['Handicrafts', 'warli-bamboo', 'Warli Rice-Paste Murals & Tribal Bamboo Craft', 'Khanvel & Silvassa', 'Geometric white rice-paste paintings depicting harvest dances alongside woven bamboo fish-traps and palm-leaf mats.', 'October to March', 'Indigenous Warli & Dhodia pictographic mud-wall painting', IMG.craftBamboo],
    ['Handlooms', 'daman-weaving', 'Coastal Handspun Cotton & Tribal Bamboo-Fibre Weaving', 'Moti Daman & Silvassa', 'Handwoven festive lugda sarees and coastal cotton checks worn during tribal harvest fairs and maritime celebrations.', 'October to March', 'Traditional Warli-Konkana and coastal handloom wraps', IMG.handloomHeritage],
    ['Famous Streets', 'nani-daman-street', 'Nani Daman Jetty Bazaar & Silvassa Tribal Market Lanes', 'Daman & Silvassa', 'Atmospheric lanes along the Daman Ganga estuary serving fresh jetty bites, tortoise-shell crafts, and palm-jaggery treats.', 'October to March', 'Estuary-side Gujarati-Portuguese-Tribal street junction', IMG.streetCoastal],
    ['Hidden Waterfalls', 'hirwa-dudhani', 'Vanganga & Hirwa Van Forest Water Cascades', 'Dadra & Silvassa Forests', 'Mossy forest rock waterfalls and misty woodland garden streams tucked inside lush Sahyadri foothill reserves.', 'July to October', 'Verdant Daman Ganga woodland cascades', IMG.waterfallForest],
    ['Local Food', 'ubadiyu-undhiyu', 'Earthen-Pot Ubadiyu, Surti Undhiyu & Fresh River Crab', 'Silvassa, Daman & Diu', 'Spiced winter legumes and herbs roasted upside-down inside clay pots packed with wild leaves alongside coconut-spiced coastal stews.', 'Year-round (Ubadiyu winter)', 'Authentic Tribal-Gujarati earthen-pot slow roasting', IMG.foodDalBaati],
    ['Culture & Traditions', 'tarpa-daman', 'Dhodia-Kokna Tarpa Circle Dance & Garba Coastal Fairs', 'Khanvel & Diu Fort', 'Spiral harvest dances paced by the melodic bamboo-gourd Tarpa wind pipe and evening coastal folk festivities.', 'October to March', 'Unique bamboo-and-gourd Tarpa wind instrument culture', IMG.cultureVillage],
  ]),

  // 32. Delhi
  ...buildStateCulture('Delhi', 'dl', [
    ['Local Temples', 'yogmaya-kalkaji', 'Ancient Yogmaya Temple (Mehrauli) & Kalkaji Heritage', 'Mehrauli & Old Delhi', 'Historically linked shrine nestled beside Mehrauli’s 12th-century archaeological forest trails and historic stepped baolis.', 'October to March', 'Centuries-old Mehrauli Phool Walon Ki Sair syncretic tradition', IMG.templeAncient],
    ['Handicrafts', 'zardozi-meenakari', 'Dilli Haat Artisan Collectives & Old Delhi Zardozi', 'INA, Kinari Bazaar & Nizamuddin', 'Intricate metallic-thread Zardozi embroidery, hand-painted miniature calligraphy, and national artisan showcases at Dilli Haat.', 'October to March', 'Living Shahjahanabad silver-gilt needlecraft workshops', IMG.craftAssorted],
    ['Handlooms', 'handloom-haat', 'Janpath Crafts Museum & National Handloom Haat', 'Pragati Maidan & Janpath', 'Historic National Crafts Museum featuring live master weavers demonstrating Jamdani, Pashmina, and Patola looms daily.', 'October to March', 'Interactive national living handloom & textile heritage hub', IMG.handloomSilk],
    ['Famous Streets', 'chandni-chowk', 'Chandni Chowk — Paranthe Wali Gali & Khari Baoli', 'Old Delhi (Shahjahanabad)', '17th-century Mughal avenues uniting Asia’s largest wholesale spice market with heritage copper-brass sweet alleys and haveli gates.', 'October to March', 'Over 350 years of uninterrupted culinary and spice trade', IMG.streetNightFood],
    ['Hidden Waterfalls', 'neela-hauz-baoli', 'Agrasen ki Baoli Stepwell & Sanjay Van Aravalli Cascades', 'Hailey Road & Mehrauli Ridge', 'Hidden 14th-century subterranean stepped water tank alongside shaded Aravalli forest stream cascades inside Sanjay Van.', 'October to March', 'Ancient stone subterranean water-harvesting architecture', IMG.waterfallCascade],
    ['Local Food', 'chaat-daulat', 'Old Delhi Chaat, Stuffed Paranthas & Winter Daulat ki Chaat', 'Chandni Chowk & Jama Masjid Belt', 'Saffron-pistachio aerated milk-foam dessert churned under winter dew alongside crisp aloo tikki, dahi bhalla, and bedmi poori.', 'October to March', 'Dew-whipped Daulat ki Chaat & legendary street chaat craft', IMG.foodStreetChaat],
    ['Culture & Traditions', 'phool-walon', 'Phool Walon ki Sair, Qawwali & Kathak Kendra Nights', 'Mehrauli, Nizamuddin & Mandi House', 'Century-old floral harmony procession in Mehrauli paired with Thursday evening Sufi Qawwali and classical music concerts.', 'October to March', 'Syncretic composite culture of Old and New Delhi', IMG.cultureFolk],
  ]),

  // 33. Jammu and Kashmir
  ...buildStateCulture('Jammu and Kashmir', 'jk', [
    ['Local Temples', 'martand-avantipur', '8th-Century Martand Sun Temple & Avantiswami Ruins', 'Anantnag & Awantipora', 'Monumental Karkota-dynasty limestone colonnades standing against snow-dusted Pir Panjal horizons.', 'March to October', 'Distinctive Greco-Gandharan trefoil arch Kashmir stonework', IMG.templeHimalayan],
    ['Handicrafts', 'papier-walnut', 'Srinagar Papier-Mâché Naqqashi & Carved Walnut Wood', 'Zadibal & Downtown Srinagar', 'Hand-painted gold-leaf lacquer boxes crafted from mashed wastepaper alongside chisel-carved Kashmiri walnut furniture.', 'March to October', 'GI-tagged Naqqashi floral brushwork & deep walnut relief', IMG.craftKashmir],
    ['Handlooms', 'kani-pashmina', 'Kanihama GI Kani Pashmina & Sozni Embroidered Shawls', 'Kanihama & Srinagar Old City', 'Ultra-soft Changthangi Pashmina shawls woven pixel-by-pixel using wooden kani bobbins guided by traditional talim pattern scripts.', 'March to October', 'World-renowned GI-protected Kani twill tapestry', IMG.loomHimalayan],
    ['Famous Streets', 'zaina-kadal', 'Zaina Kadal Heritage Spice Street & Dal Floating Market', 'Srinagar Old City', 'Dawn wooden shikara boats trading fresh lotus stems alongside historic copper samovar smiths and saffron alleys.', 'April to October', 'Dawn floating boat vegetable market on Dal Lake', IMG.streetMountain],
    ['Hidden Waterfalls', 'aharbal-drang', 'Aharbal (Niagara of Kashmir) & Drang Frozen Falls', 'Kulgam & Tangmarg', 'Thundering turquoise mountain waterfall tumbling through dense pine gorges in southern Kashmir’s Pir Panjal hills.', 'April to October', 'Pine-gorge Vishav River cataract in south Kashmir', IMG.waterfallForest],
    ['Local Food', 'kahwa-yakhni', 'Saffron Kahwa, Nadru Yakhni & Traditional Kashmiri Wazwan', 'Srinagar, Pampore & Jammu', 'Cinnamon-almond saffron tea brewed in copper samovars alongside crispy lotus stems in yogurt gravy and Jammu’s Rajma-Chawal.', 'Year-round', 'Pampore GI saffron culinary craft & copper-vessel simmering', IMG.foodKashmir],
    ['Culture & Traditions', 'rouf-sufiana', 'Kashmiri Rouf Folk Dance & Dogri-Santoor Traditions', 'Srinagar & Jammu', 'Graceful lined harvest dances set to soulful 100-string Santoor classical melodies and Dogri ballads.', 'March to October', 'Poetic Lal Ded & Habba Khatoon folk musical traditions', IMG.cultureFolk],
  ]),

  // 34. Ladakh
  ...buildStateCulture('Ladakh', 'la', [
    ['Local Temples', 'alchi-lamayuru', '11th-Century Alchi Choskor Murals & Lamayuru Gompa', 'Alchi & Khalatse', 'Earliest surviving Kashmiri-influenced Buddhist temple frescoes tucked along the Indus riverbank away from modern roads.', 'May to September', 'Nearly 1,000-year-old natural mineral Buddhist wall murals', IMG.templeHimalayan],
    ['Handicrafts', 'chilling-copper', 'Chilling Copper Craft & Carved Apricot-Wood Bowls', 'Chilling Village (Zanskar Gorge)', 'Hammered brass and copper butter-tea teapots inlaid with silver dragons crafted by master metalworkers in Zanskar Valley.', 'May to September', 'Historic Nepalese-Ladakhi lineage metalworking cluster', IMG.craftKashmir],
    ['Handlooms', 'ladakhi-pashmina', 'Changthang Raw Pashmina & Handwoven Snambu Wool', 'Korzok, Leh & Sham Valley', 'Soft high-altitude Changra goat down hand-combed by nomadic herders and spun into natural-dyed maroon and ochre woollens.', 'May to September', 'High-altitude nomadic wool & natural walnut-dye spinning', IMG.loomHimalayan],
    ['Famous Streets', 'leh-main-bazaar', 'Leh Old Town Pedestrian Bazaar & Tibetan Artisan Alleys', 'Leh', 'Cobblestoned mountain market square framed by Stok Kangri peaks featuring dried apricots, sea-buckthorn juice, and woollens.', 'May to September', 'High-altitude Himalayan caravan crossroads market', IMG.streetMountain],
    ['Hidden Waterfalls', 'mangyu-turtuk', 'Turtuk Waterfall & Chumatang Warm Stream Cascades', 'Nubra Valley & Shyok Gorge', 'Glacial stream cascading straight down steep Karakoram granite cliffs above Turtuk’s lush apricot terraces.', 'May to September', 'Karakoram apricot-orchard snowmelt waterfall', IMG.waterfallCascade],
    ['Local Food', 'skyu-thukpa', 'Ladakhi Skyu Stew, Chutagi Bowtie Pasta & Sea-Buckthorn', 'Leh, Sham Valley & Nubra', 'Hand-rolled barley-wheat pasta simmered with root vegetables and tangy apricot-sea-buckthorn infusions to beat mountain chill.', 'Year-round', 'High-altitude barley Tsampa & organic apricot gastronomy', IMG.foodHimalayan],
    ['Culture & Traditions', 'hemis-losar', 'Hemis Cham Masked Dance & Ladakh Archery Gatherings', 'Hemis, Thiksey & Leh', 'Spectacular monastic masked dances set to echoing copper dungchen horns alongside festive village archery competitions.', 'June to August & Winter Losar', 'Preserved Bhoti Buddhist monastic festivals & Brokpa attire', IMG.cultureFolk],
  ]),

  // 35. Lakshadweep
  ...buildStateCulture('Lakshadweep', 'ld', [
    ['Local Temples', 'ujra-cultural', 'Ujra Coral-Carved Heritage Shrine & Kavaratti Maritime Heritage', 'Kavaratti & Agatti Islands', 'Historic island stone-and-coral architecture adorned with intricate floral woodcarvings crafted by island artisans.', 'October to April', 'Rare carved drift-timber & coral-stone island heritage', IMG.templeAncient],
    ['Handicrafts', 'coir-boat', 'Minicoy Jahadhoni Wooden Boat Models & Island Coir Craft', 'Minicoy & Kalpeni Islands', 'Hand-carved scaled wooden sailing vessels and woven golden coconut-coir mats created using traditional island joinery.', 'October to April', 'Historic Arab-Sea maritime boatbuilding miniature craft', IMG.craftBamboo],
    ['Handlooms', 'island-mundu', 'Minicoy Checked Waistcloth (Feyli) & Coir Yarn Spinning', 'Minicoy & Andrott Islands', 'Traditional striped hand-spun cotton island wraps worn for ceremonial Lava dances alongside golden coconut-husk coir twisting.', 'October to April', 'Traditional island attire & hand-twisted coconut-fibre craft', IMG.handloomHeritage],
    ['Famous Streets', 'kavaratti-bazaar', 'Kavaratti Jetty Market & Minicoy Village Lanes', 'Kavaratti & Minicoy', 'Quiet sandy coral-paved village lanes lined with palm-sugar jaggery stalls, dried coconut copra, and friendly island spice shops.', 'October to April', 'Car-free coral-sand village lanes shaded by coconut palms', IMG.streetCoastal],
    ['Hidden Waterfalls', 'kalpeni-lagoon', 'Kalpeni Coral Reef Cascades & Minicoy Natural Tide Pools', 'Kalpeni & Minicoy Atolls', 'While flat coral atolls have no mountain waterfalls, outer-reef Atlantic-blue tide surges spill cleanly into crystal turquoise lagoons.', 'October to April', 'Natural coral-atoll reef spillways & serene turquoise tide pools', IMG.waterfallCoast],
    ['Local Food', 'masmin-mus', 'Smoked Tuna Masmin, Mus Kavaab & Coconut-Jaggery Halwa', 'Minicoy & Kavaratti', 'Traditional island delicacies blending smoked sun-dried tuna flakes with fresh grated coconut, curry leaves, and sweet palm jaggery.', 'Year-round', 'Pole-and-line sustainable tuna & fresh coconut island kitchen', IMG.foodCoastalCurry],
    ['Culture & Traditions', 'lava-kolkali', 'Minicoy Lava Drum Dance & Kolkali Stick Folk', 'Minicoy & Agatti', 'Energetic synchronized drum-led folk dances performed in bright Feyli wraps alongside Mahl-language maritime boat songs.', 'October to April', 'Distinctive Mahl language & maritime island folk traditions', IMG.cultureVillage],
  ]),

  // 36. Puducherry
  ...buildStateCulture('Puducherry', 'py', [
    ['Local Temples', 'tiruvandarkoil', '10th-Century Chola Pancanadisvara & Manakula Vinayagar', 'Tirubhuvanai & White Town', 'Early Chola sandstone inscription temple in rural Puducherry alongside vibrant gold-gilded urban courtyard shrines.', 'October to March', '10th-century Parantaka Chola stone inscriptions & murals', IMG.templeDravidian],
    ['Handicrafts', 'auroville-paper', 'Sri Aurobindo Handmade Cotton Paper & Indigo Pottery', 'White Town & Auroville', 'Archival 100% recycled cotton-rag stationery marbled with flower petals alongside wheel-thrown stoneware ceramics.', 'October to March', 'Eco-conscious cotton-rag papermaking & terracotta studios', IMG.craftWorkshop],
    ['Handlooms', 'pondicherry-cotton', 'Puducherry Kora Cotton & Natural-Indigo Textiles', 'Kurumbapet & Heritage Looms', 'Crisp handspun breathable coastal cottons dyed in organic indigo vats using classical Tamil block and stripe patterns.', 'October to March', 'Zero-synthetic coastal cotton weaving and natural indigo dyeing', IMG.handloomHeritage],
    ['Famous Streets', 'goubert-heritage', 'Goubert Market, Nehru Street & Rue Romain Rolland Lanes', 'Puducherry Heritage Town', 'Fragrant Tamil market alleys bursting with jasmine garlands and brass coffee pots right next to mustard-yellow bougainvillea boulevards.', 'October to March', 'Seamless blend of bustling Tamil bazaar & French boulevard', IMG.streetCoastal],
    ['Hidden Waterfalls', 'ossudu-gingee', 'Ousteri Wetland Cascades & Neighbouring Gingee-Gingee Hill Falls', 'Ousteri Lake & Villupuram Corridor', 'Calm coastal sanctuary lake channels paired with serene seasonal rock-stepped hill cascades along the nearby Gingee ridge.', 'November to March', 'Migratory wetland sanctuaries and nearby Eastern Ghats rock springs', IMG.waterfallCascade],
    ['Local Food', 'creole-filter', 'Franco-Tamil Creole Stew, Bouillabaisse & Filter Kaapi', 'Heritage Town & Goubert Lanes', 'Unique Pondicherry Creole seafood and coconut curries tempered with Tamil spices alongside flaky croissants and brass filter coffee.', 'Year-round', 'Living 300-year Franco-Tamil culinary fusion', IMG.foodCoastalCurry],
    ['Culture & Traditions', 'masi-magam', 'Masi Magam Coastal Procession & Kolam Heritage', 'Promenade Beach & Karaikal', 'Sacred coastal festival uniting hundreds of village temple deities along the Bay of Bengal paired with classical Tamil arts.', 'February–March & Oct–Feb', 'Harmonious Tamil, Telugu & French coastal heritage', IMG.cultureFolk],
  ]),
];
