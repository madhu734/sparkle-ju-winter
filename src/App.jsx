import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Phone, Mail, MapPin, Sparkles } from 'lucide-react';

import {
  DEFAULT_UNIT_PRICE,
  MERCHANT_PHONE,
  WHATSAPP_NUMBER,
  MERCHANT_EMAIL,
  COLORS,
  DESIGNS,
  SIZES,
  SIZE_LIST,
  DEFAULT_CATALOG,
  DELIVERY_ZONES,
  PAYMENT_METHODS,
  KEY_FEATURES,
  CONTACTS,
  PREORDER_PROMO,
  formatPrice
} from './config/storeConfig';

import { fetchPocketBaseProducts, submitPocketBaseOrder } from './services/pocketbase';

import Navbar from './components/Navbar';
import CatalogSection from './components/CatalogSection';
import StudioInspector from './components/StudioInspector';
import CustomPreOrderSection from './components/CustomPreOrderSection';
import CheckoutDrawer from './components/CheckoutDrawer';
import { SizeGuideModal, OrderReceiptModal } from './components/Modals';
import MobileStickyBar from './components/MobileStickyBar';

export default function App() {
  // STRICT INITIAL DEFAULTS: English ('en') + Light Mode ('light')
  const [lang, setLang] = useState('en');
  const [theme, setTheme] = useState('light');

  const T = (enText, bnText) => (lang === 'en' ? enText : bnText);
  const isDark = theme === 'dark';

  // Catalog state (Synced with PocketBase `products` collection if connected)
  const [catalog, setCatalog] = useState(DEFAULT_CATALOG);

  // Mobile-First E-Commerce Filters
  const [filterCategory, setFilterCategory] = useState('all'); // 'all' | 'jacket' | 'hoodie'
  const [filterColor, setFilterColor] = useState('all'); // 'all' | 'Black' | 'Dark Navy Blue' | 'Maroon'
  const [filterSize, setFilterSize] = useState('all');   // 'all' | 'S' | 'M' | 'L' | 'XL' | '2XL'
  const [filterDesign, setFilterDesign] = useState('all'); // 'all' | 'design_01' | 'design_02'

  // Selected Product & Order State for Studio & Checkout
  const [selectedProduct, setSelectedProduct] = useState(DEFAULT_CATALOG[0]);
  const [orderType, setOrderType] = useState('regular_order');
  const [selectedColorId, setSelectedColorId] = useState('Black');
  const [selectedDesignId, setSelectedDesignId] = useState('design_01');
  const [selectedSize, setSelectedSize] = useState('L');
  const [quantity, setQuantity] = useState(1);

  // Checkout Form State
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryZone, setDeliveryZone] = useState(DELIVERY_ZONES[0].id);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [paymentSubType, setPaymentSubType] = useState('Send Money');
  const [senderNumber, setSenderNumber] = useState('');
  const [sentAmount, setSentAmount] = useState('');

  // UI Modals & Feedback
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);
  const [isMobileCheckoutOpen, setIsMobileCheckoutOpen] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderReceipt, setOrderReceipt] = useState(null);
  const [copiedKey, setCopiedKey] = useState('');

  const studioSectionRef = useRef(null);
  const checkoutSectionRef = useRef(null);

  // Fetch dynamic products & uploaded photos from PocketBase
  useEffect(() => {
    async function loadProducts() {
      const items = await fetchPocketBaseProducts();
      if (items && items.length > 0) {
        setCatalog(items);
        setSelectedProduct(items[0]);
      }
    }
    loadProducts();
  }, []);

  // When user filters by a specific Size, pre-select that size automatically
  const handleSizeFilterSelect = (sizeKey) => {
    setFilterSize(sizeKey);
    if (sizeKey !== 'all') {
      setSelectedSize(sizeKey);
    }
  };

  // Filtered Catalog for 2-column E-Commerce Grid
  const filteredCatalog = useMemo(() => {
    return catalog.filter((item) => {
      if (filterCategory !== 'all' && (item.category || 'jacket') !== filterCategory) return false;
      if (filterColor !== 'all' && item.colorId !== filterColor) return false;
      if (filterDesign !== 'all' && item.designId !== filterDesign) return false;
      if (
        filterSize !== 'all' &&
        item.availableSizes &&
        !item.availableSizes.includes(filterSize)
      ) {
        return false;
      }
      return true;
    });
  }, [catalog, filterCategory, filterColor, filterDesign, filterSize]);

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

  // Handle opening product detail from the compact 2-column card
  const handleOpenProductDetail = (item) => {
    setSelectedProduct(item);
    setSelectedColorId(item.colorId);
    setSelectedDesignId(item.designId);
    setOrderType(item.stockType || 'regular_order');
    if (item.category === 'hoodie' && !['M', 'L', 'XL'].includes(selectedSize)) {
      setSelectedSize('L');
    }

    if (window.innerWidth < 1024) {
      setIsMobileCheckoutOpen(true);
    } else {
      studioSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
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

  // Validate & Submit Order to PocketBase
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
      if (!sentAmount.trim() || Number(sentAmount) <= 0) errors.amount = true;
    }

    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setIsSubmitting(true);

    const orderPayload = {
      customer_name: customerName.trim(),
      phone: cleanPhone,
      order_type: orderType,
      item_type: selectedProduct?.category || 'jacket',
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
      sent_amount: isMfsPayment ? sentAmount.trim() : '',
      trx_id: '',
      total_amount: String(totalPrice)
    };

    const savedToPocketBase = await submitPocketBaseOrder(orderPayload);

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

  // Editorial Theme CSS Variables
  const themeVars = isDark
    ? {
        '--bg': '#0e0f11',
        '--ink': '#f3f1ec',
        '--mute': '#9a978f',
        '--line': '#26282c',
        '--card': '#151619',
        '--spot': '#2b2d33',
        '--accent': '#f3f1ec',
        '--onacc': '#0e0f11'
      }
    : {
        '--bg': '#faf9f6',
        '--ink': '#141414',
        '--mute': '#726f69',
        '--line': '#e4e1da',
        '--card': '#ffffff',
        '--spot': '#f2eee6',
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
      {/* 1. Sticky Editorial Navbar with Sparkle Logo */}
      <Navbar
        lang={lang}
        setLang={setLang}
        theme={theme}
        setTheme={setTheme}
        isDark={isDark}
        setIsSizeChartOpen={setIsSizeChartOpen}
        T={T}
      />

      {/* 2. Pre-Order Spotlight Banner, Key Features & 2-Col Compact Grid */}
      <CatalogSection
        T={T}
        isDark={isDark}
        COLORS={COLORS}
        DESIGNS={DESIGNS}
        SIZES={SIZES}
        SIZE_LIST={SIZE_LIST}
        KEY_FEATURES={KEY_FEATURES}
        CONTACTS={CONTACTS}
        PREORDER_PROMO={PREORDER_PROMO}
        DEFAULT_UNIT_PRICE={DEFAULT_UNIT_PRICE}
        formatPrice={formatPrice}
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
        filterColor={filterColor}
        setFilterColor={setFilterColor}
        filterSize={filterSize}
        setFilterSize={setFilterSize}
        filterDesign={filterDesign}
        setFilterDesign={setFilterDesign}
        handleSizeFilterSelect={handleSizeFilterSelect}
        filteredCatalog={filteredCatalog}
        handleOpenProductDetail={handleOpenProductDetail}
        setIsSizeChartOpen={setIsSizeChartOpen}
      />

      {/* 3. Interactive Multi-Image Gallery & Desktop Checkout */}
      <StudioInspector
        studioSectionRef={studioSectionRef}
        checkoutSectionRef={checkoutSectionRef}
        T={T}
        isDark={isDark}
        COLORS={COLORS}
        DESIGNS={DESIGNS}
        SIZES={SIZES}
        SIZE_LIST={SIZE_LIST}
        KEY_FEATURES={KEY_FEATURES}
        CONTACTS={CONTACTS}
        PREORDER_PROMO={PREORDER_PROMO}
        DELIVERY_ZONES={DELIVERY_ZONES}
        PAYMENT_METHODS={PAYMENT_METHODS}
        MERCHANT_PHONE={MERCHANT_PHONE}
        formatPrice={formatPrice}
        activeColorObj={activeColorObj}
        activeDesignObj={activeDesignObj}
        matchedCatalogItem={matchedCatalogItem}
        orderType={orderType}
        setOrderType={setOrderType}
        selectedColorId={selectedColorId}
        setSelectedColorId={setSelectedColorId}
        selectedDesignId={selectedDesignId}
        setSelectedDesignId={setSelectedDesignId}
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
        quantity={quantity}
        setQuantity={setQuantity}
        setIsSizeChartOpen={setIsSizeChartOpen}
        customerName={customerName}
        setCustomerName={setCustomerName}
        customerPhone={customerPhone}
        setCustomerPhone={setCustomerPhone}
        deliveryZone={deliveryZone}
        setDeliveryZone={setDeliveryZone}
        deliveryAddress={deliveryAddress}
        setDeliveryAddress={setDeliveryAddress}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        paymentSubType={paymentSubType}
        setPaymentSubType={setPaymentSubType}
        senderNumber={senderNumber}
        setSenderNumber={setSenderNumber}
        sentAmount={sentAmount}
        setSentAmount={setSentAmount}
        formErrors={formErrors}
        isSubmitting={isSubmitting}
        handleOrderSubmit={handleOrderSubmit}
        totalPrice={totalPrice}
        isMfsPayment={isMfsPayment}
        handleCopy={handleCopy}
        copiedKey={copiedKey}
      />

      {/* 4. Trial Location & Direct Call / WhatsApp Cards for Sami & Ashraful */}
      <CustomPreOrderSection
        T={T}
        CONTACTS={CONTACTS}
        PREORDER_PROMO={PREORDER_PROMO}
        handleCopy={handleCopy}
        copiedKey={copiedKey}
      />

      {/* 5. Editorial Footer */}
      <footer
        className="border-t mt-8"
        style={{ borderColor: 'var(--line)' }}
      >
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs sm:text-sm"
          style={{ color: 'var(--mute)' }}
        >
          <div>
            <div className="flex items-center gap-1.5 font-bold mb-1" style={{ color: 'var(--ink)' }}>
              <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span className="serif-editorial text-xl">Sparkle — JU Winter Edition</span>
            </div>
            <p className="text-xs">
              {T(
                'Spot: Sahid Rafiq Jabbar Hall, Generator Bazar, Bottola, Jahangirnagar University',
                'স্থান: রফিক জব্বার হল, জেনারেটর বাজার, বটতলা, জাহাঙ্গীরনগর বিশ্ববিদ্যালয়'
              )}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            {CONTACTS.map((cnt) => (
              <a
                key={cnt.name}
                href={`tel:${cnt.cleanPhone}`}
                className="hover:underline inline-flex items-center gap-1 font-mono"
              >
                <Phone className="w-3.5 h-3.5 text-blue-500" />
                <span>{cnt.name}: {cnt.phone}</span>
              </a>
            ))}
            <a
              href={`mailto:${MERCHANT_EMAIL}`}
              className="hover:underline inline-flex items-center gap-1"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{MERCHANT_EMAIL}</span>
            </a>
          </div>
        </div>
      </footer>

      {/* 6. Mobile Sticky Bottom Quick-Order Bar */}
      <MobileStickyBar
        isDark={isDark}
        T={T}
        activeColorObj={activeColorObj}
        activeDesignObj={activeDesignObj}
        selectedSize={selectedSize}
        formatPrice={formatPrice}
        totalPrice={totalPrice}
        setIsMobileCheckoutOpen={setIsMobileCheckoutOpen}
      />

      {/* 7. Mobile Slide-Up Quick Checkout Drawer */}
      <CheckoutDrawer
        isMobileCheckoutOpen={isMobileCheckoutOpen}
        setIsMobileCheckoutOpen={setIsMobileCheckoutOpen}
        T={T}
        activeDesignObj={activeDesignObj}
        activeColorObj={activeColorObj}
        selectedProduct={selectedProduct}
        SIZE_LIST={SIZE_LIST}
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
        SIZES={SIZES}
        customerName={customerName}
        setCustomerName={setCustomerName}
        customerPhone={customerPhone}
        setCustomerPhone={setCustomerPhone}
        formErrors={formErrors}
        DELIVERY_ZONES={DELIVERY_ZONES}
        deliveryZone={deliveryZone}
        setDeliveryZone={setDeliveryZone}
        deliveryAddress={deliveryAddress}
        setDeliveryAddress={setDeliveryAddress}
        PAYMENT_METHODS={PAYMENT_METHODS}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        isMfsPayment={isMfsPayment}
        MERCHANT_PHONE={MERCHANT_PHONE}
        handleCopy={handleCopy}
        copiedKey={copiedKey}
        senderNumber={senderNumber}
        setSenderNumber={setSenderNumber}
        sentAmount={sentAmount}
        setSentAmount={setSentAmount}
        totalPrice={totalPrice}
        formatPrice={formatPrice}
        isSubmitting={isSubmitting}
        handleOrderSubmit={handleOrderSubmit}
      />

      {/* 8. Size Guide Chart Modal */}
      <SizeGuideModal
        isOpen={isSizeChartOpen}
        onClose={() => setIsSizeChartOpen(false)}
        T={T}
        SIZES={SIZES}
      />

      {/* 9. Printable Digital Order Receipt Slip Modal */}
      <OrderReceiptModal
        orderReceipt={orderReceipt}
        onClose={() => setOrderReceipt(null)}
        T={T}
        formatPrice={formatPrice}
      />
    </div>
  );
}
