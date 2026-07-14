export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { getSolicitudesCollection } from "@/lib/database";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const solicitudesDB = await getSolicitudesCollection();

    const authHeader = req.headers.get("authorization");
    const role = req.headers.get("role");
    const userId = req.headers.get("userid");

    if (!authHeader) {
      return NextResponse.json(
        { message: "No autorizado" },
        { status: 401 }
      );
    }

    const solicitud = solicitudesDB.findOne({ id });

    if (!solicitud) {
      return NextResponse.json(
        { message: "Solicitud no encontrada" },
        { status: 404 }
      );
    }

    if (role === "admin") {
      return NextResponse.json({ solicitud }, { status: 200 });
    }

    if (solicitud.userId !== userId) {
      return NextResponse.json(
        { message: "Acceso prohibido" },
        { status: 403 }
      );
    }

    return NextResponse.json({ solicitud }, { status: 200 });

  } catch (error) {
    console.error("GET /api/solicitudes/[id] error:", error);
    return NextResponse.json(
      { message: "Error al obtener solicitud" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const solicitudesDB = await getSolicitudesCollection();

    const authHeader = req.headers.get("authorization");
    const role = req.headers.get("role");
    const userId = req.headers.get("userid");

    if (!authHeader) {
      return NextResponse.json(
        { message: "No autorizado" },
        { status: 401 }
      );
    }

    const solicitud = solicitudesDB.findOne({ id });

    if (!solicitud) {
      return NextResponse.json(
        { message: "Solicitud no encontrada" },
        { status: 404 }
      );
    }

    if (role !== "admin" && solicitud.userId !== userId) {
      return NextResponse.json(
        { message: "Acceso prohibido" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { titulo, descripcion, tipo, estado } = body;

    if (!titulo || !descripcion || !tipo) {
      return NextResponse.json(
        { message: "Campos obligatorios faltantes" },
        { status: 400 }
      );
    }

    solicitud.titulo = titulo;
    solicitud.descripcion = descripcion;
    solicitud.tipo = tipo;
    solicitud.estado = estado || solicitud.estado;
    solicitud.updatedAt = new Date().toISOString();

    solicitudesDB.update(solicitud);

    return NextResponse.json(
      { message: "Solicitud actualizada correctamente", solicitud },
      { status: 200 }
    );

  } catch (error) {
    console.error("PUT /api/solicitudes/[id] error:", error);
    return NextResponse.json(
      { message: "Error al actualizar solicitud" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const solicitudesDB = await getSolicitudesCollection();

    const authHeader = req.headers.get("authorization");
    const role = req.headers.get("role");
    const userId = req.headers.get("userid");

    if (!authHeader) {
      return NextResponse.json(
        { message: "No autorizado" },
        { status: 401 }
      );
    }

    const solicitud = solicitudesDB.findOne({ id });

    if (!solicitud) {
      return NextResponse.json(
        { message: "Solicitud no encontrada" },
        { status: 404 }
      );
    }

    if (role !== "admin" && solicitud.userId !== userId) {
      return NextResponse.json(
        { message: "Acceso prohibido" },
        { status: 403 }
      );
    }

    solicitudesDB.remove(solicitud);

    return NextResponse.json(
      { message: "Solicitud eliminada correctamente" },
      { status: 200 }
    );

  } catch (error) {
    console.error("DELETE /api/solicitudes/[id] error:", error);
    return NextResponse.json(
      { message: "Error al eliminar solicitud" },
      { status: 500 }
    );
  }
}