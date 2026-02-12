// src/app/contactanos/page.tsx
"use client";

import { Mail, MapPin, Phone, Clock, MessageCircle } from "lucide-react";
import Image from "next/image";

const WHATSAPP_NUMBER = "5493516312848"; // tu número
const GOOGLE_MAPS_EMBED_URL = "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d219.39253549890697!2d-64.28865944102235!3d-31.325525336687374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2s!5e1!3m2!1ses-419!2sar!4v1767663143684!5m2!1ses-419!2sar" ;


//motion
import { motion } from "framer-motion";

export default function ContactanosPage() {
  const sendWsp = (mensaje: string) => {
    const enlace = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;
    window.open(enlace, "_blank");
  };

  return (
    <div className="relative bg-white">
      {/* Fondo consistente con el resto */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-50 to-white" />
        <div className="absolute left-0 top-24 h-72 w-72 rounded-full bg-neutral-200/40 blur-3xl" />
        <div className="absolute right-0 top-44 h-72 w-72 rounded-full bg-neutral-300/30 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }} // once=true: solo 1 vez; amount: cuánto debe entrar en pantalla
        transition={{ duration: 0.8 }}
      >
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 sm:py-4">
          <Image className="m-auto hidden sm:block" src="/img/logoAB.png" alt="Logo" width={300} height={10} />
          {/* Header */}
          <header className="max-w-3xl">
            <p className="text-sm font-medium tracking-wide text-neutral-500">
              Presupuestos • Asesoramiento • Coordinación de visita
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
              Contactanos
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600 sm:text-base">
              Escribinos y contanos qué necesitás. Si ya tenés medidas aproximadas o fotos, mejor: te
              respondemos más rápido y con una recomendación más precisa.
            </p>
          </header>

          {/* Contenido */}
          <div className="mt-10 grid gap-6 lg:grid-cols-12 lg:items-start">
            {/* Columna izquierda: datos + acciones */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-neutral-900">Datos de contacto</h2>

                <div className="mt-4 space-y-4 text-sm text-neutral-700">
                  <InfoRow
                    icon={<MapPin className="h-5 w-5" />}
                    title="Dirección"
                    text="Av. Enrique Bodereau 8409, Villa Rivera Indarte, Cordoba Capital"
                  />
                  <InfoRow
                    icon={<Phone className="h-5 w-5" />}
                    title="Teléfono / WhatsApp"
                    text="+5493516312848 / +5493515185458"
                  />
                  <InfoRow
                    icon={<Mail className="h-5 w-5" />}
                    title="Email"
                    text="aberturasbodereau1@gmail.com"
                  />
                  <InfoRow
                    icon={<Clock className="h-5 w-5" />}
                    title="Horarios"
                    text="Lun a Vie 9:00–18:00 • Sáb 9:00–13:00"
                  />
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={() =>
                      sendWsp(
                        "Hola! Quisiera consultar por aberturas. Me gustaría coordinar una visita / presupuesto."
                      )
                    }
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-500 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:opacity-90 active:scale-95 active:translate-y-[1px]"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Escribir por WhatsApp
                  </button>
                </div>

                <p className="mt-4 text-xs text-neutral-500">
                  Tip: si podés, enviá fotos del lugar + medidas aproximadas para agilizar la cotización.
                </p>
              </div>

            </div>

            {/* Columna derecha: mapa */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-neutral-200 bg-white p-3 shadow-sm sm:p-4">
                <h2 className="px-2 pb-3 text-lg font-semibold text-neutral-900">
                  Ubicación del local
                </h2>

                <div className="relative overflow-hidden rounded-2xl border border-neutral-200">
                  {/* responsive iframe */}
                  <div className="relative aspect-[16/10] w-full">
                    <iframe src= {GOOGLE_MAPS_EMBED_URL}
                    width="600" height="450" 
                    className="absolute inset-0 h-full w-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                    title="Google Maps - Ubicación del local"></iframe>
                  </div>
                </div>

                <p className="mt-3 px-2 text-xs text-neutral-500">
                  Para configurar el mapa: Google Maps → Compartir → Insertar un mapa → copiar el link del iframe (src).
                </p>
              </div>
            </div>
          </div>
        </div>  
      </motion.div>
    </div>
  );
}

function InfoRow({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-3">
      <div className="mt-0.5 grid h-10 w-10 place-items-center rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-900">
        {icon}
      </div>
      <div>
        <p className="text-xs font-medium text-neutral-500">{title}</p>
        <p className="text-sm text-neutral-900">{text}</p>
      </div>
    </div>
  );
}
