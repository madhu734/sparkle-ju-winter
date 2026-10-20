import React from 'react';
import {
  Sparkles,
  GraduationCap,
  Building2,
  Palette,
  Truck,
  Phone,
  MessageCircle,
  ArrowUpRight
} from 'lucide-react';

export default function NationwideCustomOrder({ T, isDark }) {
  const ashrafulPhone = '01985-968545';
  const ashrafulCleanPhone = '01985968545';
  const ashrafulWhatsapp = '8801985968545';

  const features = [
    {
      icon: GraduationCap,
      titleEn: 'Any University & Batch',
      titleBn: 'যেকোনো ভার্সিটি ও ব্যাচ',
      descEn: 'JU, DU, RU, CU, or any college & school',
      descBn: 'জাবি, ঢাবি, রাবি, চবি কিংবা যেকোনো শিক্ষা প্রতিষ্ঠান'
    },
    {
      icon: Building2,
      titleEn: 'Club, Dept & Corporate',
      titleBn: 'ক্লাব, ডিপার্টমেন্ট ও অফিস',
      descEn: 'Department tours, clubs & organization events',
      descBn: 'ডিপার্টমেন্টাল ট্যুর, ক্লাব, সোসাইটি বা কর্পোরেট টিম'
    },
    {
      icon: Palette,
      titleEn: 'Custom Logo & Color',
      titleBn: 'কাস্টম ডিজাইন ও এমব্রয়ডারি',
      descEn: 'Your identity, typography, print & stitching',
      descBn: 'আপনার নিজস্ব মনোগ্রাম, কালার কম্বিনেশন ও কোয়ালিটি'
    },
    {
      icon: Truck,
      titleEn: 'Nationwide Delivery',
      titleBn: 'সারাদেশে হোম ডেলিভারি',
      descEn: 'Prompt courier shipping across Bangladesh',
      descBn: 'বাংলাদেশের যেকোনো প্রান্তে দ্রুত কুরিয়ার ডেলিভারি'
    }
  ];

  const whatsappMessage = encodeURIComponent(
    T(
      "Hello! I would like to inquire about ordering custom jackets/hoodies for our university/organization. Can we discuss the pricing and design details?",
      "হ্যালো! আমাদের ভার্সিটি/প্রতিষ্ঠানের জন্য কাস্টম জ্যাকেট/হুডি অর্ডারের বিষয়ে কথা বলতে চাই। বিস্তারিত ডিজাইন ও প্রাইসিং নিয়ে আলোচনা করা যাবে?"
    )
  );

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 pb-2">
      <div
        className="relative overflow-hidden rounded-3xl border p-5 sm:p-8 lg:p-10 transition-all shadow-sm"
        style={{
          borderColor: 'var(--line)',
          backgroundColor: 'var(--card)',
          backgroundImage: isDark
            ? 'radial-gradient(ellipse at top left, rgba(245, 158, 11, 0.08), transparent 70%), radial-gradient(ellipse at bottom right, rgba(225, 29, 72, 0.06), transparent 70%)'
            : 'radial-gradient(ellipse at top left, rgba(254, 243, 199, 0.65), transparent 70%), radial-gradient(ellipse at bottom right, rgba(255, 228, 230, 0.5), transparent 70%)'
        }}
      >
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b" style={{ borderColor: 'var(--line)' }}>
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{T('Custom Pre-Order Available', 'কাস্টম প্রি-অর্ডার সুবিধা')}</span>
            </div>
            <h2 className="serif-editorial text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-tight" style={{ color: 'var(--ink)' }}>
              {T(
                'Custom Jackets & Hoodies — For Any University, Department or Organization',
                'কাস্টম জ্যাকেট ও হুডি — যেকোনো ভার্সিটি, ডিপার্টমেন্ট বা প্রতিষ্ঠানের জন্য'
              )}
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--mute)' }}>
              {T(
                'Apart from Jahangirnagar University, we craft premium customized bonded jackets and fleece hoodies for any university, department batch, alumni reunion, student club, or corporate organization across Bangladesh. Your custom logo, colors, and premium winter fabrics.',
                'জাহাঙ্গীরনগর বিশ্ববিদ্যালয় ছাড়াও আমরা বাংলাদেশের যেকোনো বিশ্ববিদ্যালয়, ডিপার্টমেন্ট, ব্যাচ ট্যুর, পুনর্মিলনী, ক্লাব বা প্রতিষ্ঠানের জন্য নিজস্ব লোগো ও ডিজাইনে প্রিমিয়াম বন্ডেড জ্যাকেট এবং হুডি প্রস্তুত করে থাকি।'
              )}
            </p>
          </div>

          {/* Direct Contact CTAs (WhatsApp & Call) */}
          <div className="w-full sm:w-auto shrink-0 flex flex-wrap sm:flex-nowrap gap-2">
            <a
              href={`https://wa.me/${ashrafulWhatsapp}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm text-white bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] transition-all shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{T('WhatsApp', 'হোয়াটসঅ্যাপ')}</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
            </a>

            <a
              href={`tel:${ashrafulCleanPhone}`}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm border hover:bg-black/5 dark:hover:bg-white/5 active:scale-[0.98] transition-all"
              style={{ borderColor: 'var(--line)', color: 'var(--ink)' }}
            >
              <Phone className="w-4 h-4 text-blue-500" />
              <span>{ashrafulPhone}</span>
            </a>
          </div>
        </div>

        {/* 4 Feature Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="p-3.5 sm:p-4 rounded-2xl border transition-all"
                style={{
                  borderColor: 'var(--line)',
                  backgroundColor: 'var(--spot)'
                }}
              >
                <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-2.5 bg-amber-500/10 text-amber-600 dark:text-amber-400">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="font-semibold text-xs sm:text-sm leading-snug" style={{ color: 'var(--ink)' }}>
                  {T(feat.titleEn, feat.titleBn)}
                </div>
                <div className="text-[11px] sm:text-xs mt-1 leading-relaxed" style={{ color: 'var(--mute)' }}>
                  {T(feat.descEn, feat.descBn)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
