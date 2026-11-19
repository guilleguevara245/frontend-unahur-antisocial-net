export interface Imagen {
  id: number;
  urlImage: string;
}

export interface Tag {
  id: number;
  nombre: string;
}

export interface Comentario {
  id: number;
  contenido: string;
  fecha: string;
  postId: number;
  userId: number;
  user: {
    nickName: string;
  };
  visible: boolean;
}

export interface Post {
  id: number;
  userId: number;
  descripcion: string;
  createdAt: string;
  usuario: {
    nickName: string;
  };
  imagenes: Imagen[];
  tags: Tag[];
  comentariosVisibles:boolean
}

export interface Usuario{
  id:number,
  nickName:string,
  email:string
}