// ============================================================================
// STORE CONFIGURATION & PRODUCT DATA
// ============================================================================
// Edit this file to update prices, phone numbers, PocketBase URL, and catalog.
// No admin UI is exposed in the frontend.

// PocketBase Backend Configuration
export const POCKETBASE_URL = 'https://spb.tmadhu.me';
export const PB_URL = POCKETBASE_URL;
export const PB_PRODUCTS_COLLECTION = 'products'; // Table 1: Dynamic Jacket Photos & Stock
export const PB_HOODIES_COLLECTION = 'hoodies';   // Table 2: Dynamic Hoodie Photos & Stock
export const PB_ORDERS_COLLECTION = 'orders';     // Table 3: Customer Orders

// Store Pricing
export const UNIT_PRICE = 1350; // Bonded Jacket default price
export const DEFAULT_UNIT_PRICE = UNIT_PRICE;
export const DEFAULT_JACKET_PRICE = 1350;
export const DEFAULT_HOODIE_PRICE = 650;

// Contact & Support Representatives (with Call & WhatsApp)
export const CONTACTS = [
  {
    name: 'Sami',
    phone: '01889-279331',
    cleanPhone: '01889279331',
    whatsapp: '8801889279331'
  },
  {
    name: 'Ashraful',
    phone: '01985-968545',
    cleanPhone: '01985968545',
    whatsapp: '8801985968545'
  }
];

export const PRIMARY_CONTACT = CONTACTS[0];
export const MERCHANT_PHONE = '01985968545'; // Official bKash & Nagad number
export const WHATSAPP_NUMBER = '01985968545';
export const CONTACT_EMAIL = 'sparklifying@gmail.com';
export const MERCHANT_EMAIL = CONTACT_EMAIL;

// Pre-Order Campaign & Physical Trial Spot Details
export const PREORDER_PROMO = {
  badgeEn: 'Winter 2026 Pre-Order · Direct Campus Trial',
  badgeBn: 'শীতকালীন ২০২৬ প্রি-অর্ডার · সরাসরি ট্রায়াল সুযোগ',
  headlineEn: 'Pre-Order Now · Feel the Quality Directly Before Ordering',
  headlineBn: 'একমাত্র আমরাই দিচ্ছি আপনার পছন্দের শীতের পোশাক টি সরাসরি দেখে নেওয়ার সুযোগ ।',
  taglineEn: 'Available in 2 Signature Collegiate Editions',
  taglineBn: 'দুইটি সিগনেচার ডিজাইনে পাওয়া যাচ্ছে',
  locationEn: 'Location: Sahid Rafiq Jabbar Hall, Generator Bazar, Bottola, JU',
  locationBn: 'স্থান: রফিক জব্বার হল, জেনারেটর বাজার, বটতলা, জাবি',
  jacketTypeEn: 'Premium Quality Bonded Winter Jacket',
  jacketTypeBn: 'প্রিমিয়াম কোয়ালিটি বন্ডেড উইন্টার জ্যাকেট'
};

