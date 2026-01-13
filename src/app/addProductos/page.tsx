import { redirect } from "next/navigation";
import { requireAdmin } from "../../utils/auth"; // ajustá el path según tu estructura
import NuevoProductoForm from "./NuevoProductoForm";

export default async function NuevoProductoPage() {
  // 🔐 Esto corre en el servidor ANTES de renderizar nada
  const user = await requireAdmin();

  if (!user) {
    // si no está logueado o no es admin, lo mandamos a /login
    redirect("/login");
  }

  // si es admin, mostramos el formulario cliente
  return <NuevoProductoForm />;
}
