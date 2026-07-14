"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SolicitudesPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  // Verificar sesión al cargar
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (!token || !storedUser) {
      router.replace("/login");
      return;
    }

    setUser(JSON.parse(storedUser));
  }, [router]);

  // Cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.replace("/login");
  };

  if (!user) {
    return <p style={{ padding: "2rem" }}>Verificando sesión...</p>;
  }

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Gestión de Solicitudes</h1>

      <p>Bienvenido, {user.nombre}</p>
      <p>Rol: {user.role}</p>

      <button
        onClick={handleLogout}
        style={{
          marginTop: "10px",
          padding: "6px 12px",
          cursor: "pointer",
        }}
      >
        Cerrar sesión
      </button>

      <hr />

      <h3>Acciones disponibles:</h3>

      <ul>
        <li>Crear solicitud</li>

        {user.role === "admin" && (
          <>
            <li>Eliminar cualquier solicitud</li>
            <li>Ver todas las solicitudes del sistema</li>
          </>
        )}

        {user.role === "usuario" && (
          <>
            <li>Ver solo mis solicitudes</li>
          </>
        )}
      </ul>
    </main>
  );
}