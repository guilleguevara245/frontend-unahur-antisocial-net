import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styles from "./DetallePost.module.css"
import type { Post, Usuario,Comentario} from "../../types/post";
import type { SubmitEvent } from "react";
import useUsuario from "../../context/useUsuario";
import CarruselImagenes from '../../components/CarruselImagenes/CarruselImagenes';
import ListaComentarios from '../../components/ListaComentarios/ListaComentarios';
import EtiquetasPost from '../../components/EtiquetaPost/EtiquetasPost';
import { obtenerPost } from '../../api/posts';
import { obtenerUsuarios } from '../../api/usuarios';
import { obtenerComentarios } from '../../api/comentarios';
import Alert from 'react-bootstrap/Alert';
function DetallePost() {
  const { id } = useParams<{ id: string }>()
  const { usuario } = useUsuario();

  const [autorPost, setAutorPost] = useState< Usuario>()
  const [postDetalle, setPostDetalle] = useState<Post>()

  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [comentarios,setComentarios] = useState<Comentario[]>([]);    


  const [alerta, setAlerta] =useState("")


  const [nuevoComentario, setNuevoComentario] = useState("");
  const obtenerDetallesPost=  async ()=>{
      if (id) {
        const data:Post = await obtenerPost(id);
        setPostDetalle(data);
        setPostDetalle(data)
        setAutorPost( data.usuario)
        console.log("post : ",data)
      }
       
   
     
      }
const obtenerListaDeComentarios = async () => {
    if (!id) return;

    const comentariosObtenidos = await obtenerComentarios(id);
    
    const datos: Usuario[] = await obtenerUsuarios()
      
    const idsUsuarios = comentariosObtenidos.map(c => c.userId);
    const usuariosFiltrados = datos.filter(u => idsUsuarios.includes(u.id));

    console.log("Usuarios filtrados:", usuariosFiltrados);

    setComentarios(comentariosObtenidos);
    setUsuarios(usuariosFiltrados);
};


    const agregarComentario = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAlerta("");
    if (!usuario) {
        setAlerta("Iniciá sesión para comentar");
        return;
    }
    if (!nuevoComentario.trim()) {
        setAlerta("El comentario está vacío")
        return;
    }


    const body = {
        contenido: nuevoComentario,
        userId: usuario.id
    };

    const respuesta = await fetch(
        `http://localhost:3000/comments/post/${id}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }
    );



    if (respuesta.ok) {
        setNuevoComentario("");
        await obtenerListaDeComentarios();
    }
};
    useEffect(() => {
        obtenerDetallesPost()
        obtenerListaDeComentarios()
    }, [id])
  return (
    <>
    <div className={styles.contenedor}>
    <div className={styles.contenedor_carrusel_descripcion}>
        {postDetalle && (
          <CarruselImagenes post={postDetalle}></CarruselImagenes>

)}

  <div className={styles.content_descripcion}>
        {postDetalle && (
          <EtiquetasPost post={postDetalle} />
      )}
        <h3>{autorPost?.nickName}</h3>
        <p>{postDetalle?.descripcion}</p>
    </div>
  </div>
  <div >
      <h5>Comentarios</h5>
        <div className={styles.conenedor_comentario}>
          <ListaComentarios
          comentarios={comentarios}
          usuarios={usuarios}
          usuario={autorPost}
          />
      </div >
        <div className={styles.contenedor_agregarComentario}>
        {alerta.trim() && <Alert variant="danger">
             {alerta}
        </Alert> }
          <form onSubmit={agregarComentario}>
              <textarea disabled={!usuario}
                  value={nuevoComentario}
                  onChange={(e) => setNuevoComentario(e.target.value)}
                  placeholder="Escribe un comentario..."
                  maxLength={500}
              />

              <div className={styles.footer_comentario}>    
                  <span>{nuevoComentario.length}/500</span>
                  <button type="submit"  >
                      Comentar
                  </button>
              </div>
          </form>
          
      </div>
  </div>
        
    </div>
  </>
  )
}

export default DetallePost