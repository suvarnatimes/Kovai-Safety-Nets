"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const SLIDES = [
  { src: "/images/services/balcony-safety-nets.webp", alt: "Balcony safety nets installed in Coimbatore apartment", label: "Balcony Safety Nets", href: "/services/balcony-safety-nets/" },
  { src: "/images/services/pet-safety-nets.webp", alt: "Pet safety nets keeping cats safe on balcony", label: "Pet Safety Nets", href: "/services/pet-safety-nets/" },
  { src: "/images/services/child-safety-nets.webp", alt: "Child safety nets for family homes", label: "Child Safety Nets", href: "/services/child-safety-nets/" },
  { src: "/images/services/monkey-safety-nets.webp", alt: "Monkey safety nets for homes near forests", label: "Monkey Safety Nets", href: "/services/monkey-safety-nets/" },
  { src: "/images/services/industrial-safety-nets.webp", alt: "Industrial safety nets for construction sites", label: "Industrial Safety Nets", href: "/services/industrial-safety-nets/" },
  { src: "/images/services/staircase-safety-nets.webp", alt: "Staircase safety nets for homes", label: "Staircase Safety Nets", href: "/services/staircase-safety-nets/" },
  { src: "/images/services/coconut-tree-safety-nets.webp", alt: "Coconut tree safety nets", label: "Coconut Tree Nets", href: "/services/coconut-tree-safety-nets/" },
  { src: "/images/services/cloth-hangers.webp", alt: "Cloth hanger installation service", label: "Cloth Hangers", href: "/services/cloth-hangers/" },
  { src: "/images/services/duct-area-safety-nets.webp", alt: "Duct area safety nets", label: "Duct Area Nets", href: "/services/duct-area-safety-nets/" },
  { src: "/images/services/apartment-safety-nets.webp", alt: "Apartment safety nets installation", label: "Apartment Safety Nets", href: "/services/apartment-safety-nets/" },
];

const VISIBLE_SIDE = 2;

function getCardStyle(offset: number): React.CSSProperties {
  const abs = Math.abs(offset);
  if (abs > VISIBLE_SIDE) {
    return { opacity: 0, pointerEvents: "none", zIndex: 0, transform: "scale(0)", transition: "all 0.6s cubic-bezier(0.25,0.46,0.45,0.94)" };
  }
  const sign = offset < 0 ? -1 : offset > 0 ? 1 : 0;
  if (offset === 0) {
    return {
      transform: "perspective(1200px) rotateY(0deg) translateX(0) scale(1)",
      opacity: 1, zIndex: 10,
      filter: "brightness(1) drop-shadow(0 30px 60px rgba(0,0,0,0.5))",
      transition: "all 0.6s cubic-bezier(0.25,0.46,0.45,0.94)",
    };
  }
  if (abs === 1) {
    return {
      transform: `perspective(1200px) rotateY(${sign * -50}deg) translateX(${sign * 55}%) scale(0.8)`,
      opacity: 0.7, zIndex: 8,
      filter: "brightness(0.55)",
      transition: "all 0.6s cubic-bezier(0.25,0.46,0.45,0.94)",
    };
  }
  return {
    transform: `perspective(1200px) rotateY(${sign * -65}deg) translateX(${sign * 88}%) scale(0.62)`,
    opacity: 0.35, zIndex: 6,
    filter: "brightness(0.35)",
    transition: "all 0.6s cubic-bezier(0.25,0.46,0.45,0.94)",
  };
}

export default function CoverFlowCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = SLIDES.length;
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((i: number) => setActive(((i % total) + total) % total), [total]);
  const next = useCallback(() => setActive((a) => (a + 1) % total), [total]);
  const prev = useCallback(() => setActive((a) => (a - 1 + total) % total), [total]);

  useEffect(() => {
    if (paused) { if (timerRef.current) clearInterval(timerRef.current); return; }
    timerRef.current = setInterval(next, 3000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [paused, next]);

  return (
    <section
      className="coverflow-section py-16 overflow-hidden"
      aria-label="Gallery of our safety net installations"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="text-center mb-10 px-4">
        <span className="badge-orange mb-3">Our Work</span>
        <h2 className="section-heading mt-2">See Our Installations</h2>
        <p className="section-subheading mx-auto mt-4">Real projects from homes and apartments across Coimbatore</p>
      </div>

      <div className="coverflow-track" role="list" aria-label="Installation image gallery">
        {SLIDES.map((slide, i) => {
          let offset = i - active;
          if (offset > total / 2) offset -= total;
          if (offset < -total / 2) offset += total;
          const isActive = offset === 0;
          const style = getCardStyle(offset);

          return (
            <div
              key={slide.src}
              className="coverflow-card"
              style={style}
              role="listitem"
              aria-hidden={!isActive}
              onClick={() => { if (!isActive) goTo(i); }}
            >
              <Link
                href={slide.href}
                tabIndex={isActive ? 0 : -1}
                aria-label={`View ${slide.label}`}
                onClick={(e) => { if (!isActive) e.preventDefault(); }}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  width={480}
                  height={320}
                  className="coverflow-img"
                  loading={isActive ? "eager" : "lazy"}
                  draggable={false}
                />
                {isActive && (
                  <div className="coverflow-label">
                    <span>{slide.label}</span>
                    <span className="coverflow-arrow">View Service →</span>
                  </div>
                )}
              </Link>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-4 mt-8 px-4">
        <button onClick={prev} className="coverflow-btn" aria-label="Previous image">‹</button>
        <div className="flex gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === active ? "true" : undefined}
              className={`coverflow-dot${i === active ? " coverflow-dot-active" : ""}`}
            />
          ))}
        </div>
        <button onClick={next} className="coverflow-btn" aria-label="Next image">›</button>
      </div>
    </section>
  );
}
