/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RoomSuite, KashmiriAddon, MenuItem, ItineraryVibe } from './types';

import HERO_IMAGE from './assets/images/srinagar_hero_sunset_1780999836739.png';
import SUITE_IMAGE from './assets/images/srinagar_heritage_suite_1780999859445.png';
import WAZWAN_IMAGE from './assets/images/srinagar_wazwan_feast_1780999877315.png';
import HOUSEBOAT_IMAGE from './assets/images/srinagar_luxury_houseboat_1780999896162.png';

export { HERO_IMAGE, SUITE_IMAGE, WAZWAN_IMAGE, HOUSEBOAT_IMAGE };

export const SUITES: RoomSuite[] = [
  {
    id: 'maharaja-pavilion',
    name: 'The Maharaja Pavilion',
    title: 'Signature Lakefront Cedarwood Suite',
    price: 850,
    featuredImg: SUITE_IMAGE,
    shortDesc: 'A masterpiece of Khatamband cabinetry overlooking Dal Lake, adorned with pure silk linens and walnut-panel comfort.',
    longDesc: 'Draped in precious pashmina silks and hand-knotted floral rugs, this luxury suite is constructed with century-old cedar logs. A spacious private wooden veranda offers panoramic views of the mist-shrouded Zabarwan range and immediate Shikara step-down points.',
    amenities: [
      'Authentic Khatamband Timber Ceilings',
      'Private Over-water Cedar Veranda',
      'Dedicated Royal Butler Service',
      'Copper Samovar Morning Tea ritual',
      'Intricate Kashmiri Silk Robes',
      'Hand-crafted Walnut Desk & Fireplace'
    ],
    size: '1,200 sq. ft.',
    capacity: 'Up to 3 Guests',
    viewType: 'Dal Lake & Zabarwan Mountain Range'
  },
  {
    id: 'saffron-pearl',
    name: 'Saffron Pearl Suite',
    title: 'Warm Pine Mountain View Haven',
    price: 620,
    featuredImg: HOUSEBOAT_IMAGE,
    shortDesc: 'Under floor radiant warmth, fragrant pine accents, and copper fireplace lounges reflecting the golden hills.',
    longDesc: 'Crafted with premium deodar timber and underfloor heating, this mountain-facing salon represents the height of interior artistry. Includes a private copper-carved tub bath infused with biological saffron flowers and handcrafted almond milk salts.',
    amenities: [
      'Underfloor Radiative Heating',
      'Saffron-infused Soaking Copper Tub',
      'Mughal Arch Panoramic Windows',
      'Warm Deodar Wood Panels',
      'Kashmiri Walnut Carved Lounge Chair',
      'Private Organic Herb Tea Bar'
    ],
    size: '950 sq. ft.',
    capacity: '2 Guests',
    viewType: 'Zabarwan Peaks & Chinar Gardens'
  },
  {
    id: 'zabarwan-wing',
    name: 'Zabarwan Heritage Chamber',
    title: 'Gardenside Royal Residence',
    price: 490,
    featuredImg: HERO_IMAGE,
    shortDesc: 'A majestic garden suite framing ancient Chinar trees, showcasing original papier-mâché wall panels and vintage artifacts.',
    longDesc: 'Set within our carefully manicured lawns of native roses and lavender, the Zabarwan Heritage Chamber is a haven of absolute privacy. Original seventeenth-century patterns inspired by the nearby Mughal Shalimar Gardens are painted directly on the crown moldings.',
    amenities: [
      'Original Papier-mâché Crown Artistry',
      'Direct Lawn & Rose Garden Entry',
      'Vintage Stone Fireplace Hearth',
      'Rich Traditional Woolen Drapes',
      'Daily Dried Fruit & Kahwa Plate',
      'Deep Cedar Wardrobes'
    ],
    size: '800 sq. ft.',
    capacity: 'Up to 3 Guests',
    viewType: 'Chinar Forest & Mughal Lavender Beds'
  }
];

