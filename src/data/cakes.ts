import { CakeItem, Review } from '../types';

export const CAKE_ITEMS: CakeItem[] = [
  // Chocolate Cakes
  {
    id: 'choco-truffle',
    name: 'Chocolate Truffle Cake',
    category: 'chocolate',
    price: { halfKg: 450, oneKg: 850 },
    description: 'Bestselling deep, moist chocolate sponge layered with rich dark chocolate ganache. One of our most ordered signatures.',
    image: '🎂',
    tags: ['Bestseller', 'Chocolate Lovers', 'Eggless Option'],
    isEgglessAvailable: true,
    isBestSeller: true
  },
  {
    id: 'choco-nuts',
    name: 'Choco Nuts Cake',
    category: 'chocolate',
    price: { halfKg: 500, oneKg: 950 },
    description: 'Decadent chocolate layers filled with crunchy praline, roasted almonds, and walnuts for the ultimate textured bite.',
    image: '🍫',
    tags: ['Crunchy', 'Premium', 'Nutty'],
    isEgglessAvailable: true
  },
  {
    id: 'choco-normal',
    name: 'Chocolate (Normal) Cake',
    category: 'chocolate',
    price: { halfKg: 400, oneKg: 750 },
    description: 'Classic chocolate sponge with smooth, velvety chocolate cream. Soft, light, and perfectly sweet.',
    image: '🍰',
    tags: ['Classic', 'Comfort Food'],
    isEgglessAvailable: true
  },

  // Special Cakes
  {
    id: 'tres-leches',
    name: 'Tres Leches Cake',
    category: 'special',
    price: { oneKg: 900 },
    description: 'Super-moist and juicy sponge soaked in three sweet milks, topped with fresh whipped cream. Light, melt-in-the-mouth perfection.',
    image: '🥛',
    tags: ['Trending', 'Super Moist', 'Must Try'],
    isEgglessAvailable: false
  },
  {
    id: 'rasmalai-cake',
    name: 'Rasmalai Cake',
    category: 'special',
    price: { oneKg: 1200 },
    description: 'Fusion delight featuring cardamon-spiced cake infused with real sweet saffron rabri, layered with mini Rasmalai pieces.',
    image: '🍨',
    tags: ['Fusion', 'Traditional Accent', 'Premium'],
    isEgglessAvailable: true,
    isBestSeller: true
  },
  {
    id: 'purple-velvet',
    name: 'Purple Velvet Cake',
    category: 'special',
    price: { oneKg: 850 },
    description: 'An elegant variation of velvet cake with mild cocoa tones, vibrant purple crumb, and premium cream cheese frosting.',
    image: '🌌',
    tags: ['Elegant', 'Celebration Choice'],
    isEgglessAvailable: true
  },
  {
    id: 'kifaya-cake',
    name: 'Kifaya Special Cake',
    category: 'special',
    price: { oneKg: 1200 },
    description: 'A luxurious multi-layered premium cake, bursting with exotic rich dry fruits, nuts, cream, and homemade sweetness.',
    image: '👑',
    tags: ['Manju Exclusive', 'Luxury'],
    isEgglessAvailable: true
  },
  {
    id: 'kulfi-cake',
    name: 'Kulfi Cake',
    category: 'special',
    price: { oneKg: 1000 },
    description: 'Cold, spiced cardamom and saffron layers capturing the signature creamy flavor of royal Indian Kulfi.',
    image: '🍦',
    tags: ['Fusion', 'Summer Special'],
    isEgglessAvailable: true
  },
  {
    id: 'gulab-jamun-cake',
    name: 'Gulab Jamun Cake',
    category: 'special',
    price: { oneKg: 1000 },
    description: 'Festive sponge cake soaked with sweet saffron syrup, decorated with real homemade mini gulab jamuns on top.',
    image: '🥮',
    tags: ['Festive Favorite', 'Sweet Treat'],
    isEgglessAvailable: true
  },
  {
    id: 'redbee-cake',
    name: 'Redbee Cake',
    category: 'special',
    price: { oneKg: 1000 },
    description: 'Rich and vibrant red velvet blend sponge cake with rich whipped white layers and subtle cocoa hints.',
    image: '🎨',
    tags: ['Vibrant', 'Romantic'],
    isEgglessAvailable: true
  },
  {
    id: 'neopolitan-cake',
    name: 'Neopolitan Cake',
    category: 'special',
    price: { oneKg: 950 },
    description: 'Three glorious flavors in one: layered strawberries, vanilla, and chocolate bakes crafted in perfect alignment.',
    image: '🧁',
    tags: ['Three-in-One', 'Colorful'],
    isEgglessAvailable: false
  },
  {
    id: 'toffee-cake',
    name: 'Toffee Cake',
    category: 'special',
    price: { oneKg: 950 },
    description: 'Gooey dates infused sponge doused in sticky buttery homemade toffee sauce. Incredibly indulgent.',
    image: '🍯',
    tags: ['Indulgent', 'Caramel Caramel'],
    isEgglessAvailable: true
  },

  // Fruit & Delight Cakes
  {
    id: 'tender-coconut',
    name: 'Tender Coconut Cake',
    category: 'fruit',
    price: { oneKg: 950 },
    description: 'Freshly grated tender coconut pieces layered with soft milk sponge and coconut cream. Mild, airy, and heavenly.',
    image: '🥥',
    tags: ['Bestseller', 'Local Choice', 'Extremely Popular'],
    isEgglessAvailable: true,
    isBestSeller: true
  },
  {
    id: 'butterscotch',
    name: 'Butterscotch Cake',
    category: 'fruit',
    price: { oneKg: 850 },
    description: 'Creamy caramel sponge decorated with crunchy homemade butterscotch chips and loaded butterscotch cream.',
    image: '🥯',
    tags: ['Kids Favorite', 'Classic Crunchy'],
    isEgglessAvailable: true,
    isBestSeller: true
  },
  {
    id: 'milky-butterscotch',
    name: 'Milky Butterscotch Cake',
    category: 'fruit',
    price: { oneKg: 900 },
    description: 'Butterscotch cake with an extra splash of condensed milk hydration and smooth white chocolate butterscotch cream.',
    image: '🥛',
    tags: ['Extra Milky', 'Sweet Delight'],
    isEgglessAvailable: true
  },
  {
    id: 'choco-butterscotch',
    name: 'Choco Butterscotch Cake',
    category: 'fruit',
    price: { oneKg: 900 },
    description: 'An outstanding combo of deep chocolate fudge drizzle mixed with crunchy butterscotch nodes.',
    image: '🍩',
    tags: ['Blend', 'Sweet & Crunch'],
    isEgglessAvailable: true
  },
  {
    id: 'milky-nuts',
    name: 'Milky Nuts Cake',
    category: 'fruit',
    price: { oneKg: 900 },
    description: 'Creamy sweet condensed milk sponge layered with a balanced mixture of roasted pistachios, cashews, and almonds.',
    image: '🥜',
    tags: ['Rich', 'Nutty goodness'],
    isEgglessAvailable: true
  },
  {
    id: 'coffee-cake',
    name: 'Coffee Cake',
    category: 'fruit',
    price: { oneKg: 800 },
    description: 'Aromatic espresso integrated sponge doused with smooth coffee liqueur syrup and whipped mocha frosting.',
    image: '☕',
    tags: ['Coffee Lovers', 'Rich Aroma'],
    isEgglessAvailable: true
  },
  {
    id: 'fresh-fruit-cake',
    name: 'Fresh Fruit Cake',
    category: 'fruit',
    price: { oneKg: 950 },
    description: 'Light vanilla sponge layered with custard and seasonal chopped fresh fruits (Kiwi, apple, grapes, pineapple). No added preservation.',
    image: '🍇',
    tags: ['Fruit Loaded', 'Healthy Touch', 'No Added Colors'],
    isEgglessAvailable: true
  },
  {
    id: 'pineapple-cake',
    name: 'Pineapple Cake',
    category: 'fruit',
    price: { oneKg: 750 },
    description: 'Traditional tropical light sponge layered with sweet, juicy crushed pineapple chunks and vanilla froth.',
    image: '🍍',
    tags: ['Tangy', 'Simple & Classic'],
    isEgglessAvailable: true
  },
  {
    id: 'strawberry',
    name: 'Strawberry Cake',
    category: 'fruit',
    price: { halfKg: 425, oneKg: 750 },
    description: 'Charming pink strawberry sponge layers filled with sweet real homemade strawberry reduction and fruit slots.',
    image: '🍓',
    tags: ['Refreshing', 'Kids safe'],
    isEgglessAvailable: true
  },
  {
    id: 'mango-truffle',
    name: 'Mango Truffle',
    category: 'fruit',
    price: { halfKg: 425, oneKg: 750 },
    description: 'Rich white chocolate sponge paired with high-quality real seasonal mango pulp and sweet cream filling.',
    image: '🥭',
    tags: ['Seasonal Charm', 'Velvety'],
    isEgglessAvailable: true
  },

  // No-Cream Cakes (Healthy, tea-ready options)
  {
    id: 'tea-cake',
    name: 'Classic Tea Cake',
    category: 'nocream',
    price: { fixed: 260 },
    description: 'Simple, fragrant, butter-baked golden sponge. Extremely light and absolute best paired with hot cardamom tea.',
    image: '🍞',
    tags: ['Healthy Choice', 'No Cream', 'Less Calories', 'Tea Companion'],
    isEgglessAvailable: true
  },
  {
    id: 'ghee-cake',
    name: 'Pure Ghee Cake',
    category: 'nocream',
    price: { fixed: 350 },
    description: 'Rich and buttery soft sponge baked with 100% pure fragrant traditional ghee. Immensely melt-in-mouth.',
    image: '🧈',
    tags: ['Rich Ghee', 'Traditional', 'No Cream', 'Bestseller'],
    isEgglessAvailable: true,
    isBestSeller: true
  },
  {
    id: 'tuttifruti-cake',
    name: 'Tuttifruti Cake',
    category: 'nocream',
    price: { fixed: 300 },
    description: 'Fun cake baked with a generous scatter of colorful candied fruits. Perfect sweet teatime dry cake for kids.',
    image: '🌈',
    tags: ['Kids Safe', 'Teatime', 'No Cream', 'Flavorful'],
    isEgglessAvailable: true
  },
  {
    id: 'plum-cake',
    name: 'Traditional Plum Cake',
    category: 'nocream',
    price: { fixed: 300 },
    description: 'Classic rich fruit cake loaded with orange-juice-soaked dry grapes, black raisins, nuts, and traditional warm spices.',
    image: '🍒',
    tags: ['Spiced', 'Festive Rich', 'No Cream'],
    isEgglessAvailable: true
  },

  // Mini Cakes
  {
    id: 'cake-pops',
    name: 'Cake Pops (Each)',
    category: 'mini',
    price: { fixed: 28, isEstimatedRange: true, rangeStart: 25, rangeEnd: 30 },
    description: 'Fun crumble cake spheres mixed with chocolate truffle, mounted on sticks, and dipped in colorful crisp chocolate shells.',
    image: '🍡',
    tags: ['Bite Sized', 'Kids Treat', 'Parties'],
    isEgglessAvailable: true
  },
  {
    id: 'cakesicles',
    name: 'Premium Cakesicles (Each)',
    category: 'mini',
    price: { fixed: 55, isEstimatedRange: true, rangeStart: 50, rangeEnd: 60 },
    description: 'Popsicle-shaped cake delights coated in hard shell chocolate, with elegant golden drizzles and custom theme decor templates.',
    image: '🍭',
    tags: ['Themed Spec', 'Kids Treat'],
    isEgglessAvailable: true
  },
  {
    id: 'jar-cake',
    name: 'Dessert Jar Cake',
    category: 'mini',
    price: { fixed: 125, isEstimatedRange: true, rangeStart: 100, rangeEnd: 150 },
    description: 'Layered premium cake frosting, syrups, and cake crumbles packed tightly inside small airtight glass/acrylic jars.',
    image: '🫙',
    tags: ['Cute Packs', 'Gift Item', 'Portioned'],
    isEgglessAvailable: true
  },
  {
    id: 'cup-cake',
    name: 'Custom Cup Cakes (Pack of 6)',
    category: 'mini',
    price: { fixed: 240 }, // estimate or customized basis
    description: 'Fluffy portioned cupcakes matching your celebration theme. Custom pricing. Call/WhatsApp for tailored frosting styles.',
    image: '🧁',
    tags: ['Portioned', 'Theme Customized'],
    isEgglessAvailable: true
  },
  {
    id: 'pastry',
    name: 'Individual Pastry Slices',
    category: 'mini',
    price: { fixed: 60 },
    description: 'Single-serving rectangular cuts of your favorite premium cake, perfectly packed for quick takeaway sweet-tooth cravings.',
    image: '🍰',
    tags: ['Takeaway Special', 'Single Portion'],
    isEgglessAvailable: true
  }
];

