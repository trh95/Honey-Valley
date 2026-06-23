import { Product, Testimonial } from '../types';

export const products: Product[] = [
  {
    id: 'acacia-honey',
    name: 'Acacia Honey',
    description: 'Light, clear, and delicately sweet. Sourced from organic acacia tree blossoms.',
    longDescription: 'Honey Valley\'s organic Acacia Honey is highly prized for its pure crystal-clear appearance and light, delicate floral taste. It remains in its liquid state for an extended period because of its high fructose levels, making it the perfect tabletop sweetener for tea, pancakes, and fine desserts without altering their natural flavors.',
    price: 18.99,
    image: '/src/assets/images/acacia_honey_jar_1781800227523.jpg',
    category: 'Monofloral',
    stock: 12,
    weight: '500g',
    origin: 'Golden Meadows',
    harvestSeason: 'Late Spring',
    rating: 4.9,
    reviewsCount: 48
  },
  {
    id: 'linden-honey',
    name: 'Linden Honey',
    description: 'Fresh and fragrant woody-mint aroma with a medium golden hue.',
    longDescription: 'Our exquisite Linden Honey is harvested from ancient Linden forests during the height of mid-summer. It possesses a distinctively sweet, warm herbal taste complemented by a fine touch of fresh woody-mint. Known traditionally for its soothing properties, this honey is a soothing companion for cold winter nights.',
    price: 16.49,
    image: '/src/assets/images/linden_honey_jar_hex_1781801283205.jpg',
    category: 'Forest-Born',
    stock: 24,
    weight: '500g',
    origin: 'Whispering Woods',
    harvestSeason: 'Mid Summer',
    rating: 4.8,
    reviewsCount: 32
  },
  {
    id: 'canola-honey',
    name: 'Canola Honey',
    description: 'Creamy white texture with a mild sweetness and fresh, buttery floral fragrance.',
    longDescription: 'Our whipped Canola Honey is crystallised under controlled temperatures to yield a luxurious spreadable, butter-like consistency. Sourced from expansive yellow canola fields, it has an incredibly mild, smooth sweetness that melts on your tongue. Perfect on hot toast or dynamic vinaigrettes.',
    price: 14.99,
    image: '/src/assets/images/canola_honey_jar_hex_1781801540716.jpg',
    category: 'Creamed',
    stock: 18,
    weight: '500g',
    origin: 'Valley Springs',
    harvestSeason: 'Early Spring',
    rating: 4.7,
    reviewsCount: 19
  },
  {
    id: 'wildflower-honey',
    name: 'Wildflower Honey',
    description: 'Rich, golden, multi-floral blend reflecting the true diversity of our fields.',
    longDescription: 'Harvested from fields hosting a vibrant medley of wild blossoms, our Wildflower Honey is a polyfloral masterpiece. Its flavor profile evolves year-on-year, echoing the specific flowers visited by our bees. It has a robust, well-rounded sweetness with vibrant fruity and deep woody undertones.',
    price: 15.99,
    image: '/src/assets/images/wildflower_honey_jar_hex_1781801828176.jpg',
    category: 'Polyfloral',
    stock: 45,
    weight: '500g',
    origin: 'Meadowlands Foothills',
    harvestSeason: 'Summer',
    rating: 4.9,
    reviewsCount: 64
  },
  {
    id: 'forest-honey',
    name: 'Forest Honey',
    description: 'Deep, dark, mineral-rich nectar with complex malted bark characters.',
    longDescription: 'Forest Honey, also known as honeydew honey, is collected by our bees from wild coniferous and deciduous trees in deep mountainous forests. This honey is dark, rich, and intensely aromatic, containing higher mineral concentrations and antioxidants. It features complex caramel taste profiles without excessive sweetness.',
    price: 19.99,
    image: '/src/assets/images/forest_honey_jar_hex_1781802169358.jpg',
    category: 'Forest-Born',
    stock: 8,
    weight: '500g',
    origin: 'Blackwood Range',
    harvestSeason: 'Late Summer',
    rating: 5.0,
    reviewsCount: 27
  },
  {
    id: 'sunflower-honey',
    name: 'Sunflower Honey',
    description: 'Vibrant, sunny golden nectar that naturally crystallizes into a pleasant texture.',
    longDescription: 'Brimming with the energy of late summer sunflowers, this honey is instantly recognizable by its beautiful glowing yellow color. It has a fresh, fruity, sweet fragrance and naturally crystallizes quickly into fine, crunchy honey grains that offer an exquisite texture on waffles, yogurt, and sourdough.',
    price: 13.99,
    image: '/src/assets/images/sunflower_honey_jar_1781800295939.jpg',
    category: 'Monofloral',
    stock: 15,
    weight: '500g',
    origin: 'Sunward Plains',
    harvestSeason: 'Late Summer',
    rating: 4.6,
    reviewsCount: 15
  }
];

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Sarah Jenkins',
    role: 'Artisanal Baker',
    rating: 5,
    text: 'The Acacia Honey from Honey Valley is an indispensable ingredient in my pastries. Its crystal-clear profile and delicate sweetening capability elevate our sweet sourdough breads entirely.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: 't2',
    name: 'Oliver Vance',
    role: 'Tea Specialist & Enthusiast',
    rating: 5,
    text: 'I am extremely meticulous about what goes into my specialty teas. Forest Honey\'s dark, mineral-rich richness brings out outstanding malty characteristics without overwhelming the tea leaf bouquets.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: 't3',
    name: 'Emily Thompson',
    role: 'Sustainable Homesteader',
    rating: 5,
    text: 'Finding honey that is 100% pure and sustainably harvested is incredibly rare. Honey Valley fulfills and exceeds all my expectations, down to the premium glass packaging and beautiful eco-conscious branding.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150'
  }
];

export const faqs = [
  {
    question: 'How do you ensure your honey is 100% natural?',
    answer: 'We harvest our honey directly from our own managed beehives located in organic, nectar-rich flora zones. We do not boil, ultra-filter, or adulterate our honey with high-fructose corn syrups or any sugar additives. It goes through a simple coarse mesh filtration to remove hive debris while retaining all raw pollens, minerals, and natural structures.'
  },
  {
    question: 'Why does my honey look cloudy or granulated?',
    answer: 'Crystallization is a completely natural physical process for pure, unprocessed honey. Depending on the glucose-to-fructose ratio, certain honey types (like Sunflower and Canola) will crystallize quickly into delicious buttery spreads or fine grains. This is concrete proof of pure, raw honey! It does not spoil and can be liquefied by bathing the jar in warm water (under 40°C).'
  },
  {
    question: 'What does "Bee Positive" mean?',
    answer: '"Bee Positive" is our guiding family philosophy. It represents our commitment to circular farming, sustainable eco-friendly beekeeping practices that support local bee colonies, and delivering happiness and natural vitality to our wonderful customers.'
  },
  {
    question: 'Do you ship in eco-friendly packaging?',
    answer: 'Absolutely! All our premium honeys are bottled in recyclable high-quality glass jars rather than plastic. For shipping, we utilize recycled sturdy craft boxes and biodegradable honeycombed paper cushion wraps to eliminate plastic waste.'
  }
];