export const ADDONS: KashmiriAddon[] = [
  {
    id: 'shikara-sunrise',
    name: 'Sunrise Waterlily Shikara Row',
    price: 120,
    icon: 'Ship',
    desc: 'A private rowing excursion on Dal Lake during dawn. Witness the famous floating vegetable markets and blooming lavender lilies as mist elevates from the water.'
  },
  {
    id: 'royal-wazwan',
    name: '36-Course Wazwan Royal Dining',
    price: 150,
    icon: 'UtensilsCrossed',
    desc: 'An authentic traditional banquet dinner served on individual copper Tramis under a hand-carved mahogany archway of our sanctuary salon.'
  },
  {
    id: 'kahwa-samovar',
    name: 'Private Sommelier & Kahwa Masterclass',
    price: 80,
    icon: 'Flame',
    desc: 'A private masterclass by our master brewer. Learn the art of copper-kettle boiling, premium saffron sourcing, cardamom grinding, and blanched almond pairings.'
  },
  {
    id: 'pashmina-safari',
    name: 'Artisan Pashmina Atelier Tour',
    price: 95,
    icon: 'Compass',
    desc: 'Behind-the-scenes access to Srinagar’s family-run weaving guilds. Touch genuine 12-micron Changra wool and watch master craftsmen perform fine chains of needlework.'
  }
];

export const WAZWAN_MENU: MenuItem[] = [
  {
    name: 'Ruanagan Chaman',
    type: 'appetizer',
    localName: 'روانگان چمن',
    desc: 'Delicate cubes of fresh mountain paneer fried golden, simmered in a reduced tomato gravy spiced with hand-pounded sweet fennel and wild mountain hing.',
    potency: 'Fennel & Saffron'
  },
  {
    name: 'Tabak Maaz',
    type: 'signature',
    localName: 'تبک ماز',
    desc: 'Heritage tender lamb ribs slow-braised in direct local milk baths spiced with cloves, then shallow-fried in clarified Kashmiri ghee to a crisp, crackling parchment texture.',
    potency: 'Cloves-braised & Golden crust'
  },
  {
    name: 'Rogan Josh',
    type: 'signature',
    localName: 'روگن جوش',
    desc: 'Succulent prime cuts of shoulder lamb prepared with intense crimson color derived from dry Kashmiri Chinar-chilli hulls and traditional Maval (cockscomb flower) extracts.',
    potency: 'Cockscomb & Chinar Chilli'
  },
  {
    name: 'Gushtaba',
    type: 'signature',
    localName: 'گوشتابہ',
    desc: 'An historic Kashmiri Royal climax: silky, airy mutton meatballs manually ponded over structural walnut blocks, cooked slowly in a rich, buttery curd gravy flavored with wild mountain mint.',
    potency: 'Cardamom & Tempered Yogurt'
  },
  {
    name: 'Kashmiri Kahwa',
    type: 'beverage',
    localName: 'کہوہ',
    desc: 'Fragrant green tea leaves slow-boiled inside copper Samovars with threads of Pampore Saffron, crushed green cardamoms, cinnamon barks, finished meticulously with crushed almonds.',
    potency: 'Pure Saffron & Almonds'
  },
  {
    name: 'Shahi Saffron Phirni',
    type: 'dessert',
    localName: 'فرنی',
    desc: 'Creamy ground-rice pudding infused with intensive saffron milk, cardamom seeds, sweet rose waters, cooled and presented inside organic hand-kilned clay dishes.',
    potency: 'Pistachio & Clay Pot Saffron'
  }
];

