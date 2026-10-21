import React from 'react';
import { X, Printer, MapPin, CheckCircle } from 'lucide-react';

export function SizeGuideModal({
  isOpen,
  onClose,
  T,
  SIZES
}) {
  const [guideTab, setGuideTab] = React.useState('jacket'); // 'jacket' | 'hoodie'

  if (!isOpen) return null;

  const jacketSizes = [
    { size: 'S', chest: 38, length: 27 },
    { size: 'M', chest: 40, length: 28 },
    { size: 'L', chest: 43, length: 29 },
    { size: 'XL', chest: 46, length: 30 },
    { size: '2XL', chest: 50, length: 30 }
  ];

  const hoodieSizes = [
    { size: 'M', chest: 40, length: 28 },
    { size: 'L', chest: 43, length: 29 },
    { size: 'XL', chest: 46, length: 30 }
  ];

  const activeEntries = guideTab === 'hoodie' ? hoodieSizes : jacketSizes;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/55 backdrop-blur-xs flex items-center justify-center p-4 no-print"
      onClick={onClose}
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
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full border cursor-pointer"
          style={{ borderColor: 'var(--line)', color: 'var(--mute)' }}
        >
          <X className="w-4 h-4" />
        </button>

        <span className="editorial-label">The Look ✦ JU Winter Fit</span>
        <h3 className="serif-editorial text-3xl mt-1 mb-2">
          {T('Size Guide (Inches)', 'সাইজ চার্ট (ইঞ্চি)')}
        </h3>

        {/* Tab Switcher: Jacket vs Hoodie */}
        <div
          className="flex border rounded-full overflow-hidden text-xs font-semibold mb-3.5"
          style={{ borderColor: 'var(--line)' }}
        >
          <button
            type="button"
            onClick={() => setGuideTab('jacket')}
            className="flex-1 py-1.5 transition cursor-pointer"
            style={{
              backgroundColor: guideTab === 'jacket' ? 'var(--accent)' : 'transparent',
              color: guideTab === 'jacket' ? 'var(--onacc)' : 'var(--mute)'
            }}
          >
            {T('Bonded Jacket (S, M, L, XL, 2XL)', 'জ্যাকেট (S–2XL)')}
          </button>
          <button
            type="button"
            onClick={() => setGuideTab('hoodie')}
            className="flex-1 py-1.5 transition cursor-pointer"
            style={{
              backgroundColor: guideTab === 'hoodie' ? 'var(--accent)' : 'transparent',
              color: guideTab === 'hoodie' ? 'var(--onacc)' : 'var(--mute)'
            }}
          >
            {T('Hoodie (M, L, XL)', 'হুডি (M, L, XL)')}
          </button>
        </div>

        <div className="text-xs mb-3 flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
          <MapPin className="w-3.5 h-3.5" />
          <span>{T('Physical trial available at Bottola / Rafiq Jabbar Hall', 'বটতলা/রফিক জব্বার হলে সরাসরি ট্রায়াল দেওয়ার সুযোগ রয়েছে')}</span>
        </div>

        <table className="w-full text-sm text-left border-collapse">
          <thead>
            <tr
              className="editorial-label border-b"
              style={{ borderColor: 'var(--line)' }}
            >
              <th className="py-2.5">{T('Size', 'সাইজ')}</th>
              <th className="py-2.5">{T('Chest (ইঞ্চি)', 'বুক (ইঞ্চি)')}</th>
              <th className="py-2.5">{T('Length (ইঞ্চি)', 'দৈর্ঘ্য (ইঞ্চি)')}</th>
            </tr>
          </thead>
          <tbody>
            {activeEntries.map((row) => (
              <tr
                key={row.size}
                className="border-b"
                style={{ borderColor: 'var(--line)' }}
              >
                <td className="py-3 font-bold text-base">{row.size}</td>
                <td className="py-3 font-medium">{row.chest}″</td>
                <td className="py-3 font-medium">{row.length}″</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p style={{ color: 'var(--mute)' }} className="mt-4 text-xs leading-relaxed">
          {guideTab === 'hoodie'
            ? T(
                'Note: Hoodies are strictly available in 3 sizes: M (40″), L (43″), and XL (46″).',
                'বিশেষ দ্রষ্টব্য: হুডির ক্ষেত্রে শুধুমাত্র ৩টি সাইজ পাওয়া যাচ্ছে: M (৪০″), L (৪৩″), এবং XL (৪৬″)।'
              )
            : T(
                'Tip: All measurements are in inches. If you prefer a loose hoodie layer underneath, pick one size up.',
                'পরামর্শ: মাপগুলো ইঞ্চিতে দেওয়া। জ্যাকেটের ভেতর হুডি পরতে চাইলে এক সাইজ বড় নির্বাচন করতে পারেন।'
              )}
        </p>
      </div>
    </div>
  );
}

export function OrderReceiptModal({
  orderReceipt,
  onClose,
  T,
  formatPrice
}) {
  if (!orderReceipt) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
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
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full border no-print cursor-pointer"
          style={{ borderColor: 'var(--line)', color: 'var(--mute)' }}
        >
          <X className="w-4 h-4" />
        </button>

        <div className="print-slip">
          <p className="editorial-label">The Look ✦ · Jahangirnagar University</p>
          <h3 className="serif-editorial text-4xl mt-0.5">
            {T('Pre-Order Confirmed', 'প্রি-অর্ডার সম্পন্ন হয়েছে')}
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
                orderReceipt.item_type === 'hoodie' ? T('Hoodie', 'হুডি') : T('Jacket', 'জ্যাকেট'),
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
                  (orderReceipt.sent_amount
                    ? ` (${orderReceipt.payment_type} · ৳${orderReceipt.sent_amount})`
                    : orderReceipt.trx_id
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
            onClick={onClose}
            className="editorial-pill !py-3 cursor-pointer"
          >
            {T('Close', 'বন্ধ করুন')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default { SizeGuideModal, OrderReceiptModal };
