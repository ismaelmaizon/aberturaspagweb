"use client"

import { Ellipsis } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"



type Product = {
  id: number
  nombre: string
  descripcion: string
  urlImagen: string
  precio: number
  created_at: string
  tipos: number
  material: number
  atributos: number
}

type Material = {
  id: number;
  nombre: string;
};

type Tipo = {
  id: number;
  nombre: string;
  descripcion: string;
};

type Atributos = {
  id: number;
  nombre: string;
};

export default function Products() {
  const [materiales, setMateriales] = useState<Material[]>([]);
  const [tipos, setTipos] = useState<Tipo[]>([]);
  const [atributos, setAtributos] = useState<Atributos[]>([]);
  const [products, setProducts] = useState<Product[]>([])
  const [page, setPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(4)
  const [totalPages, setTotalPages] = useState(4)
  const [loading, setLoading] = useState(false)



  const getMateriales = async () => {
    const res = await fetch("/api/products/getMateriales")
    const data = await res.json()
    setMateriales(data.materiales)
  }
  const getTipos = async () => {
    const res = await fetch("/api/products/getTipos")
    const data = await res.json()
    setTipos(data.tipos)
  }
  const getAtributos = async () => {
    const res = await fetch("/api/products/getAtributos")
    const data = await res.json()
    setAtributos(data.atributos)
  }

  useEffect(() => {
    fetch(`/api/products/getProducts?page=${page}&limit=${itemsPerPage}`)
      .then(res => res.json())
      .then(data => {
        console.log("Productos cargados:", data)
        setLoading(true)
        setProducts(data.products)
        setTotalPages(data.totalPages)
      })
      .catch(err => console.error("Error cargando productos:", err))
  }, [page, itemsPerPage]) 

  const sendWsp = async (mensaje : string) => {
      // Número de WhatsApp al que se enviará el mensaje
      //const numeroWhatsApp = '+5493516312848';
      
      const numeroWhatsApp = `5493516312848` ;
      // Construir el enlace de WhatsApp
      const enlaceWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;

      // Redirigir al usuario a WhatsApp
      // eslint-disable-next-line react-hooks/immutability
      window.open(enlaceWhatsApp, "_blank");
  };

  function handleCotizar(producto: Product) {
    console.log("Cotizar producto:", producto)
    sendWsp(`Hola, estoy interesado en cotizar el producto: ${producto.nombre}. Descripción: ${producto.descripcion}`);
  }


  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getMateriales()
    getTipos()
    getAtributos()
  }, [])

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-4 lg:max-w-7xl lg:px-8">
        {/* SELECTOR de cantidad por página */}
        <div className="mb-4">
          <label htmlFor="perPage" className="mr-2">Productos por página:</label>
          <select
            id="perPage"
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value))
              setPage(1)   // opcional: volver a la primera página
            }}
            className="bg-gray-200 border border-gray-300 rounded-md px-2 py-1"
          >
            <option value={4}>4</option>
            <option value={8}>8</option>
            <option value={12}>12</option>
            <option value={20}>20</option>
          </select>
        </div>
            {!loading ? <Ellipsis /> : 
              <div className="grid grid-cols-1 gap-x-6 gap-y-10 group relative rounded-lg border border-gray-300/70 p-4 bg-white 
              shadow-sm sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {
                products.map((product: Product) => {
                  console.log(product);
                    return(  
                        <div
                          key={product.id}
                          className="group h-full overflow-hidden rounded-xl border border-black/10 bg-white
                          transition-all duration-300 hover:shadow-lg hover:scale-[1.02]
                          flex flex-col"
                        >
                          {/* IMAGEN */}
                          <div className="relative w-full h-90 bg-gray-100">
                              <Image
                              alt={product.nombre}
                              src={product.urlImagen}
                              fill
                              className="object-cover mx-auto rounded-lg bg-gray-100"
                            />
                          </div>

                          {/* CONTENIDO */}
                          <div className="p-4 flex flex-col flex-1 gap-3">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p>{tipos.find(tipo => tipo.id === product.tipos)?.nombre}/{atributos.find(atributo => atributo.id === product.atributos)?.nombre}</p>
                              </div>
                              <div>
                                <p>{materiales.find(material => material.id === product.material)?.nombre}</p>                          
                              </div>
                            </div>
                            <div>
                              <h3 className="text-sm font-semibold text-gray-900 line-clamp-1">
                                {product.nombre}
                              </h3>
                              <p className="mt-1 text-sm text-gray-600 max-h-24 overflow-y-auto pr-2">
                                {product.descripcion}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleCotizar(product as Product)}
                              className="mt-auto w-full rounded-md bg-red-950/100 px-3 py-2 text-sm font-medium text-white hover:bg-gray-800 transition"
                            >
                              Cotizar
                            </button>
                          </div>
                        </div>
                    )
                  })}
              </div>
             }
        {/* BOTONES de paginación */}
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Anterior
          </button>

          <span>Página {page} de {totalPages}</span>

          <button
            disabled={page >= totalPages}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>

      </div>
    </div>
  )
}
