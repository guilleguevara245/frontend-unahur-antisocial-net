import React from 'react'
import type { Post } from '../../types/post'
import Image from 'react-bootstrap/Image'
import { Carousel } from 'react-bootstrap'
import styles from './CarruselImagenes.module.css'

interface CarruselImagenesProps {
    post: Post
}

function CarruselImagenes({ post }: CarruselImagenesProps) {
    return (
        <Carousel
            className={styles.carrusel}
            interval={null}
            indicators={true}
            controls={true}
            prevIcon={<span className={styles.flecha}>‹</span>}
            nextIcon={<span className={styles.flecha}>›</span>}
        >
            {post.imagenes.map((imagen) => (
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
    )
}

export default CarruselImagenes