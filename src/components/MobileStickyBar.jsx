import React from 'react';
import { ShoppingBag } from 'lucide-react';

export default function MobileStickyBar({
  isDark,
  T,
  activeColorObj,
  activeDesignObj,
  selectedSize,
  formatPrice,
  totalPrice,
  setIsMobileCheckoutOpen
}) {
  return (
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
  );
}
