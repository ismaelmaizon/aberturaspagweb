"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Ellipsis } from "lucide-react";

//motion
import { motion } from "framer-motion";

type Product = {
  id: number;
  nombre: string;
  descripcion: string;
  urlImagen: string;
  precio: number;
  created_at: string;
  tipos: number;
  material: number;
  atributos: number;
};

type Material = { id: number; nombre: string };
type Tipo = { id: number; nombre: string; descripcion: string };
type Atributos = { id: number; nombre: string };

export default function ProductosPage() {
  const [materiales, setMateriales] = useState<Material[]>([]);
  const [tipos, setTipos] = useState<Tipo[]>([]);
  const [atributos, setAtributos] = useState<Atributos[]>([]);

  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [totalPages, setTotalPages] = useState(1);

  // Filtros
  const [tipoId, setTipoId] = useState<number | "all">("all");
  const [materialId, setMaterialId] = useState<number | "all">("all");

  const [loading, setLoading] = useState(true);

  // Mapas para resolver nombres rápido
  const tipoById = useMemo(() => new Map(tipos.map(t => [t.id, t])), [tipos]);
  const materialById = useMemo(() => new Map(materiales.map(m => [m.id, m])), [materiales]);
  const atributoById = useMemo(() => new Map(atributos.map(a => [a.id, a])), [atributos]);

  const getMateriales = async () => {
    const res = await fetch("/web/api/products/getMateriales");
    const data = await res.json();
    setMateriales(data.materiales ?? []);
  };

  const getTipos = async () => {
    const res = await fetch("/web/api/products/getTipos");
    const data = await res.json();
    setTipos(data.tipos ?? []);
  };

  const getAtributos = async () => {
    const res = await fetch("/web/api/products/getAtributos");
    const data = await res.json();
    setAtributos(data.atributos ?? []);
  };

  // Inicial
  useEffect(() => {
    getMateriales();
    getTipos();
    getAtributos();
  }, []);

  // Cada vez que cambian filtros o itemsPerPage, volvemos a la página 1
  useEffect(() => {
    setPage(1);
  }, [tipoId, materialId, itemsPerPage]);

  // Fetch de productos (con filtros enviados a la API)
  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      setLoading(true);
      try {
        const qs = new URLSearchParams();
        qs.set("page", String(page));
        qs.set("limit", String(itemsPerPage));

        // ✅ params de filtro (si tu API los soporta, genial)
        if (tipoId !== "all") qs.set("tipo", String(tipoId));
        if (materialId !== "all") qs.set("material", String(materialId));

        const res = await fetch(`/web/api/products/getProducts?${qs.toString()}`, {
          signal: controller.signal,
        });

        const data = await res.json();

        setProducts(data.products ?? []);
        setTotalPages(data.totalPages ?? 1);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        if (err?.name !== "AbortError") console.error("Error cargando productos:", err);
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, [page, itemsPerPage, tipoId, materialId]);

  const sendWsp = (mensaje: string) => {
    const numeroWhatsApp = `5493517641942`;
    const enlaceWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
    window.open(enlaceWhatsApp, "_blank");
  };

  function handleCotizar(producto: Product) {
    sendWsp(
      `Hola, estoy interesado en cotizar el producto: ${producto.nombre}. Descripción: ${producto.descripcion}`
    );
  }

  const clearFilters = () => {
    setTipoId("all");
    setMaterialId("all");
  };

  return (
    <div className="relative bg-white">
      {/* Fondo consistente con Nosotros/Obras */}
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
          {/* Header */}
          <div className="mb-8">
            <p className="text-sm font-medium tracking-wide text-neutral-500">
              Puertas • Ventanas • Madera • Hierro
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
              Productos
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-neutral-600 sm:text-base">
              Explorá nuestro catálogo y filtrá por tipo y material. Si querés cotizar, te conectamos directo por WhatsApp.
            </p>
          </div>  
        </motion.div>

        {/* Filtros + selector de cantidad */}
        <div className="mb-6 rounded-3xl border border-neutral-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="grid gap-4 sm:grid-cols-12 sm:items-end">
            {/* Tipo */}
            <div className="sm:col-span-4">
              <label className="block text-xs font-medium text-neutral-600">Tipo</label>
              <select
                value={tipoId}
                onChange={(e) => setTipoId(e.target.value === "all" ? "all" : Number(e.target.value))}
                className="mt-1 w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm outline-none focus:border-neutral-300"
              >
                <option value="all">Todos</option>
                {tipos.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.nombre}
                  </option>
                ))}
              </select>
            </div>

            {/* Material */}
            <div className="sm:col-span-4">
              <label className="block text-xs font-medium text-neutral-600">Material</label>
              <select
                value={materialId}
                onChange={(e) =>
                  setMaterialId(e.target.value === "all" ? "all" : Number(e.target.value))
                }
                className="mt-1 w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm outline-none focus:border-neutral-300"
              >
                <option value="all">Todos</option>
                {materiales.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.nombre}
                  </option>
                ))}
              </select>
            </div>

            {/* Items por página */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-neutral-600">Por página</label>
              <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="mt-1 w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm outline-none focus:border-neutral-300"
              >
                <option value={4}>4</option>
                <option value={8}>8</option>
                <option value={12}>12</option>
                <option value={20}>20</option>
              </select>
            </div>

            {/* Limpiar */}
            <div className="sm:col-span-2 sm:flex sm:justify-end">
              <button
                onClick={clearFilters}
                className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-900 shadow-sm transition hover:bg-neutral-50 active:scale-95 active:translate-y-[1px] sm:w-auto"
              >
                Limpiar filtros
              </button>
            </div>
          </div>

          {/* Chips de filtros activos */}
          <div className="mt-4 flex flex-wrap gap-2">
            <Chip>
              Tipo:{" "}
              {tipoId === "all" ? "Todos" : (tipoById.get(tipoId)?.nombre ?? `#${tipoId}`)}
            </Chip>
            <Chip>
              Material:{" "}
              {materialId === "all"
                ? "Todos"
                : (materialById.get(materialId)?.nombre ?? `#${materialId}`)}
            </Chip>
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-16 text-neutral-500">
            <Ellipsis className="h-8 w-8" />
          </div>
        ) : products.length === 0 ? (
          <div className="rounded-3xl border border-neutral-200 bg-white p-10 text-center text-neutral-600 shadow-sm">
            No hay productos para los filtros seleccionados.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => {
              const tipo = tipoById.get(product.tipos)?.nombre ?? "—";
              const material = materialById.get(product.material)?.nombre ?? "—";
              const atributo = atributoById.get(product.atributos)?.nombre ?? "—";

              return (
                <div
                  key={product.id}
                  className="group h-full overflow-hidden rounded-xl border border-black/10 bg-white
                          transition-all duration-300 hover:shadow-lg hover:scale-[1.02]
                          flex flex-col" >
                  {/* Imagen */}
                  <div className="relative w-full h-90 bg-gray-100">
                    <Image
                      alt={product.nombre}
                      src={`/web${product.urlImagen}`}
                      fill
                      className="object-cover mx-auto rounded-lg bg-gray-100"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-black/0 to-black/0" />
                  </div>

                  {/* Contenido */}
                  <div className="p-4">
                    <div className="flex flex-wrap gap-2 text-xs">
                      <Chip>{tipo}</Chip>
                      <Chip>{atributo}</Chip>
                      <Chip>{material}</Chip>
                    </div>

                    <h3 className="mt-3 text-sm font-semibold text-neutral-900 line-clamp-1">
                      {product.nombre}
                    </h3>

                    <p className="mt-2 text-sm text-neutral-600 line-clamp-3">
                      {product.descripcion}
                    </p>

                    <button
                      type="button"
                      onClick={() => handleCotizar(product)}
                      className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-red-950/100 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:opacity-90 active:scale-95 active:translate-y-[1px]"
                    >
                      Cotizar
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Paginación */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            disabled={page <= 1 || loading}
            onClick={() => setPage((p) => p - 1)}
            className="rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-900 shadow-sm transition hover:bg-neutral-50 disabled:opacity-50"
          >
            Anterior
          </button>

          <span className="text-sm text-neutral-700">
            Página <strong>{page}</strong> de <strong>{totalPages}</strong>
          </span>

          <button
            disabled={page >= totalPages || loading}
            onClick={() => setPage((p) => p + 1)}
            className="rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-900 shadow-sm transition hover:bg-neutral-50 disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
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
