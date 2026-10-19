import React from 'react';
import {
  Ruler,
  AlertCircle,
  Copy,
  Check,
  MapPin,
  ShieldCheck,
  Layers,
  Sparkles,
  Phone,
  MessageCircle,
  Clock
} from 'lucide-react';
import { ProductGallery } from './JacketArtwork';

export default function StudioInspector({
  studioSectionRef,
  checkoutSectionRef,
  T,
  isDark,
  COLORS,
  DESIGNS,
  SIZES,
  SIZE_LIST,
  KEY_FEATURES,
  CONTACTS,
  PREORDER_PROMO,
  DELIVERY_ZONES,
  PAYMENT_METHODS,
  MERCHANT_PHONE,
  formatPrice,
  activeColorObj,
  activeDesignObj,
  matchedCatalogItem,
  orderType,
  setOrderType,
  selectedColorId,
  setSelectedColorId,
  selectedDesignId,
  setSelectedDesignId,
  selectedSize,
  setSelectedSize,
  quantity,
  setQuantity,
  setIsSizeChartOpen,
  customerName,
  setCustomerName,
  customerPhone,
  setCustomerPhone,
  deliveryZone,
  setDeliveryZone,
  deliveryAddress,
  setDeliveryAddress,
  paymentMethod,
  setPaymentMethod,
  paymentSubType,
  setPaymentSubType,
  senderNumber,
  setSenderNumber,
  sentAmount,
  setSentAmount,
  formErrors,
  isSubmitting,
  handleOrderSubmit,
  totalPrice,
  isMfsPayment,
  handleCopy,
  copiedKey
}) {
  const images = matchedCatalogItem?.images || [];

  return (
    <section
      id="studio"
      ref={studioSectionRef}
      className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16 border-t"
      style={{ borderColor: 'var(--line)' }}
    >
      <div className="mb-6 sm:mb-8">
        <span className="editorial-label">
          {T('02 · Product Inspection & Direct Campus Order', '০২ · জ্যাকেট বিস্তারিত ও সরাসরি অর্ডার')}
        </span>
        <h2 className="serif-editorial text-3xl sm:text-5xl mt-1">
          {T('Inspect Details & Complete Pre-Order', 'বিস্তারিত দেখুন ও প্রি-অর্ডার সম্পন্ন করুন')}
        </h2>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-start">
        {/* LEFT COLUMN: MULTI-IMAGE GALLERY & FEATURES */}
        <div className="lg:col-span-6 lg:sticky lg:top-20 space-y-5">
          {/* Multi-Image Gallery with Thumbnails (Model photos, real fabric, angles) */}
          <ProductGallery
            images={images}
            colorHex={activeColorObj.hex}
            colorName={T(activeColorObj.nameEn, activeColorObj.nameBn)}
            title={T(activeDesignObj.nameEn, activeDesignObj.nameBn)}
            isDark={isDark}
          />

          {/* Trial Spot Notice Box */}
          <div
            className="p-4 rounded-2xl border space-y-2 text-xs sm:text-sm"
            style={{
              borderColor: 'var(--line)',
              backgroundColor: 'var(--card)'
            }}
          >
            <div className="font-semibold flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
              <MapPin className="w-4 h-4 shrink-0 text-rose-500" />
              <span>{PREORDER_PROMO.headlineBn}</span>
            </div>
            <p style={{ color: 'var(--mute)' }} className="text-xs leading-relaxed">
              {PREORDER_PROMO.locationBn} — স্যাম্পল দেখে সাইজ নিশ্চিত হতে সরাসরি কল বা WhatsApp করতে পারেন:
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              {CONTACTS.map((cnt) => (
                <div
                  key={cnt.name}
                  className="px-3 py-1.5 rounded-xl border flex items-center gap-2.5 text-xs"
                  style={{ borderColor: 'var(--line)' }}
                >
                  <span className="font-semibold">{cnt.name} ({T(cnt.roleEn, cnt.roleBn)}):</span>
                  <a href={`tel:${cnt.cleanPhone}`} className="hover:underline flex items-center gap-1 font-mono">
                    <Phone className="w-3 h-3 text-blue-500" />
                    <span>{cnt.phone}</span>
                  </a>
                  <a
                    href={`https://wa.me/${cnt.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 rounded-full bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20"
                    title="WhatsApp"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Key Jacket Features */}
          <div
            className="p-4 rounded-2xl border space-y-2 text-xs"
            style={{ borderColor: 'var(--line)', backgroundColor: 'var(--card)' }}
          >
            <div className="editorial-label mb-2">★ Premium Bonded Specifications:</div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {KEY_FEATURES.map((kf, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <span className="text-amber-500">★</span>
                  <span className="font-medium">{T(kf.titleEn, kf.titleBn)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: CONFIGURATION & CHECKOUT FORM */}
        <div ref={checkoutSectionRef} className="lg:col-span-6 space-y-6">
          {/* Step 1: Edition & Color Switcher */}
          <div
            className="p-5 sm:p-6 rounded-2xl border space-y-5"
            style={{
              borderColor: 'var(--line)',
              backgroundColor: 'var(--card)'
            }}
          >
            {/* Edition Switch (2 Designs) */}
            <div>
              <span className="editorial-label block mb-2">
                {T('1. Choose Edition (2 Designs Available)', '১. ডিজাইন এডিশন নির্বাচন করুন (২টি ডিজাইন)')}
              </span>
              <div className="grid grid-cols-2 gap-2">
                {DESIGNS.map((d, idx) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setSelectedDesignId(d.id)}
                    className={`editorial-pill !py-2.5 text-center cursor-pointer ${
                      selectedDesignId === d.id ? 'active font-bold' : ''
                    }`}
                  >
                    <div>{T(d.codeEn, d.codeBn)}</div>
                    <div className="text-[10px] opacity-80 truncate">{T(d.nameEn.split(' ')[0], d.nameBn.split(' ')[0])}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Jacket Colour */}
            <div>
              <span className="editorial-label block mb-2">
                {matchedCatalogItem?.category === 'hoodie'
                  ? T('2. Hoodie Colour', '২. হুডির কালার')
                  : T('2. Jacket Colour', '২. জ্যাকেটের কালার')}
              </span>
              <div className="flex flex-wrap gap-2.5">
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
                            ? 'rgba(255,255,255,0.08)'
                            : 'rgba(0,0,0,0.05)'
                          : 'transparent'
                    }}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-white/40"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span>{T(c.nameEn, c.nameBn)}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size & Quantity with Exact In-Inch Measurements */}
            <div className="pt-3 border-t" style={{ borderColor: 'var(--line)' }}>
              <div className="flex items-center justify-between mb-2">
                <span className="editorial-label">
                  {matchedCatalogItem?.category === 'hoodie'
                    ? T('3. Select Size (Hoodie: M, L, XL)', '৩. সাইজ নির্বাচন করুন (হুডি: M, L, XL)')
                    : T('3. Select Size (Inches)', '৩. সাইজ নির্বাচন করুন (ইঞ্চি)')}
                </span>
                <button
                  type="button"
                  onClick={() => setIsSizeChartOpen(true)}
                  className="text-xs underline underline-offset-4 flex items-center gap-1 cursor-pointer"
                  style={{ color: 'var(--mute)' }}
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>
                    {T('Chest', 'বুক')} {SIZES[selectedSize]?.chest}″ ·{' '}
                    {T('Length', 'দৈর্ঘ্য')} {SIZES[selectedSize]?.length}″
                  </span>
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex gap-1.5">
                  {(matchedCatalogItem?.availableSizes || (matchedCatalogItem?.category === 'hoodie' ? ['M', 'L', 'XL'] : SIZE_LIST)).map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setSelectedSize(sz)}
                      className={`editorial-pill !px-3 !py-1.5 text-xs font-medium cursor-pointer ${
                        selectedSize === sz ? 'active font-bold' : ''
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
                    className="w-8 h-8 flex items-center justify-center text-sm cursor-pointer"
                  >
                    −
                  </button>
                  <span className="w-7 text-center text-xs font-semibold tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.min(20, quantity + 1))}
                    className="w-8 h-8 flex items-center justify-center text-sm cursor-pointer"
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
            className="p-5 sm:p-6 rounded-2xl border space-y-5"
            style={{
              borderColor: 'var(--line)',
              backgroundColor: 'var(--card)'
            }}
          >
            <div>
              <span className="editorial-label block mb-1">
                {T('4. Free JU Campus Delivery Details', '৪. ফ্রি ক্যাম্পাস ডেলিভারি তথ্য')}
              </span>
              <h3 className="serif-editorial text-2xl">
                {T('Where Should We Deliver Your Jacket?', 'আপনার জ্যাকেট কোথায় পৌঁছে দেব?')}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

            {/* Delivery Zones */}
            <div>
              <p
                className={`editorial-label mb-2 ${
                  formErrors.zone ? '!text-red-600' : ''
                }`}
              >
                {T('Free Campus Delivery Zone (৳0)', 'ফ্রি ডেলিভারি জোন (৳০)')}
              </p>
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
              <span className="editorial-label block mb-2">
                {T('5. Payment Method', '৫. পেমেন্ট মেথড')}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {PAYMENT_METHODS.map((pm) => (
                  <button
                    key={pm.id}
                    type="button"
                    onClick={() => setPaymentMethod(pm.id)}
                    className={`editorial-pill !text-xs cursor-pointer ${
                      paymentMethod === pm.id ? 'active' : ''
                    }`}
                  >
                    {T(pm.en, pm.bn)}
                  </button>
                ))}
              </div>

              {!isMfsPayment ? (
                <p style={{ color: 'var(--mute)' }} className="mt-2.5 text-xs">
                  {T(
                    'Pay Cash on Delivery when you receive your jacket at JU campus.',
                    'ক্যাম্পাসে জ্যাকেট হাতে পেয়ে সরাসরি ক্যাশ পেমেন্ট করুন।'
                  )}
                </p>
              ) : (
                <div
                  className="mt-3.5 p-3.5 rounded-xl border space-y-3"
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
                        className="flex-1 py-1.5 cursor-pointer"
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
                      <span className="serif-editorial text-2xl tracking-wider">
                        {MERCHANT_PHONE}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy('mfs', MERCHANT_PHONE)}
                      className="editorial-pill !py-1 !px-2.5 text-xs inline-flex items-center gap-1 cursor-pointer"
                    >
                      {copiedKey === 'mfs' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedKey === 'mfs' ? T('Copied', 'কপি হয়েছে') : T('Copy', 'কপি')}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="tel"
                      inputMode="tel"
                      className={`editorial-input ${formErrors.sender ? 'err' : ''}`}
                      placeholder={T('Sender Number *', 'প্রেরকের নম্বর *')}
                      value={senderNumber}
                      onChange={(e) => setSenderNumber(e.target.value)}
                    />
                    <input
                      type="number"
                      inputMode="numeric"
                      className={`editorial-input ${formErrors.amount ? 'err' : ''}`}
                      placeholder={T('Sent Amount (৳) *', 'পাঠানো টাকার পরিমাণ (৳) *')}
                      value={sentAmount}
                      onChange={(e) => setSentAmount(e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Total and Submit Button */}
            <div
              className="pt-3 border-t space-y-2.5"
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
                className="flex justify-between items-baseline pt-2 border-t"
                style={{ borderColor: 'var(--line)' }}
              >
                <span className="editorial-label">{T('Total Payable', 'সর্বমোট প্রদেয়')}</span>
                <span className="serif-editorial text-3xl sm:text-4xl">
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
                className="w-full py-3.5 rounded-xl text-xs sm:text-sm font-semibold tracking-widest uppercase transition cursor-pointer disabled:opacity-50"
                style={{
                  backgroundColor: 'var(--accent)',
                  color: 'var(--onacc)'
                }}
              >
                {isSubmitting
                  ? T('Processing Order…', 'অর্ডার প্রসেস হচ্ছে…')
                  : T('Confirm Pre-Order', 'প্রি-অর্ডার কনফার্ম করুন')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
