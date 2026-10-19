import React from 'react';
import { X, Check, Copy, Phone, MessageCircle, Clock } from 'lucide-react';
import { ProductMedia } from './JacketArtwork';

export default function CheckoutDrawer({
  isMobileCheckoutOpen,
  setIsMobileCheckoutOpen,
  T,
  activeDesignObj,
  activeColorObj,
  selectedProduct,
  SIZE_LIST,
  selectedSize,
  setSelectedSize,
  SIZES,
  customerName,
  setCustomerName,
  customerPhone,
  setCustomerPhone,
  formErrors,
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

  const primaryPhoto =
    (selectedProduct?.images && selectedProduct.images.length > 0
      ? selectedProduct.images[0]
      : '') ||
    selectedProduct?.back_image_url ||
    selectedProduct?.front_image_url ||
    '';

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 no-print"
      onClick={() => setIsMobileCheckoutOpen(false)}
    >
      <div
        className="w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl p-5 sm:p-7 border shadow-2xl space-y-4"
        style={{
          backgroundColor: 'var(--card)',
          borderColor: 'var(--line)',
          color: 'var(--ink)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: 'var(--line)' }}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl overflow-hidden border shrink-0 bg-zinc-950/5">
              <ProductMedia
                imageUrl={primaryPhoto}
                colorHex={activeColorObj.hex}
                aspectRatio="aspect-square"
              />
            </div>
            <div>
              <span className="editorial-label flex items-center gap-1">
                <span>
                  {selectedProduct?.category === 'hoodie'
                    ? T('Sparkle Hoodie · Winter 2026', 'স্পার্কল হুডি · উইন্টার ২০২৬')
                    : T('Bonded Jacket · Winter 2026', 'বন্ডেড জ্যাকেট · উইন্টার ২০২৬')}
                </span>
              </span>
              <h3 className="serif-editorial text-xl font-bold leading-tight">
                {T(activeDesignObj.nameEn, activeDesignObj.nameBn)}
              </h3>
            </div>
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

        {/* Quick Size & Colour Confirmation */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold">
            <div className="flex items-center gap-2">
              <span
                className="w-3.5 h-3.5 rounded-full border border-white/40"
                style={{ backgroundColor: activeColorObj.hex }}
              />
              <span>{T(activeColorObj.nameEn, activeColorObj.nameBn)}</span>
            </div>
            <span style={{ color: 'var(--mute)' }}>
              {selectedSize} (Chest {SIZES[selectedSize]?.chest}″ · Length {SIZES[selectedSize]?.length}″)
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {(selectedProduct?.availableSizes || (selectedProduct?.category === 'hoodie' ? ['M', 'L', 'XL'] : SIZE_LIST)).map((sz) => (
              <button
                key={sz}
                type="button"
                onClick={() => setSelectedSize(sz)}
                className={`flex-1 py-1.5 px-3 rounded-lg border text-xs font-medium cursor-pointer transition ${
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
        </div>

        {/* Checkout Inputs Form */}
        <form onSubmit={handleOrderSubmit} className="space-y-3.5">
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
            <span className="editorial-label block mb-1.5">
              {T('Free Campus Delivery Zone (৳0)', 'ফ্রি ক্যাম্পাস ডেলিভারি জোন (৳০)')}
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
            <span className="editorial-label block mb-1.5">
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

          <div className="pt-2 flex items-center justify-between">
            <div>
              <span className="editorial-label block">
                {T('Total (Free Delivery)', 'সর্বমোট (ফ্রি ডেলিভারি)')}
              </span>
              <span className="serif-editorial text-2xl font-bold">
                {formatPrice(totalPrice)}
              </span>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 rounded-xl text-xs font-semibold uppercase tracking-widest cursor-pointer"
              style={{
                backgroundColor: 'var(--accent)',
                color: 'var(--onacc)'
              }}
            >
              {isSubmitting ? '…' : T('Confirm Pre-Order', 'প্রি-অর্ডার কনফার্ম')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
