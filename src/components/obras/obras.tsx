// src/components/Nosotros.tsx
"use client";

import Image from "next/image";
import ImageCarousel from "../imageCarousel/imageCarousel";

export default function Obras() {
    const images = [
    { src: "/img/COL CDOBLE (1).png", alt: "Imagen 2" },
    { src: "/img/COLPDOBLE.png", alt: "Imagen 2" },
]
  return (
    <div className="max-w-auto m-auto" >
        <h2 className="text-2xl font-bold text-center mb-6">Nuestras Obras</h2>
        <p className="text-center text-gray-600 mb-10 px-4">
          Descubre algunas de nuestras obras más destacadas, donde la calidad y el diseño se unen para crear espacios únicos y funcionales.
        </p>
        <div className="w-1xlg max-w-5xl m-auto mb-10 md:w-full sm:w-full">
            <ImageCarousel images={images} autoPlay={true} interval={5000} className={'m-auto w-full h-60 md:h-120 '} />
            <button className="mt-2 bg-[#A52A2A] text-white px-6 py-2 rounded block m-auto" >
              <a href="/obras">Ver más</a>
            </button>
        </div>
    </div>
  );
}
