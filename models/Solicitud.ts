export type EstadoSolicitud = "abierta" | "en_proceso" | "cerrada";

export type TipoSolicitud = "soporte" | "permiso" | "requerimiento";

export interface Solicitud {
  id: string;

  // Relación con el usuario que creó la solicitud
  userId: string;
  userEmail: string;

  // Datos de la solicitud
  titulo: string;
  descripcion: string;
  tipo: TipoSolicitud;
  estado: EstadoSolicitud;

  // Auditoría simple
  createdAt: string;
  updatedAt: string;
}