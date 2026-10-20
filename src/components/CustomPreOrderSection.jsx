import React from 'react';
import {
  MessageCircle,
  Phone,
  MapPin,
  Sparkles,
  Users,
  ArrowUpRight,
  Check,
  Copy
} from 'lucide-react';

export default function CustomPreOrderSection({
  T,
  CONTACTS,
  PREORDER_PROMO,
  handleCopy,
  copiedKey
}) {
  return (
    <section
      id="contact"
      className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 border-t"
      style={{ borderColor: 'var(--line)' }}
    >
      <div
        className="rounded-3xl border p-6 sm:p-10 lg:p-12 space-y-8"
        style={{
          borderColor: 'var(--line)',
          backgroundColor: 'var(--card)'
        }}
      >
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b pb-6" style={{ borderColor: 'var(--line)' }}>
          <div className="max-w-2xl space-y-2">
            <span className="editorial-label">
              {T('03 · Direct Campus Trial & Department Orders', '০৩ · সরাসরি ট্রায়াল ও ব্যাচ প্রি-অর্ডার')}
            </span>
            <h2 className="serif-editorial text-3xl sm:text-4xl leading-tight">
              {T(
                'Sample Trial at Bottola & Custom Batch Orders',
                'সরাসরি দেখে নেওয়ার সুযোগ এবং কাস্টম ব্যাচ প্রি-অর্ডার'
              )}
            </h2>
            <p style={{ color: 'var(--mute)' }} className="text-xs sm:text-sm leading-relaxed">
              {T(
                'Feel the fabric quality and check sizes in-person before ordering. For individual orders, batch pre-orders, club jackets, or department custom logos, get in touch directly via Call or WhatsApp.',
                'অর্ডার করার আগে সরাসরি কাপড় হাত দিয়ে দেখে নেওয়ার সুযোগ দিচ্ছি আমরা। ব্যক্তিগত প্রি-অর্ডার বা ডিপার্টমেন্ট/ক্লাবের কাস্টম ডিজাইনের জন্য নিচে সরাসরি কল অথবা WhatsApp করুন।'
              )}
            </p>
          </div>

          {/* Physical Trial Spot Badge */}
          <div
            className="p-4 rounded-2xl border text-xs sm:text-sm space-y-1 shrink-0"
            style={{
              borderColor: 'var(--line)',
              backgroundColor: 'var(--spot)'
            }}
          >
            <div className="font-semibold flex items-center gap-1.5 text-rose-600 dark:text-rose-400">
              <MapPin className="w-4 h-4 shrink-0" />
              <span>{T('Physical Sample Spot', 'সরাসরি স্যাম্পল পয়েন্ট')}</span>
            </div>
            <div className="font-medium text-xs">
              {T(
                'Sahid Rafiq Jabbar Hall, Generator Bazar, Bottola, JU',
                'রফিক জব্বার হল, জেনারেটর বাজার, বটতলা, জাবি'
              )}
            </div>
          </div>
        </div>

        {/* Dual Contact Cards with Call & WhatsApp Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CONTACTS.map((cnt) => (
            <div
              key={cnt.name}
              className="p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all"
              style={{
                borderColor: 'var(--line)',
                backgroundColor: 'var(--card)'
              }}
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="serif-editorial text-2xl font-bold">{cnt.name}</span>
                </div>
                <div className="text-sm font-mono mt-1 font-semibold" style={{ color: 'var(--ink)' }}>
                  {cnt.phone}
                </div>
              </div>

              {/* Action Buttons: Call & WhatsApp */}
              <div className="flex items-center gap-2">
                <a
                  href={`tel:${cnt.cleanPhone}`}
                  className="editorial-pill inline-flex items-center gap-1.5 cursor-pointer !py-2 !px-3 text-xs"
                >
                  <Phone className="w-3.5 h-3.5 text-blue-500" />
                  <span>Call</span>
                </a>

                <a
                  href={`https://wa.me/${cnt.whatsapp}?text=${encodeURIComponent(
                    T(
                      `Hello ${cnt.name}! I would like to inquire about the Sparkle JU Winter Jacket (Trial & Pre-Order).`,
                      `হ্যালো ${cnt.name}! আমি স্পার্কল জাবি উইন্টার জ্যাকেটের ট্রায়াল ও প্রি-অর্ডারের বিষয়ে কথা বলতে চাই।`
                    )
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="editorial-pill active inline-flex items-center gap-1.5 cursor-pointer !py-2 !px-3 text-xs !bg-emerald-600 hover:!bg-emerald-700 !text-white !border-emerald-600"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
                </a>

                <button
                  type="button"
                  onClick={() => handleCopy(`cnt-${cnt.name}`, cnt.phone)}
                  className="editorial-pill !p-2 cursor-pointer"
                  title="Copy Phone Number"
                >
                  {copiedKey === `cnt-${cnt.name}` ? (
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-zinc-400" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