export const ITINERARIES: ItineraryVibe[] = [
  {
    id: 'chinar-heritage',
    name: 'Cultural Heritage Vibe',
    tagline: 'Step back in time to explore sovereign wooden structures, royal Mughal gardens, and ancient stone mosques of Srinagar.',
    icon: 'Sparkles',
    days: [
      {
        dayNum: 1,
        title: 'Dawn of the Mughals',
        activity: 'A curated walking tour of Shalimar Bagh & Nishat Bagh. Enjoy private tea under the ancient 400-year-old shade of Chinar trees.',
        timing: '08:00 AM',
        location: 'Royal Mughal Gardens'
      },
      {
        dayNum: 2,
        title: 'Cedar Architecture Secrets',
        activity: 'Private exploration of Khanqah-e-Moula mosque on the banks of Jhelum River, studying its wooden pagoda craftsmanship.',
        timing: '10:30 AM',
        location: 'Old City Srinagar'
      },
      {
        dayNum: 3,
        title: 'Papier-Mâché Masterclass',
        activity: 'An interactive session in the personal studio of a National Award-winning artisan, drawing golden outlines on rich boxes.',
        timing: '02:00 PM',
        location: 'Zadibal Craft Guild'
      }
    ]
  },
  {
    id: 'lakeside-serenity',
    name: 'Romantic Serenity Vibe',
    tagline: 'An intimate escape designed around the absolute silence of high Himalayan waterways, lotuses, and twilight sails.',
    icon: 'Heart',
    days: [
      {
        dayNum: 1,
        title: 'Misty Dawn Water Lily Row',
        activity: 'A quiet boat journey through secluded canals of Dal Lake, picking fresh lavender blossoms and lotus pods.',
        timing: '05:30 AM',
        location: 'Floating Waterways'
      },
      {
        dayNum: 2,
        title: 'Chinar Forest High Tea',
        activity: 'A luxury picnic set spread on Pashmina blankets inside Dachigam Valley, tasting traditional apricot tarts and fresh Kahwa.',
        timing: '04:00 PM',
        location: 'Dachigam Reserve Bounds'
      },
      {
        dayNum: 3,
        title: 'Twilight Shikara Music Session',
        activity: 'A private candlelight boat journey accompanied by a live local Santoor instrumentalist under the rising crescent moon.',
        timing: '07:30 PM',
        location: 'Harwan Lake Waters'
      }
    ]
  },
  {
    id: 'sufi-mysticism',
    name: 'Sufi & Saffron Rituals',
    tagline: 'An introspective, spiritual odyssey focusing on early-morning Sufi chants, organic culinary secrets, and inner peace.',
    icon: 'Compass',
    days: [
      {
        dayNum: 1,
        title: 'Hazratbal Reflection & Chants',
        activity: 'Early-morning meditative sit-in at white marble Hazratbal Shrine, listening to the echoing prayers with views of the vast lake.',
        timing: '06:00 AM',
        location: 'Hazratbal Shores'
      },
      {
        dayNum: 2,
        title: 'Saffron Farm Sourcing',
        activity: 'A journey into Pampore—the Saffron Capital of Kashmir. Walk through private fields, picking fresh purple blossoms with farm elders.',
        timing: '11:00 AM',
        location: 'Pampore Plateau'
      },
      {
        dayNum: 3,
        title: 'Heritage Kahwa Ceremony',
        activity: 'Engage in a meditative tea preparation ritual at the hotel library, sampling rare wild honeys and organic almonds.',
        timing: '05:00 PM',
        location: 'The Sanctuary Library'
      }
    ]
  }
];

export const FAQS = [
  {
    question: 'Where is the resort located and how do we arrive?',
    answer: 'Srinagar Heritage Collective is nestled privately on Ghat No. 7, Dal Lake, Srinagar. We provide a complimentary luxury cedar Shikara shuttle transfer directly from the private land jetty on Boulevard Road to the resort gates.'
  },
  {
    question: 'How are you respecting the delicate ecosystem of Dal Lake?',
    answer: 'We operate with absolute ecological consciousness. The resort has the highest-tier eco-filtration bio-sewage treatment systems, zero single-use plastics, and relies entirely on raw local solar energy and handweaving/woodworking micro-economies to protect our pristine waters.'
  },
  {
    question: 'What is the best season to experience your Srinagar sanctuary?',
    answer: 'Every season in Kashmir is a different mood. Spring (April–May) presents spectacular tulip blooms; Summer (June–August) offers refreshing misty mountain breeze escaping hot plains; Autumn (September–November) is the legendary season of fiery red Chinar leaves; Winter (December–March) wraps our carved wooden arches in serene silent mountain snow with cozy fireplace warmth.'
  },
  {
    question: 'Can you cater customized dietary requirements for the Wazwan feast?',
    answer: 'Absolutely. While the legendary 36-course royal Wazwan is heavily meat-centric, our ancestral chefs have created an equally spectacular vegetarian Wazwan (utilizing local lotus stems, walnut milk, mountain mushrooms, and fresh paneer cheeses) to honor all preferences.'
  }
];
