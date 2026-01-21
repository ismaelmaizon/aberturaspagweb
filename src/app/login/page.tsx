"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMensaje(null);

    const res = await fetch("/web/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    console.log(data);

    if (!res.ok) {
      setMensaje(data.message || "Error al iniciar sesión");
      return;
    }

    setMensaje("Login correcto ✅");
    // acá podrías hacer: router.push("/admin/productos") etc.
    router.push("/addProductos");
  }

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 border rounded-lg">
      <h1 className="text-xl font-bold mb-4">Login Admin</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            className="w-full border px-3 py-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Contraseña</label>
          <input
            type="password"
            className="w-full border px-3 py-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          Ingresar
        </button>

        {mensaje && <p className="mt-2 text-sm text-red-600">{mensaje}</p>}
      </form>
    </div>
  );
}