// Premium Bonded Jacket Key Features
export const KEY_FEATURES = [
  {
    icon: 'ShieldCheck',
    titleEn: 'Water Proof',
    titleBn: 'ওয়াটার প্রুফ',
    descEn: 'High-density water repellent outer bonded layer.',
    descBn: 'বৃষ্টি ও কুয়াশা প্রতিরোধী হাই-ডেনসিটি আউটার বন্ডেড ফেব্রিক।'
  },
  {
    icon: 'Layers',
    titleEn: 'Double Part Construction',
    titleBn: 'ডাবল পার্ট প্রটেকশন',
    descEn: 'Reinforced dual-layer bonded fabric for heavy winter shield.',
    descBn: 'কনকনে শীতের জন্য দ্বিগুণ স্তরের প্রিমিয়াম বন্ডেড ফ্যাব্রিক।'
  },
  {
    icon: 'Sparkles',
    titleEn: 'Gorgeous Outlook',
    titleBn: 'গর্জিয়াস আউটলুক',
    descEn: 'Sharp, tailored silhouette engineered for collegiate styling.',
    descBn: 'ক্যাম্পাসের জন্য মানানসই শার্প ও প্রিমিয়াম এডিটোরিয়াল ফিট।'
  },
  {
    icon: 'Feather',
    titleEn: '4 Ounce Peding Inner Side',
    titleBn: '৪ আউন্স প্যাডিং ইনার সাইড',
    descEn: 'Thick, ultra-warm 4oz quilted padding insulation.',
    descBn: 'ভেতরে ৪ আউন্সের নরম ও অত্যন্ত উষ্ণ কুইল্টেড প্যাডিং।'
  },
  {
    icon: 'Wallet',
    titleEn: 'Pocket Inner Side',
    titleBn: 'ভেতরের সিক্রেট পকেট',
    descEn: 'Concealed secure chest pocket for phone, keys & cards.',
    descBn: 'মোবাইল, ওয়ালেট ও প্রয়োজনীয় জিনিস নিরাপদে রাখার ভেতরের পকেট।'
  },
  {
    icon: 'Lock',
    titleEn: 'Original YKK Metal Chain',
    titleBn: 'অরিজিনাল YKK মেটাল চেইন',
    descEn: 'Ultra-durable, smooth gliding premium YKK metal zipper.',
    descBn: 'সবচেয়ে নির্ভরযোগ্য ও দীর্ঘস্থায়ী অরিজিনাল YKK মেটাল জিপার।'
  }
];

// Premium Winter Hoodie Key Features (330± GSM Brushed Fleece)
export const HOODIE_FEATURES = [
  {
    icon: 'Shirt',
    titleEn: '330± GSM Brushed Fleece',
    titleBn: '৩৩০± জিএসএম ব্রাশড ফ্লিস',
    descEn: 'Heavyweight premium brushed fleece for genuine winter warmth.',
    descBn: 'কনকনে শীতের জন্য প্রিমিয়াম ৩৩০± জিএসএম ব্রাশড ফ্লিস ফ্যাব্রিক।'
  },
  {
    icon: 'Layers',
    titleEn: 'Regular Fit',
    titleBn: 'রেগুলার ফিট',
    descEn: 'Comfortable, relaxed silhouette for campus & daily wear.',
    descBn: 'ক্যাম্পাস ও প্রাত্যহিক ব্যবহারের জন্য মানানসই রেগুলার ফিট।'
  },
  {
    icon: 'ShieldCheck',
    titleEn: 'Double Layer Hood',
    titleBn: 'ডাবল লেয়ার হুড',
    descEn: 'Dual-layered structured hood for maximum ear & head protection.',
    descBn: 'কান ও মাথার সর্বোত্তম উষ্ণতায় ডাবল লেয়ার স্ট্রাকচার্ড হুড।'
  },
  {
    icon: 'Sparkles',
    titleEn: 'Premium Quality Stitching',
    titleBn: 'প্রিমিয়াম কোয়ালিটি স্টিচিং',
    descEn: 'Reinforced dual-needle seams engineered for heavy durability.',
    descBn: 'দীর্ঘস্থায়িত্বের নিশ্চয়তায় ডাবল নিডেল মজবুত স্টিচিং।'
  },
  {
    icon: 'Palette',
    titleEn: 'Color Fastness Guaranteed',
    titleBn: 'কালার ফাস্টনেস গ্যারান্টি',
    descEn: 'Color retention guaranteed; zero fading after multiple washes.',
    descBn: 'ধোয়ার পরও রঙ উজ্জ্বল ও অক্ষুণ্ণ থাকার শতভাগ নিশ্চয়তা।'
  },
  {
    icon: 'Package',
    titleEn: '1/1 Individual Poly Pack',
    titleBn: '১/১ ইন্ডিভিজুয়াল পলি প্যাক',
    descEn: 'Sealed individual premium master poly packaging.',
    descBn: 'ধুলোবালি মুক্ত ফ্রেশ প্রিমিয়াম মাস্টার পলি প্যাকেজিং।'
  }
];

