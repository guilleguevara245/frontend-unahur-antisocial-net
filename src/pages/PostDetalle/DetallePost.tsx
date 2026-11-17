import React, { useEffect, useState } from 'react'
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/ListGroup';
import { useParams } from 'react-router-dom'
import styles from "./DetallePost.module.css"
import type { Post, Usuario,Comentario} from "../../types/post";
import { Carousel } from 'react-bootstrap';
import CarruselImagenes from '../../components/CarruselImagenes/CarruselImagenes';
import ListaComentarios from '../../components/ListaComentarios/ListaComentarios';
import EtiquetasPost from '../../components/EtiquetaPost/EtiquetasPost';

function DetallePost() {
  const { id } = useParams<{ id: string }>()

  const [usuario, setUsuario] =useState<Usuario>()
  const [postDetalle, setPostDetalle] = useState<Post>()

  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [comentarios,setComentarios] = useState<Comentario[]>([]);    

  const [nuevoComentario, setNuevoComentario] = useState("");
  const obtenerPost=  async ()=>{
        const response = await fetch(`http://localhost:3000/post/${id}`)
        const data = await response.json()
        setPostDetalle(data)
        setUsuario( data.usuario)
        console.log("post : ",data)
   
     
        console.log(data.usuario.nickName)
      }
      const obtenerUsuariosComentarios = async (comentariosObtenidos: Comentario[]) => {
        const respuesta = await fetch("http://localhost:3000/users/");
        const datos:Usuario[] = await respuesta.json();
        
        
        const idsUsuarios = comentariosObtenidos.map(comentario => comentario.userId);
        const usuariosFiltrados = datos.filter(usuario =>
          idsUsuarios.includes(usuario.id)
        );
        setUsuarios(usuariosFiltrados);
    };
      const obtenerComentarios =async()=>{
        const response = await fetch(`http://localhost:3000/comments/post/${id}`)
        const data = await response.json()
        console.log(data);
        setComentarios(data)
        await obtenerUsuariosComentarios(data)
      }

      const agregarComentario = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nuevoComentario.trim()) return;

    const respuesta = await fetch(
            `http://localhost:3000/comments/post/${id}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  contenido: nuevoComentario,
                    //a ver 
                })
            }
        );

        if (respuesta.ok) {
            setNuevoComentario("");
            await obtenerComentarios();
        }
    };

    useEffect(() => {
        obtenerPost()
        obtenerComentarios()
    }, [id])
  return (
    <div className={styles.contenedor}>
    <div className={styles.contenedor_carrusel_descripcion}>
        {postDetalle && (
          <CarruselImagenes post={postDetalle}></CarruselImagenes>

)}
  <div className={styles.content_descripcion}>
      {postDetalle && (
        <EtiquetasPost post={postDetalle} />
    )}
      <h3>{usuario?.nickName}</h3>
      <p>{postDetalle?.descripcion}</p>
  </div>
      </div>
  <div >
      <h5>Comentarios</h5>
        <div className={styles.conenedor_comentario}>
          <ListaComentarios
          comentarios={comentarios}
          usuarios={usuarios}
          usuario={usuario}
          />
      </div >
        <div className={styles.contenedor_agregarComentario}>
          <form onSubmit={agregarComentario}>
              <textarea
                  value={nuevoComentario}
                  onChange={(e) => setNuevoComentario(e.target.value)}
                  placeholder="Escribe un comentario..."
                  maxLength={500}
              />

              <div className={styles.footer_comentario}>
                  <span>{nuevoComentario.length}/500</span>

                  <button type="submit" disabled={!nuevoComentario.trim()}>
                      Comentar
                  </button>
              </div>
          </form>
      </div>
  </div>
        
    </div>
  )
}

export default DetallePost