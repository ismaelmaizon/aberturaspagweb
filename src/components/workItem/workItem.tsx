"use client";

import Image from "next/image";

//motion
import { motion } from "framer-motion";

export type Work = {
  title: string;
  description: string;
  bullets: string[];
  meta: { location: string; type: string; year: string };
  image: { src: string; alt: string };
};

export default function WorkItem({
  work,
  reversed = false,
}: {
  work: Work;
  reversed?: boolean;
}) {
  return (
    <motion.div
    initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }} // once=true: solo 1 vez; amount: cuánto debe entrar en pantalla
    transition={{ duration: 0.8 }}
    >
        <article
        className={[
            "grid items-center gap-6 rounded-3xl bg-white p-4 shadow-sm",
            "sm:grid-cols-12 sm:gap-10 sm:p-6",
        ].join(" ")}
        >
        {/* Imagen */}
        <div
            className={[
            "relative overflow-hidden rounded-2xl sm:col-span-7",
            reversed ? "sm:order-2" : "sm:order-1",
            ].join(" ")}
        >
            <div className="relative aspect-[16/10] w-full">
            <Image
                src={work.image.src}
                alt={work.image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 60vw"
                priority={false}
            />
            </div>

            {/* Overlay sutil para que se vea “pro” */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-black/0 to-black/0" />
        </div>

        {/* Texto */}
        <div
            className={[
            "sm:col-span-5",
            reversed ? "sm:order-1" : "sm:order-2",
            ].join(" ")}
        >
            <div className="flex flex-wrap gap-2">
            <Chip>{work.meta.location}</Chip>
            <Chip>{work.meta.type}</Chip>
            <Chip>{work.meta.year}</Chip>
            </div>

            <h2 className="mt-4 text-xl font-semibold tracking-tight text-neutral-900">
            {work.title}
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-neutral-600">
            {work.description}
            </p>

            <ul className="mt-4 space-y-2 text-sm text-neutral-700">
            {work.bullets.map((b) => (
                <li key={b} className="flex gap-2">
                <span className="mt-1 h-2 w-2 flex-none rounded-full bg-neutral-900/70" />
                <span>{b}</span>
                </li>
            ))}
            </ul>

            {/* CTA opcional */}
            <div className="mt-6">
            <a
                href="/contactanos"
                className="inline-flex items-center justify-center rounded-xl bg-green-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:opacity-90"
            >
                Consultar un trabajo similar
            </a>
            </div>
        </div>
        </article>
    </motion.div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-medium text-neutral-700">
      {children}
    </span>
  );
}
