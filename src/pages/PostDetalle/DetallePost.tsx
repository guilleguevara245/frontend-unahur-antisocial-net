import React, { useEffect, useState } from 'react'
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/ListGroup';
import { useParams } from 'react-router-dom'
import styles from "./DetallePost.module.css"
import type { Post, Usuario,Comentario} from "../../types/post";
import { Carousel } from 'react-bootstrap';
function DetallePost() {
  const { id } = useParams<{ id: string }>()

  const [usuario, setUsuario] =useState<Usuario>()
  const [postDetalle, setPostDetalle] = useState<Post>()

  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [comentarios,setComentarios] = useState<Comentario[]>([]);    
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

    useEffect(() => {
        obtenerPost()
        obtenerComentarios()
    }, [id])
  return (
    <div className={styles.contenedor}>
    <div className={styles.contenedor_carrusel_descripcion}>
        {postDetalle && (
  <Carousel
      className={styles.carrusel}
      interval={null}
      indicators={true}
      controls={true}
      prevIcon={<span className={styles.flecha}>‹</span>}
      nextIcon={<span className={styles.flecha}>›</span>}>
      {postDetalle?.imagenes.map((imagen) => (
          <Carousel.Item key={imagen.id}>
              <div className={styles.contenedor_img}>
                <Image
                  src={`http://localhost:3000${imagen.urlImage}`}
                  fluid
                  className="d-block mx-auto"
              />
              </div>
          </Carousel.Item>
      ))}
  </Carousel>

)}
  <div className={styles.content_descripcion}>
    <div className={styles.content_tag}>
       
    {postDetalle?.tags.map((tag) => (
        <p key={tag.id}>{tag.nombre}</p>
    ))}
      
    </div>
    <h3>{usuario?.nickName}</h3>
    <p>descripcion : {postDetalle?.descripcion}</p>
  
  </div>
      </div>


    
<div >
    <h5>Comentarios</h5>

      <div className={styles.conenedor_comentario}>
         <ListGroup variant="flush">
      {comentarios.map((comentario) => {
          const usuarioComent = usuarios.find(
              (usuario) => usuario.id === comentario.userId
          );

          return (
              <ListGroup.Item key={comentario.id} className={styles.comentario}>
                  <Image
                      src="/img/perfil.jpg"
                      className={styles.imagen_usuario}
                      roundedCircle
                  />

                  <div className={styles.contenido_comentario}>
                      <strong>{usuarioComent?.nickName ?? "Usuario"} <b className={styles.autor}>{usuarioComent?.nickName === usuario?.nickName ? " autor" : ""}</b></strong>
                      <p>{comentario.contenido}</p>
                  </div>
              </ListGroup.Item>
          );
      })}
  </ListGroup>
      </div>
</div>
        
    </div>
  )
}

export default DetallePost