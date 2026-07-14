export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { getSolicitudesCollection } from "@/lib/database";
import { Solicitud } from "@/models/Solicitud";

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json(
        { message: "No autorizado" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { titulo, descripcion, tipo, userId, userEmail } = body;

    if (!titulo || !descripcion || !tipo || !userId || !userEmail) {
      return NextResponse.json(
        { message: "Todos los campos son obligatorios" },
        { status: 400 }
      );
    }

    const nuevaSolicitud = {
      id: Date.now().toString(),
      userId,
      userEmail,
      titulo,
      descripcion,
      tipo,
      estado: "abierta",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const solicitudesDB = await getSolicitudesCollection();
    solicitudesDB.insert(nuevaSolicitud);

    return NextResponse.json(
      {
        message: "Solicitud creada correctamente",
        solicitud: nuevaSolicitud,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error al crear solicitud" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    const role = req.headers.get("role");
    const userId = req.headers.get("userid");
    const solicitudesDB = await getSolicitudesCollection();

    if (!authHeader) {
      return NextResponse.json(
        { message: "No autorizado" },
        { status: 401 }
      );
    }

    if (!role || !userId) {
      return NextResponse.json(
        { message: "Información de usuario incompleta" },
        { status: 400 }
      );
    }

    const todasLasSolicitudes = solicitudesDB.find();

    // Admin puede ver todo
    if (role === "admin") {
      return NextResponse.json(
        { solicitudes: todasLasSolicitudes },
        { status: 200 }
      );
    }

    // Usuario solo ve las suyas
    const misSolicitudes = solicitudesDB.find({ userId });

    return NextResponse.json(
      { solicitudes: misSolicitudes },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error al obtener solicitudes" },
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