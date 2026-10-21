import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Ruler,
  Phone,
  MessageCircle,
  Clock,
  Sparkles,
  ShieldCheck,
  Layers,
  Feather,
  Wallet,
  Lock,
  Shirt,
  Palette,
  Package,
  ArrowRight,
  Eye,
  CheckCircle2
} from 'lucide-react';
import { ProductMedia } from './JacketArtwork';

export default function CatalogSection({
  T,
  isDark,
  COLORS,
  DESIGNS,
  SIZES,
  SIZE_LIST,
  KEY_FEATURES,
  HOODIE_FEATURES,
  CONTACTS,
  PREORDER_PROMO,
  DEFAULT_UNIT_PRICE,
  formatPrice,
  filterCategory,
  setFilterCategory,
  filterColor,
  setFilterColor,
  filterSize,
  setFilterSize,
  filterDesign,
  setFilterDesign,
  handleSizeFilterSelect,
  filteredCatalog,
  handleOpenProductDetail,
  setIsSizeChartOpen
}) {
  const [featuresTab, setFeaturesTab] = useState(filterCategory === 'hoodie' ? 'hoodie' : 'jacket');

  useEffect(() => {
    if (filterCategory === 'hoodie') setFeaturesTab('hoodie');
    else if (filterCategory === 'jacket') setFeaturesTab('jacket');
  }, [filterCategory]);
  return (
    <>
      {/* ====================================================================
          1. PROMINENT PRE-ORDER & DIRECT CAMPUS TRIAL BANNER
      ==================================================================== */}
      <section
        id="preorder"
        className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-8 sm:pt-10 sm:pb-12 border-b"
        style={{ borderColor: 'var(--line)' }}
      >
        <div
          className="rounded-3xl p-6 sm:p-10 lg:p-12 border relative overflow-hidden transition-all shadow-sm"
          style={{
            borderColor: 'var(--line)',
            background: isDark
              ? 'linear-gradient(135deg, #15171c 0%, #0e0f12 100%)'
              : 'linear-gradient(135deg, #ffffff 0%, #f6f3eb 100%)'
          }}
        >
          {/* Subtle Accent Glow */}
          <div
            className="absolute -top-24 -right-24 w-80 h-80 rounded-full opacity-20 blur-3xl pointer-events-none"
            style={{ backgroundColor: '#2563eb' }}
          />

          <div className="max-w-3xl space-y-4">
            {/* Main Catchy Headline */}
            <h1 className="serif-editorial text-3xl sm:text-5xl lg:text-6xl leading-[1.08] tracking-tight">
              {T(
                'Feel the Quality Directly at Campus Before Ordering.',
                'একমাত্র আমরাই দিচ্ছি আপনার পছন্দের শীতের পোশাক টি সরাসরি দেখে নেওয়ার সুযোগ ।'
              )}
            </h1>

            {/* Trial Location Spotlight */}
            <div
              className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border text-xs sm:text-sm font-semibold"
              style={{
                backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
                borderColor: 'var(--line)'
              }}
            >
              <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
              <span>
                {T(
                  'Spot: Sahid Rafiq Jabbar Hall, Generator Bazar, Bottola, JU',
                  'স্থান: রফিক জব্বার হল, জেনারেটর বাজার, বটতলা, জাবি'
                )}
              </span>
            </div>

            {/* Sub-description */}
            <p style={{ color: 'var(--mute)' }} className="text-sm sm:text-base leading-relaxed">
              {T(
                'Premium quality bonded jacket engineered for JU winters. 100% waterproof, double-part protection with thick 4oz inner padding & original YKK metal chain. Inspect fabric in-person at Bottola or pre-order online with 100% free delivery across all halls.',
                'জাহাঙ্গীরনগর বিশ্ববিদ্যালয়ের শীতের জন্য প্রিমিয়াম কোয়ালিটি বন্ডেড জ্যাকেট। ওয়াটার প্রুফ, ডাবল পার্ট প্রটেকশন ও ৪ আউন্স ইনার প্যাডিং। সরাসরি বটতলায় কাপড় দেখে ট্রায়াল দিন অথবা অনলাইনে প্রি-অর্ডার করুন—সকল হলে ১০০% ফ্রি ডেলিভারি।'
              )}
            </p>

            {/* Action Buttons & Phone / WhatsApp Triggers */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="#collection"
                className="editorial-pill active !px-6 !py-3 font-semibold inline-flex items-center gap-2 cursor-pointer shadow-sm text-xs sm:text-sm"
              >
                <span>{T('Browse Collection & Order', 'কালেকশন দেখুন ও অর্ডার করুন')}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              {/* Quick WhatsApp & Call Action Pills (Numbers hidden, direct icons) */}
              <div className="flex flex-wrap items-center gap-2">
                {CONTACTS.map((cnt) => (
                  <div
                    key={cnt.name}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border shadow-2xs transition"
                    style={{
                      borderColor: 'var(--line)',
                      backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'
                    }}
                  >
                    <span className="text-xs font-semibold" style={{ color: 'var(--ink)' }}>
                      {cnt.name}
                    </span>

                    {/* Direct Dialer Call Icon */}
                    <a
                      href={`tel:${cnt.cleanPhone}`}
                      className="p-1.5 rounded-full border transition hover:scale-110 active:scale-95 cursor-pointer bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/25"
                      title={T(`Call ${cnt.name}`, `${cnt.name} কে কল করুন`)}
                      aria-label={`Call ${cnt.name}`}
                    >
                      <Phone className="w-3.5 h-3.5" />
                    </a>

                    {/* Direct WhatsApp Chat Icon */}
                    <a
                      href={`https://wa.me/${cnt.whatsapp}?text=${encodeURIComponent(
                        T(
                          `Hi ${cnt.name}! I would like to inquire about The Look JU Winter Collection (Trial & Order).`,
                          `হ্যালো ${cnt.name}! আমি দ্য লুক জাবি উইন্টার কালেকশনের ট্রায়াল ও অর্ডারের বিষয়ে জানতে চাই।`
                        )
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-full border transition hover:scale-110 active:scale-95 cursor-pointer bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                      title={T(`WhatsApp ${cnt.name}`, `${cnt.name} কে হোয়াটসঅ্যাপ করুন`)}
                      aria-label={`WhatsApp ${cnt.name}`}
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          2. KEY FEATURES STRIP (PREMIUM BONDED JACKET & WINTER HOODIE)
      ==================================================================== */}
      <section
        id="features"
        className="max-w-7xl mx-auto px-4 sm:px-6 py-8 border-b"
        style={{ borderColor: 'var(--line)' }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <span className="editorial-label">
              {featuresTab === 'hoodie' ? 'Craftsmanship & Winter Warmth' : 'Craftsmanship & Durability'}
            </span>
            <h2 className="serif-editorial text-2xl sm:text-3xl mt-0.5">
              {featuresTab === 'hoodie'
                ? T('Premium Winter Hoodie Specifications', 'প্রিমিয়াম উইন্টার হুডির বিশেষত্ব (৩৩০± GSM)')
                : T('Premium Bonded Jacket Features', 'প্রিমিয়াম বন্ডেড জ্যাকেটের বিশেষত্ব')}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Toggle Switch between Jacket Specs and Hoodie Specs */}
            <div
              className="inline-flex border rounded-full p-0.5 text-xs font-semibold"
              style={{ borderColor: 'var(--line)', backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)' }}
            >
              <button
                type="button"
                onClick={() => setFeaturesTab('jacket')}
                className={`px-3 py-1 rounded-full transition cursor-pointer ${
                  featuresTab === 'jacket'
                    ? 'shadow-xs font-bold'
                    : 'opacity-70 hover:opacity-100'
                }`}
                style={{
                  backgroundColor: featuresTab === 'jacket' ? 'var(--accent)' : 'transparent',
                  color: featuresTab === 'jacket' ? 'var(--onacc)' : 'var(--ink)'
                }}
              >
                {T('Jacket (4oz Peding)', 'জ্যাকেট (৪oz প্যাডিং)')}
              </button>
              <button
                type="button"
                onClick={() => setFeaturesTab('hoodie')}
                className={`px-3 py-1 rounded-full transition cursor-pointer ${
                  featuresTab === 'hoodie'
                    ? 'shadow-xs font-bold'
                    : 'opacity-70 hover:opacity-100'
                }`}
                style={{
                  backgroundColor: featuresTab === 'hoodie' ? 'var(--accent)' : 'transparent',
                  color: featuresTab === 'hoodie' ? 'var(--onacc)' : 'var(--ink)'
                }}
              >
                {T('Hoodie (350+ GSM)', 'হুডি (৩৫০+ GSM)')}
              </button>
            </div>

            <button
              type="button"
              onClick={() => setIsSizeChartOpen(true)}
              className="text-xs font-medium underline underline-offset-4 flex items-center gap-1 cursor-pointer shrink-0"
              style={{ color: 'var(--mute)' }}
            >
              <Ruler className="w-3.5 h-3.5" />
              <span>{T('Size Guide', 'সাইজ গাইড')}</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {(featuresTab === 'hoodie'
            ? [
                { title: T('350+ GSM Fleece', '৩৫০+ জিএসএম ফ্লিস'), sub: T('Brushed warm interior', 'উষ্ণ ব্রাশড ইনার'), icon: Shirt },
                { title: T('Regular Fit', 'রেগুলার ফিট'), sub: T('Comfortable everyday cut', 'দৈনন্দিন আরামদায়ক কাট'), icon: Layers },
                { title: T('Double Layer Hood', 'ডাবল লেয়ার হুড'), sub: T('Structured ear shield', 'কান ও মাথার উষ্ণ সুরক্ষা'), icon: ShieldCheck },
                { title: T('Premium Stitching', 'প্রিমিয়াম স্টিচিং'), sub: T('Reinforced dual-needle', 'মজবুত ডাবল নিডেল সেলাই'), icon: Sparkles },
                { title: T('Color Fastness', 'কালার ফাস্টনেস'), sub: T('Guaranteed anti-fade', 'রং অক্ষুণ্ণ থাকার গ্যারান্টি'), icon: Palette },
                { title: T('1/1 Poly Pack', '১/১ পলি প্যাক'), sub: T('Individual sealed pack', 'ইনডিভিজুয়াল মাস্টার প্যাক'), icon: Package }
              ]
            : [
                { title: T('Water Proof', 'ওয়াটার প্রুফ'), sub: T('Rain & fog shield', 'কুয়াশা প্রতিরোধী'), icon: ShieldCheck },
                { title: T('Double Part', 'ডাবল পার্ট'), sub: T('Heavy winter layer', 'দ্বিগুণ স্তরের ফ্যাব্রিক'), icon: Layers },
                { title: T('Gorgeous Outlook', 'গর্জিয়াস আউটলুক'), sub: T('Collegiate fit', 'শার্প এডিটোরিয়াল কাট'), icon: Sparkles },
                { title: T('4oz Peding', '৪ আউন্স প্যাডিং'), sub: T('Warm inner quilt', 'উষ্ণ ইনার লাইনিং'), icon: Feather },
                { title: T('Inner Pocket', 'ভেতরের পকেট'), sub: T('Safe phone slot', 'মোবাইল/কার্ড পকেট'), icon: Wallet },
                { title: T('YKK Metal Chain', 'YKK মেটাল চেইন'), sub: T('Ultra-durable', 'অরিজিনাল মেটাল জিপার'), icon: Lock }
              ]
          ).map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className="p-3.5 rounded-2xl border transition-all"
                style={{
                  borderColor: 'var(--line)',
                  backgroundColor: 'var(--card)'
                }}
              >
                <Icon className="w-4 h-4 mb-2 text-amber-500" />
                <div className="text-xs font-bold leading-tight">{f.title}</div>
                <div style={{ color: 'var(--mute)' }} className="text-[11px] mt-0.5 leading-snug">
                  {f.sub}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ====================================================================
          3. COMPACT 2-COLUMN MOBILE CATALOG (DARAZ / ALIEXPRESS STYLE)
      ==================================================================== */}
      <section
        id="collection"
        className="max-w-7xl mx-auto px-3 sm:px-6 py-8 sm:py-12"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-5">
          <div>
            <span className="editorial-label">
              {T('01 · Collegiate Winter Editions', '০১ · কলেজিয়েট উইন্টার কালেকশন')}
            </span>
            <h2 className="serif-editorial text-3xl sm:text-4xl mt-0.5">
              {T('Choose Your Edition', 'আপনার জ্যাকেট বেছে নিন')}
            </h2>
          </div>
          <p style={{ color: 'var(--mute)' }} className="text-xs sm:text-sm">
            {T(
              'Tap any card to see full photo gallery, size specs & instant order.',
              'যেকোনো জ্যাকেটে ট্যাপ করে সব ছবি, সাইজ ও সরাসরি অর্ডার দেখুন।'
            )}
          </p>
        </div>

        {/* ==================================================================
            COMPACT MOBILE-FRIENDLY FILTER BAR
        ================================================================== */}
        <div
          className="p-3.5 sm:p-4 rounded-2xl border mb-6 space-y-3 w-full min-w-0 overflow-hidden"
          style={{
            borderColor: 'var(--line)',
            backgroundColor: 'var(--card)'
          }}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 w-full min-w-0">
            {/* Category Filter (All / Jackets / Hoodies) */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5 w-full min-w-0">
              <span className="editorial-label mr-1 shrink-0">Item:</span>
              <button
                type="button"
                onClick={() => setFilterCategory('all')}
                className={`editorial-pill !py-1 !px-3 text-xs cursor-pointer ${
                  filterCategory === 'all' ? 'active' : ''
                }`}
              >
                {T('All Items', 'সব আইটেম')}
              </button>
              <button
                type="button"
                onClick={() => setFilterCategory('jacket')}
                className={`editorial-pill !py-1 !px-3 text-xs cursor-pointer ${
                  filterCategory === 'jacket' ? 'active' : ''
                }`}
              >
                {T('Jackets', 'জ্যাকেট')}
              </button>
              <button
                type="button"
                onClick={() => setFilterCategory('hoodie')}
                className={`editorial-pill !py-1 !px-3 text-xs cursor-pointer ${
                  filterCategory === 'hoodie' ? 'active' : ''
                }`}
              >
                {T('Hoodies (M, L, XL)', 'হুডি (M, L, XL)')}
              </button>
            </div>

            {/* Color Filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5 w-full min-w-0">
              <span className="editorial-label mr-1 shrink-0">Color:</span>
              <button
                type="button"
                onClick={() => setFilterColor('all')}
                className={`editorial-pill !py-1 !px-3 text-xs cursor-pointer ${
                  filterColor === 'all' ? 'active' : ''
                }`}
              >
                {T('All (4)', 'সব (৪)')}
              </button>
              {COLORS.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setFilterColor(c.id)}
                  className={`editorial-pill !py-1 !px-2.5 text-xs inline-flex items-center gap-1.5 cursor-pointer ${
                    filterColor === c.id ? 'active' : ''
                  }`}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full border border-white/40 shrink-0"
                    style={{ backgroundColor: c.hex }}
                  />
                  <span>{T(c.nameEn, c.nameBn)}</span>
                </button>
              ))}
            </div>


            {/* Size Filter */}
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-0.5 w-full min-w-0">
              <span className="editorial-label mr-1 shrink-0">Size:</span>
              <button
                type="button"
                onClick={() => handleSizeFilterSelect('all')}
                className={`editorial-pill !py-1 !px-2.5 text-xs cursor-pointer ${
                  filterSize === 'all' ? 'active' : ''
                }`}
              >
                All
              </button>
              {SIZE_LIST.map((sz) => (
                <button
                  key={sz}
                  type="button"
                  onClick={() => handleSizeFilterSelect(sz)}
                  className={`editorial-pill !py-1 !px-2.5 text-xs cursor-pointer ${
                    filterSize === sz ? 'active' : ''
                  }`}
                  title={`${sz}: Chest ${SIZES[sz]?.chest}″, Len ${SIZES[sz]?.length}″`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ==================================================================
            DARAZ / ALIEXPRESS STYLE 2-COLUMN COMPACT MOBILE GRID
        ================================================================== */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {filteredCatalog.map((item) => {
            const colorObj =
              COLORS.find((c) => c.id === item.colorId) || COLORS[0];
            const designObj =
              DESIGNS.find((d) => d.id === item.designId) || DESIGNS[0];
            const primaryPhoto =
              (item.images && item.images.length > 0 ? item.images[0] : '') ||
              item.back_image_url ||
              item.front_image_url ||
              '';
            const photosCount =
              item.images && item.images.length > 0
                ? item.images.length
                : primaryPhoto
                ? 1
                : 0;

            const cardSizes =
              item.availableSizes && item.availableSizes.length > 0
                ? item.availableSizes
                : item.category === 'hoodie'
                ? ['M', 'L', 'XL']
                : SIZE_LIST;

            return (
              <div
                key={item.id}
                onClick={() => handleOpenProductDetail(item)}
                className="group rounded-2xl border overflow-hidden flex flex-col justify-between transition-all duration-200 cursor-pointer hover:shadow-md active:scale-[0.98]"
                style={{
                  borderColor: 'var(--line)',
                  backgroundColor: 'var(--card)'
                }}
              >
                <div>
                  {/* Compact Product Visual */}
                  <div className="relative aspect-[4/4.8] overflow-hidden p-2.5 sm:p-3 flex items-center justify-center bg-zinc-950/5">
                    {/* Category Tag Top Left (Clean, no pre-order badge) */}
                    <span
                      className="absolute top-2 left-2 z-10 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide backdrop-blur-md border"
                      style={{
                        backgroundColor: isDark ? 'rgba(0,0,0,0.65)' : 'rgba(255,255,255,0.85)',
                        borderColor: 'var(--line)',
                        color: 'var(--ink)'
                      }}
                    >
                      <span>
                        {item.category === 'hoodie'
                          ? T('Hoodie', 'হুডি')
                          : T('Jacket', 'জ্যাকেট')}
                      </span>
                    </span>

                    {/* Photo Counter Top Right */}
                    {photosCount > 1 && (
                      <span className="absolute top-2 right-2 z-10 px-2 py-0.5 rounded-full text-[10px] font-semibold backdrop-blur-md bg-black/60 text-white">
                        📷 {photosCount}
                      </span>
                    )}

                    {/* Image / Swatch */}
                    <ProductMedia
                      imageUrl={primaryPhoto}
                      colorHex={colorObj.hex}
                      colorName={T(colorObj.nameEn, colorObj.nameBn)}
                      title={T(designObj.nameEn, designObj.nameBn)}
                      aspectRatio="aspect-square"
                      imageCount={photosCount}
                    />
                  </div>

                  {/* Compact Card Details */}
                  <div className="p-3 sm:p-3.5 space-y-1.5">
                    {/* Color dot & Edition */}
                    <div className="flex items-center justify-between text-[11px] font-medium" style={{ color: 'var(--mute)' }}>
                      <span className="flex items-center gap-1.5 truncate">
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0 border border-white/40"
                          style={{ backgroundColor: colorObj.hex }}
                        />
                        <span className="truncate">{T(colorObj.nameEn, colorObj.nameBn)}</span>
                      </span>
                      <span className="shrink-0 font-semibold">{item.badgeEn ? T(item.badgeEn, item.badgeBn) : (item.badgeBn || '')}</span>
                    </div>

                    {/* Title */}
                    <h3 className="serif-editorial text-base sm:text-lg leading-snug line-clamp-2">
                      {item.badgeEn
                        ? (item.category === 'hoodie' ? `The Look Hoodie · ${T(item.badgeEn, item.badgeBn)}` : `The Look Jacket · ${T(item.badgeEn, item.badgeBn)}`)
                        : (item.design_variant || (item.category === 'hoodie' ? T('The Look Collegiate Hoodie', 'দ্য লুক কলেজিয়েট হুডি') : T('The Look Bonded Jacket', 'দ্য লুক বন্ডেড জ্যাকেট')))}
                    </h3>

                    {/* Price */}
                    <div className="flex items-baseline justify-between pt-0.5">
                      <span className="serif-editorial text-xl sm:text-2xl font-bold">
                        {formatPrice(item.price)}
                      </span>
                      <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                        {T('Free Drop', 'ফ্রি ডেলিভারি')}
                      </span>
                    </div>

                    {/* Sizes chips preview (Dynamic per item: M,L,XL for Hoodie; S,M,L,XL,2XL for Jacket) */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {cardSizes.map((sz) => (
                        <span
                          key={sz}
                          className="px-1.5 py-0.5 rounded text-[10px] border font-medium"
                          style={{
                            borderColor: 'var(--line)',
                            color: 'var(--ink)'
                          }}
                        >
                          {sz}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* View Details Action */}
                <div className="p-3 pt-0">
                  <div
                    className="w-full py-2 px-3 rounded-xl text-center text-xs font-semibold uppercase tracking-wider transition flex items-center justify-center gap-1.5"
                    style={{
                      backgroundColor: 'var(--accent)',
                      color: 'var(--onacc)'
                    }}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{T('View & Order', 'বিস্তারিত ও অর্ডার')}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
