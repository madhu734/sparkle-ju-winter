import React from 'react';
import { Ruler, Sun, Moon } from 'lucide-react';
import { SparkleLogo } from './JacketArtwork';

export default function Navbar({
  lang,
  setLang,
  theme,
  setTheme,
  isDark,
  setIsSizeChartOpen,
  T
}) {
  return (
    <header
      className="sticky top-0 z-40 backdrop-blur-md border-b transition-colors"
      style={{
        backgroundColor: isDark ? 'rgba(14,15,17,0.88)' : 'rgba(250,249,246,0.9)',
        borderColor: 'var(--line)'
      }}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2">
        {/* Brand Logo */}
        <a href="#top" className="flex items-baseline gap-1 hover:opacity-90 transition-opacity">
          <SparkleLogo />
        </a>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden md:flex items-center gap-7 text-xs uppercase tracking-widest font-medium"
          style={{ color: 'var(--mute)' }}
        >
          <a href="#preorder" className="hover:opacity-100 transition-opacity font-semibold" style={{ color: 'var(--ink)' }}>
            {T('Campus Trial', 'ক্যাম্পাস ট্রায়াল')}
          </a>
          <a href="#collection" className="hover:opacity-100 transition-opacity">
            {T('Jackets & Hoodies', 'জ্যাকেট ও হুডি')}
          </a>
          <a href="#features" className="hover:opacity-100 transition-opacity">
            {T('Key Features', 'বিশেষত্ব')}
          </a>
          <a href="#contact" className="hover:opacity-100 transition-opacity">
            {T('Contact', 'যোগাযোগ')}
          </a>
          <button
            type="button"
            onClick={() => setIsSizeChartOpen(true)}
            className="hover:opacity-100 transition-opacity cursor-pointer"
          >
            {T('Size Guide', 'সাইজ গাইড')}
          </button>
        </nav>

        {/* Language (EN | বাং) & Theme (Light | Dark) Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          <button
            type="button"
            onClick={() => setIsSizeChartOpen(true)}
            className="md:hidden inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full border text-xs font-medium cursor-pointer"
            style={{ borderColor: 'var(--line)', color: 'var(--ink)' }}
          >
            <Ruler className="w-3.5 h-3.5" />
            <span>{T('Sizes', 'সাইজ')}</span>
          </button>

          {/* EN | বাং Switcher */}
          <div
            className="flex border rounded-full overflow-hidden text-xs font-medium"
            style={{ borderColor: 'var(--line)' }}
          >
            <button
              type="button"
              onClick={() => setLang('en')}
              className="px-2.5 sm:px-3 py-1 sm:py-1.5 transition-colors cursor-pointer"
              style={{
                backgroundColor: lang === 'en' ? 'var(--accent)' : 'transparent',
                color: lang === 'en' ? 'var(--onacc)' : 'var(--mute)'
              }}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLang('bn')}
              className="px-2.5 sm:px-3 py-1 sm:py-1.5 transition-colors cursor-pointer"
              style={{
                backgroundColor: lang === 'bn' ? 'var(--accent)' : 'transparent',
                color: lang === 'bn' ? 'var(--onacc)' : 'var(--mute)'
              }}
            >
              বাং
            </button>
          </div>

          {/* Light / Dark Mode Button */}
          <button
            type="button"
            aria-label="Toggle Theme"
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="p-2 border rounded-full transition-colors cursor-pointer"
            style={{ borderColor: 'var(--line)', color: 'var(--ink)' }}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
}
