import { API_URL } from "./config";
import type { Comentario } from "../types/post";

export const obtenerComentarios = async (postId: string): Promise<Comentario[]> => {
  const respuesta = await fetch(`${API_URL}/comments/post/${encodeURIComponent(postId)}`);
  if (!respuesta.ok) {
    throw new Error("Error al obtener los comentarios: " + respuesta.status);
  }
  return await respuesta.json();
};

export type ResultadoComentario =
  | { ok: true; comentario: Comentario }
  | { ok: false; error: string };

// Los errores esperables (comentario inválido, post o usuario inexistente) vuelven como { ok: false };
// los de red o del servidor se lanzan.
export const crearComentario = async (
  postId: string,
  contenido: string,
  userId: number,
): Promise<ResultadoComentario> => {
  const respuesta = await fetch(`${API_URL}/comments/post/${encodeURIComponent(postId)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contenido, userId }),
  });
  if (respuesta.status === 400) {
    return { ok: false, error: "El comentario debe tener entre 1 y 500 caracteres" };
  }
  if (respuesta.status === 404) {
    return { ok: false, error: "La publicación o el usuario ya no existen" };
  }
  if (!respuesta.ok) {
    throw new Error("Error al crear el comentario: " + respuesta.status);
  }
  const datos: { comentario: Comentario } = await respuesta.json();
  return { ok: true, comentario: datos.comentario };
};
