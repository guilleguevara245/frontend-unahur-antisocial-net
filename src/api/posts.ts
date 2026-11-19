import { API_URL } from "./config";
import type { Comentario, Post, Tag, RespuestaCrearPost } from "../types/post";

export async function obtenerPosts(): Promise<Post[]> {
  const respuesta = await fetch(`${API_URL}/post`);
  if (!respuesta.ok) {
    throw new Error("Error al obtener las publicaciones: " + respuesta.status);
  }
  return await respuesta.json();
}

export async function obtenerPost(id: string): Promise<Post> {
  const respuesta = await fetch(`http://localhost:3000/post/${id}`);

  if (!respuesta.ok) {
    throw new Error("Error al obtener las publicaciones: " + respuesta.status);
  }
  return await respuesta.json();
}

export async function obtenerCantidadComentarios(
  postId: number,
): Promise<number> {
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

export async function crearPost(
  descripcion: string,
  userId: number,
): Promise<RespuestaCrearPost> {
  const respuesta = await fetch(`${API_URL}/post`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ descripcion, userId }),
  });

  if (!respuesta.ok) {
    throw new Error("Error al crear la publicación: " + respuesta.status);
  }

  return await respuesta.json();
}

export async function obtenerTags(): Promise<Tag[]> {
  const respuesta = await fetch(`${API_URL}/tags`);
  if (!respuesta.ok) {
    throw new Error("Error al obtener los tags: " + respuesta.status);
  }
  return await respuesta.json();
}

export async function agregarTagAPost(
  postId: number,
  tagId: number,
): Promise<void> {
  const respuesta = await fetch(`${API_URL}/tags/${tagId}/posts/${postId}`, {
    method: "POST",
  });

  if (!respuesta.ok) {
    throw new Error("Error al agregar el tag al post: " + respuesta.status);
  }
  return await respuesta.json();
}

export const crearPostImagen = async (postId: number, imagen: File) => {
  const formData = new FormData();
  formData.append("postId", String(postId));
  formData.append("imagen", imagen);
  const res = await fetch(`${API_URL}/postImages`, {
    method: "POST",
    body: formData,
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.errores ?? data.message ?? "Error al subir la imagen");
  }
  return data;
};
