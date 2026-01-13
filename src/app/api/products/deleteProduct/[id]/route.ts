import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../../utils/conectDB";
import { requireAdmin } from "../../../../../utils/auth";


export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Verificar si el usuario es admin
    const user = await requireAdmin();
    if (!user) {
      return NextResponse.json({ message: "No autorizado" }, { status: 401 });
    }

    const { id } = await params;

    const query = `DELETE FROM productos WHERE id = ?`;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [result]: any = await db.execute(query, [id]);

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { ok: false, message: "Producto no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({ ok: true, message: "Producto eliminado" });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error al eliminar producto:", error);
    return NextResponse.json(
      { ok: false, message: error.message || "Error al eliminar producto" },
      { status: 500 }
    );
  }
}
