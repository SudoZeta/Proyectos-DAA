import { NextResponse } from "next/server";
import { User } from "@/models/User";

import { users } from "@/lib/memoryStore";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nombre, email, password, role } = body;

    // Validación básica
    if (!nombre || !email || !password) {
      return NextResponse.json(
        { message: "Todos los campos son obligatorios" },
        { status: 400 }
      );
    }

    // Verificar si ya existe el email
    const userExists = users.find((u) => u.email === email);
    if (userExists) {
      return NextResponse.json(
        { message: "El usuario ya existe" },
        { status: 409 }
      );
    }

    const newUser: User = {
      id: Date.now().toString(),
      nombre,
      email,
      password,
      role: role || "usuario",
    };

    users.push(newUser);

    return NextResponse.json(
      { message: "Usuario registrado correctamente", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error en el registro" },
      { status: 500 }
    );
  }
}