"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";



type CarouselImage = {
  src: string;
  alt: string;
};

type ImageCarouselProps = {
  images: CarouselImage[];
  /** Activa el autoplay (default: true) */
  autoPlay?: boolean;
  /** Intervalo en ms para el autoplay (default: 4000) */
  interval?: number;
  /** Clases extra para el contenedor */
  className?: string;
};



export default function ImageCarousel({images, autoPlay, interval, className}: ImageCarouselProps) {

  const [current, setCurrent] = useState(0);

  const total = images.length;

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Autoplay
  useEffect(() => {
    if (!autoPlay || total <= 1) return;

    const id = setInterval(() => {
      next();
    }, interval);

    return () => clearInterval(id);
  }, [autoPlay, interval, next, total]);

  if (total === 0) {
    return null;
  }

  return (
    <div className={`relative w-full overflow-hidden bg-black/5 ${className}`}>
      {/* CONTENEDOR DE SLIDES */}
      <div className={`relative w-full aspect-[16/9] ${className} `}>
        {images.map((image, index) => (
          <div
            key={image.src}
            className={`
              absolute inset-0
              transition-opacity duration-700 ease-in-out
              ${index === current ? "opacity-100" : "opacity-0 pointer-events-none"}
            `}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              priority={index === 0}
              sizes="(max-width: 768px) 100vw, 800px"
            />
            
          </div>
        ))}
      </div>

      {/* BOTÓN ANTERIOR */}
      {total > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            className="
              absolute left-3 top-1/2 -translate-y-1/2
              rounded-full
              bg-black/40 hover:bg-black/60
              p-2
              text-white
              backdrop-blur
              transition
            "
            aria-label="Imagen anterior"
          >
            ‹
          </button>

          {/* BOTÓN SIGUIENTE */}
          <button
            type="button"
            onClick={next}
            className="
              absolute right-3 top-1/2 -translate-y-1/2
              rounded-full
              bg-black/40 hover:bg-black/60
              p-2
              text-white
              backdrop-blur
              transition
            "
            aria-label="Imagen siguiente"
          >
            ›
          </button>
        </>
      )}

      {/* INDICADORES (PUNTITOS) */}
      {total > 1 && (
        <div
          className="
            absolute bottom-3 left-1/2 -translate-x-1/2
            flex gap-2
          "
        >
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrent(index)}
              className={`
                h-2.5 w-2.5 rounded-full 
                transition 
                ${index === current ? "bg-white shadow-md scale-110" : "bg-white/50"}
              `}
              aria-label={`Ir a la imagen ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
