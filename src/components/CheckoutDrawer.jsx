import React, { useMemo } from 'react';
import { X, Check, Copy, Phone, MessageCircle, Clock, ShieldCheck, MapPin } from 'lucide-react';
import { ProductGallery } from './JacketArtwork';

export default function CheckoutDrawer({
  isMobileCheckoutOpen,
  setIsMobileCheckoutOpen,
  T,
  isDark,
  catalog = [],
  COLORS = [],
  selectedColorId,
  setSelectedColorId,
  activeColorObj,
  activeDesignObj,
  selectedProduct,
  matchedCatalogItem,
  SIZE_LIST,
  selectedSize,
  setSelectedSize,
  SIZES,
  quantity = 1,
  setQuantity,
  customerName,
  setCustomerName,
  customerPhone,
  setCustomerPhone,
  formErrors = {},
  DELIVERY_ZONES,
  deliveryZone,
  setDeliveryZone,
  deliveryAddress,
  setDeliveryAddress,
  PAYMENT_METHODS,
  paymentMethod,
  setPaymentMethod,
  isMfsPayment,
  MERCHANT_PHONE,
  handleCopy,
  copiedKey,
  senderNumber,
  setSenderNumber,
  sentAmount,
  setSentAmount,
  totalPrice,
  formatPrice,
  isSubmitting,
  handleOrderSubmit
}) {
  if (!isMobileCheckoutOpen) return null;

  const currentItem = matchedCatalogItem || selectedProduct;
  const itemCategory = currentItem?.category || 'jacket';

  // Get all images for the current active item
  const activeImages = useMemo(() => {
    if (currentItem?.images && currentItem.images.length > 0) {
      return currentItem.images;
    }
    const fallback = [];
    if (currentItem?.primaryImage) fallback.push(currentItem.primaryImage);
    if (currentItem?.back_image_url) fallback.push(currentItem.back_image_url);
    if (currentItem?.front_image_url) fallback.push(currentItem.front_image_url);
    return fallback;
  }, [currentItem]);

  // Available colors for the current category in the catalog
  const categoryColors = useMemo(() => {
    const matched = COLORS.filter((c) =>
      catalog.length === 0 ||
      catalog.some(
        (item) => (item.category || 'jacket') === itemCategory && item.colorId === c.id
      )
    );
    return matched.length > 0 ? matched : COLORS;
  }, [COLORS, catalog, itemCategory]);

  // Available sizes for the active item
  const availableSizes =
    currentItem?.availableSizes && currentItem.availableSizes.length > 0
      ? currentItem.availableSizes
      : itemCategory === 'hoodie'
      ? ['M', 'L', 'XL']
      : SIZE_LIST;

  const itemPrice = currentItem?.price || (itemCategory === 'hoodie' ? 650 : 1350);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 no-print overflow-hidden"
      onClick={() => setIsMobileCheckoutOpen(false)}
    >
      <div
        className="w-full max-w-lg max-h-[92vh] flex flex-col rounded-t-3xl sm:rounded-3xl border shadow-2xl overflow-hidden"
        style={{
          backgroundColor: 'var(--card)',
          borderColor: 'var(--line)',
          color: 'var(--ink)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header */}
        <div
          className="flex items-center justify-between px-4 sm:px-6 py-3 border-b shrink-0"
          style={{ borderColor: 'var(--line)' }}
        >
          <div>
            <span className="editorial-label text-[10px]">
              {itemCategory === 'hoodie'
                ? T('Collegiate Winter Hoodie', 'কলেজিয়েট উইন্টার হুডি')
                : T('Premium Bonded Winter Jacket', 'প্রিমিয়াম বন্ডেড জ্যাকেট')}
            </span>
            <div className="flex items-baseline gap-2 flex-wrap">
              <h3 className="serif-editorial text-xl sm:text-2xl font-bold leading-tight">
                {currentItem?.badgeEn
                  ? T(currentItem.badgeEn, currentItem.badgeBn)
                  : (currentItem?.design_variant || T(activeColorObj.nameEn, activeColorObj.nameBn))}
              </h3>
              <span className="serif-editorial text-lg font-bold text-amber-500">
                {formatPrice(itemPrice)}
              </span>
              {currentItem?.stockType === 'out_of_stock' ? (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-500 border border-rose-500/20">
                  {T('Stock Out', 'স্টক শেষ')}
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                  {T('In Stock', 'স্টক আছে')}
                </span>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsMobileCheckoutOpen(false)}
            className="p-2 rounded-full border cursor-pointer hover:opacity-75 transition-opacity"
            style={{ borderColor: 'var(--line)' }}
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body: Image Slider + Color/Size Controls + Form */}
        <div className="overflow-y-auto px-4 sm:px-6 py-4 space-y-4 flex-1 overscroll-contain">
          {/* TOUCH-SWIPEABLE MULTI-IMAGE CAROUSEL */}
          <div className="w-full">
            <ProductGallery
              images={activeImages}
              colorHex={activeColorObj.hex}
              colorName={T(activeColorObj.nameEn, activeColorObj.nameBn)}
              title={currentItem?.badgeEn || (itemCategory === 'hoodie' ? 'The Look Hoodie' : 'The Look Jacket')}
              isDark={isDark}
              aspectRatio="aspect-[4/4.2]"
              compact={true}
            />
          </div>

          {/* Quick Specifications Strip */}
          <div className="flex flex-wrap gap-1.5">
            {(itemCategory === 'hoodie'
              ? [
                  '🔥 ৩৫০+ GSM ফ্লিস',
                  '🎯 রেগুলার ফিট',
                  '✨ ডাবল লেয়ার হুড',
                  '🎨 কালার ফাস্টনেস',
                  '📦 ১/১ পলি প্যাক'
                ]
              : [
                  '💧 ১০০% ওয়াটারপ্রুফ',
                  '🧥 ৪oz কুইল্টেড প্যাডিং',
                  '⚡ অরিজিনাল YKK মেটাল জিপার',
                  '🛡️ ডাবল পার্ট প্রটেকশন'
                ]
            ).map((badge, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-full text-[10px] font-semibold border"
                style={{
                  borderColor: 'var(--line)',
                  backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'
                }}
              >
                {badge}
              </span>
            ))}
          </div>

          {/* Color Switcher */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="editorial-label">
                {itemCategory === 'hoodie'
                  ? T('1. Hoodie Color', '১. হুডির কালার:')
                  : T('1. Jacket Color', '১. জ্যাকেটের কালার:')}
              </span>
              <span className="flex items-center gap-1.5">
                <span
                  className="w-2.5 h-2.5 rounded-full border border-white/40"
                  style={{ backgroundColor: activeColorObj.hex }}
                />
                <span>{T(activeColorObj.nameEn, activeColorObj.nameBn)}</span>
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {categoryColors.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedColorId(c.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-medium cursor-pointer transition ${
                    selectedColorId === c.id ? 'font-bold shadow-xs' : 'opacity-70 hover:opacity-100'
                  }`}
                  style={{
                    borderColor: selectedColorId === c.id ? 'var(--ink)' : 'var(--line)',
                    backgroundColor:
                      selectedColorId === c.id
                        ? isDark
                          ? 'rgba(255,255,255,0.1)'
                          : 'rgba(0,0,0,0.06)'
                        : 'transparent'
                  }}
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

          {/* Size & Quantity Selection */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="editorial-label">
                {itemCategory === 'hoodie'
                  ? T('2. Select Size (M, L, XL)', '২. সাইজ নির্বাচন করুন:')
                  : T('2. Select Size (Inches)', '২. সাইজ নির্বাচন করুন:')}
              </span>
              <span style={{ color: 'var(--mute)' }} className="text-xs">
                {selectedSize}: Chest {SIZES[selectedSize]?.chest}″ · Length {SIZES[selectedSize]?.length}″
              </span>
            </div>

            <div className="flex items-center justify-between gap-3">
              <div className="flex flex-wrap gap-1.5 flex-1">
                {availableSizes.map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setSelectedSize(sz)}
                    className={`py-1.5 px-3 rounded-xl border text-xs font-medium cursor-pointer transition ${
                      selectedSize === sz ? 'font-bold' : ''
                    }`}
                    style={{
                      borderColor: selectedSize === sz ? 'var(--ink)' : 'var(--line)',
                      backgroundColor: selectedSize === sz ? 'var(--accent)' : 'transparent',
                      color: selectedSize === sz ? 'var(--onacc)' : 'var(--ink)'
                    }}
                  >
                    {sz}
                  </button>
                ))}
              </div>

              {/* Quantity Stepper */}
              {setQuantity && (
                <div
                  className="inline-flex items-center border rounded-full shrink-0"
                  style={{ borderColor: 'var(--line)' }}
                >
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-7 h-7 flex items-center justify-center text-sm cursor-pointer"
                  >
                    −
                  </button>
                  <span className="w-6 text-center text-xs font-semibold tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.min(20, quantity + 1))}
                    className="w-7 h-7 flex items-center justify-center text-sm cursor-pointer"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Checkout Inputs Form */}
          <form onSubmit={handleOrderSubmit} className="space-y-3 pt-2 border-t" style={{ borderColor: 'var(--line)' }}>
            <div>
              <span className="editorial-label block mb-1">
                {T('3. Delivery Details', '৩. ফ্রি ক্যাম্পাস ডেলিভারি তথ্য')}
              </span>
            </div>

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
              placeholder={T('Mobile Number (01XXXXXXXXX) *', 'মোবাইল নম্বর (01XXXXXXXXX) *')}
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
            />

            <div>
              <span className="editorial-label block mb-1 text-[10px]">
                {T('Campus Delivery Zone (100% Free)', 'ফ্রি ক্যাম্পাস ডেলিভারি জোন (১০০% ফ্রি)')}
              </span>
              <div className="flex flex-wrap gap-1">
                {DELIVERY_ZONES.map((z) => (
                  <button
                    key={z.id}
                    type="button"
                    onClick={() => setDeliveryZone(z.id)}
                    className={`editorial-pill !text-[11px] !py-1 !px-2.5 cursor-pointer ${
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
              placeholder={T('Hall Name / Room No / Pickup details *', 'হলের নাম / রুম নম্বর / পিকআপ পয়েন্ট *')}
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
            />

            <div>
              <span className="editorial-label block mb-1">
                {T('Payment Method', 'পেমেন্ট মেথড')}
              </span>
              <div className="flex flex-wrap gap-1">
                {PAYMENT_METHODS.map((pm) => (
                  <button
                    key={pm.id}
                    type="button"
                    onClick={() => setPaymentMethod(pm.id)}
                    className={`editorial-pill !text-[11px] !py-1 !px-2.5 cursor-pointer ${
                      paymentMethod === pm.id ? 'active' : ''
                    }`}
                  >
                    {T(pm.en, pm.bn)}
                  </button>
                ))}
              </div>
            </div>

            {isMfsPayment && (
              <div className="p-3 rounded-xl border space-y-2.5" style={{ borderColor: 'var(--line)' }}>
                <div className="flex items-center justify-between text-xs">
                  <span>{paymentMethod}: <strong>{MERCHANT_PHONE}</strong></span>
                  <button
                    type="button"
                    onClick={() => handleCopy('mfs-mob', MERCHANT_PHONE)}
                    className="editorial-pill !py-0.5 !px-2 text-xs"
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
                  type="number"
                  inputMode="numeric"
                  className={`editorial-input ${formErrors.amount ? 'err' : ''}`}
                  placeholder={T('Sent Amount (৳) *', 'পাঠানো টাকার পরিমাণ (৳) *')}
                  value={sentAmount}
                  onChange={(e) => setSentAmount(e.target.value)}
                />
              </div>
            )}

            <div className="pt-2 flex items-center justify-between border-t" style={{ borderColor: 'var(--line)' }}>
              <div>
                <span className="editorial-label block text-[10px]">
                  {T('Total Payable', 'সর্বমোট প্রদেয়')}
                </span>
                <span className="serif-editorial text-2xl font-bold">
                  {formatPrice(totalPrice)}
                </span>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 rounded-xl text-xs font-semibold uppercase tracking-widest cursor-pointer shadow-md disabled:opacity-50"
                style={{
                  backgroundColor: 'var(--accent)',
                  color: 'var(--onacc)'
                }}
              >
                {isSubmitting
                  ? '…'
                  : currentItem?.stockType === 'out_of_stock'
                  ? T('Pre-Order (Stock Out)', 'প্রি-অর্ডার কনফার্ম')
                  : T('Confirm Order', 'অর্ডার কনফার্ম')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
