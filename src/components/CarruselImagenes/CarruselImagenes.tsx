import type { Post } from '../../types/post'
import Image from 'react-bootstrap/Image'
import Carousel from 'react-bootstrap/Carousel'
import { urlImagen } from '../../api/posts'
import styles from './CarruselImagenes.module.css'

interface CarruselImagenesProps {
    post: Post
}

const CarruselImagenes = ({ post }: CarruselImagenesProps) => {
    const total = post.imagenes.length
    // Con una sola imagen no hacen falta flechas ni indicadores.
    const variasImagenes = total > 1

    return (
        <Carousel
            className={styles.carrusel}
            interval={null}
            indicators={variasImagenes}
            controls={variasImagenes}
            prevIcon={<span className={styles.flecha}>‹</span>}
            nextIcon={<span className={styles.flecha}>›</span>}
        >
            {post.imagenes.map((imagen, indice) => (
                <Carousel.Item key={imagen.id}>
                    <div className={styles.contenedor_img}>
                        <Image
                            src={urlImagen(imagen.urlImage)}
                            alt={`Imagen ${indice + 1} de ${total} de la publicación de @${post.usuario.nickName}`}
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
