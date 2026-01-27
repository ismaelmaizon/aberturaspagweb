export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-10">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* COLUMNA 1 */}
          <div>
            <h2 className="text-xl font-semibold text-white">Aberturas Bodereau</h2>
            <p className="text-sm mt-2">
              Fabricación y venta de aberturas de alta calidad.
            </p>
          </div>

          {/* COLUMNA 2 */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Contacto</h3>
            <ul className="space-y-1 text-sm">
              <li>📍 Dirección: Av. Enrique Bodereau 8409, Villa Rivera Indarte, Cordoba Capital</li>
              <li>📞 Tel: +5493516312848 / +5493515185458</li>
              <li>📧 Email: -</li>
            </ul>
          </div>

          {/* COLUMNA 3 */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Redes Sociales</h3>
            <ul className="space-y-1 text-sm">
              <li>🔗 Facebook</li>
              <li>🔗 Instagram</li>
              <li>🔗 WhatsApp</li>
            </ul>
          </div>
        </div>

        {/* LINEA DIVISORIA */}
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
          © {new Date().getFullYear()} Aberturas Bodereau — Todos los derechos reservados
        </div>

      </div>
    </footer>
  );
}
