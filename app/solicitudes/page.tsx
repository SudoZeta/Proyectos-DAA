"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Solicitud {
  id: string;
  titulo: string;
  descripcion: string;
  tipo: string;
  estado: string;
  userEmail: string;
}

export default function SolicitudesPage() {
  const router = useRouter();
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Agregando Funcionalidades de Formulario
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [tipo, setTipo] = useState("soporte");
  const [mensaje, setMensaje] = useState("");

  // Agregando funcionalidades de edición

  const [editandoId, setEditandoId] = useState<string | null>(null);
const [editTitulo, setEditTitulo] = useState("");
const [editDescripcion, setEditDescripcion] = useState("");
const [editTipo, setEditTipo] = useState("soporte");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;

    const role = parsedUser?.role || "";
    const userId = parsedUser?.id || "";

    if (!token) {
      router.push("/login");
      return;
    }

    fetch("/api/solicitudes", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        role,
        userid: userId,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar solicitudes");
        return res.json();
      })
      .then((data) => {
        setSolicitudes(data.solicitudes || []);
        setLoading(false);
      })
      .catch(() => {
        setError("No se pudieron cargar las solicitudes");
        setLoading(false);
      });
  }, [router]);

  if (loading) return <p className="p-4">Cargando solicitudes...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  const crearSolicitud = async () => {
    setMensaje("");
    setError("");

    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;

    const role = parsedUser?.role || "";
    const userId = parsedUser?.id || "";
    const userEmail = parsedUser?.email || "";

    if (!token || !userId || !userEmail) {
      setError("Sesión inválida. Vuelve a iniciar sesión.");
      router.push("/login");
      return;
    }

    if (!titulo.trim() || !descripcion.trim()) {
      setError("Título y descripción son obligatorios.");
      return;
    }

    try {
      const res = await fetch("/api/solicitudes", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          role,
          userid: userId,
        },
        body: JSON.stringify({
          titulo,
          descripcion,
          tipo,
          userId,
          userEmail,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.message || "Error al crear solicitud");
        return;
      }

      setMensaje("Solicitud creada correctamente.");

      // limpiar formulario
      setTitulo("");
      setDescripcion("");
      setTipo("soporte");

      // refrescar listado
      const resList = await fetch("/api/solicitudes", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          role,
          userid: userId,
        },
      });

      const listData = await resList.json();
      setSolicitudes(listData.solicitudes || []);
    } catch {
      setError("Error de conexión al crear la solicitud.");
    }
  };

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-white">
        Listado de Solicitudes
      </h1>

      {/* FORMULARIO */}
      <div className="bg-gray-800 border border-gray-700 p-6 rounded-lg mb-8 shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-100">
          Nueva solicitud
        </h2>

        {mensaje && (
          <p className="text-green-400 mb-3">
            {mensaje}
          </p>
        )}

        {error && (
          <p className="text-red-400 mb-3">
            {error}
          </p>
        )}

        <input
          className="w-full p-3 mb-3 rounded bg-gray-700 border border-gray-600 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />

        <textarea
          className="w-full p-3 mb-3 rounded bg-gray-700 border border-gray-600 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />

        <select
          className="w-full p-3 mb-4 rounded bg-gray-700 border border-gray-600 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
        >
          <option value="soporte">Soporte</option>
          <option value="permiso">Permiso</option>
          <option value="requerimiento">Requerimiento</option>
        </select>

        <button
          onClick={crearSolicitud}
          className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 transition text-white font-medium"
        >
          Crear solicitud
        </button>
      </div>

      {/* LISTADO */}
      {solicitudes.length === 0 ? (
        <p className="text-gray-400">
          No hay solicitudes registradas.
        </p>
      ) : (
        <div className="space-y-5">
          {solicitudes.map((s) => (
            <div
              key={s.id}
              className="bg-gray-800 border border-gray-700 p-5 rounded-lg shadow-md hover:shadow-xl transition"
            >
              <h2 className="text-lg font-semibold text-white mb-2">
                {s.titulo}
              </h2>

              <p className="text-gray-300 mb-2">
                {s.descripcion}
              </p>

              <p className="text-sm text-blue-400">
                Tipo: {s.tipo} | Estado: {s.estado}
              </p>

              <p className="text-sm text-gray-500 mt-1">
                Usuario: {s.userEmail}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}