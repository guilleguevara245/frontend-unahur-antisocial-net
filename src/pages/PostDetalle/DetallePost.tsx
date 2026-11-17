import React, { useEffect, useState } from 'react'
import Image from 'react-bootstrap/Image';
import { useParams } from 'react-router-dom'
import styles from "./DetallePost.module.css"
import type { Post, Usuario} from "../../types/post";
import { Carousel } from 'react-bootstrap';
function DetallePost() {
   const { id } = useParams<{ id: string }>()

   const [usuario, setUsuario] =useState<Usuario>()
  const [postDetalle, setPostDetalle] = useState<Post>()
      
    const obtenerPost=  async ()=>{
        const response = await fetch(`http://localhost:3000/post/${id}`)
        const data = await response.json()
        setPostDetalle(data)
        setUsuario(  await data.usuario)
        console.log("post : ",data)

     
        console.log(data.usuario.nickName)
      }


      useEffect( ()=>{
        obtenerPost()
    },[])
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
        <p>{tag.nombre}</p>
      ))}
      
    </div>
    <h3>{usuario?.nickName}</h3>
    <p>descripcion : {postDetalle?.descripcion}</p>
  
  </div>
      </div>

  <div>
    
      <div className={styles.conenedor_comentario}> comentarios
    <ul>
      <li>hola</li>
      <li>hola</li>

      <li>hola</li>

      <li>hola</li>

      <li>hola</li>

      <li>hola</li>

    </ul>
  </div>
  </div>
        
    </div>
  )
}

export default DetallePost