"use client";

import { useState, useMemo, useEffect } from "react";
import { PHONE_URL, WHATSAPP_URL, BUSINESS } from "@/lib/constants";
import { optimizeCloudinaryUrl } from "@/lib/image-utils";

export interface GalleryItem {
  id: string;
  src: string;
  caption: string;
  category?: string;
}

interface GalleryClientProps {
  items: GalleryItem[];
  services: { slug: string; shortTitle: string; icon: string }[];
}

export default function GalleryClient({ items, services }: GalleryClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [visibleCount, setVisibleCount] = useState<number>(18);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Filter items based on selected category or search keyword in caption
  const filteredItems = useMemo(() => {
    if (selectedCategory === "all") return items;
    return items.filter((item) => {
      const captionLower = (item.caption || "").toLowerCase();
      const catLower = selectedCategory.toLowerCase();
      const serviceObj = services.find((s) => s.slug === selectedCategory);
      const titleLower = (serviceObj?.shortTitle || "").toLowerCase();

      return (
        item.category === selectedCategory ||
        captionLower.includes(catLower) ||
        (titleLower && captionLower.includes(titleLower)) ||
        captionLower.includes(selectedCategory.replace(/-/g, " "))
      );
    });
  }, [items, selectedCategory, services]);

  const displayedItems = useMemo(() => {
    return filteredItems.slice(0, visibleCount);
  }, [filteredItems, visibleCount]);

  const hasMore = visibleCount < filteredItems.length;

  const handleCategoryChange = (slug: string) => {
    setSelectedCategory(slug);
    setVisibleCount(18);
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") {
        setLightboxIndex((prev) =>
          prev !== null ? (prev + 1) % filteredItems.length : null
        );
      }
      if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) =>
          prev !== null
            ? (prev - 1 + filteredItems.length) % filteredItems.length
            : null
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, filteredItems.length]);

  return (
    <>
      {/* Category Filter Pills */}
      <section data-theme="light" className="section-light py-6 border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <span className="text-xs font-bold uppercase text-slate-500 mr-2 tracking-wider shrink-0">
              Filter:
            </span>
            <button
              onClick={() => handleCategoryChange("all")}
              className={`px-4 py-2 rounded-full text-xs font-semibold shrink-0 transition-all duration-200 cursor-pointer active:scale-95 ${
                selectedCategory === "all"
                  ? "bg-[#14161a] text-white shadow-md"
                  : "bg-white/80 text-slate-700 hover:bg-slate-200 border border-black/10"
              }`}
            >
              🛡️ All ({items.length})
            </button>
            {services.map((service) => (
              <button
                key={service.slug}
                onClick={() => handleCategoryChange(service.slug)}
                className={`px-3.5 py-2 rounded-full text-xs font-semibold shrink-0 transition-all duration-200 flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                  selectedCategory === service.slug
                    ? "bg-[#14161a] text-white shadow-md"
                    : "bg-white/80 text-slate-700 hover:bg-slate-200 border border-black/10"
                }`}
              >
                <span>{service.icon}</span>
                <span>{service.shortTitle}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section data-theme="light" className="section-light py-12 md:py-16" aria-label="Gallery of safety net installations">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {displayedItems.map((item, idx) => (
              <GalleryCard
                key={item.id || idx}
                item={item}
                index={idx}
                onOpen={() => setLightboxIndex(idx)}
              />
            ))}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <div className="text-center mt-12">
              <button
                onClick={() => setVisibleCount((prev) => prev + 16)}
                className="btn-primary-light text-sm px-8 py-3.5 shadow-lg active:scale-95 cursor-pointer hover:bg-black transition-all"
              >
                Load More Images ({filteredItems.length - visibleCount} remaining) ↓
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-fade-up"
          onClick={() => setLightboxIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
        >
          <div
            className="relative max-w-4xl w-full bg-slate-900 border border-white/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-950/60">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <span className="font-bold text-orange-400">
                  {lightboxIndex + 1} / {filteredItems.length}
                </span>
                <span>·</span>
                <span className="truncate max-w-xs sm:max-w-md font-medium text-white">
                  {filteredItems[lightboxIndex].caption}
                </span>
              </div>
              <button
                onClick={() => setLightboxIndex(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors text-sm cursor-pointer"
                aria-label="Close lightbox"
              >
                ✕
              </button>
            </div>

            {/* Image Preview Container */}
            <div className="relative flex-1 flex items-center justify-center bg-black/40 min-h-[300px] sm:min-h-[480px] max-h-[65vh] p-2">
              <img
                src={optimizeCloudinaryUrl(filteredItems[lightboxIndex].src, { width: 1200 })}
                alt={filteredItems[lightboxIndex].caption}
                className="max-h-[60vh] w-auto max-w-full object-contain rounded-xl"
              />

              {/* Prev button */}
              {filteredItems.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex(
                      (lightboxIndex - 1 + filteredItems.length) % filteredItems.length
                    );
                  }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-orange-500 text-white flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-90"
                  aria-label="Previous image"
                >
                  ←
                </button>
              )}

              {/* Next button */}
              {filteredItems.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-orange-500 text-white flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-90"
                  aria-label="Next image"
                >
                  →
                </button>
              )}
            </div>

            {/* Footer CTA Bar */}
            <div className="px-6 py-4 bg-slate-950/80 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-white text-xs font-semibold">
                  🛡️ {filteredItems[lightboxIndex].caption}
                </p>
                <p className="text-slate-400 text-[11px]">
                  Installed by {BUSINESS.name} in Coimbatore
                </p>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={PHONE_URL}
                  className="btn-primary-dark text-xs py-2 px-4 shadow-sm"
                >
                  📞 Get Free Quote
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary-dark text-xs py-2 px-4"
                >
                  💬 WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function GalleryCard({
  item,
  index,
  onOpen,
}: {
  item: GalleryItem;
  index: number;
  onOpen: () => void;
}) {
  const [loaded, setLoaded] = useState(false);
  const optimizedThumbnail = optimizeCloudinaryUrl(item.src, {
    width: 480,
    quality: "auto",
  });

  return (
    <div
      onClick={onOpen}
      className="break-inside-avoid rounded-[20px] overflow-hidden shadow-sm hover:shadow-xl group relative border border-black/5 bg-slate-200 cursor-pointer transition-all duration-300 hover:-translate-y-1"
    >
      {/* Shimmer skeleton before image loads */}
      <div
        className={`w-full bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 transition-opacity duration-300 ${
          loaded ? "opacity-0 absolute inset-0 pointer-events-none" : "h-48 animate-pulse"
        }`}
      />

      <img
        src={optimizedThumbnail}
        alt={item.caption}
        loading={index < 8 ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`w-full object-cover group-hover:scale-105 transition-all duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
        <div className="w-full">
          <p className="text-white text-xs font-bold mb-1 leading-snug">
            🛡️ {item.caption}
          </p>
          <div className="flex items-center justify-between text-[11px] text-orange-400 font-semibold">
            <span>Coimbatore, TN</span>
            <span className="bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded text-white text-[10px]">
              🔍 Tap to view
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
