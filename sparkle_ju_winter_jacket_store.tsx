import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  ShoppingBag,
  Sparkles,
  Check,
  Copy,
  Ruler,
  Truck,
  Phone,
  Mail,
  MapPin,
  RefreshCw,
  ChevronRight,
  X,
  CheckCircle2,
  AlertCircle,
  Sun,
  Moon,
  Search,
  SlidersHorizontal,
  ZoomIn,
  ZoomOut,
  MessageCircle,
  Printer,
  ArrowUpRight,
  PackageCheck,
  Clock
} from 'lucide-react';

// ============================================================================
// 1. BACKEND & STORE CONFIGURATION (IN-CODE ONLY — NO ADMIN UI IN FRONTEND)
// ============================================================================
// Replace PB_URL with your Coolify PocketBase domain (e.g., https://pb.yourdomain.com)
const PB_URL = 'https://pb.your-coolify-domain.com';
const PB_PRODUCTS_COLLECTION = 'products'; // Table 1: Dynamic Jacket Photos & Stock
const PB_ORDERS_COLLECTION = 'orders';     // Table 2: Customer Orders

// Store Pricing & Contact Placeholders
const DEFAULT_UNIT_PRICE = 0; // Set to 0 to display '৳0000' placeholder; set e.g. 1450 for live calculation
const MERCHANT_PHONE = '0100000000'; // bKash / Nagad / Rocket Number
const WHATSAPP_NUMBER = '0100000000'; // WhatsApp Number for Custom Department/Batch Pre-orders
const MERCHANT_EMAIL = 'sparklifying@gmail.com';

// ============================================================================
// 2. CORE PRODUCT DATA & FALLBACK CATALOG (SYNCED WITH POCKETBASE `products`)
// ============================================================================
const COLORS = [
  {
    id: 'Black',
    hex: '#141518',
    secondaryHex: '#22242a',
    ribHex: '#0b0c0e',
    nameEn: 'Jet Black',
    nameBn: 'জেট ব্ল্যাক'
  },
  {
    id: 'Dark Navy Blue',
    hex: '#162238',
    secondaryHex: '#203152',
    ribHex: '#0e1626',
    nameEn: 'Dark Navy Blue',
    nameBn: 'ডার্ক নেভি ব্লু'
  },
  {
    id: 'Maroon',
    hex: '#4E1622',
    secondaryHex: '#681e2e',
    ribHex: '#360e17',
    nameEn: 'Deep Maroon',
    nameBn: 'ডিপ মেরুন'
  }
];

const DESIGNS = [
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
  },
  {
    id: 'design_03',
    codeEn: 'Edition 03',
    codeBn: 'এডিশন ০৩',
    nameEn: 'Minimalist JU Heritage Crest',
    nameBn: 'মিনিমালিস্ট জাবি হেরিটেজ ক্রেস্ট',
    descEn: 'Refined gold-toned collegiate shield with Est. 1970 heritage detailing.',
    descBn: '১৯৭০ সালের ঐতিহ্যবাহী গোল্ড-টোনড জাবি কলেজিয়েট শিল্ড ক্রেস্ট।'
  }
];

const SIZES = {
  S: { chest: 38, length: 26, shoulder: 17, sleeve: 24.5 },
  M: { chest: 40, length: 27, shoulder: 18, sleeve: 25.0 },
  L: { chest: 42, length: 28, shoulder: 19, sleeve: 25.5 },
  XL: { chest: 44, length: 29, shoulder: 20, sleeve: 26.0 },
  XXL: { chest: 46, length: 30, shoulder: 21, sleeve: 26.5 }
};

const SIZE_LIST = Object.keys(SIZES);

// Default Fallback Catalog (Automatically overridden when PocketBase `products` table returns records)
// Note: When you upload `back_image` and `front_image` in PocketBase `products` collection,
// `back_image_url` and `front_image_url` will automatically display your real jacket photos!
const INITIAL_CATALOG = [
  {
    id: 'spk-blk-01',
    colorId: 'Black',
    designId: 'design_01',
    stockType: 'ready_stock',
    badgeEn: 'Ready Stock · Popular',
    badgeBn: 'রেডি স্টক · জনপ্রিয়',
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
    price: DEFAULT_UNIT_PRICE,
    back_image_url: '', // Populated from PocketBase `products.back_image`
    front_image_url: '' // Populated from PocketBase `products.front_image`
  },
  {
    id: 'spk-nvy-02',
    colorId: 'Dark Navy Blue',
    designId: 'design_02',
    stockType: 'ready_stock',
    badgeEn: 'Ready Stock · Campus Hit',
    badgeBn: 'রেডি স্টক · ক্যাম্পাস হিট',
    availableSizes: ['M', 'L', 'XL', 'XXL'],
    price: DEFAULT_UNIT_PRICE,
    back_image_url: '',
    front_image_url: ''
  },
  {
    id: 'spk-mrn-03',
    colorId: 'Maroon',
    designId: 'design_03',
    stockType: 'ready_stock',
    badgeEn: 'Ready Stock · Heritage',
    badgeBn: 'রেডি স্টক · হেরিটেজ',
    availableSizes: ['S', 'M', 'L', 'XL'],
    price: DEFAULT_UNIT_PRICE,
    back_image_url: '',
    front_image_url: ''
  },
  {
    id: 'spk-blk-02',
    colorId: 'Black',
    designId: 'design_02',
    stockType: 'ready_stock',
    badgeEn: 'Ready Stock',
    badgeBn: 'রেডি স্টক',
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
    price: DEFAULT_UNIT_PRICE,
    back_image_url: '',
    front_image_url: ''
  },
  {
    id: 'spk-mrn-01',
    colorId: 'Maroon',
    designId: 'design_01',
    stockType: 'ready_stock',
    badgeEn: 'Ready Stock',
    badgeBn: 'রেডি স্টক',
    availableSizes: ['M', 'L', 'XL'],
    price: DEFAULT_UNIT_PRICE,
    back_image_url: '',
    front_image_url: ''
  },
  {
    id: 'spk-nvy-03',
    colorId: 'Dark Navy Blue',
    designId: 'design_03',
    stockType: 'pre_order',
    badgeEn: 'Batch Pre-Order',
    badgeBn: 'ব্যাচ প্রি-অর্ডার',
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
    price: DEFAULT_UNIT_PRICE,
    back_image_url: '',
    front_image_url: ''
  },
  {
    id: 'spk-blk-03',
    colorId: 'Black',
    designId: 'design_03',
    stockType: 'ready_stock',
    badgeEn: 'Ready Stock',
    badgeBn: 'রেডি স্টক',
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
    price: DEFAULT_UNIT_PRICE,
    back_image_url: '',
    front_image_url: ''
  },
  {
    id: 'spk-nvy-01',
    colorId: 'Dark Navy Blue',
    designId: 'design_01',
    stockType: 'pre_order',
    badgeEn: 'Batch Pre-Order',
    badgeBn: 'ব্যাচ প্রি-অর্ডার',
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
    price: DEFAULT_UNIT_PRICE,
    back_image_url: '',
    front_image_url: ''
  },
  {
    id: 'spk-mrn-02',
    colorId: 'Maroon',
    designId: 'design_02',
    stockType: 'pre_order',
    badgeEn: 'Batch Pre-Order',
    badgeBn: 'ব্যাচ প্রি-অর্ডার',
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
    price: DEFAULT_UNIT_PRICE,
    back_image_url: '',
    front_image_url: ''
  }
];

