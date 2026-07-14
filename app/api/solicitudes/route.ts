import { NextResponse } from "next/server";
import { solicitudes } from "@/lib/solicitudesStore";
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

    const nuevaSolicitud: Solicitud = {
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

    solicitudes.push(nuevaSolicitud);

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

    // Admin puede ver todo
    if (role === "admin") {
      return NextResponse.json(
        { solicitudes },
        { status: 200 }
      );
    }

    // Usuario solo ve sus solicitudes
    const misSolicitudes = solicitudes.filter(
      (s) => s.userId === userId
    );

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