// Core Product Color Options (Common/Simple Names)
export const COLORS = [
  {
    id: 'Black',
    hex: '#141518',
    secondaryHex: '#22242a',
    ribHex: '#0b0c0e',
    nameEn: 'Black',
    nameBn: 'ব্ল্যাক'
  },
  {
    id: 'Dark Navy Blue',
    hex: '#162238',
    secondaryHex: '#203152',
    ribHex: '#0e1626',
    nameEn: 'Navy Blue',
    nameBn: 'নেভি ব্লু'
  },
  {
    id: 'Maroon',
    hex: '#4E1622',
    secondaryHex: '#681e2e',
    ribHex: '#360e17',
    nameEn: 'Maroon',
    nameBn: 'মেরুন'
  },
  {
    id: 'Brown',
    hex: '#4A3B32',
    secondaryHex: '#5C4A3E',
    ribHex: '#382B24',
    nameEn: 'Brown',
    nameBn: 'ব্রাউন'
  }
];

// 2 Signature Fixed Editions (as specified: "দুইটি ডিজাইনে পাওয়া যাচ্ছে")
export const DESIGNS = [
  {
    id: 'design_01',
    codeEn: 'Edition 01',
    codeBn: 'এডিশন ০১',
    nameEn: 'JU Geometric Neon-Green Emblem',
    nameBn: 'জাবি জ্যামিতিক নিয়ন-গ্রিন এমব্লেম',
    descEn: 'Bold geometric JU monogram over royal-blue brush stroke & collegiate arch.',
    descBn: 'রয়্যাল-ব্লু ব্রাশ স্ট্রোক এবং জাবি মনোগ্রামের সিগনেচার ব্যাক প্রিন্ট।'
  },
  {
    id: 'design_02',
    codeEn: 'Edition 02',
    codeBn: 'এডিশন ০২',
    nameEn: 'JU Campus Art Edition',
    nameBn: 'জাবি ক্যাম্পাস আর্ট এডিশন',
    descEn: 'Signature JU block typography filled with campus architectural & nature art.',
    descBn: 'ক্যাম্পাসের প্রকৃতি ও স্থাপত্যের আদলে তৈরি জাবি ব্লক টাইপোগ্রাফি।'
  }
];

// Exact Sizing Dimensions (in inches as specified)
// Jackets: S, M, L, XL, 2XL
export const JACKET_SIZES = ['S', 'M', 'L', 'XL', '2XL'];
export const SIZES = {
  S: { chest: 38, length: 27 },
  M: { chest: 40, length: 28 },
  L: { chest: 43, length: 29 },
  XL: { chest: 46, length: 30 },
  '2XL': { chest: 50, length: 30 },
  XXL: { chest: 50, length: 30 } // Backward compatible alias
};
export const SIZE_LIST = JACKET_SIZES;

// Hoodies: Strictly M, L, XL
export const HOODIE_SIZES = ['M', 'L', 'XL'];
export const HOODIE_SIZES_MAP = {
  M: { chest: 40, length: 28 },
  L: { chest: 43, length: 29 },
  XL: { chest: 46, length: 30 }
};

