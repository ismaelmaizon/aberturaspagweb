"use client";

// src/components/nosotros/NosotrosPage.tsx
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Clock3, Hammer, MessageCircle } from "lucide-react";


//motion
import { motion } from "framer-motion";

export default function NosotrosPage() {
  return (
    <section className="relative">
      {/* Fondo suave */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-50 to-white" />
        <div className="absolute left-0 top-24 h-72 w-72 rounded-full bg-neutral-200/40 blur-3xl" />
        <div className="absolute right-0 top-44 h-72 w-72 rounded-full bg-neutral-300/30 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 sm:py-4">
        <motion.div
            initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }} // once=true: solo 1 vez; amount: cuánto debe entrar en pantalla
            transition={{ duration: 0.8 }}
          >
          <Image className="m-auto hidden sm:block" src="/web/img/logoAB.png" alt="Logo" width={300} height={10} />
          </motion.div>
        {/* HERO */}
        <motion.div
            initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }} // once=true: solo 1 vez; amount: cuánto debe entrar en pantalla
            transition={{ duration: 0.8 }}
          >
          <header className="grid gap-8 sm:grid-cols-12 sm:items-center">
            <div className="sm:col-span-6">
              <p className="text-sm font-medium tracking-wide text-neutral-500">
                Oficio • Precisión • Terminación cuidada
              </p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
                Nosotros
              </h1>
              <p className="mt-4 text-base leading-relaxed text-neutral-600">
                Somos una empresa dedicada a la fabricación y colocación de aberturas de madera,
                donde combinamos el oficio artesanal con una mirada actual sobre cada proyecto.
                Creemos que una buena abertura no solo se ve: se siente en el uso diario, en el
                confort y en los detalles.
              </p>
              <p className="mt-3 text-base leading-relaxed text-neutral-600">
                Cada trabajo lo encaramos con la misma seriedad, ya sea una obra nueva, una
                restauración o un reemplazo puntual.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Chip>Fabricación a medida</Chip>
                <Chip>Colocación profesional</Chip>
                <Chip>Restauraciones</Chip>
                <Chip>Terminación premium</Chip>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contactanos"
                  className="inline-flex items-center justify-center rounded-xl bg-green-500 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:opacity-90"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Hablemos de tu proyecto
                </Link>

                <Link
                  href="/obras"
                  className="inline-flex items-center justify-center rounded-xl border border-neutral-200 bg-white px-5 py-2.5 text-sm font-medium text-neutral-900 shadow-sm transition hover:bg-neutral-50"
                >
                  Ver obras realizadas
                </Link>
              </div>
            </div>

            <div className="sm:col-span-6">
              <div className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src="/web/nosotros/nosotros1.png"
                    alt="Trabajo en madera - aberturas"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 50vw"
                    priority
                  />
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-black/0 to-black/0" />
              </div>

              <p className="mt-3 text-xs text-neutral-500">
                *Tip: si no tenés esta imagen, cambiá el src por una foto real de taller/obra (public/img/...).
              </p>
            </div>
          </header>
          </motion.div>

        {/* CÓMO TRABAJAMOS */}
        <motion.div
            initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }} // once=true: solo 1 vez; amount: cuánto debe entrar en pantalla
            transition={{ duration: 0.8 }}
          >
          <div className="mt-12 sm:mt-16">
            <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
              Nuestra forma de trabajar
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-neutral-600">
              No creemos en promesas vacías: trabajamos con procesos claros, comunicación directa y
              detalles bien resueltos. Así logramos resultados que se notan en el uso diario.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <FeatureCard
                icon={<MessageCircle className="h-5 w-5" />}
                title="Asesoramiento real"
                text="Escuchamos la idea, analizamos el espacio y proponemos soluciones pensadas para durar."
              />
              <FeatureCard
                icon={<Hammer className="h-5 w-5" />}
                title="Trabajo a medida"
                text="Cada abertura se diseña según la obra: medidas, materiales y terminaciones se adaptan al proyecto."
              />
              <FeatureCard
                icon={<Clock3 className="h-5 w-5" />}
                title="Tiempos justos"
                text="Planificamos plazos realistas y trabajamos para cumplirlos. Respetar tu tiempo es parte del trabajo."
              />
              <FeatureCard
                icon={<CheckCircle2 className="h-5 w-5" />}
                title="Detalles premium"
                text="Ajustes finos, terminaciones cuidadas y revisión final. No entregamos nada que no usaríamos."
              />
            </div>
          </div>
          </motion.div>

        {/* CÓMO ENCARAMOS UNA OBRA */}
        <motion.div
            initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }} // once=true: solo 1 vez; amount: cuánto debe entrar en pantalla
            transition={{ duration: 0.8 }}
          >
          <div className="mt-12 sm:mt-16 grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-semibold tracking-tight text-neutral-900">
                  Cómo encaramos cada obra
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                  Entendemos que una obra no es solo un trabajo más. Es una inversión, una expectativa y
                  muchas veces un hogar en construcción.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                  Por eso nos involucramos en cada etapa: desde la medición inicial hasta la instalación final,
                  resolviendo imprevistos y cuidando cada detalle como si la obra fuera propia.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                  Nuestro objetivo es que el resultado final no solo cumpla, sino que supere lo esperado.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  <Chip>Replanteo</Chip>
                  <Chip>Fabricación</Chip>
                  <Chip>Colocación</Chip>
                  <Chip>Ajustes finales</Chip>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
                <div className="relative aspect-[16/9] w-full">
                  <Image
                    src="/web/nosotros/nosotros4.jpeg"
                    alt="Instalación y ajustes finales"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 60vw"
                  />
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-black/0 to-black/0" />
              </div>
            </div>
          </div>
          </motion.div>

        {/* COMPROMISO */}
        <motion.div
            initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }} // once=true: solo 1 vez; amount: cuánto debe entrar en pantalla
            transition={{ duration: 0.8 }}
          >
          <div className="mt-12 sm:mt-16">
            <div className="bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
                Compromiso y confianza
              </h2>
              <p className="mt-4 max-w-4xl text-sm leading-relaxed text-neutral-600">
                Trabajamos con materiales seleccionados, técnicas probadas y una comunicación clara durante todo el proceso.
                Nos importa que sepas qué se va a hacer, cuándo y cómo. La confianza se construye cumpliendo, y ese es nuestro mayor valor.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <InfoPill title="Comunicación clara" text="Acompañamiento y seguimiento en cada etapa." />
                <InfoPill title="Materiales seleccionados" text="Maderas y herrajes acordes a cada uso." />
                <InfoPill title="Entrega prolija" text="Revisión final y detalles ajustados." />
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                <p className="text-sm text-neutral-700">
                  ¿Estás pensando en renovar, restaurar o colocar aberturas de madera?
                </p>
                <Link
                  href="/contactanos"
                  className="inline-flex items-center justify-center rounded-xl bg-green-500 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:opacity-90"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Escribinos
                </Link>
              </div>

              <p className="mt-3 text-xs text-neutral-500">
                Nos gusta escuchar la idea antes de ofrecer una solución.
              </p>
            </div>
          </div>

          </motion.div>
      </div>
    </section>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-medium text-neutral-700">
      {children}
    </span>
  );
}

function FeatureCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-center gap-2 text-neutral-900">
        <div className="grid h-9 w-9 place-items-center rounded-xl border border-neutral-200 bg-neutral-50">
          {icon}
        </div>
        <h3 className="text-sm font-semibold">{title}</h3>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-neutral-600">{text}</p>
    </div>
  );
}

function InfoPill({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
      <p className="text-sm font-semibold text-neutral-900">{title}</p>
      <p className="mt-1 text-sm text-neutral-600">{text}</p>
    </div>
  );
}