const DELIVERY_ZONES = [
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

const PAYMENT_METHODS = [
  { id: 'COD', en: 'Cash on Delivery', bn: 'ক্যাশ অন ডেলিভারি' },
  { id: 'bKash', en: 'bKash', bn: 'বিকাশ' },
  { id: 'Nagad', en: 'Nagad', bn: 'নগদ' },
  { id: 'Rocket', en: 'Rocket', bn: 'রকেট' }
];

const formatPrice = (amount) =>
  !amount || amount === 0 ? '৳0000' : `৳${Number(amount).toLocaleString('en-US')}`;

// ============================================================================
// 3. STUDIO ARTWORK & PRODUCT IMAGE RENDERER
//    Automatically shows real PocketBase photo if available, or SVG fallback
// ============================================================================
function BackPrintLogo({ designId, uid }) {
  const arcId = `arc-${uid}`;
  if (designId === 'design_01') {
    return (
      <g>
        <path
          d="M-82 6Q-40-10 0 4T82 0L86 46Q40 58 0 50T-86 54Z"
          fill="#2a52d9"
        />
        <path id={arcId} d="M-86 0A86 86 0 0 1 86 0" fill="none" />
        <text
          fontSize="12.5"
          fontWeight="700"
          letterSpacing="2.5"
          fill="#b6ff3c"
          textAnchor="middle"
        >
          <textPath href={`#${arcId}`} startOffset="50%">
            JAHANGIRNAGAR UNIVERSITY
          </textPath>
        </text>
        <text
          y="40"
          fontSize="70"
          fontWeight="900"
          letterSpacing="-3"
          textAnchor="middle"
          fill="#b6ff3c"
          stroke="#0a2a8a"
          strokeWidth="2"
          fontFamily="Inter, sans-serif"
        >
          JU
        </text>
      </g>
    );
  }

  if (designId === 'design_02') {
    return (
      <g>
        <defs>
          <linearGradient id={`grad-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#7fd0ff" />
            <stop offset="0.55" stopColor="#4cc07a" />
            <stop offset="1" stopColor="#d08a2e" />
          </linearGradient>
        </defs>
        <path id={arcId} d="M-86 0A86 86 0 0 1 86 0" fill="none" />
        <text
          fontSize="12.5"
          fontWeight="700"
          letterSpacing="2.5"
          fill="#f3f1ec"
          textAnchor="middle"
        >
          <textPath href={`#${arcId}`} startOffset="50%">
            JAHANGIRNAGAR UNIVERSITY
          </textPath>
        </text>
        <text
          y="46"
          fontSize="80"
          fontWeight="900"
          letterSpacing="-3"
          textAnchor="middle"
          fill={`url(#grad-${uid})`}
          stroke="#f3f1ec"
          strokeWidth="2.2"
          fontFamily="Inter, sans-serif"
        >
          JU
        </text>
      </g>
    );
  }

  return (
    <g stroke="#c9a85c" fill="none">
      <path id={arcId} d="M-80 -6A80 80 0 0 1 80 -6" stroke="none" />
      <text
        fontSize="10"
        letterSpacing="2.4"
        fill="#c9a85c"
        stroke="none"
        textAnchor="middle"
      >
        <textPath href={`#${arcId}`} startOffset="50%">
          JAHANGIRNAGAR UNIVERSITY
        </textPath>
      </text>
      <path
        d="M-40-48H40V10Q40 46 0 62Q-40 46-40 10Z"
        strokeWidth="2"
      />
      <path
        d="M-33-41H33V9Q33 38 0 52Q-33 38-33 9Z"
        strokeWidth="0.8"
      />
      <text
        y="18"
        fontSize="40"
        textAnchor="middle"
        fill="#c9a85c"
        stroke="none"
        fontFamily="Georgia, serif"
      >
        JU
      </text>
      <text
        y="82"
        fontSize="9"
        letterSpacing="3"
        textAnchor="middle"
        fill="#c9a85c"
        stroke="none"
      >
        EST. 1970
      </text>
    </g>
  );
}

const JACKET_PATH =
  'M138 66 70 92Q44 104 38 140L22 336Q22 346 32 348L78 352Q88 352 90 342L98 200 96 436Q96 448 108 450Q200 468 292 450Q304 448 304 436L302 200 310 342Q312 352 322 352L368 348Q378 346 378 336L362 140Q356 104 330 92L262 66Q200 90 138 66Z';

function JacketVisual({
  colorHex,
  view = 'back',
  designId = 'design_01',
  uid = 'main',
  backImageUrl = '',
  frontImageUrl = '',
  isDark = false,
  lightBackdrop = false
}) {
  const activePhotoUrl = view === 'back' ? backImageUrl : frontImageUrl;

  // If the store owner uploaded a real photo in PocketBase `products` table, display it!
  if (activePhotoUrl) {
    return (
      <img
        src={activePhotoUrl}
        alt={`Sparkle JU Jacket - ${view}`}
        className="w-full h-full object-contain select-none transition-transform duration-500"
        loading="lazy"
      />
    );
  }

  // Otherwise render the high-contrast Studio Vector Jacket
  const rimStroke =
    isDark && !lightBackdrop ? 'rgba(255,255,255,0.48)' : 'rgba(255,255,255,0.14)';
  const dropGlow =
    isDark && !lightBackdrop
      ? 'drop-shadow(0 0 22px rgba(255,255,255,0.16)) drop-shadow(0 16px 24px rgba(0,0,0,0.6))'
      : 'drop-shadow(0 16px 22px rgba(0,0,0,0.22))';

  return (
    <svg
      viewBox="0 0 400 480"
      className="w-full h-full select-none"
      style={{ filter: dropGlow }}
    >
      <defs>
        <linearGradient id={`sh-${uid}`} x1="0" x2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.11" />
          <stop offset="0.5" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="1" stopColor="#000000" stopOpacity="0.32" />
        </linearGradient>
      </defs>

      <path
        d={JACKET_PATH}
        fill={colorHex}
        stroke={rimStroke}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d={JACKET_PATH} fill={`url(#sh-${uid})`} />

      {/* Subtle Quilted Puffer / Winter Stitching Lines */}
      {[130, 185, 240, 295, 350, 405].map((y) => (
        <path
          key={y}
          d={`M98 ${y}Q200 ${y + 16} 302 ${y}`}
          stroke="#ffffff"
          strokeOpacity="0.08"
          strokeWidth="1.5"
          fill="none"
        />
      ))}

      {/* Cuffs & Waist Ribbing */}
      <path
        d="M24 322 82 330 78 352 30 348ZM376 322 318 330 322 352 370 348Z"
        fill="#000000"
        opacity="0.28"
      />
      <path
        d="M96 424Q200 444 304 424L304 440Q200 464 96 440Z"
        fill="#000000"
        opacity="0.26"
      />

      {/* Stand Collar */}
      <path
        d="M146 64Q200 90 254 64L254 34Q200 52 146 34Z"
        fill={colorHex}
        stroke={rimStroke}
        strokeWidth="1.6"
      />
      <path
        d="M146 64Q200 90 254 64L254 34Q200 52 146 34Z"
        fill="#000000"
        opacity="0.22"
      />

      {view === 'back' ? (
        <g transform="translate(200 226)">
          <BackPrintLogo designId={designId} uid={uid} />
        </g>
      ) : (
        <g>
          {/* Front Zipper & Side Pockets */}
          <path
            d="M200 80V452"
            stroke="#ffffff"
            strokeOpacity="0.38"
            strokeDasharray="3 3"
          />
          <path
            d="M128 342 148 384M272 342 252 384"
            stroke="#ffffff"
            strokeOpacity="0.25"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Minimal Front Chest JU Crest */}
          <g transform="translate(268 154)">
            <circle
              r="15"
              fill="none"
              stroke="#b6ff3c"
              strokeWidth="1.4"
            />
            <text
              y="4.5"
              fontSize="11.5"
              fontWeight="800"
              textAnchor="middle"
              fill="#b6ff3c"
            >
              JU
            </text>
          </g>
        </g>
      )}
    </svg>
  );
}

// ============================================================================
// 4. MAIN APPLICATION
// ============================================================================
export default function App() {
  // STRICT INITIAL DEFAULTS: English ('en') + Light Mode ('light')
  const [lang, setLang] = useState('en');
  const [theme, setTheme] = useState('light');

  const T = (enText, bnText) => (lang === 'en' ? enText : bnText);
  const isDark = theme === 'dark';

  // Catalog state (Synced with PocketBase `products` collection if connected)
  const [catalog, setCatalog] = useState(INITIAL_CATALOG);

  // Mobile-First E-Commerce Filters
  const [filterStock, setFilterStock] = useState('all'); // 'all' | 'ready_stock' | 'pre_order'
  const [filterColor, setFilterColor] = useState('all'); // 'all' | 'Black' | 'Dark Navy Blue' | 'Maroon'
  const [filterSize, setFilterSize] = useState('all');   // 'all' | 'S' | 'M' | 'L' | 'XL' | 'XXL'
  const [filterDesign, setFilterDesign] = useState('all'); // 'all' | 'design_01' | 'design_02' | 'design_03'

  // Per-card front/back flip state
  const [cardViews, setCardViews] = useState({});

  // Selected Product & Order State for Studio & Checkout
  const [selectedProduct, setSelectedProduct] = useState(INITIAL_CATALOG[0]);
  const [orderType, setOrderType] = useState('ready_stock'); // 'ready_stock' | 'pre_order'
  const [selectedColorId, setSelectedColorId] = useState('Black');
  const [selectedDesignId, setSelectedDesignId] = useState('design_01');
  const [selectedSize, setSelectedSize] = useState('L');
  const [quantity, setQuantity] = useState(1);

  // Studio Viewer Controls
  const [studioView, setStudioView] = useState('back'); // 'back' | 'front'
  const [studioZoom, setStudioZoom] = useState(false);
  const [lightStudioBackdrop, setLightStudioBackdrop] = useState(false);

  // Checkout Form State
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryZone, setDeliveryZone] = useState(DELIVERY_ZONES[0].id);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [paymentSubType, setPaymentSubType] = useState('Send Money');
  const [senderNumber, setSenderNumber] = useState('');
  const [trxId, setTrxId] = useState('');

  // UI Modals & Feedback
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);
  const [isMobileCheckoutOpen, setIsMobileCheckoutOpen] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderReceipt, setOrderReceipt] = useState(null);
  const [copiedKey, setCopiedKey] = useState('');

  const studioSectionRef = useRef(null);
  const checkoutSectionRef = useRef(null);

  // Load Google Fonts dynamically (Cormorant Garamond + Inter + Hind Siliguri)
  useEffect(() => {
    const linkId = 'sparkle-editorial-fonts';
    if (!document.getElementById(linkId)) {
      const link = document.createElement('link');
      link.id = linkId;
      link.rel = 'stylesheet';
      link.href =
        'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&family=Hind+Siliguri:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap';
      document.head.appendChild(link);
    }
  }, []);

  // Fetch dynamic products & uploaded photos from PocketBase `products` collection
  useEffect(() => {
    async function loadProductsFromPocketBase() {
      if (!PB_URL || PB_URL.includes('your-coolify-domain.com')) return;
      try {
        const cleanUrl = PB_URL.replace(/\/$/, '');
        const res = await fetch(
          `${cleanUrl}/api/collections/${PB_PRODUCTS_COLLECTION}/records?perPage=50`
        );
        if (!res.ok) return;
        const data = await res.json();
        if (data?.items?.length > 0) {
          const mapped = data.items.map((rec) => ({
            id: rec.id,
            colorId: rec.jacket_color || 'Black',
            designId: rec.design_variant || 'design_01',
            stockType: rec.stock_type || 'ready_stock',
            badgeEn:
              rec.badge_en ||
              (rec.stock_type === 'pre_order' ? 'Batch Pre-Order' : 'Ready Stock'),
            badgeBn:
              rec.badge_bn ||
              (rec.stock_type === 'pre_order' ? 'ব্যাচ প্রি-অর্ডার' : 'রেডি স্টক'),
            availableSizes:
              Array.isArray(rec.available_sizes) && rec.available_sizes.length > 0
                ? rec.available_sizes
                : SIZE_LIST,
            price: typeof rec.price === 'number' ? rec.price : DEFAULT_UNIT_PRICE,
            back_image_url: rec.back_image
              ? `${cleanUrl}/api/files/${rec.collectionId}/${rec.id}/${rec.back_image}`
              : '',
            front_image_url: rec.front_image
              ? `${cleanUrl}/api/files/${rec.collectionId}/${rec.id}/${rec.front_image}`
              : ''
          }));
          setCatalog(mapped);
          setSelectedProduct(mapped[0]);
        }
      } catch {
        // Silently use INITIAL_CATALOG fallback if PocketBase is offline
      }
    }
    loadProductsFromPocketBase();
  }, []);

  // When user filters by a specific Size, pre-select that size automatically
  const handleSizeFilterSelect = (sizeKey) => {
    setFilterSize(sizeKey);
    if (sizeKey !== 'all') {
      setSelectedSize(sizeKey);
    }
  };

  // Filtered Catalog for E-Commerce Grid
  const filteredCatalog = useMemo(() => {
    return catalog.filter((item) => {
      if (filterStock !== 'all' && item.stockType !== filterStock) return false;
      if (filterColor !== 'all' && item.colorId !== filterColor) return false;
      if (filterDesign !== 'all' && item.designId !== filterDesign) return false;
      if (filterSize !== 'all' && !item.availableSizes.includes(filterSize))
        return false;
      return true;
    });
  }, [catalog, filterStock, filterColor, filterDesign, filterSize]);

  // Helper to get active Color & Design objects
  const activeColorObj =
    COLORS.find((c) => c.id === selectedColorId) || COLORS[0];
  const activeDesignObj =
    DESIGNS.find((d) => d.id === selectedDesignId) || DESIGNS[0];

  // Match active studio selection with any uploaded PocketBase image URL
  const matchedCatalogItem = useMemo(() => {
    return (
      catalog.find(
        (item) =>
          item.colorId === selectedColorId && item.designId === selectedDesignId
      ) || selectedProduct
    );
  }, [catalog, selectedColorId, selectedDesignId, selectedProduct]);

  const unitPrice = matchedCatalogItem?.price ?? DEFAULT_UNIT_PRICE;
  const totalPrice = unitPrice * quantity;
  const isMfsPayment = paymentMethod !== 'COD';

  // Select a product from the catalog grid
  const handleSelectProductCard = (item, chosenSize, action = 'checkout') => {
    setSelectedProduct(item);
    setSelectedColorId(item.colorId);
    setSelectedDesignId(item.designId);
    setOrderType(item.stockType);
    if (chosenSize && item.availableSizes.includes(chosenSize)) {
      setSelectedSize(chosenSize);
    } else if (!item.availableSizes.includes(selectedSize)) {
      setSelectedSize(item.availableSizes[0] || 'L');
    }

    if (action === 'inspect') {
      studioSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else {
      // On mobile screens, open quick checkout drawer or scroll smoothly to checkout
      if (window.innerWidth < 1024) {
        setIsMobileCheckoutOpen(true);
      } else {
        checkoutSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleCopy = async (key, text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(''), 1800);
  };

  // Validate & Submit Order to PocketBase `orders` collection
  const handleOrderSubmit = async (e) => {
    if (e) e.preventDefault();
    const bdPhoneRegex = /^01\d{9}$/;
    const cleanPhone = customerPhone.replace(/\D/g, '');
    const cleanSender = senderNumber.replace(/\D/g, '');
    const errors = {};

    if (!customerName.trim()) errors.name = true;
    if (!bdPhoneRegex.test(cleanPhone)) errors.phone = true;
    if (!deliveryZone) errors.zone = true;
    if (!deliveryAddress.trim()) errors.addr = true;
    if (isMfsPayment) {
      if (!bdPhoneRegex.test(cleanSender)) errors.sender = true;
      if (!trxId.trim()) errors.trx = true;
    }

    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setIsSubmitting(true);

    const orderPayload = {
      customer_name: customerName.trim(),
      phone: cleanPhone,
      order_type: orderType,
      jacket_color: selectedColorId,
      design_variant: selectedDesignId,
      size: selectedSize,
      quantity: quantity,
      front_chest_text: 'JU',
      custom_notes: '',
      delivery_zone: deliveryZone,
      delivery_address: deliveryAddress.trim(),
      payment_method: paymentMethod,
      payment_type: isMfsPayment ? paymentSubType : 'Cash on Delivery',
      sender_number: isMfsPayment ? cleanSender : '',
      trx_id: isMfsPayment ? trxId.trim().toUpperCase() : '',
      total_amount: String(totalPrice)
    };

    let savedToPocketBase = false;
    if (PB_URL && !PB_URL.includes('your-coolify-domain.com')) {
      try {
        const formData = new FormData();
        Object.entries(orderPayload).forEach(([k, v]) =>
          formData.append(k, String(v))
        );
        const res = await fetch(
          `${PB_URL.replace(/\/$/, '')}/api/collections/${PB_ORDERS_COLLECTION}/records`,
          {
            method: 'POST',
            body: formData
          }
        );
        savedToPocketBase = res.ok;
      } catch {
        savedToPocketBase = false;
      }
    }

    const generatedOrderId =
      'SPK-' +
      Date.now().toString(36).toUpperCase().slice(-5) +
      Math.random().toString(36).slice(2, 4).toUpperCase();

    setIsSubmitting(false);
    setIsMobileCheckoutOpen(false);
    setOrderReceipt({
      ...orderPayload,
      id: generatedOrderId,
      saved: savedToPocketBase,
      createdAt: new Date().toLocaleString('en-BD', {
        dateStyle: 'medium',
        timeStyle: 'short'
      })
    });
  };

  // WhatsApp Custom Batch / Department Pre-Order URL
  const whatsappMessage = encodeURIComponent(
    lang === 'en'
      ? `Hello Sparkle JU Team! We want to discuss a Custom Pre-Order (Department / Batch / Club Winter Jackets).`
      : `হ্যালো স্পার্কল জাবি টিম! আমরা আমাদের ডিপার্টমেন্ট / ব্যাচ / ক্লাবের জন্য কাস্টম প্রি-অর্ডার জ্যাকেটের বিষয়ে কথা বলতে চাই।`
  );
  const whatsappUrl = `https://wa.me/88${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

  // Editorial Theme CSS Variables
  const themeVars = isDark
    ? {
        '--bg': '#0e0f11',
        '--ink': '#f3f1ec',
        '--mute': '#9a978f',
        '--line': '#26282c',
        '--card': '#151619',
        '--spot': '#3f434d',
        '--accent': '#f3f1ec',
        '--onacc': '#0e0f11'
      }
    : {
        '--bg': '#faf9f6',
        '--ink': '#141414',
        '--mute': '#726f69',
        '--line': '#e4e1da',
        '--card': '#ffffff',
        '--spot': '#ebe7de',
        '--accent': '#141414',
        '--onacc': '#ffffff'
      };

  return (
    <div
      style={{
        ...themeVars,
        backgroundColor: 'var(--bg)',
        color: 'var(--ink)',
        fontFamily: "Inter, 'Hind Siliguri', system-ui, sans-serif"
      }}
      className="min-h-screen transition-colors duration-300 pb-24 lg:pb-12 antialiased selection:bg-zinc-900 selection:text-white"
    >
      <style>{`
        .serif-editorial {
          font-family: 'Cormorant Garamond', 'Hind Siliguri', Georgia, serif;
          font-weight: 600;
        }
        .editorial-label {
          font-size: 0.68rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--mute);
          font-weight: 600;
        }
        .editorial-input {
          width: 100%;
          background: transparent;
          border-bottom: 1px solid var(--line);
          padding: 0.7rem 0;
          outline: none;
          font-size: 0.92rem;
          color: var(--ink);
          transition: border-color 0.2s;
        }
        .editorial-input:focus {
          border-color: var(--ink);
        }
        .editorial-input.err {
          border-color: #dc2626;
        }
        .editorial-pill {
          border: 1px solid var(--line);
          padding: 0.45rem 0.95rem;
          border-radius: 9999px;
          font-size: 0.78rem;
          font-weight: 500;
          transition: all 0.2s;
          background: transparent;
          color: var(--ink);
          white-space: nowrap;
        }
        .editorial-pill:hover {
          border-color: var(--ink);
        }
        .editorial-pill.active {
          background: var(--accent);
          color: var(--onacc);
          border-color: var(--accent);
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @media print {
          body * { visibility: hidden; }
          .print-slip, .print-slip * { visibility: visible; }
          .print-slip { position: absolute; left: 0; top: 0; width: 100%; box-shadow: none !important; }
          .no-print { display: none !important; }
        }
      `}</style>

      {/* ====================================================================
          STICKY EDITORIAL NAVBAR (Default: EN + Light Mode, No Admin Cog)
      ==================================================================== */}
      <header
        className="sticky top-0 z-40 backdrop-blur-md border-b transition-colors"
        style={{
          backgroundColor: isDark ? 'rgba(14,15,17,0.88)' : 'rgba(250,249,246,0.9)',
          borderColor: 'var(--line)'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-3">
          {/* Brand Logo */}
          <a href="#top" className="flex items-baseline gap-1.5">
            <span className="serif-editorial text-2xl sm:text-3xl tracking-wide">
              Sparkle
            </span>
            <span style={{ color: 'var(--mute)' }} className="text-xs">
              ✦ JU ’26
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest font-medium"
            style={{ color: 'var(--mute)' }}
          >
            <a href="#collection" className="hover:opacity-100 transition-opacity">
              {T('Collection & Stock', 'কালেকশন ও স্টক')}
            </a>
            <a href="#studio" className="hover:opacity-100 transition-opacity">
              {T('Studio & Checkout', 'স্টুডিও ও অর্ডার')}
            </a>
            <a href="#custom-batch" className="hover:opacity-100 transition-opacity">
              {T('Custom Batch Order', 'কাস্টম ব্যাচ অর্ডার')}
            </a>
            <button
              type="button"
              onClick={() => setIsSizeChartOpen(true)}
              className="hover:opacity-100 transition-opacity cursor-pointer"
            >
              {T('Size Guide', 'সাইজ গাইড')}
            </button>
          </nav>

          {/* Language (EN | বাং) & Theme (Light | Dark) Controls */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            <button
              type="button"
              onClick={() => setIsSizeChartOpen(true)}
              className="md:hidden inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full border text-xs font-medium cursor-pointer"
              style={{ borderColor: 'var(--line)', color: 'var(--ink)' }}
            >
              <Ruler className="w-3.5 h-3.5" />
              <span>{T('Sizes', 'সাইজ')}</span>
            </button>

            {/* EN | বাং Switcher */}
            <div
              className="flex border rounded-full overflow-hidden text-xs font-medium"
              style={{ borderColor: 'var(--line)' }}
            >
              <button
                type="button"
                onClick={() => setLang('en')}
                className="px-2.5 sm:px-3 py-1 sm:py-1.5 transition-colors cursor-pointer"
                style={{
                  backgroundColor: lang === 'en' ? 'var(--accent)' : 'transparent',
                  color: lang === 'en' ? 'var(--onacc)' : 'var(--mute)'
                }}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLang('bn')}
                className="px-2.5 sm:px-3 py-1 sm:py-1.5 transition-colors cursor-pointer"
                style={{
                  backgroundColor: lang === 'bn' ? 'var(--accent)' : 'transparent',
                  color: lang === 'bn' ? 'var(--onacc)' : 'var(--mute)'
                }}
              >
                বাং
              </button>
            </div>

            {/* Light / Dark Mode Button */}
            <button
              type="button"
              aria-label="Toggle Theme"
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className="p-2 border rounded-full transition-colors cursor-pointer"
              style={{ borderColor: 'var(--line)', color: 'var(--ink)' }}
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* ====================================================================
          EDITORIAL HERO SECTION (MOBILE-OPTIMIZED)
      ==================================================================== */}
      <section
        id="top"
        className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-8 sm:pt-16 sm:pb-12 border-b"
        style={{ borderColor: 'var(--line)' }}
      >
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <p className="editorial-label mb-3 flex items-center gap-2">
              <span>
                {T(
                  'Jahangirnagar University · Winter 2026 Collection',
                  'জাহাঙ্গীরনগর বিশ্ববিদ্যালয় · শীতকালীন কালেকশন ২০২৬'
                )}
              </span>
            </p>
            <h1 className="serif-editorial text-5xl sm:text-7xl lg:text-8xl leading-[0.95] tracking-tight">
              {T('Hello JUIAN', 'হ্যালো জাবিয়ান')}
              <br />
              <em style={{ color: 'var(--mute)' }} className="font-normal">
                {T('Your Winter, Your Choice.', 'তোমার শীত, তোমার পছন্দ।')}
              </em>
            </h1>
            <p
              style={{ color: 'var(--mute)' }}
              className="mt-4 sm:mt-6 max-w-xl text-sm sm:text-base leading-relaxed"
            >
              {T(
                'Signature heavyweight winter jackets crafted exclusively for the JU campus. Browse our ready stock & fixed editions below, filter by your size and colour, and get 100% free delivery across all JU halls.',
                'জাবি ক্যাম্পাসের জন্য তৈরি এক্সক্লুসিভ হেভিওয়েট উইন্টার জ্যাকেট। নিচের স্টক থেকে আপনার পছন্দের কালার ও সাইজ ফিল্টার করে অর্ডার করুন—জাবির সকল হলে ১০০% ফ্রি ডেলিভারি।'
              )}
            </p>
          </div>

          {/* Hero Trust Badges & Quick Action */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-4 pt-2">
            <div
              className="px-4 py-3 border rounded-2xl flex items-center gap-4"
              style={{
                borderColor: 'var(--line)',
                backgroundColor: 'var(--card)'
              }}
            >
              <div>
                <span className="editorial-label block">
                  {T('Campus Edition Price', 'ক্যাম্পাস এডিশন মূল্য')}
                </span>
                <span className="serif-editorial text-3xl sm:text-4xl">
                  {formatPrice(DEFAULT_UNIT_PRICE)}
                </span>
              </div>
              <div
                className="h-8 w-[1px]"
                style={{ backgroundColor: 'var(--line)' }}
              />
              <div className="text-xs space-y-0.5">
                <div className="font-semibold flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                  <Truck className="w-3.5 h-3.5" />
                  <span>{T('Free JU Delivery (৳0)', 'জাবি ফ্রি ডেলিভারি (৳০)')}</span>
                </div>
                <div style={{ color: 'var(--mute)' }}>
                  {T('Halls · Bottola · Ambagan', 'সকল হল · বটতলা · আমবাগান')}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2.5 w-full sm:w-auto">
              <a
                href="#collection"
                className="flex-1 sm:flex-initial text-center editorial-pill active !px-6 !py-3 font-semibold"
              >
                {T('Browse Stock & Sizes', 'স্টক ও সাইজ দেখুন')}
              </a>
              <a
                href="#custom-batch"
                className="flex-1 sm:flex-initial text-center editorial-pill !px-5 !py-3"
              >
                {T('Custom Batch Inquiry', 'কাস্টম ব্যাচ অর্ডার')}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 1: MOBILE-FIRST E-COMMERCE STOCK & FILTERABLE CATALOG
      ==================================================================== */}
      <section
        id="collection"
        className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-14"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
          <div>
            <span className="editorial-label">
              {T('01 · Ready Stock & Signature Editions', '০১ · রেডি স্টক এবং সিগনেচার এডিশন')}
            </span>
            <h2 className="serif-editorial text-3xl sm:text-5xl mt-1">
              {T('Choose Your Jacket', 'আপনার জ্যাকেট বেছে নিন')}
            </h2>
          </div>
          <p style={{ color: 'var(--mute)' }} className="text-xs sm:text-sm">
            {T(
              'Filter by colour or tap your size below for instant 1-tap campus ordering.',
              'কালার অথবা আপনার সাইজ সিলেক্ট করে সরাসরি ১-ট্যাপে অর্ডার করুন।'
            )}
          </p>
        </div>

        {/* ==================================================================
            MOBILE-FRIENDLY FILTER BAR (COLOUR, SIZE, STOCK STATUS, DESIGN)
        ================================================================== */}
        <div
          className="p-4 sm:p-5 rounded-2xl border mb-8 space-y-4"
          style={{
            borderColor: 'var(--line)',
            backgroundColor: 'var(--card)'
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Colour Filter Pills */}
            <div className="md:col-span-5">
              <span className="editorial-label block mb-2">
                {T('Filter by Colour', 'কালার ফিল্টার')}
              </span>
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                <button
                  type="button"
                  onClick={() => setFilterColor('all')}
                  className={`editorial-pill cursor-pointer ${
                    filterColor === 'all' ? 'active' : ''
                  }`}
                >
                  {T('All Colours (3)', 'সব কালার (৩)')}
                </button>
                {COLORS.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setFilterColor(c.id)}
                    className={`editorial-pill inline-flex items-center gap-2 cursor-pointer ${
                      filterColor === c.id ? 'active' : ''
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full border border-white/40 shrink-0"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span>{T(c.nameEn, c.nameBn)}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Filter Pills */}
            <div className="md:col-span-4">
              <div className="flex items-center justify-between mb-2">
                <span className="editorial-label">
                  {T('Filter by Size', 'সাইজ ফিল্টার')}
                </span>
                <button
                  type="button"
                  onClick={() => setIsSizeChartOpen(true)}
                  className="text-[11px] underline underline-offset-4 cursor-pointer flex items-center gap-1"
                  style={{ color: 'var(--mute)' }}
                >
                  <Ruler className="w-3 h-3" />
                  <span>
                    {filterSize !== 'all'
                      ? `${filterSize}: ${SIZES[filterSize].chest}" / ${SIZES[filterSize].length}"`
                      : T('Size Chart', 'সাইজ চার্ট')}
                  </span>
                </button>
              </div>
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
                <button
                  type="button"
                  onClick={() => handleSizeFilterSelect('all')}
                  className={`editorial-pill cursor-pointer ${
                    filterSize === 'all' ? 'active' : ''
                  }`}
                >
                  {T('All', 'সব')}
                </button>
                {SIZE_LIST.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => handleSizeFilterSelect(s)}
                    className={`editorial-pill !px-3.5 cursor-pointer ${
                      filterSize === s ? 'active' : ''
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Availability / Stock Type Filter */}
            <div className="md:col-span-3">
              <span className="editorial-label block mb-2">
                {T('Availability', 'স্টক স্ট্যাটাস')}
              </span>
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
                {[
                  { id: 'all', en: 'All', bn: 'সব' },
                  { id: 'ready_stock', en: 'Ready Stock', bn: 'রেডি স্টক' },
                  { id: 'pre_order', en: 'Pre-Order', bn: 'প্রি-অর্ডার' }
                ].map((st) => (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => setFilterStock(st.id)}
                    className={`editorial-pill cursor-pointer ${
                      filterStock === st.id ? 'active' : ''
                    }`}
                  >
                    {T(st.en, st.bn)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Active Filter Status Bar */}
          {(filterColor !== 'all' ||
            filterSize !== 'all' ||
            filterStock !== 'all' ||
            filterDesign !== 'all') && (
            <div
              className="pt-3 border-t flex items-center justify-between text-xs"
              style={{ borderColor: 'var(--line)', color: 'var(--mute)' }}
            >
              <span>
                {T(
                  `Showing ${filteredCatalog.length} jacket editions`,
                  `${filteredCatalog.length}টি জ্যাকেট দেখানো হচ্ছে`
                )}
              </span>
              <button
                type="button"
                onClick={() => {
                  setFilterColor('all');
                  setFilterSize('all');
                  setFilterStock('all');
                  setFilterDesign('all');
                }}
                className="underline underline-offset-4 font-medium cursor-pointer"
                style={{ color: 'var(--ink)' }}
              >
                {T('Reset Filters', 'ফিল্টার রিসেট করুন')}
              </button>
            </div>
          )}
        </div>

        {/* ==================================================================
            PRODUCT CATALOG GRID (3 COLUMNS DESKTOP, 1-2 MOBILE)
        ================================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredCatalog.map((item) => {
            const colorObj =
              COLORS.find((c) => c.id === item.colorId) || COLORS[0];
            const designObj =
              DESIGNS.find((d) => d.id === item.designId) || DESIGNS[0];
            const cardView = cardViews[item.id] || 'back';
            const isSelectedCard =
              selectedColorId === item.colorId &&
              selectedDesignId === item.designId;

            return (
              <div
                key={item.id}
                className="group rounded-2xl border overflow-hidden flex flex-col justify-between transition-all duration-300"
                style={{
                  borderColor: isSelectedCard ? 'var(--ink)' : 'var(--line)',
                  backgroundColor: 'var(--card)'
                }}
              >
                {/* Product Visual Stage */}
                <div>
                  <div
                    className="relative aspect-[4/4.4] overflow-hidden p-6 flex items-center justify-center"
                    style={{
                      background: `radial-gradient(ellipse at 50% 40%, var(--spot) 0%, var(--card) 78%)`
                    }}
                  >
                    {/* Stock Badge Top-Left */}
                    <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide ${
                          item.stockType === 'ready_stock'
                            ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30'
                            : 'bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30'
                        }`}
                      >
                        {item.stockType === 'ready_stock' ? (
                          <PackageCheck className="w-3 h-3" />
                        ) : (
                          <Clock className="w-3 h-3" />
                        )}
                        {T(item.badgeEn, item.badgeBn)}
                      </span>
                    </div>

                    {/* Back / Front Toggle Pill Top-Right */}
                    <button
                      type="button"
                      onClick={() =>
                        setCardViews((prev) => ({
                          ...prev,
                          [item.id]: cardView === 'back' ? 'front' : 'back'
                        }))
                      }
                      className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full text-[11px] font-medium border backdrop-blur-md flex items-center gap-1 cursor-pointer transition-transform active:scale-95"
                      style={{
                        backgroundColor: isDark
                          ? 'rgba(21,22,25,0.8)'
                          : 'rgba(255,255,255,0.85)',
                        borderColor: 'var(--line)',
                        color: 'var(--ink)'
                      }}
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>
                        {cardView === 'back'
                          ? T('Front', 'সামনে')
                          : T('Back', 'পেছনে')}
                      </span>
                    </button>

                    {/* Jacket Image (PocketBase photo or Studio SVG) */}
                    <div
                      onClick={() =>
                        handleSelectProductCard(item, selectedSize, 'inspect')
                      }
                      className="w-full h-full cursor-pointer transition-transform duration-500 group-hover:scale-105"
                    >
                      <JacketVisual
                        colorHex={colorObj.hex}
                        view={cardView}
                        designId={item.designId}
                        uid={`card-${item.id}`}
                        backImageUrl={item.back_image_url}
                        frontImageUrl={item.front_image_url}
                        isDark={isDark}
                      />
                    </div>
                  </div>

                  {/* Card Details */}
                  <div className="p-4 sm:p-5">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="editorial-label flex items-center gap-1.5">
                        <span
                          className="w-2.5 h-2.5 rounded-full inline-block border border-white/30"
                          style={{ backgroundColor: colorObj.hex }}
                        />
                        {T(colorObj.nameEn, colorObj.nameBn)} ·{' '}
                        {T(designObj.codeEn, designObj.codeBn)}
                      </span>
                      <span className="serif-editorial text-2xl font-bold">
                        {formatPrice(item.price)}
                      </span>
                    </div>

                    <h3 className="serif-editorial text-2xl leading-snug">
                      {T(designObj.nameEn, designObj.nameBn)}
                    </h3>

                    {/* Quick Size Selector inside Card */}
                    <div className="mt-4 pt-3 border-t" style={{ borderColor: 'var(--line)' }}>
                      <div className="flex items-center justify-between text-[11px] mb-2">
                        <span style={{ color: 'var(--mute)' }}>
                          {T('Select Size:', 'সাইজ বেছে নিন:')}
                        </span>
                        <span className="font-medium">
                          {T('Chest', 'বুক')} {SIZES[selectedSize]?.chest}″ ·{' '}
                          {T('Len', 'দৈর্ঘ্য')} {SIZES[selectedSize]?.length}″
                        </span>
                      </div>

                      <div className="grid grid-cols-5 gap-1.5">
                        {SIZE_LIST.map((sz) => {
                          const hasSize = item.availableSizes.includes(sz);
                          const isSzSelected = selectedSize === sz;
                          return (
                            <button
                              key={sz}
                              type="button"
                              disabled={!hasSize}
                              onClick={() => {
                                setSelectedSize(sz);
                                setSelectedProduct(item);
                                setSelectedColorId(item.colorId);
                                setSelectedDesignId(item.designId);
                                setOrderType(item.stockType);
                              }}
                              className={`py-1.5 rounded-lg text-xs font-medium border transition cursor-pointer ${
                                !hasSize
                                  ? 'opacity-30 line-through cursor-not-allowed'
                                  : isSzSelected && isSelectedCard
                                  ? 'font-bold'
                                  : ''
                              }`}
                              style={{
                                borderColor:
                                  isSzSelected && hasSize
                                    ? 'var(--ink)'
                                    : 'var(--line)',
                                backgroundColor:
                                  isSzSelected && hasSize
                                    ? 'var(--accent)'
                                    : 'transparent',
                                color:
                                  isSzSelected && hasSize
                                    ? 'var(--onacc)'
                                    : 'var(--ink)'
                              }}
                            >
                              {sz}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="px-4 pb-4 sm:px-5 sm:pb-5 flex gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      handleSelectProductCard(item, selectedSize, 'checkout')
                    }
                    className="flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-1.5"
                    style={{
                      backgroundColor: 'var(--accent)',
                      color: 'var(--onacc)'
                    }}
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>{T('Order Now', 'অর্ডার করুন')}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleSelectProductCard(item, selectedSize, 'inspect')
                    }
                    className="py-2.5 px-3.5 rounded-xl text-xs font-medium border transition cursor-pointer"
                    style={{ borderColor: 'var(--line)', color: 'var(--ink)' }}
                    title={T('Inspect in Studio', 'বড় করে দেখুন')}
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ====================================================================
          SECTION 2: INTERACTIVE STUDIO VIEWER & DIRECT CAMPUS CHECKOUT
      ==================================================================== */}
      <section
        id="studio"
        ref={studioSectionRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 border-t"
        style={{ borderColor: 'var(--line)' }}
      >
        <div className="mb-8">
          <span className="editorial-label">
            {T('02 · Interactive Studio & Instant Checkout', '০২ · লাইভ প্রিভিউ এবং সরাসরি অর্ডার')}
          </span>
          <h2 className="serif-editorial text-3xl sm:text-5xl mt-1">
            {T('Inspect & Complete Your Order', 'বিস্তারিত দেখুন ও অর্ডার সম্পন্ন করুন')}
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* LEFT: STICKY LARGE STUDIO PREVIEW */}
          <div className="lg:col-span-6 lg:sticky lg:top-24">
            <div
              className="relative aspect-[4/4.6] rounded-3xl overflow-hidden border"
              style={{
                borderColor: 'var(--line)',
                background: lightStudioBackdrop
                  ? '#e9e6df'
                  : 'radial-gradient(ellipse at 50% 38%, var(--spot) 0%, var(--card) 75%)'
              }}
            >
              <div
                className="w-full h-full p-6 sm:p-10 transition-transform duration-500"
                style={{
                  transform: studioZoom ? 'scale(1.55)' : 'scale(1)',
                  transformOrigin: studioView === 'back' ? '50% 48%' : '65% 36%'
                }}
              >
                <JacketVisual
                  colorHex={activeColorObj.hex}
                  view={studioView}
                  designId={selectedDesignId}
                  uid="studio-main"
                  backImageUrl={matchedCatalogItem?.back_image_url}
                  frontImageUrl={matchedCatalogItem?.front_image_url}
                  isDark={isDark}
                  lightBackdrop={lightStudioBackdrop}
                />
              </div>

              {/* Studio Floating Controls */}
              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap justify-between items-center gap-2">
                <div
                  className="flex gap-1 p-1 rounded-full border backdrop-blur-md"
                  style={{
                    backgroundColor: isDark
                      ? 'rgba(14,15,17,0.82)'
                      : 'rgba(250,249,246,0.85)',
                    borderColor: 'var(--line)'
                  }}
                >
                  {[
                    ['back', T('Back Print', 'পেছনের প্রিন্ট')],
                    ['front', T('Front View', 'সামনের ভিউ')]
                  ].map(([v, label]) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setStudioView(v)}
                      className={`editorial-pill !border-0 cursor-pointer ${
                        studioView === v ? 'active' : ''
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                <div className="flex gap-2">
                  {isDark && (
                    <button
                      type="button"
                      onClick={() => setLightStudioBackdrop(!lightStudioBackdrop)}
                      className={`editorial-pill backdrop-blur-md cursor-pointer ${
                        lightStudioBackdrop ? 'active' : ''
                      }`}
                      style={{
                        backgroundColor: lightStudioBackdrop
                          ? undefined
                          : 'rgba(14,15,17,0.82)'
                      }}
                    >
                      {T('Light Backdrop', 'লাইট ব্যাকড্রপ')}
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setStudioZoom(!studioZoom)}
                    className={`editorial-pill inline-flex items-center gap-1.5 backdrop-blur-md cursor-pointer ${
                      studioZoom ? 'active' : ''
                    }`}
                    style={{
                      backgroundColor: studioZoom
                        ? undefined
                        : isDark
                        ? 'rgba(14,15,17,0.82)'
                        : 'rgba(250,249,246,0.85)'
                    }}
                  >
                    {studioZoom ? (
                      <ZoomOut className="w-3.5 h-3.5" />
                    ) : (
                      <ZoomIn className="w-3.5 h-3.5" />
                    )}
                    <span>{T('Zoom', 'জুম')}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Selected Specification Caption */}
            <div
              className="mt-4 px-2 flex flex-wrap items-center justify-between text-xs sm:text-sm"
              style={{ color: 'var(--mute)' }}
            >
              <span>
                {T(activeColorObj.nameEn, activeColorObj.nameBn)} ·{' '}
                {T('Size', 'সাইজ')} <strong style={{ color: 'var(--ink)' }}>{selectedSize}</strong>
              </span>
              <span>
                {T(activeDesignObj.codeEn, activeDesignObj.codeBn)} —{' '}
                {T(activeDesignObj.nameEn, activeDesignObj.nameBn)}
              </span>
            </div>
          </div>

          {/* RIGHT: STREAMLINED SELECTION & CHECKOUT FORM */}
          <div ref={checkoutSectionRef} className="lg:col-span-6 space-y-8">
            {/* Quick Selection Summary / Switcher */}
            <div
              className="p-5 sm:p-6 rounded-2xl border space-y-6"
              style={{
                borderColor: 'var(--line)',
                backgroundColor: 'var(--card)'
              }}
            >
              {/* Stock Mode Switch */}
              <div>
                <span className="editorial-label block mb-2.5">
                  {T('1. Order Mode', '১. অর্ডারের ধরন')}
                </span>
                <div
                  className="grid grid-cols-2 border rounded-full overflow-hidden text-xs sm:text-sm font-medium"
                  style={{ borderColor: 'var(--line)' }}
                >
                  {[
                    {
                      id: 'ready_stock',
                      en: 'Ready Stock (24–48h)',
                      bn: 'রেডি স্টক (২৪–৪৮ ঘণ্টা)'
                    },
                    {
                      id: 'pre_order',
                      en: 'Batch Pre-Order',
                      bn: 'ব্যাচ প্রি-অর্ডার'
                    }
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setOrderType(m.id)}
                      className="py-2.5 px-3 transition cursor-pointer"
                      style={{
                        backgroundColor:
                          orderType === m.id ? 'var(--accent)' : 'transparent',
                        color: orderType === m.id ? 'var(--onacc)' : 'var(--mute)'
                      }}
                    >
                      {T(m.en, m.bn)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Colour & Edition Switch */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <span className="editorial-label block mb-2.5">
                    {T('2. Jacket Colour', '২. জ্যাকেটের কালার')}
                  </span>
                  <div className="flex items-center gap-3">
                    {COLORS.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setSelectedColorId(c.id)}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-medium transition cursor-pointer"
                        style={{
                          borderColor:
                            selectedColorId === c.id ? 'var(--ink)' : 'var(--line)',
                          backgroundColor:
                            selectedColorId === c.id
                              ? isDark
                                ? 'rgba(255,255,255,0.06)'
                                : 'rgba(0,0,0,0.04)'
                              : 'transparent'
                        }}
                      >
                        <span
                          className="w-4 h-4 rounded-full border border-white/30"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span>{T(c.nameEn.split(' ').pop(), c.nameBn)}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="editorial-label block mb-2.5">
                    {T('3. Fixed Back Print', '৩. ফিক্সড ব্যাক প্রিন্ট')}
                  </span>
                  <div className="flex items-center gap-2">
                    {DESIGNS.map((d, idx) => (
                      <button
                        key={d.id}
                        type="button"
                        onClick={() => {
                          setSelectedDesignId(d.id);
                          setStudioView('back');
                        }}
                        className={`editorial-pill flex-1 text-center cursor-pointer ${
                          selectedDesignId === d.id ? 'active' : ''
                        }`}
                      >
                        {T(`Design 0${idx + 1}`, `ডিজাইন ০${idx + 1}`)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Size & Quantity */}
              <div className="pt-4 border-t" style={{ borderColor: 'var(--line)' }}>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="editorial-label">
                    {T('4. Size & Quantity', '৪. সাইজ এবং পরিমাণ')}
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsSizeChartOpen(true)}
                    className="text-xs underline underline-offset-4 inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>
                      {T('Chest', 'বুক')} {SIZES[selectedSize].chest}″ ·{' '}
                      {T('Length', 'দৈর্ঘ্য')} {SIZES[selectedSize].length}″
                    </span>
                  </button>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex gap-2">
                    {SIZE_LIST.map((sz) => (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => setSelectedSize(sz)}
                        className={`editorial-pill w-12 text-center cursor-pointer ${
                          selectedSize === sz ? 'active' : ''
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>

                  {/* Quantity Stepper */}
                  <div
                    className="inline-flex items-center border rounded-full"
                    style={{ borderColor: 'var(--line)' }}
                  >
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-9 h-9 flex items-center justify-center text-base cursor-pointer"
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-sm font-semibold tabular-nums">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.min(20, quantity + 1))}
                      className="w-9 h-9 flex items-center justify-center text-base cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Campus Delivery & Payment Form */}
            <form
              onSubmit={handleOrderSubmit}
              className="p-5 sm:p-6 rounded-2xl border space-y-6"
              style={{
                borderColor: 'var(--line)',
                backgroundColor: 'var(--card)'
              }}
            >
              <div>
                <span className="editorial-label block mb-1">
                  {T('5. Campus Delivery Details', '৫. ক্যাম্পাস ডেলিভারি তথ্য')}
                </span>
                <h3 className="serif-editorial text-2xl">
                  {T('Where should we drop your jacket?', 'আপনার জ্যাকেট কোথায় পৌঁছে দেব?')}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <input
                    type="text"
                    className={`editorial-input ${formErrors.name ? 'err' : ''}`}
                    placeholder={T('Your Full Name *', 'আপনার পূর্ণ নাম *')}
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    inputMode="tel"
                    className={`editorial-input ${formErrors.phone ? 'err' : ''}`}
                    placeholder={T(
                      'Mobile Number (01XXXXXXXXX) *',
                      'মোবাইল নম্বর (01XXXXXXXXX) *'
                    )}
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                  />
                </div>
              </div>

              {/* Free Delivery Zones */}
              <div>
                <p
                  className={`editorial-label mb-2.5 ${
                    formErrors.zone ? '!text-red-600' : ''
                  }`}
                >
                  {T('Free Delivery Zone · ৳0', 'ফ্রি ডেলিভারি জোন · ৳০')}
                </p>
                <div className="flex flex-wrap gap-2">
                  {DELIVERY_ZONES.map((z) => (
                    <button
                      key={z.id}
                      type="button"
                      onClick={() => setDeliveryZone(z.id)}
                      className={`editorial-pill cursor-pointer ${
                        deliveryZone === z.id ? 'active' : ''
                      }`}
                    >
                      {T(z.en, z.bn)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <input
                  type="text"
                  className={`editorial-input ${formErrors.addr ? 'err' : ''}`}
                  placeholder={T(
                    'Hall Name / Room No / Pickup Spot Details *',
                    'হলের নাম / রুম নম্বর / পিকআপ পয়েন্টের বিস্তারিত *'
                  )}
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                />
              </div>

              {/* Payment Method */}
              <div className="pt-2">
                <span className="editorial-label block mb-2.5">
                  {T('6. Payment Method', '৬. পেমেন্ট মেথড')}
                </span>
                <div className="flex flex-wrap gap-2">
                  {PAYMENT_METHODS.map((pm) => (
                    <button
                      key={pm.id}
                      type="button"
                      onClick={() => setPaymentMethod(pm.id)}
                      className={`editorial-pill cursor-pointer ${
                        paymentMethod === pm.id ? 'active' : ''
                      }`}
                    >
                      {T(pm.en, pm.bn)}
                    </button>
                  ))}
                </div>

                {!isMfsPayment ? (
                  <p style={{ color: 'var(--mute)' }} className="mt-3 text-xs">
                    {T(
                      'Pay in person when you receive your jacket at JU campus.',
                      'ক্যাম্পাসে জ্যাকেট হাতে পেয়ে সরাসরি ক্যাশ পেমেন্ট করুন।'
                    )}
                  </p>
                ) : (
                  <div
                    className="mt-4 p-4 rounded-xl border space-y-4"
                    style={{ borderColor: 'var(--line)' }}
                  >
                    <div
                      className="flex border rounded-full overflow-hidden text-xs font-medium"
                      style={{ borderColor: 'var(--line)' }}
                    >
                      {['Send Money', 'Payment'].map((pt) => (
                        <button
                          key={pt}
                          type="button"
                          onClick={() => setPaymentSubType(pt)}
                          className="flex-1 py-2 cursor-pointer"
                          style={{
                            backgroundColor:
                              paymentSubType === pt
                                ? 'var(--accent)'
                                : 'transparent',
                            color:
                              paymentSubType === pt
                                ? 'var(--onacc)'
                                : 'var(--mute)'
                          }}
                        >
                          {pt === 'Send Money'
                            ? T('Send Money', 'সেন্ড মানি')
                            : T('Payment', 'পেমেন্ট')}
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <span className="editorial-label block">
                          {paymentMethod} {T('Number', 'নম্বর')}
                        </span>
                        <span className="serif-editorial text-2xl sm:text-3xl tracking-wider">
                          {MERCHANT_PHONE}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopy('mfs', MERCHANT_PHONE)}
                        className="editorial-pill inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        {copiedKey === 'mfs' ? (
                          <Check className="w-3.5 h-3.5" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                        <span>
                          {copiedKey === 'mfs'
                            ? T('Copied', 'কপি হয়েছে')
                            : T('Copy', 'কপি')}
                        </span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="tel"
                        inputMode="tel"
                        className={`editorial-input ${
                          formErrors.sender ? 'err' : ''
                        }`}
                        placeholder={T('Sender Number *', 'প্রেরকের নম্বর *')}
                        value={senderNumber}
                        onChange={(e) => setSenderNumber(e.target.value)}
                      />
                      <input
                        type="text"
                        className={`editorial-input uppercase ${
                          formErrors.trx ? 'err' : ''
                        }`}
                        placeholder={T('Transaction ID (TrxID) *', 'TrxID *')}
                        value={trxId}
                        onChange={(e) => setTrxId(e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Order Total & Submit Button */}
              <div
                className="pt-4 border-t space-y-3"
                style={{ borderColor: 'var(--line)' }}
              >
                <div
                  className="flex justify-between text-xs sm:text-sm"
                  style={{ color: 'var(--mute)' }}
                >
                  <span>
                    {T(activeColorObj.nameEn, activeColorObj.nameBn)} ·{' '}
                    {T(activeDesignObj.codeEn, activeDesignObj.codeBn)} ·{' '}
                    {selectedSize} × {quantity}
                  </span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div
                  className="flex justify-between text-xs sm:text-sm"
                  style={{ color: 'var(--mute)' }}
                >
                  <span>{T('Campus Delivery', 'ক্যাম্পাস ডেলিভারি')}</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                    {T('FREE (৳0)', 'ফ্রি (৳০)')}
                  </span>
                </div>
                <div
                  className="flex justify-between items-baseline pt-3 border-t"
                  style={{ borderColor: 'var(--line)' }}
                >
                  <span className="editorial-label">
                    {T('Total Payable', 'সর্বমোট প্রদেয়')}
                  </span>
                  <span className="serif-editorial text-4xl">
                    {formatPrice(totalPrice)}
                  </span>
                </div>

                {Object.keys(formErrors).length > 0 && (
                  <p className="text-xs text-red-600 flex items-center gap-1.5 pt-1">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>
                      {T(
                        'Please fill in all highlighted delivery & payment fields.',
                        'অনুগ্রহ করে লাল চিহ্নিত ঘরগুলো সঠিকভাবে পূরণ করুন।'
                      )}
                    </span>
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl text-xs sm:text-sm font-semibold tracking-widest uppercase transition cursor-pointer disabled:opacity-50"
                  style={{
                    backgroundColor: 'var(--accent)',
                    color: 'var(--onacc)'
                  }}
                >
                  {isSubmitting
                    ? T('Processing Order…', 'অর্ডার প্রসেস হচ্ছে…')
                    : T('Confirm Jacket Order', 'অর্ডার কনফার্ম করুন')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 3: CUSTOM DEPARTMENT / BATCH / CLUB PRE-ORDER (WHATSAPP)
      ==================================================================== */}
      <section
        id="custom-batch"
        className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 border-t"
        style={{ borderColor: 'var(--line)' }}
      >
        <div
          className="rounded-3xl border p-6 sm:p-10 lg:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8"
          style={{
            borderColor: 'var(--line)',
            backgroundColor: 'var(--card)'
          }}
        >
          <div className="max-w-2xl space-y-3">
            <span className="editorial-label">
              {T(
                '03 · Custom Department / Batch / Club Pre-Order',
                '০৩ · কাস্টম ডিপার্টমেন্ট / ব্যাচ / ক্লাব প্রি-অর্ডার'
              )}
            </span>
            <h2 className="serif-editorial text-3xl sm:text-5xl leading-tight">
              {T(
                'Want Custom Jackets for Your Batch or Department?',
                'আপনার ব্যাচ, ডিপার্টমেন্ট বা ক্লাবের জন্য কাস্টম জ্যাকেট বানাবেন?'
              )}
            </h2>
            <p
              style={{ color: 'var(--mute)' }}
              className="text-sm sm:text-base leading-relaxed"
            >
              {T(
                'For custom logos, department names, batch numbers, or individual student names on the jacket, no complex online form is needed—message us directly on WhatsApp. Our team will finalize your custom mockup and batch pricing personally.',
                'নিজস্ব ডিপার্টমেন্টের নাম, ব্যাচ লোগো বা কাস্টম ডিজাইনের প্রি-অর্ডারের জন্য ওয়েবসাইটে জটিল কাস্টমাইজেশনের প্রয়োজন নেই—সরাসরি আমাদের WhatsApp নম্বরে যোগাযোগ করুন। আমাদের টিম আপনার ডিজাইন ও ব্যাচ ডিসকাউন্ট চূড়ান্ত করে দেবে।'
              )}
            </p>
          </div>

          <div className="w-full lg:w-auto flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm tracking-wide flex items-center justify-center gap-2.5 shadow-sm transition"
            >
              <MessageCircle className="w-5 h-5" />
              <span>
                {T('Chat on WhatsApp for Custom Order', 'কাস্টম অর্ডারের জন্য WhatsApp করুন')}
              </span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <div
              className="px-4 py-3 rounded-2xl border flex items-center justify-between gap-4"
              style={{ borderColor: 'var(--line)' }}
            >
              <div>
                <span className="editorial-label block">
                  {T('Direct WhatsApp / Call', 'সরাসরি WhatsApp / কল')}
                </span>
                <span className="serif-editorial text-2xl tracking-wider">
                  {WHATSAPP_NUMBER}
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleCopy('wa', WHATSAPP_NUMBER)}
                className="editorial-pill inline-flex items-center gap-1.5 cursor-pointer"
              >
                {copiedKey === 'wa' ? (
                  <Check className="w-3.5 h-3.5" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>
                  {copiedKey === 'wa' ? T('Copied', 'কপি হয়েছে') : T('Copy', 'কপি')}
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          CLEAN EDITORIAL FOOTER (NO ADMIN / POCKETBASE SETTINGS BUTTON)
      ==================================================================== */}
      <footer
        className="border-t mt-8"
        style={{ borderColor: 'var(--line)' }}
      >
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs sm:text-sm"
          style={{ color: 'var(--mute)' }}
        >
          <div>
            <span
              className="serif-editorial text-xl mr-2"
              style={{ color: 'var(--ink)' }}
            >
              Sparkle ✦
            </span>
            <span>
              {T(
                'Jahangirnagar University Winter Apparel',
                'জাহাঙ্গীরনগর বিশ্ববিদ্যালয় উইন্টার অ্যাপারেল'
              )}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <a
              href={`tel:${MERCHANT_PHONE}`}
              className="hover:underline inline-flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{MERCHANT_PHONE}</span>
            </a>
            <a
              href={`mailto:${MERCHANT_EMAIL}`}
              className="hover:underline inline-flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{MERCHANT_EMAIL}</span>
            </a>
          </div>
        </div>
      </footer>

      {/* ====================================================================
          MOBILE STICKY BOTTOM QUICK-ORDER BAR (THUMB-FRIENDLY)
      ==================================================================== */}
      <div
        className="lg:hidden fixed bottom-0 inset-x-0 z-30 border-t px-4 py-3 backdrop-blur-lg flex items-center justify-between gap-3 no-print"
        style={{
          backgroundColor: isDark
            ? 'rgba(14,15,17,0.94)'
            : 'rgba(250,249,246,0.95)',
          borderColor: 'var(--line)'
        }}
      >
        <div className="min-w-0">
          <div className="text-[11px] font-medium truncate" style={{ color: 'var(--mute)' }}>
            {T(activeColorObj.nameEn, activeColorObj.nameBn)} ·{' '}
            {T(activeDesignObj.codeEn, activeDesignObj.codeBn)} ·{' '}
            <strong style={{ color: 'var(--ink)' }}>{selectedSize}</strong>
          </div>
          <div className="serif-editorial text-2xl leading-none mt-0.5">
            {formatPrice(totalPrice)}{' '}
            <span className="text-[11px] font-sans text-emerald-600 dark:text-emerald-400 font-medium">
              · {T('Free JU Drop', 'ফ্রি ডেলিভারি')}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsMobileCheckoutOpen(true)}
          className="px-5 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider shrink-0 flex items-center gap-1.5 cursor-pointer"
          style={{
            backgroundColor: 'var(--accent)',
            color: 'var(--onacc)'
          }}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>{T('Quick Order', 'অর্ডার করুন')}</span>
        </button>
      </div>

      {/* ====================================================================
          MOBILE SLIDE-UP QUICK CHECKOUT SHEET
      ==================================================================== */}
      {isMobileCheckoutOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 no-print"
          onClick={() => setIsMobileCheckoutOpen(false)}
        >
          <div
            className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl p-5 sm:p-7 border shadow-2xl space-y-5"
            style={{
              backgroundColor: 'var(--card)',
              borderColor: 'var(--line)',
              color: 'var(--ink)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: 'var(--line)' }}>
              <div>
                <span className="editorial-label">
                  {T('Instant Campus Checkout', 'ক্যাম্পাস কুইক চেকআউট')}
                </span>
                <h3 className="serif-editorial text-2xl">
                  {T(activeDesignObj.nameEn, activeDesignObj.nameBn)}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileCheckoutOpen(false)}
                className="p-2 rounded-full border cursor-pointer"
                style={{ borderColor: 'var(--line)' }}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Size & Colour Confirmation inside Mobile Drawer */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span
                  className="w-3.5 h-3.5 rounded-full border border-white/30"
                  style={{ backgroundColor: activeColorObj.hex }}
                />
                <span className="font-semibold">
                  {T(activeColorObj.nameEn, activeColorObj.nameBn)}
                </span>
              </div>
              <div className="flex gap-1.5">
                {SIZE_LIST.map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setSelectedSize(sz)}
                    className={`px-2.5 py-1 rounded-md border text-xs font-medium cursor-pointer ${
                      selectedSize === sz ? 'font-bold' : ''
                    }`}
                    style={{
                      borderColor:
                        selectedSize === sz ? 'var(--ink)' : 'var(--line)',
                      backgroundColor:
                        selectedSize === sz ? 'var(--accent)' : 'transparent',
                      color: selectedSize === sz ? 'var(--onacc)' : 'var(--ink)'
                    }}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleOrderSubmit} className="space-y-4">
              <input
                type="text"
                className={`editorial-input ${formErrors.name ? 'err' : ''}`}
                placeholder={T('Your Full Name *', 'আপনার পূর্ণ নাম *')}
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
              <input
                type="tel"
                inputMode="tel"
                className={`editorial-input ${formErrors.phone ? 'err' : ''}`}
                placeholder={T(
                  'Mobile Number (01XXXXXXXXX) *',
                  'মোবাইল নম্বর (01XXXXXXXXX) *'
                )}
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
              />

              <div>
                <span className="editorial-label block mb-2">
                  {T('Free Delivery Zone (৳0)', 'ফ্রি ডেলিভারি জোন (৳০)')}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {DELIVERY_ZONES.map((z) => (
                    <button
                      key={z.id}
                      type="button"
                      onClick={() => setDeliveryZone(z.id)}
                      className={`editorial-pill !text-xs cursor-pointer ${
                        deliveryZone === z.id ? 'active' : ''
                      }`}
                    >
                      {T(z.en, z.bn)}
                    </button>
                  ))}
                </div>
              </div>

              <input
                type="text"
                className={`editorial-input ${formErrors.addr ? 'err' : ''}`}
                placeholder={T(
                  'Hall Name / Room No / Address *',
                  'হলের নাম / রুম নম্বর / ঠিকানা *'
                )}
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
              />

              <div>
                <span className="editorial-label block mb-2">
                  {T('Payment Method', 'পেমেন্ট মেথড')}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {PAYMENT_METHODS.map((pm) => (
                    <button
                      key={pm.id}
                      type="button"
                      onClick={() => setPaymentMethod(pm.id)}
                      className={`editorial-pill cursor-pointer ${
                        paymentMethod === pm.id ? 'active' : ''
                      }`}
                    >
                      {T(pm.en, pm.bn)}
                    </button>
                  ))}
                </div>
              </div>

              {isMfsPayment && (
                <div
                  className="p-3.5 rounded-xl border space-y-3"
                  style={{ borderColor: 'var(--line)' }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs">
                      {paymentMethod}: <strong>{MERCHANT_PHONE}</strong>
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy('mfs-mob', MERCHANT_PHONE)}
                      className="editorial-pill !py-1 !px-2.5 text-xs cursor-pointer"
                    >
                      {copiedKey === 'mfs-mob' ? T('Copied', 'কপি হয়েছে') : T('Copy', 'কপি')}
                    </button>
                  </div>
                  <input
                    type="tel"
                    inputMode="tel"
                    className={`editorial-input ${formErrors.sender ? 'err' : ''}`}
                    placeholder={T('Sender Number *', 'প্রেরকের নম্বর *')}
                    value={senderNumber}
                    onChange={(e) => setSenderNumber(e.target.value)}
                  />
                  <input
                    type="text"
                    className={`editorial-input uppercase ${
                      formErrors.trx ? 'err' : ''
                    }`}
                    placeholder="TrxID *"
                    value={trxId}
                    onChange={(e) => setTrxId(e.target.value)}
                  />
                </div>
              )}

              <div className="pt-2 flex items-center justify-between">
                <div>
                  <span className="editorial-label block">
                    {T('Total (Free Delivery)', 'সর্বমোট (ফ্রি ডেলিভারি)')}
                  </span>
                  <span className="serif-editorial text-3xl">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3.5 rounded-xl text-xs font-semibold uppercase tracking-widest cursor-pointer"
                  style={{
                    backgroundColor: 'var(--accent)',
                    color: 'var(--onacc)'
                  }}
                >
                  {isSubmitting
                    ? '…'
                    : T('Place Order', 'অর্ডার কনফার্ম করুন')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ====================================================================
          SIZE CHART MODAL
      ==================================================================== */}
      {isSizeChartOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/55 backdrop-blur-xs flex items-center justify-center p-4 no-print"
          onClick={() => setIsSizeChartOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-3xl p-6 sm:p-7 border shadow-2xl relative"
            style={{
              backgroundColor: 'var(--card)',
              borderColor: 'var(--line)',
              color: 'var(--ink)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsSizeChartOpen(false)}
              className="absolute top-5 right-5 p-1.5 rounded-full border cursor-pointer"
              style={{ borderColor: 'var(--line)', color: 'var(--mute)' }}
            >
              <X className="w-4 h-4" />
            </button>

            <span className="editorial-label">Sparkle ✦ JU Winter Fit</span>
            <h3 className="serif-editorial text-3xl mt-1 mb-4">
              {T('Jacket Size Guide (Inches)', 'জ্যাকেট সাইজ চার্ট (ইঞ্চি)')}
            </h3>

            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr
                  className="editorial-label border-b"
                  style={{ borderColor: 'var(--line)' }}
                >
                  <th className="py-2.5">{T('Size', 'সাইজ')}</th>
                  <th className="py-2.5">{T('Chest', 'বুক')}</th>
                  <th className="py-2.5">{T('Length', 'দৈর্ঘ্য')}</th>
                  <th className="py-2.5">{T('Sleeve', 'হাতা')}</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(SIZES).map(([sz, dim]) => (
                  <tr
                    key={sz}
                    className="border-b"
                    style={{ borderColor: 'var(--line)' }}
                  >
                    <td className="py-3 font-semibold">{sz}</td>
                    <td className="py-3">{dim.chest}″</td>
                    <td className="py-3">{dim.length}″</td>
                    <td className="py-3">{dim.sleeve}″</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p style={{ color: 'var(--mute)' }} className="mt-4 text-xs leading-relaxed">
              {T(
                'Tip: Tap any size in the filter bar to view available jackets in that size.',
                'টিপস: যেকোনো সাইজ সিলেক্ট করে সাথে সাথে অর্ডার করতে পারবেন।'
              )}
            </p>
          </div>
        </div>
      )}

      {/* ====================================================================
          DIGITAL ORDER RECEIPT SLIP MODAL
      ==================================================================== */}
      {orderReceipt && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setOrderReceipt(null)}
        >
          <div
            className="w-full max-w-md rounded-3xl p-6 sm:p-7 border shadow-2xl relative"
            style={{
              backgroundColor: 'var(--card)',
              borderColor: 'var(--line)',
              color: 'var(--ink)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOrderReceipt(null)}
              className="absolute top-5 right-5 p-1.5 rounded-full border no-print cursor-pointer"
              style={{ borderColor: 'var(--line)', color: 'var(--mute)' }}
            >
              <X className="w-4 h-4" />
            </button>

            <div className="print-slip">
              <p className="editorial-label">Sparkle ✦ · Jahangirnagar University</p>
              <h3 className="serif-editorial text-4xl mt-0.5">
                {T('Order Confirmed', 'অর্ডার সম্পন্ন হয়েছে')}
              </h3>
              <p style={{ color: 'var(--mute)' }} className="text-xs mt-1 mb-4">
                {orderReceipt.createdAt}
              </p>

              <div
                className="border-y border-dashed py-3 mb-4 flex justify-between items-baseline"
                style={{ borderColor: 'var(--line)' }}
              >
                <span className="editorial-label">
                  {T('Order ID', 'অর্ডার আইডি')}
                </span>
                <span className="serif-editorial text-3xl tracking-widest">
                  {orderReceipt.id}
                </span>
              </div>

              <dl className="text-xs sm:text-sm space-y-2.5">
                {[
                  [T('Customer', 'নাম'), orderReceipt.customer_name],
                  [T('Phone', 'মোবাইল'), orderReceipt.phone],
                  [
                    T('Jacket', 'জ্যাকেট'),
                    `${orderReceipt.jacket_color} · ${orderReceipt.size} × ${orderReceipt.quantity}`
                  ],
                  [T('Edition', 'ডিজাইন'), orderReceipt.design_variant],
                  [
                    T('Delivery Point', 'ডেলিভারি ঠিকানা'),
                    `${orderReceipt.delivery_zone} — ${orderReceipt.delivery_address}`
                  ],
                  [
                    T('Payment', 'পেমেন্ট'),
                    orderReceipt.payment_method +
                      (orderReceipt.trx_id
                        ? ` (${orderReceipt.payment_type} · ${orderReceipt.trx_id})`
                        : '')
                  ]
                ].map(([label, val]) => (
                  <div key={label} className="flex justify-between gap-4">
                    <dt style={{ color: 'var(--mute)' }} className="shrink-0">
                      {label}
                    </dt>
                    <dd className="text-right font-medium">{val}</dd>
                  </div>
                ))}
              </dl>

              <div
                className="mt-5 pt-4 border-t flex justify-between items-baseline"
                style={{ borderColor: 'var(--line)' }}
              >
                <span className="editorial-label">{T('Total', 'মোট')}</span>
                <span className="serif-editorial text-4xl">
                  {formatPrice(Number(orderReceipt.total_amount))}
                </span>
              </div>
            </div>

            <div className="mt-6 flex gap-3 no-print">
              <button
                type="button"
                onClick={() => window.print()}
                className="editorial-pill active flex-1 inline-flex items-center justify-center gap-1.5 !py-3 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>{T('Print / Save Slip', 'স্লিপ সেভ / প্রিন্ট করুন')}</span>
              </button>
              <button
                type="button"
                onClick={() => setOrderReceipt(null)}
                className="editorial-pill !py-3 cursor-pointer"
              >
                {T('Close', 'বন্ধ করুন')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}