// Default Fallback Catalog (Jackets & Hoodies)
// In PocketBase, each product has multiple photos in the `images` field!
export const DEFAULT_CATALOG = [
  // --- Bonded Winter Jackets (৳1,350) ---
  {
    id: 'spk-jkt-blk',
    category: 'jacket',
    colorId: 'Black',
    designId: 'JU Signature Bonded Jacket',
    stockType: 'ready_stock',
    badgeEn: 'Popular · Ready Stock',
    badgeBn: 'জনপ্রিয় · রেডি স্টক',
    availableSizes: ['S', 'M', 'L', 'XL', '2XL'],
    price: 1350,
    images: [],
    back_image_url: '',
    front_image_url: ''
  },
  {
    id: 'spk-jkt-nvy',
    category: 'jacket',
    colorId: 'Dark Navy Blue',
    designId: 'JU Signature Bonded Jacket',
    stockType: 'ready_stock',
    badgeEn: 'Campus Hit',
    badgeBn: 'ক্যাম্পাস হিট',
    availableSizes: ['S', 'M', 'L', 'XL', '2XL'],
    price: 1350,
    images: [],
    back_image_url: '',
    front_image_url: ''
  },
  {
    id: 'spk-jkt-mrn',
    category: 'jacket',
    colorId: 'Maroon',
    designId: 'JU Signature Bonded Jacket',
    stockType: 'ready_stock',
    badgeEn: 'Heritage',
    badgeBn: 'হেরিটেজ',
    availableSizes: ['S', 'M', 'L', 'XL', '2XL'],
    price: 1350,
    images: [],
    back_image_url: '',
    front_image_url: ''
  },
  // --- Winter Hoodies (৳650, Sizes: M, L, XL) ---
  {
    id: 'spk-hd-blk',
    category: 'hoodie',
    colorId: 'Black',
    designId: 'JU Collegiate Winter Hoodie',
    stockType: 'ready_stock',
    badgeEn: 'New Arrival',
    badgeBn: 'নতুন কালেকশন',
    availableSizes: ['M', 'L', 'XL'],
    price: 650,
    images: [],
    back_image_url: '',
    front_image_url: ''
  },
  {
    id: 'spk-hd-nvy',
    category: 'hoodie',
    colorId: 'Dark Navy Blue',
    designId: 'JU Collegiate Winter Hoodie',
    stockType: 'ready_stock',
    badgeEn: 'Popular',
    badgeBn: 'জনপ্রিয়',
    availableSizes: ['M', 'L', 'XL'],
    price: 650,
    images: [],
    back_image_url: '',
    front_image_url: ''
  },
  {
    id: 'spk-hd-brn',
    category: 'hoodie',
    colorId: 'Brown',
    designId: 'JU Collegiate Winter Hoodie',
    stockType: 'ready_stock',
    badgeEn: 'New Color',
    badgeBn: 'নতুন কালার',
    availableSizes: ['M', 'L', 'XL'],
    price: 650,
    images: [],
    back_image_url: '',
    front_image_url: ''
  }
];

export const INITIAL_CATALOG = DEFAULT_CATALOG;

// Campus Delivery Zones (100% Free for all JU zones)
export const DELIVERY_ZONES = [
  {
    id: 'JU Campus Halls (All Halls)',
    en: 'JU Campus Halls (All Halls)',
    bn: 'জাবি ক্যাম্পাস হলসমূহ (সকল হল)'
  },
  {
    id: 'Bottola / Dairy Gate / Prantik',
    en: 'Bottola / Dairy Gate / Prantik',
    bn: 'বটতলা / ডেইরি গেট / প্রান্তিক'
  },
  {
    id: 'Ambagan Area',
    en: 'Ambagan Area',
    bn: 'আমবাগান এলাকা'
  },
  {
    id: 'Islamnagar / Gerua Area',
    en: 'Islamnagar / Gerua Area',
    bn: 'ইসলামনগর / গেরুয়া এলাকা'
  }
];

// Payment Methods
export const PAYMENT_METHODS = [
  { id: 'COD', en: 'Cash on Delivery', bn: 'ক্যাশ অন ডেলিভারি' },
  { id: 'bKash', en: 'bKash', bn: 'বিকাশ' },
  { id: 'Nagad', en: 'Nagad', bn: 'নগদ' },
  { id: 'Rocket', en: 'Rocket', bn: 'রকেট' }
];

// Currency Formatter
export const formatPrice = (amount) =>
  !amount || amount === 0 ? '৳0000' : `৳${Number(amount).toLocaleString('en-US')}`;
