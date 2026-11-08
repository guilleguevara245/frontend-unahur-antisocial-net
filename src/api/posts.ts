import { API_URL } from "./config";
import type { Comentario, Post } from "../types/post";

export async function obtenerPosts(): Promise<Post[]> {
  const respuesta = await fetch(`${API_URL}/post`);
  if (!respuesta.ok) {
    throw new Error("Error al obtener las publicaciones: " + respuesta.status);
  }
  return await respuesta.json();
}

export async function obtenerCantidadComentarios(postId: number): Promise<number> {
  const respuesta = await fetch(`${API_URL}/comments/post/${postId}`);
  if (!respuesta.ok) {
    throw new Error("Error al obtener los comentarios: " + respuesta.status);
  }
  const comentarios: Comentario[] = await respuesta.json();
  return comentarios.length;
}

export function urlImagen(url: string): string {
  return url.startsWith("http") ? url : `${API_URL}${url}`;
}
