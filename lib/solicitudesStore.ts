import { Solicitud } from "@/models/Solicitud";

declare global {
  // Necesario para TypeScript
  var solicitudesStore: Solicitud[] | undefined;
}

if (!globalThis.solicitudesStore) {
  globalThis.solicitudesStore = [];
}

export const solicitudes = globalThis.solicitudesStore;