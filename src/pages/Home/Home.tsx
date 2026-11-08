import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import TarjetaPost from "../../components/TarjetaPost/TarjetaPost";
import { obtenerPosts } from "../../api/posts";
import { obtenerTags } from "../../api/tags";
import type { Post, Tag } from "../../types/post";
import styles from "./Home.module.css";

const sobreNosotros = [
  {
    titulo: "Compartí sin presión",
    texto: "Publicá lo que quieras, con imágenes y etiquetas, sin contar seguidores ni perseguir likes.",
  },
  {
    titulo: "Comentarios que se van",
    texto: "Los comentarios viejos dejan de mostrarse solos. Lo que importa es la charla de ahora.",
  },
  {
    titulo: "Hecho en la UnaHur",
    texto: "Una red social pensada y construida por estudiantes de la Universidad Nacional de Hurlingham.",
  },
];

function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tags, setTags] = useState<Tag[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const tagSeleccionado = searchParams.get("tag");

  useEffect(() => {
    async function cargarPosts() {
      try {
        const datos = await obtenerPosts();
        setPosts(datos);
      } catch (error) {
        console.error(error);
        setError("No pudimos cargar las publicaciones. Intentá de nuevo más tarde.");
      } finally {
        setCargando(false);
      }
    }
    cargarPosts();
  }, []);

  useEffect(() => {
    async function cargarTags() {
      try {
        const datos = await obtenerTags();
        setTags(datos);
      } catch (error) {
        console.error(error);
      }
    }
    cargarTags();
  }, []);

  function elegirTag(nombre: string | null) {
    if (nombre) {
      setSearchParams({ tag: nombre });
    } else {
      setSearchParams({});
    }
  }

  const postsFiltrados = tagSeleccionado
    ? posts.filter((post) => post.tags.some((tag) => tag.nombre === tagSeleccionado))
    : posts;

  function filtroTags() {
    if (tags.length === 0) return null;
    return (
      <div className={styles.filtro}>
        <button
          type="button"
          className={`${styles.filtroBoton} ${tagSeleccionado === null ? styles.filtroActivo : ""}`}
          onClick={() => elegirTag(null)}
        >
          Todas
        </button>
        {tags.map((tag) => (
          <button
            type="button"
            key={tag.id}
            className={`${styles.filtroBoton} ${tagSeleccionado === tag.nombre ? styles.filtroActivo : ""}`}
            onClick={() => elegirTag(tag.nombre)}
          >
            #{tag.nombre}
          </button>
        ))}
      </div>
    );
  }

  function contenidoFeed() {
    if (cargando) {
      return (
        <div className="text-center py-5">
          <Spinner animation="border" role="status" className={styles.spinner} />
          <p className={`mt-3 ${styles.textoSuave}`}>Cargando publicaciones...</p>
        </div>
      );
    }
    if (error) {
      return <Alert variant="danger" className="text-center">{error}</Alert>;
    }
    if (posts.length === 0) {
      return <p className={`text-center py-5 ${styles.textoSuave}`}>Todavía no hay publicaciones. ¡Animate a ser el primero!</p>;
    }
    if (postsFiltrados.length === 0) {
      return <p className={`text-center py-5 ${styles.textoSuave}`}>No hay publicaciones con la etiqueta #{tagSeleccionado}.</p>;
    }
    return (
      <Row xs={1} sm={2} lg={3} className="g-4">
        {postsFiltrados.map((post) => (
          <Col key={post.id}>
            <TarjetaPost post={post} />
          </Col>
        ))}
      </Row>
    );
  }

  return (
    <>
      <section className={styles.portada}>
        <div className={styles.capa}>
          <p className={styles.bajada}>Bienvenido a</p>
          <h1>UnaHur Anti-Social Net</h1>
          <p className={styles.slogan}>La red social para los que no quieren ser tan sociales.</p>
          <a href="#feed" className={`btn btn-outline-light mt-4 ${styles.botonPortada}`}>Ver publicaciones</a>
        </div>
      </section>

      <Container className="py-5">
        <h2 className={`text-center mb-4 ${styles.tituloSeccion}`}>Sobre nosotros</h2>
        <Row className="text-center">
          {sobreNosotros.map((item) => (
            <Col md={4} className={`mb-4 ${styles.item}`} key={item.titulo}>
              <h3>{item.titulo}</h3>
              <p className="mb-0">{item.texto}</p>
            </Col>
          ))}
        </Row>
      </Container>

      <section id="feed" className={styles.feed}>
        <Container className="py-5">
          <h2 className={`text-center mb-4 ${styles.tituloSeccion}`}>Publicaciones recientes</h2>
          {filtroTags()}
          {contenidoFeed()}
        </Container>
      </section>
    </>
  );
}

export default Home;
