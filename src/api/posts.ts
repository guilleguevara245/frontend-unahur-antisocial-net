import { API_URL } from "./config";
import type { Comentario, Imagen, Post, PostDetalle, RespuestaCrearPost } from "../types/post";

// Lee el mensaje de error que manda el backend; si no viene, usa el texto por defecto.
const mensajeDeError = async (respuesta: Response, porDefecto: string): Promise<string> => {
  try {
    const datos = await respuesta.json();
    return datos.errores ?? datos.error ?? datos.message ?? porDefecto;
  } catch {
    return porDefecto;
  }
};

export const obtenerPosts = async (): Promise<Post[]> => {
  const respuesta = await fetch(`${API_URL}/post`);
  if (!respuesta.ok) {
    throw new Error("Error al obtener las publicaciones: " + respuesta.status);
  }
  return await respuesta.json();
};

// El backend no tiene un filtro por usuario (?userId), así que se traen todos los posts y se filtran acá.
export const obtenerPostsDeUsuario = async (userId: number): Promise<Post[]> => {
  const posts = await obtenerPosts();
  return posts.filter((post) => post.userId === userId);
};

// Devuelve null si el post no existe (404) o si el id no es válido (400).
export const obtenerPost = async (id: string): Promise<PostDetalle | null> => {
  const respuesta = await fetch(`${API_URL}/post/${encodeURIComponent(id)}`);
  if (respuesta.status === 404 || respuesta.status === 400) {
    return null;
  }
  if (!respuesta.ok) {
    throw new Error("Error al obtener la publicación: " + respuesta.status);
  }
  return await respuesta.json();
};

export const obtenerCantidadComentarios = async (postId: number): Promise<number> => {
  const respuesta = await fetch(`${API_URL}/comments/post/${postId}`);
  if (!respuesta.ok) {
    throw new Error("Error al obtener los comentarios: " + respuesta.status);
  }
  const comentarios: Comentario[] = await respuesta.json();
  return comentarios.length;
};

// Las imágenes subidas se guardan con una ruta relativa (/media/...): se le antepone la URL de la API.
export const urlImagen = (url: string): string =>
  url.startsWith("http") ? url : `${API_URL}${url}`;

export const crearPost = async (descripcion: string, userId: number): Promise<RespuestaCrearPost> => {
  const respuesta = await fetch(`${API_URL}/post`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ descripcion, userId }),
  });
  if (!respuesta.ok) {
    throw new Error(await mensajeDeError(respuesta, "Error al crear la publicación"));
  }
  return await respuesta.json();
};

export const agregarTagAPost = async (postId: number, tagId: number): Promise<void> => {
  const respuesta = await fetch(`${API_URL}/tags/${tagId}/posts/${postId}`, {
    method: "POST",
  });
  if (!respuesta.ok) {
    throw new Error(await mensajeDeError(respuesta, "Error al agregar la etiqueta"));
  }
};

// Sube una imagen como multipart/form-data: el backend la espera en el campo "imagen".
export const crearPostImagen = async (postId: number, imagen: File): Promise<Imagen> => {
  const formData = new FormData();
  formData.append("postId", String(postId));
  formData.append("imagen", imagen);
  const respuesta = await fetch(`${API_URL}/postImages`, {
    method: "POST",
    body: formData,
  });
  if (!respuesta.ok) {
    throw new Error(await mensajeDeError(respuesta, "Error al subir la imagen"));
  }
  const datos: { imagen: Imagen } = await respuesta.json();
  return datos.imagen;
};
