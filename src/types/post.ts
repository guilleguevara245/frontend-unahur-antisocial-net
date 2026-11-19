import type { Usuario } from "./usuario";

export interface Imagen {
  id: number;
  urlImage: string;
}

export interface Tag {
  id: number;
  nombre: string;
}

// Comentario tal como lo devuelve el backend (GET /comments/post/:id y GET /post/:id).
// Del autor solo viene el userId.
export interface Comentario {
  id: number;
  contenido: string;
  fecha: string;
  postId: number;
  userId: number;
  visible: boolean;
  createdAt: string;
  updatedAt: string;
}

// Post del listado (GET /post): del autor solo viene el nickName.
export interface Post {
  id: number;
  userId: number;
  descripcion: string;
  createdAt: string;
  usuario: Pick<Usuario, "nickName">;
  imagenes: Imagen[];
  tags: Tag[];
}

// Post completo (GET /post/:id): el autor trae id y nickName, y se suman los comentarios visibles.
export interface PostDetalle extends Omit<Post, "usuario"> {
  updatedAt: string;
  usuario: Pick<Usuario, "id" | "nickName">;
  comentarios: Comentario[];
}

// Post recién creado (respuesta de POST /post): todavía sin imágenes, tags ni autor.
export interface PostCreado {
  id: number;
  userId: number;
  descripcion: string;
  createdAt: string;
  updatedAt: string;
}

export interface RespuestaCrearPost {
  message: string;
  post: PostCreado;
}
