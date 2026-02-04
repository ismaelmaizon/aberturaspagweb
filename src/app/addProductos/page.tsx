import { redirect } from "next/navigation";
import NuevoProductoForm from "./NuevoProductoForm";
import { requireAdmin } from "@/src/utils/auth.server";

export default async function NuevoProductoPage() {
  const user = requireAdmin;

  if (!user) {
    redirect("/login");
  }

  // si es admin, mostramos el formulario cliente
  return <NuevoProductoForm />;
}
