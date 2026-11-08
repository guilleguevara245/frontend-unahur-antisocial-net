import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import styles from "./TarjetaPost.module.css";
import type { Post } from "../../types/post";
import { obtenerCantidadComentarios, urlImagen } from "../../api/posts";

interface TarjetaPostProps {
  post: Post;
}

function TarjetaPost({ post }: TarjetaPostProps) {
  const [cantidadComentarios, setCantidadComentarios] = useState<number | null>(null);
  const [errorComentarios, setErrorComentarios] = useState(false);

  useEffect(() => {
    async function cargarComentarios() {
      try {
        const cantidad = await obtenerCantidadComentarios(post.id);
        setCantidadComentarios(cantidad);
      } catch (error) {
        console.error(error);
        setErrorComentarios(true);
      }
    }
    cargarComentarios();
  }, [post.id]);

  function textoComentarios(): string {
    if (errorComentarios) return "No se pudieron cargar los comentarios";
    if (cantidadComentarios === null) return "Cargando comentarios...";
    return cantidadComentarios === 1 ? "1 comentario" : `${cantidadComentarios} comentarios`;
  }

  const primeraImagen = post.imagenes.length > 0 ? post.imagenes[0] : null;
  const imagenesExtra = post.imagenes.length - 1;

  return (
    <Card className={`h-100 ${styles.tarjeta}`}>
      {primeraImagen && (
        <div className={styles.contenedorImagen}>
          <Card.Img variant="top" src={urlImagen(primeraImagen.urlImage)} alt="Imagen de la publicación" className={styles.imagen} />
          {imagenesExtra > 0 && (
            <span className={styles.imagenesExtra}>+{imagenesExtra}</span>
          )}
        </div>
      )}
      <Card.Body className="d-flex flex-column">
        <Card.Subtitle className={styles.autor}>@{post.usuario.nickName}</Card.Subtitle>
        <Card.Text className={styles.descripcion}>{post.descripcion}</Card.Text>
        {post.tags.length > 0 && (
          <div className={styles.etiquetas}>
            {post.tags.map((tag) => (
              <span key={tag.id} className={styles.etiqueta}>
                #{tag.nombre}
              </span>
            ))}
          </div>
        )}
        <small className={`mt-auto ${styles.comentarios}`}>{textoComentarios()}</small>
      </Card.Body>
      <Card.Footer className={styles.pie}>
        <Link to={`/post/${post.id}`} className={`btn w-100 ${styles.boton}`}>
          Ver más
        </Link>
      </Card.Footer>
    </Card>
  );
}

export default TarjetaPost;
