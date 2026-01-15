// src/components/Nosotros.tsx
"use client";

import Image from "next/image";

export default function Nosotros() {
  return (
    <section className="mt-10 relative w-full min-h-[320px] bg-[#811c1c] text-white overflow-hidden">
      {/* IMAGEN DE FONDO */}
      <div className="
          absolute
          inset-0
          overflow-hidden
        ">
        <Image
          src="/web/img/biuj635.jpeg" // cambiala por tu imagen
          alt="Nosotros - Aberturas Bodereau"
          fill
          className="object-cover border-solid shadow-lg "
          priority
        />
      </div>

      {/* ZONA IZQUIERDA DIFUMINADA + TEXTO */}
      <div
        className="
          relative
          flex
          w-full
          md:w-1/2
          h-full
          items-center
          px-6
          py-10
          md:px-10
        "
      >
        {/* GRADIENTE DIAGONAL SOLO EN MITAD IZQUIERDA */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-[radial-gradient(circle_at_0%_100%,rgba(0,0,0,0.9)_0%,rgba(0,0,0,0.6)_40%,rgba(0,0,0,0.3)_70%,transparent_100%)]
            [clip-path:polygon(0_150%,0%_0%,0%_0%,100%_0%)]
            backdrop-blur-xl
          "
        ></div>

        {/* CONTENIDO SOBRE EL GRADIENTE */}
        <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-4 lg:max-w-7xl lg:px-4" >  
          <div className="relative z-5 max-w-md">
            
            <h2 className="text-2xl text-shadow-title md:text-3xl font-semibold tracking-tight mb-3">
              Sobre Nosotros
            </h2>
            <p className="xl:text-xl text-shadow-custom md:text-base text-md text-gray-200 leading-relaxed mb-2">
              Somos una empresa dedicada a la fabricación e instalación de aberturas de
              alta calidad, pensadas para brindar confort, seguridad y diseño a cada
              espacio.
            </p>
            <p className="xl:text-xl text-shadow-custom md:text-base text-md text-gray-200 leading-relaxed">
              Acompañamos a nuestros clientes en todo el proceso: desde el asesoramiento
              inicial hasta la colocación final, cuidando cada detalle para lograr
              resultados duraderos y estéticamente impecables.
            </p>
          </div>
        </div>
      </div>

    </section>
  );
}
