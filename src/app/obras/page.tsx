"use client";
import Image from "next/image";
import WorkItem, { Work } from "../../components/workItem/workItem";


//motion
import { motion } from "framer-motion";

const works: Work[] = [
  {
    title: "COL CDOBLE",
    description:
      "La colocación de una puerta colonial de cedro añade un toque clásico y refinado a cualquier espacio, destacándose por su elegancia atemporal y su robustez.",
    bullets: ["Replanteo y fabricación a medida", "Instalación con nivelación fina", "Sellados y terminación premium"],
    meta: { location: "Córdoba", type: "Residencial", year: "2025" },
    image: { src: "/web/obras/colcdoble.png", alt: "Aberturas de madera en vivienda" },
  },
  {
    title: "COL PDOBLE",
    description:
      "El diseño colonial de la puerta se caracteriza por detalles tradicionales y molduras ornamentales que evocan el estilo clásico, aportando un aire de sofisticación y distinción a la entrada.",
    bullets: ["Recuperación y tratamiento", "Ajustes de cierre", "Protección y acabado"],
    meta: { location: "Villa Allende", type: "Restauración", year: "2024" },
    image: { src: "/web/obras/colpdoble.png", alt: "Restauración de aberturas de madera" },
  },
  {
    title: "COLOCACIÓN 1",
    description:
      "La colocación de esta puerta colonial de cedro es un proceso preciso, ya que su estructura está diseñada para encajar perfectamente en vanos existentes,garantizando una instalación estable y segura.",
    bullets: ["Medición y asesoramiento", "Colocación y ajuste", "Revisión final con el cliente"],
    meta: { location: "Carlos Paz", type: "Residencial", year: "2025" },
    image: { src: "/web/obras/colocacion1.png", alt: "Ventanas corredizas de madera" },
  },
  {
    title: "PDOBLE 3",
    description:
      "La puerta de madera de pinotea es una opción ideal para quienes buscan una estética cálida y natural. Sus vetas y su acabado natural le otorgan un carácter único.",
    bullets: ["Diseño y propuesta", "Fabricación", "Instalación y calibración"],
    meta: { location: "Córdoba", type: "A medida", year: "2023" },
    image: { src: "/web/obras/pdoble3.png", alt: "Puerta principal de madera" },
  },
];


export default function ObrasPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-4 lg:max-w-7xl lg:px-4">
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 sm:py-4">
        <motion.div
            initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }} // once=true: solo 1 vez; amount: cuánto debe entrar en pantalla
            transition={{ duration: 0.8 }}
          >
          <Image className="m-auto hidden sm:block" src="/web/img/logoAB.png" alt="Logo" width={300} height={10} />
          {/* Header */}
          <header className="max-w-2xl">
            <p className="text-sm font-medium tracking-wide text-neutral-500">
              Obras reales • Calidad • Terminación cuidada
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
              Trabajos que hablan por sí solos
            </h1>
            <p className="mt-4 text-base leading-relaxed text-neutral-600">
              Mostramos algunos proyectos recientes: asesoramiento, fabricación/colocación y ajustes finales como si la obra fuese propia.
              Tiempos de entrega justos, comunicación clara y foco en el detalle.
            </p>
          </header>
          </motion.div>

        {/* Lista */}
        <div className="mt-10 space-y-10 sm:mt-14 sm:space-y-14">
          {works.map((work, i) => (
            <WorkItem key={work.title} work={work} reversed={i % 2 === 1} />
          ))}
        </div>
      </div>
    </div>
  )
}