export const REAL_REVIEWS: Review[] = [
  {
    id: 'rev-0',
    author: 'Lakshmi 13',
    rating: 5,
    timeAgo: '3 months ago',
    text: "Ordered for my husband's birthday. Loved the taste. Delivery was also on time. No hassle at all. Simple yet everything i hoped for❤️ Thank you sooo much for this. I wish you open an outlet or cafe soon so that we all can have anytime access.",
    reviewCount: 6,
    photosCount: 1,
    responseByOwner: "Thankyou so much...you made my day 🤗☺️",
    tags: ['eggless cake', 'homemade cake']
  },
  {
    id: 'rev-1',
    author: 'Jyothi R',
    rating: 5,
    timeAgo: '4 months ago',
    text: "I have ordered a cake for my son's birthday celebration at school. The cake was perfect, with less cream and no added colors, which was absolutely safe for kids. Also, she made the theme I told her, which was what I actually wanted, and everything turned out perfect.Thank you❤️",
    reviewCount: 2,
    photosCount: 1,
    responseByOwner: "Thank you sooo much jyothi😊",
    tags: ['homemade cake', 'eggless cake']
  },
  {
    id: 'rev-2',
    author: 'Divya Nayak',
    rating: 5,
    timeAgo: '3 months ago',
    text: "Just loved the treats from here! 🍰 Tried both veg and non-veg cakes, and everything was spot on! 🍰 Bakes in super clean hygiene 👍🏼. Recently tried their new Honey Cake - wow, value for money and super delicious! 😋 Highly recommend!",
    reviewCount: 1,
    photosCount: 2,
    responseByOwner: "Thanks a lottt Divya,means a lottt☺️😊",
    tags: ['honey cake', 'eggless cake']
  },
  {
    id: 'rev-3',
    author: 'Updates by visitors',
    rating: 5,
    timeAgo: '3 months ago',
    text: "Had ordered two cakes from Manju.One was butterscotch and the other chocolate truffles cake.Both cakes were eggless and the taste was heavenly.The birthday celebration of father son duo just got a whole lot sweeter thanks to your cakes. .It was ordered the previous day..in such short notice got it delivered at the given time on the birthday.Thanks a lot and looking forward to ordering more from The Cakery.",
    tags: ['butterscotch', 'chocolate truffle cake', 'eggless cake']
  }
];
