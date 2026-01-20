"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Boxes, DoorClosed, MessageCircle, ShieldCheck, Truck } from "lucide-react";

import Products from "./../components/products/products";
import Nosotros from "./../components/nosotros/nosotros";
import Obras from "../components/obras/obras";


const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7 },
};

const WHATSAPP_NUMBER = "5493517641942";

export default function Home() {
  const sendWsp = (mensaje: string) => {
    const enlace = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;
    window.open(enlace, "_blank");
  };


  const descargarPDF = async () => {
    try {
      const response = await fetch("/web/api/catalogo");
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const enlaceDescarga = document.createElement("a");
      enlaceDescarga.href = url;
      enlaceDescarga.setAttribute("download", "catalogo.pdf");

      document.body.appendChild(enlaceDescarga);
      enlaceDescarga.click();

      setTimeout(() => {
        window.URL.revokeObjectURL(url);
        document.body.removeChild(enlaceDescarga);
      }, 100);
    } catch (error) {
      console.error("Error al descargar el archivo:", error);
    }
  };

  return (
    <div className="relative bg-white">
      {/* Fondo consistente con Nosotros/Obras */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-50 to-white" />
        <div className="absolute left-0 top-24 h-72 w-72 rounded-full bg-neutral-200/40 blur-3xl" />
        <div className="absolute right-0 top-44 h-72 w-72 rounded-full bg-neutral-300/30 blur-3xl" />
      </div>

      {/* HERO */}
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 sm:py-4">
        <motion.div {...fadeUp} className="text-center">
          <Image
            className="mx-auto hidden sm:block"
            src="/web/img/logoAB.png"
            alt="Logo"
            width={300}
            height={80}
          />
          <p className="mt-6 text-sm font-medium tracking-wide text-neutral-500">
            Calidad, Tradición y Confianza
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
            ¡Abrimos tus ideas, creamos tus espacios!
          </h1>
        </motion.div>
      </div>

      {/* Nosotros (tu componente) */}
      <div className="mx-auto max-w-6xl px-4 pb-6 sm:px-6">
        <Nosotros />
      </div>

      {/* BENEFICIOS */}
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
        <motion.div {...fadeUp}>
          <div className="grid gap-4 sm:grid-cols-3">
            <BenefitCard
              icon={<Boxes className="h-12 w-12" />}
              title="Materiales"
              text="Trabajamos con cedro, pinotea e hierro, logrando piezas sólidas, estéticas y duraderas."
            />
            <BenefitCard
              icon={<DoorClosed className="h-12 w-12" />}
              title="Estilos disponibles"
              text="Diseños de una o dos hojas, puerta y media, colonial, clásico, moderno y tallado."
            />
            <BenefitCard
              icon={<ShieldCheck className="h-12 w-12" />}
              title="Características"
              text="Aberturas resistentes, elegantes y de alta durabilidad, con acabados de excelente calidad."
            />
          </div>
        </motion.div>
      </div>

      {/* NUEVO PRODUCTO */}
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
        <motion.div {...fadeUp}>
          <div className="bg-white p-5 shadow-sm sm:p-8">
            <div className="grid items-center gap-8 lg:grid-cols-2">
              <div>
                <p className="text-sm font-medium tracking-wide text-neutral-500">Destacado</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
                  Nuevo producto
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-neutral-600 sm:text-base">
                  Las puertas talladas en madera son una opción clásica y elegante que aporta un toque de distinción
                  a cualquier espacio. Con una cuidadosa labor artesanal, cada puerta es única, con detalles intrincados
                  y patrones que resaltan la belleza natural de la madera.
                </p>

                <button
                onClick={() =>
                      sendWsp(
                        "Hola! Quisiera consultar por las puertas talladas. Me gustaría coordinar una visita / presupuesto."
                      )
                    }
                  className="mt-6 hidden rounded-xl bg-green-500 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:opacity-90 active:scale-95 active:translate-y-[1px] sm:inline-flex"
                >
                 <MessageCircle className="h-4 w-4 mr-2" />
                  Cotizar
                </button>
              </div>

              <div className="mx-auto w-full max-w-sm">
                <div className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
                  <div className="relative aspect-square w-full">
                    <Image
                      src="/web/img/newProduct.jpg"
                      alt="Producto Nuevo"
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 40vw"
                    />
                  </div>
                </div>

                <button
                onClick={() =>
                      sendWsp(
                        "Hola! Quisiera consultar por las puertas talladas. Me gustaría coordinar una visita / presupuesto."
                      )
                    }
                  className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-green-500 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:opacity-90 active:scale-95 active:translate-y-[1px] sm:hidden"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Cotizar
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Productos (tu componente) */}
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
        <Products />
      </div>

      {/* ASESORAMIENTO */}
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
        <motion.div {...fadeUp}>
          <div className="max-w-auto bg-white p-5 shadow-sm sm:p-8"> 
            <div className="pt-10"> {/* Product info */} 
              <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-5xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pt-1 lg:pb-24"> 
                <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8"> 
                  <h1 className="mt-2 text-2xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">Asesoramiento Personalizado</h1> 
                </div> {/* Options */} 
                <div className="mt-5 lg:row-span-3 lg:mt-0 grid grid-cols-3 gap-y-15 gap-x-2"> 
                  <Image src="/web/img/asesoramientoPersonalizado3.jpeg" // ruta de la imagen de tu logo 
                  alt="AsesoramientoPersonalizado" className="w-auto h-100 rounded-lg bg-gray-100 object-cover" width={200} height={40} 
                  /> 
                  <Image src="/web/img/asesoramientoPersonalizado2.jpeg" // ruta de la imagen de tu logo 
                  alt="AsesoramientoPersonalizado" className="w-auto h-100 rounded-lg bg-gray-100 object-cover" width={150} height={40} 
                  /> 
                  <Image src="/web/img/asesoramientoPersonalizado.jpeg" // ruta de la imagen de tu logo 
                  alt="AsesoramientoPersonalizado" className="w-auto h-100 rounded-lg bg-gray-100 object-cover" width={150} height={40} 
                  /> 
                </div> 
                <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-20 lg:pr-50 lg:pb-5"> {/* Description and details */} 
                    <div> 
                      <div className="space-y-2"> 
                        <p className="mt-4 text-sm leading-relaxed text-neutral-600 sm:text-base">Cada casa y cada cliente 
                          son diferentes: Recomendaciones según el estilo arquitectónico, hasta la instalación final, brindando: 
                          Selección del tipo de madera ideal para tu proyecto. Opciones de acabado, protección y herrajes. Resolución de dudas técnico durante toda la obra.</p> 
                    </div> 
                    <div className="mt-5"> 
                      <Chip>Comunicación clara</Chip> 
                      <Chip>Te acompañamos en cada paso del proceso</Chip> 
                      <Chip>Definimos lo mejor para vos</Chip> 
                    </div> 
                </div> 
                </div> 
              </div> 
            </div> 
          </div>
        </motion.div>
      </div>

      {/* ENVÍOS */}
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
        <motion.div {...fadeUp}>
          <div className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-8">
            <div className="flex items-start gap-4">
              <div className="grid h-18 w-18 place-items-center rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-900">
                <Truck className="h-12 w-12" />
              </div>

              <div>
                <h2 className="text-xl font-semibold tracking-tight text-neutral-900">
                  Envíos a todo el país
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600 sm:text-base">
                  Coordinamos el envío asegurando que tus aberturas lleguen en perfectas condiciones. Ponete en contacto
                  para coordinar los detalles.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* CATÁLOGO */}
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
        <motion.div {...fadeUp}>
          <div className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-8">
            <div className="grid items-center gap-8 lg:grid-cols-2">
              <div>
                <p className="text-sm font-medium tracking-wide text-neutral-500">PDF</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
                  Descarga nuestro catálogo
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-neutral-600 sm:text-base">
                  Explorá nuestra gama de productos y encontrá inspiración para tu próximo proyecto.
                  Descargá el catálogo completo y conocé la calidad y el diseño que ofrecemos.
                </p>

                <button
                  onClick={descargarPDF}
                  className="mt-6 hidden rounded-xl bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:opacity-90 active:scale-95 active:translate-y-[1px] sm:inline-flex"
                >
                  Descargar catálogo
                </button>
              </div>

              <div className="mx-auto w-full max-w-sm">
                <div className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
                  <div className="relative aspect-square w-full">
                    <Image
                      src="/web/img/Catalogo2026.png"
                      alt="Catálogo"
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 40vw"
                    />
                  </div>
                </div>

                <button
                  onClick={descargarPDF}
                  className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:opacity-90 active:scale-95 active:translate-y-[1px] sm:hidden"
                >
                  Descargar catálogo
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* OBRAS */}
      <div className="mx-auto max-w-6xl px-4 py-6 pb-14 sm:px-6 sm:py-10">
        <motion.div {...fadeUp}>
          <Obras />
        </motion.div>
      </div>
    </div>

  );
}

function BenefitCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-center gap-2 text-neutral-900">
        <div className="grid h-18 w-18 place-items-center rounded-xl border border-neutral-200 bg-neutral-50">
          {icon}
        </div>
        <h3 className="text-md font-semibold">{title}</h3>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-neutral-600">{text}</p>
    </div>
  );
}

function Thumb({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
      <div className="relative aspect-square w-full">
        <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 640px) 33vw, 180px" />
      </div>
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-medium text-neutral-700">
      {children}
    </span>
  );
}
