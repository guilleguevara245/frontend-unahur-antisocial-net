import React, { useEffect, useState } from 'react'
import Image from 'react-bootstrap/Image';
import { useParams } from 'react-router-dom'
import styles from "./DetallePost.module.css"
import type { Post } from "../../types/post";
import { Carousel } from 'react-bootstrap';
function DetallePost() {
   const { id } = useParams<{ id: string }>()
  const [postDetalle, setPostDetalle] = useState<Post>()
    const obtenerPost=  async ()=>{
        const response = await fetch(`http://localhost:3000/post/${id}`)
        const data = await response.json()
        setPostDetalle(data)
        console.log(data)

      }
    useEffect( ()=>{
        obtenerPost()
    },[])
  return (
    <div>
{postDetalle && (
<Carousel
    className={styles.carrusel}
    interval={null}
    indicators={true}
    controls={true}
    prevIcon={<span className={styles.flecha}>‹</span>}
    nextIcon={<span className={styles.flecha}>›</span>}>
    {postDetalle.imagenes.map((imagen) => (
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
        <p>descpcion : {postDetalle?.descripcion}</p>
    </div>
  )
}

export default DetallePost