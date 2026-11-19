import type { Comentario } from "../types/post";

export async function obtenerComentarios(id: string): Promise<Comentario[]> {
    const respuesta = await fetch(`http://localhost:3000/comments/post/${id}`);

    if (!respuesta.ok) {
        throw new Error("Error al obtener los comentarios: " + respuesta.status);
    }

    return await respuesta.json();
}