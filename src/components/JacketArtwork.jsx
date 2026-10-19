import React, { useState } from 'react';
import { Sparkles, Camera, Image as ImageIcon } from 'lucide-react';

/**
 * Editorial Brand Logo for Sparkle — JU Winter Edition
 * Features the official Sparkle red hexagon emblem and collegiate typography
 */
export function SparkleLogo({ className = '', subtitle = true, showImage = true, showText = true }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {showImage && (
        <img
          src="/sparkle-logo.jpg"
          alt="Sparkle Official Logo"
          className="w-8 h-8 sm:w-9 sm:h-9 object-contain rounded-lg shadow-sm border border-red-500/20 shrink-0"
        />
      )}
      {showText && (
        <div className="flex items-baseline gap-1.5">
          <span className="serif-editorial text-2xl sm:text-3xl tracking-tight font-bold">
            Sparkle
          </span>
          {subtitle && (
            <span style={{ color: 'var(--mute)' }} className="text-xs tracking-wider uppercase font-medium">
              ✦ JU ’26
            </span>
          )}
        </div>
      )}
    </div>
  );
}

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
          alt={title || 'Sparkle JU Winter Jacket'}
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
 * Interactive Multi-Image Gallery with Thumbnail Switcher
 * Used in the Product Detail View & Studio Inspector
 */
export function ProductGallery({
  images = [],
  colorHex = '#141518',
  colorName = '',
  title = '',
  isDark = false
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex] || images[0] || '';

  return (
    <div className="w-full space-y-3">
      {/* Main Large Image */}
      <div className="relative aspect-[4/4.8] w-full rounded-2xl overflow-hidden border bg-zinc-950/5 flex items-center justify-center" style={{ borderColor: 'var(--line)' }}>
        {activeImage ? (
          <img
            src={activeImage}
            alt={`${title} - Photo ${activeIndex + 1}`}
            className="w-full h-full object-contain select-none transition-all duration-300"
          />
        ) : (
          <ProductMedia
            colorHex={colorHex}
            colorName={colorName}
            title={title}
            aspectRatio="aspect-square"
          />
        )}

        {images.length > 1 && (
          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md bg-black/65 text-white">
            {activeIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnails Strip (Model photo, Fabric close-up, Inner lining, etc.) */}
      {images.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                activeIndex === idx ? 'scale-105 shadow-md' : 'opacity-60 hover:opacity-100'
              }`}
              style={{
                borderColor: activeIndex === idx ? 'var(--ink)' : 'var(--line)'
              }}
            >
              <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export const JacketVisual = ProductMedia;
export default ProductMedia;
