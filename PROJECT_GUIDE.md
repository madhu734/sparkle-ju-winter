# Sparkle — JU Winter Edition (Project Guide & Architecture)

এই প্রকল্পটি জাহাঙ্গীরনগর বিশ্ববিদ্যালয়ের শীতকালীন জ্যাকেট ই-কমার্সের জন্য একটি হাই-পারফরম্যান্স, মোবাইল-ফার্স্ট ও এডিটোরিয়াল ডিজাইনের ওয়েব অ্যাপ্লিকেশন। কোডবেসটি সম্পূর্ণ মডিউলার আর্কিটেকচারে সাজানো হয়েছে।

---

## 📁 ফাইল ও মডিউল স্ট্রাকচার (File Map)

```text
H:\Sparkle site\
├── index.html                          # HTML Entry Point (Google Fonts: Cormorant Garamond, Hind Siliguri, Inter)
├── package.json                        # Dependencies (React 19, Lucide React, Tailwind v4, Vite)
├── vite.config.js                      # Vite Build & Tailwind Configuration
├── PROJECT_GUIDE.md                    # ভবিষ্যৎ কাজের কর্মপদ্ধতি ও ফাইল গাইড (এই ফাইলটি)
├── sparkle_ju_winter_jacket_store.tsx  # মূল মনোলিথিক ব্যাকআপ ফাইল (সংরক্ষিত)
└── src/
    ├── main.jsx                        # React Root Mount
    ├── index.css                       # গ্লোবাল এডিটোরিয়াল CSS সিস্টেম ও Tailwind ইমপোর্ট
    ├── App.jsx                         # সেন্ট্রাল স্টেট অর্কেস্ট্রেটর (ডিফল্ট: English 'en' + Light Mode 'light')
    │
    ├── config/
    │   └── storeConfig.js              # দাম, নম্বর, পকেটবেস URL, কালার, সাইজ ও ক্যাটালগ কনফিগারেশন
    │
    ├── services/
    │   └── pocketbase.js               # PocketBase API হ্যান্ডলার (প্রোডাক্ট লোড ও অর্ডার সাবমিট)
    │
    └── components/
        ├── Navbar.jsx                  # স্টিকি এডিটোরিয়াল হেডার, ল্যাঙ্গুয়েজ ও থিম টগল
        ├── JacketArtwork.jsx           # ভেক্টর জ্যাকেট গ্রাফিক্স (ProductMedia / JacketVisual / BackPrintLogo)
        ├── CatalogSection.jsx          # হিরো সেকশন, ফিল্টার বার ও ৩-কলাম প্রোডাক্ট গ্রিড কার্ড
        ├── StudioInspector.jsx         # ইন্টারঅ্যাক্টিভ ৩ডি-স্টাইল স্টুডিও প্রিভিউ ও ইনলাইন চেকআউট ফর্ম
        ├── CustomPreOrderSection.jsx   # ডিপার্টমেন্ট/ব্যাচ/ক্লাব কাস্টম প্রি-অর্ডার ও সরাসরি WhatsApp বাটন
        ├── CheckoutDrawer.jsx          # মোবাইল স্লাইড-আপ কুইক চেকআউট ড্রয়ার
        ├── Modals.jsx                  # SizeGuideModal (সাইজ চার্ট) এবং OrderReceiptModal (ডিজিটাল স্লিপ)
        └── MobileStickyBar.jsx         # মোবাইলের নিচের ফিক্সড কুইক-অর্ডার বার
```

---

## ⚡ সাধারণ কর্মপদ্ধতি ও মূল নীতিমালা (Working Principles)

ভবিষ্যতে যেকোনো আপডেট বা নতুন কাজ করার সময় নিচের নিয়মগুলো কঠোরভাবে মেনে চলতে হবে:

1. **সংশ্লিষ্ট ফাইলে নির্দিষ্ট পরিবর্তন:**
   - যখন যেটুকু পরিবর্তন বা আপডেট করতে বলা হবে, তখন শুধুমাত্র সরাসরি সংশ্লিষ্ট ফাইল বা অংশটুকুতেই পরিষ্কারভাবে কাজ করতে হবে।
   - একটি ফিচারের কাজের জন্য অপ্রয়োজনীয় অন্য কোনো ফাইলে হাত দেওয়া যাবে না।

2. **ডিজাইন, ফন্ট ও ল্যাঙ্গুয়েজ অক্ষুণ্ণ রাখা:**
   - সাইটের এডিটোরিয়াল ডিজাইন, টাইপোগ্রাফি (`Cormorant Garamond`, `Inter`, `Hind Siliguri`), থিম ভেরিয়েবল (`--bg`, `--ink`, `--line`, `.editorial-pill`, `.editorial-input` ইত্যাদি), ডার্ক মোড অপটিমাইজেশন, কিংবা বাংলা/ইংরেজি টেক্সট অযথা পরিবর্তন বা বাদ দেওয়া যাবে না।
   - সাইট লোড হলে ডিফল্ট ভাষা সবসময় ইংরেজি (`'en'`) এবং থিম লাইট মোড (`'light'`) থাকবে।

3. **দাম, ফোন নম্বর ও কনফিগারেশন আপডেট:**
   - যেকোনো পণ্যের দাম (`UNIT_PRICE`), মার্চেন্ট নম্বর (`MERCHANT_PHONE`), হোয়াটসঅ্যাপ নম্বর (`WHATSAPP_NUMBER`), ডেলিভারি জোন (`DELIVERY_ZONES`), পকেটবেস URL (`POCKETBASE_URL`), কিংবা ক্যাটালগ তথ্য পরিবর্তনের কাজ **শুধুমাত্র `src/config/storeConfig.js` ফাইলেই** করতে হবে।
   - ওয়েবসাইটে কোনো দৃশ্যমান Store Settings / PocketBase UI বাটন থাকবে না।

4. **নতুন ফিচার যোগ করা:**
   - যদি কোনো নতুন ফিচার বা অপশন যোগ করতে বলা হয়, তবে শুধুমাত্র সেটির সাথে সরাসরি সম্পর্কিত কম্পোনেন্ট ও সার্ভিসে পরিচ্ছন্ন কোড যোগ করতে হবে।

---

## 🛠️ কমান্ড ও ডেভেলপমেন্ট

```bash
# ডেভেলপমেন্ট সার্ভার চালু করতে:
npm run dev

# প্রোডাকশন বিল্ড তৈরি করতে:
npm run build

# প্রোডাকশন প্রিভিউ দেখতে:
npm run preview
```

---

## 🗄️ PocketBase Backend Information

- **PocketBase Endpoint:** `https://spb.tmadhu.me`
- **Admin Dashboard:** `https://spb.tmadhu.me/_/`
- **Collections:**
  - `products`: জ্যাকেট ক্যাটালগ ও ফটো। ফিল্ডস: `jacket_color`, `design_variant`, `stock_type`, `badge_en`, `badge_bn`, `available_sizes`, `price`, `images` (file, multiple max 10), `back_image`, `front_image`। পাবলিক রিড এলাউড (`listRule: ""`, `viewRule: ""`)।
  - `orders`: কাস্টমার অর্ডার সংরক্ষণ টেবিল। ফিল্ডস: `customer_name`, `phone`, `order_type`, `jacket_color`, `design_variant`, `size`, `quantity`, `delivery_zone`, `delivery_address`, `payment_method`, `payment_type`, `sender_number`, `trx_id`, `total_amount`। পাবলিক ক্রিয়েট এলাউড (`createRule: ""`)।

