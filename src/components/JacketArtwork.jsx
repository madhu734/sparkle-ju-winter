import React, { useState, useEffect } from 'react';
import { Sparkles, Camera, Image as ImageIcon, ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Editorial Brand Logo for The Look — JU Winter Edition
 * Features the official The Look luxury gold monogram emblem and collegiate typography
 */
export function TheLookLogo({ className = '', subtitle = true, showImage = true, showText = true }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {showImage && (
        <img
          src="/thelook-logo.svg"
          alt="The Look Official Logo"
          className="w-8 h-8 sm:w-9 sm:h-9 object-contain rounded-xl shadow-sm border border-amber-500/30 shrink-0"
        />
      )}
      {showText && (
        <div className="flex items-baseline gap-1.5">
          <span className="serif-editorial text-2xl sm:text-3xl tracking-tight font-bold">
            The Look
          </span>
          {subtitle && (
            <span style={{ color: 'var(--mute)' }} className="hidden sm:inline text-xs tracking-wider uppercase font-medium">
              ✦ JU ’26
            </span>
          )}
        </div>
      )}
    </div>
  );
}

// Backward compatible export alias
export const SparkleLogo = TheLookLogo;

/**
 * Real Product Image or Minimal Editorial Fabric Swatch Placeholder
 * (Replaces artificial cartoon SVG vector artwork as requested)
 */
export function ProductMedia({
  imageUrl = '',
  colorHex = '#141518',
  colorName = '',
  title = '',
  aspectRatio = 'aspect-[4/4.8]',
  className = '',
  imageCount = 0
}) {
  if (imageUrl) {
    return (
      <div className={`relative w-full ${aspectRatio} overflow-hidden rounded-xl bg-zinc-900/5 ${className}`}>
        <img
          src={imageUrl}
          alt={title || 'The Look JU Winter Jacket'}
          className="w-full h-full object-cover sm:object-contain select-none transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {imageCount > 1 && (
          <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-full text-[10px] font-semibold backdrop-blur-md bg-black/60 text-white flex items-center gap-1">
            <Camera className="w-3 h-3" />
            <span>{imageCount} Photos</span>
          </div>
        )}
      </div>
    );
  }

  // Clean, high-end photographic color swatch placeholder when photos haven't been uploaded yet
  return (
    <div
      className={`relative w-full ${aspectRatio} rounded-xl overflow-hidden flex flex-col items-center justify-center p-4 transition-transform duration-300 group-hover:scale-[1.02] ${className}`}
      style={{
        background: `radial-gradient(ellipse at 50% 45%, ${colorHex}dd 0%, ${colorHex} 65%, #050608 100%)`
      }}
    >
      {/* Subtle Fabric Grid lines */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, rgba(255,255,255,0.08) 0, rgba(255,255,255,0.08) 1px, transparent 0, transparent 16px)`
        }}
      />

      <div className="relative z-10 text-center space-y-2 p-3 rounded-2xl backdrop-blur-xs bg-black/30 border border-white/10 max-w-[85%]">
        <div className="w-9 h-9 mx-auto rounded-full border-2 border-white/40 shadow-inner flex items-center justify-center" style={{ backgroundColor: colorHex }}>
          <ImageIcon className="w-4 h-4 text-white/80" />
        </div>
        <div>
          <div className="text-white text-xs font-semibold tracking-wide">
            {colorName || 'Collegiate Edition'}
          </div>
          <div className="text-white/60 text-[10px] mt-0.5 uppercase tracking-wider">
            Real Photos in PocketBase
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Interactive Multi-Image Gallery with Touch-Swipe & Thumbnail Switcher
 * Used in Mobile Checkout Drawer, Product Detail View & Studio Inspector
 */
export function ProductGallery({
  images = [],
  colorHex = '#141518',
  colorName = '',
  title = '',
  isDark = false,
  aspectRatio = 'aspect-[4/4.8]',
  compact = false
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  // Reset to first image if images array changes
  useEffect(() => {
    setActiveIndex(0);
  }, [images]);

  const activeImage = images[activeIndex] || images[0] || '';

  // Swipe sensitivity threshold (in px)
  const minSwipeDistance = 40;

  const handleTouchStart = (e) => {
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX === null || touchEndX === null) return;
    const distance = touchStartX - touchEndX;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && images.length > 1) {
      setActiveIndex((prev) => (prev + 1) % images.length);
    } else if (isRightSwipe && images.length > 1) {
      setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    if (images.length > 1) {
      setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  const handleNext = (e) => {
    e.stopPropagation();
    if (images.length > 1) {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }
  };

  return (
    <div className="w-full min-w-0 max-w-full space-y-2.5 select-none overflow-hidden">
      {/* Main Large Image with Touch Gesture & Nav Controls */}
      <div
        className={`relative ${aspectRatio} w-full max-w-full rounded-2xl overflow-hidden border bg-zinc-950/5 flex items-center justify-center touch-pan-y`}
        style={{ borderColor: 'var(--line)' }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {activeImage ? (
          <img
            src={activeImage}
            alt={`${title} - Photo ${activeIndex + 1}`}
            className="w-full h-full object-contain select-none transition-all duration-300 pointer-events-none"
            loading="eager"
          />
        ) : (
          <ProductMedia
            colorHex={colorHex}
            colorName={colorName}
            title={title}
            aspectRatio="aspect-square"
          />
        )}

        {/* Counter Badge Pill Top Right */}
        {images.length > 1 && (
          <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold backdrop-blur-md bg-black/65 text-white z-10 pointer-events-none">
            {activeIndex + 1} / {images.length}
          </div>
        )}

        {/* Left Arrow Button */}
        {images.length > 1 && (
          <button
            type="button"
            aria-label="Previous image"
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full backdrop-blur-md bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-all cursor-pointer z-10 active:scale-95 border border-white/20 shadow-md"
          >
            <ChevronLeft className="w-5 h-5 -ml-0.5" />
          </button>
        )}

        {/* Right Arrow Button */}
        {images.length > 1 && (
          <button
            type="button"
            aria-label="Next image"
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full backdrop-blur-md bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-all cursor-pointer z-10 active:scale-95 border border-white/20 shadow-md"
          >
            <ChevronRight className="w-5 h-5 -mr-0.5" />
          </button>
        )}

        {/* Interactive Indicator Dots at the Bottom */}
        {images.length > 1 && (
          <div className="absolute bottom-2.5 inset-x-0 flex items-center justify-center gap-1.5 z-10 pointer-events-auto">
            {images.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex(idx);
                }}
                className={`transition-all rounded-full cursor-pointer ${
                  activeIndex === idx
                    ? 'w-5 h-1.5 bg-white shadow-sm'
                    : 'w-1.5 h-1.5 bg-white/50 hover:bg-white/80'
                }`}
                title={`Photo ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnails Strip (Tap to view immediately) */}
      {images.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5 px-0.5 w-full min-w-0 max-w-full">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`relative ${compact ? 'w-12 h-12' : 'w-14 h-14 sm:w-16 sm:h-16'} rounded-xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                activeIndex === idx
                  ? 'scale-105 shadow-md ring-2 ring-amber-500/50'
                  : 'opacity-60 hover:opacity-100'
              }`}
              style={{
                borderColor: activeIndex === idx ? 'var(--ink)' : 'var(--line)'
              }}
            >
              <img
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                className="w-full h-full object-cover select-none"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export const JacketVisual = ProductMedia;
export default ProductMedia;
