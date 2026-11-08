import { API_URL } from "./config";
import type { Tag } from "../types/post";

export async function obtenerTags(): Promise<Tag[]> {
  const respuesta = await fetch(`${API_URL}/tags`);
  if (!respuesta.ok) {
    throw new Error("Error al obtener las etiquetas: " + respuesta.status);
  }
  return await respuesta.json();
}
