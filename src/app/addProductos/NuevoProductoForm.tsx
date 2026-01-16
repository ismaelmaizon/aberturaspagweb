"use client";

import { useEffect, useState } from "react";


type Material = {
  id: number;
  nombre: string;
};

type Tipo = {
  id: number;
  nombre: string;
};

type Atributos = {
  id: number;
  nombre: string;
};

export default function NuevoProductoForm() {

  const [materiales, setMateriales] = useState<Material[]>([]);
  const [tipos, setTipos] = useState<Tipo[]>([]);
  const [atributos, setAtributos] = useState<Atributos[]>([]);

  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMensaje(null);

    const formData = new FormData(e.currentTarget);
    
    const res = await fetch("/web/api/products/addProducts", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      setMensaje(error?.message || "Error al guardar el producto");
    } else {
      const data = await res.json();
      setMensaje(`Producto creado: ${data.nombre}`);
      e.currentTarget.reset();
    }

    setLoading(false);
  }

  useEffect(() => {
    async function fetchMateriales() {
      const res = await fetch("/web/api/products/getMateriales");
      const data = await res.json();
      setMateriales(data.materiales);
    }
    async function fetchTipos() {
      const res = await fetch("/web/api/products/getTipos");
      const data = await res.json();
      setTipos(data.tipos);
    }
    async function fetchAtributos() {
      const res = await fetch("/web/api/products/getAtributos");
      const data = await res.json();
      setAtributos(data.atributos);
    }
    fetchMateriales();
    fetchTipos();
    fetchAtributos();
  }, []);

  return (
    <div className="max-w-xl mx-auto p-6 border border-gray-200/70 mmt-6 mt-10 bg-white shadow-sm">
      <h1 className="text-2xl font-bold mb-4">Nuevo producto</h1>

      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <div>
          <label className="block text-sm font-medium mb-1">Nombre</label>
          <input
            name="nombre"
            type="text"
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Descripción</label>
          <textarea
            name="descripcion"
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        {/* Select de Material */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Material
          </label>

          <select
            name="material"
            required
            className="w-full border rounded px-3 py-2"
            defaultValue=""
          >
            <option value="" disabled>
              Seleccionar material
            </option>

            {materiales.map((material) => (
              <option key={material.id} value={material.id}>
                {material.nombre}
              </option>
            ))}
          </select>
        </div>
        {/* Select de tipos */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Tipos
          </label>

          <select
            name="tipos"
            required
            className="w-full border rounded px-3 py-2"
            defaultValue=""
          >
            <option value="" disabled>
              Seleccionar tipo
            </option>

            {tipos.map((tipo) => (
              <option key={tipo.id} value={tipo.id}>
                {tipo.nombre}
              </option>
            ))}
          </select>
        </div>
        {/* Select de atributos */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Atributos
          </label>

          <select
            name="atributos"
            required
            className="w-full border rounded px-3 py-2"
            defaultValue=""
          >
            <option value="" disabled>
              Seleccionar atributo
            </option>

            {atributos.map((atributo) => (
              <option key={atributo.id} value={atributo.id}>
                {atributo.nombre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="imagen"
            className="
              inline-block
              bg-gray-400
              text-white
              px-4
              py-2
              rounded
              cursor-pointer
              transition
              duration-150
              ease-in-out

              hover:bg-gray-700
              active:scale-95
              active:translate-y-[5px]
              active:shadow-inner
            "
          >
            Seleccionar imagen
          </label>

          <input
            id="imagen"
            name="imagen"
            type="file"
            accept="image/*"
            required
            className="hidden"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 disabled:opacity-50 active:scale-95 active:translate-y-[5px] active:shadow-inner">
          {loading ? "Guardando..." : "Guardar producto"}
        </button>

        {mensaje && <p className="mt-2 text-sm">{mensaje}</p>}
      </form>
    </div>
  );
}
