"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const HERO_SLIDES = [
  {
    src: "/images/services/balcony-safety-nets.webp",
    alt: "Balcony Safety Nets Coimbatore",
    title: "Balcony Safety Nets",
    subtitle: "100% UV-Stabilised Nylon Mesh",
  },
  {
    src: "/images/services/balcony-invisible-grills.webp",
    alt: "Balcony Invisible Grills Coimbatore",
    title: "Invisible Grills",
    subtitle: "SS 316 Marine Grade Cables",
  },
  {
    src: "/images/services/pet-safety-nets.webp",
    alt: "Pet Safety Nets Coimbatore",
    title: "Pet Safety Nets",
    subtitle: "Cat & Dog Escape-Proof Nets",
  },
  {
    src: "/images/services/child-safety-nets.webp",
    alt: "Child Safety Nets Coimbatore",
    title: "Child Safety Nets",
    subtitle: "Fine Mesh Fall Protection",
  },
  {
    src: "/images/hero-1.jpg",
    alt: "Professional Safety Net Installation",
    title: "Expert Installation",
    subtitle: "Same Day Free Site Survey",
  },
  {
    src: "/images/services/monkey-safety-nets.webp",
    alt: "Monkey Safety Nets Coimbatore",
    title: "Monkey Protection Nets",
    subtitle: "Heavy Duty PP Safety Nets",
  },
  {
    src: "/images/services/industrial-safety-nets.webp",
    alt: "Industrial Safety Nets Coimbatore",
    title: "Industrial Safety Nets",
    subtitle: "EN 1263 Certified Site Nets",
  },
];

interface HeroCarouselProps {
  mode: "horizontal" | "vertical";
}

export default function HeroCarousel({ mode }: HeroCarouselProps) {
  const [active, setActive] = useState(0);
  const total = HERO_SLIDES.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % total);
    }, 2800);
    return () => clearInterval(timer);
  }, [total]);

  // 3D Horizontal Cover Flow (Mobile)
  const getHorizontalStyle = (index: number) => {
    let offset = index - active;
    if (offset > total / 2) offset -= total;
    if (offset < -total / 2) offset += total;

    const absOffset = Math.abs(offset);
    if (absOffset > 2) {
      return {
        opacity: 0,
        pointerEvents: "none" as const,
        transform: "perspective(800px) rotateY(0deg) translateX(0) scale(0)",
        zIndex: 0,
      };
    }

    const sign = offset < 0 ? -1 : offset > 0 ? 1 : 0;

    if (offset === 0) {
      return {
        transform: "perspective(800px) rotateY(0deg) translateX(0) scale(1)",
        opacity: 1,
        zIndex: 10,
        filter: "brightness(1) drop-shadow(0 20px 35px rgba(0,0,0,0.65))",
      };
    }

    if (absOffset === 1) {
      return {
        transform: `perspective(800px) rotateY(${sign * -48}deg) translateX(${sign * 62}%) scale(0.82)`,
        opacity: 0.75,
        zIndex: 7,
        filter: "brightness(0.55)",
      };
    }

    return {
      transform: `perspective(800px) rotateY(${sign * -62}deg) translateX(${sign * 95}%) scale(0.65)`,
      opacity: 0.35,
      zIndex: 4,
      filter: "brightness(0.35)",
    };
  };

  // 3D Vertical Cover Flow (Desktop)
  const getVerticalStyle = (index: number) => {
    let offset = index - active;
    if (offset > total / 2) offset -= total;
    if (offset < -total / 2) offset += total;

    const absOffset = Math.abs(offset);
    if (absOffset > 2) {
      return {
        opacity: 0,
        pointerEvents: "none" as const,
        transform: "perspective(1000px) rotateX(0deg) translateY(0) scale(0)",
        zIndex: 0,
      };
    }

    const sign = offset < 0 ? -1 : offset > 0 ? 1 : 0;

    if (offset === 0) {
      return {
        transform: "perspective(1000px) rotateX(0deg) translateY(0) scale(1)",
        opacity: 1,
        zIndex: 10,
        filter: "brightness(1) drop-shadow(0 25px 45px rgba(0,0,0,0.7))",
      };
    }

    if (absOffset === 1) {
      return {
        transform: `perspective(1000px) rotateX(${sign * 42}deg) translateY(${sign * 55}%) scale(0.84)`,
        opacity: 0.72,
        zIndex: 7,
        filter: "brightness(0.5)",
      };
    }

    return {
      transform: `perspective(1000px) rotateX(${sign * 58}deg) translateY(${sign * 88}%) scale(0.68)`,
      opacity: 0.3,
      zIndex: 4,
      filter: "brightness(0.3)",
    };
  };

  if (mode === "horizontal") {
    return (
      <div className="relative w-full h-[230px] sm:h-[260px] flex items-center justify-center overflow-hidden py-2">
        <div className="relative w-full h-full flex items-center justify-center">
          {HERO_SLIDES.map((slide, i) => {
            const style = getHorizontalStyle(i);
            const isActive = i === active;

            return (
              <div
                key={i}
                className="absolute w-[80%] max-w-[340px] aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl transition-all duration-700 ease-out border border-white/20 bg-slate-900"
                style={{
                  ...style,
                  transformStyle: "preserve-3d",
                }}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  sizes="350px"
                  className="object-cover"
                  priority={i === 0}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent flex flex-col justify-end p-3 sm:p-4">
                  {isActive && (
                    <div className="animate-fade-up">
                      <span className="text-[10px] sm:text-xs font-extrabold text-orange-400 uppercase tracking-widest block mb-0.5">
                        {slide.title}
                      </span>
                      <p className="text-xs text-white/90 font-medium truncate">
                        {slide.subtitle}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[440px] flex items-center justify-center overflow-hidden py-4">
      <div className="relative w-full h-full flex items-center justify-center">
        {HERO_SLIDES.map((slide, i) => {
          const style = getVerticalStyle(i);
          const isActive = i === active;

          return (
            <div
              key={i}
              className="absolute w-[90%] max-w-[460px] aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl transition-all duration-700 ease-out border border-white/20 bg-slate-900"
              style={{
                ...style,
                transformStyle: "preserve-3d",
              }}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                sizes="460px"
                className="object-cover"
                priority={i === 0}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent flex flex-col justify-end p-5">
                {isActive && (
                  <div className="bg-black/50 backdrop-blur-md rounded-2xl p-4 border border-white/15 max-w-xs animate-fade-up">
                    <span className="inline-block px-2.5 py-0.5 bg-orange-500 text-white text-[10px] font-black uppercase tracking-wider rounded-md mb-1">
                      ⭐ Kovai Safety Nets
                    </span>
                    <h3 className="text-base font-bold text-white mb-0.5">
                      {slide.title}
                    </h3>
                    <p className="text-xs text-blue-200">{slide.subtitle}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="absolute top-2 right-2 bg-orange-500 rounded-2xl p-3 shadow-2xl text-white text-center rotate-3 pointer-events-none z-20">
        <p className="text-2xl font-black leading-none">10+</p>
        <p className="text-[10px] font-bold uppercase tracking-wider">Years Trust</p>
      </div>
    </div>
  );
}
