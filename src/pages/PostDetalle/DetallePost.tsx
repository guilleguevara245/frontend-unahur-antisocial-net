import { useEffect, useState, type SubmitEvent } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import styles from "./DetallePost.module.css";
import type { Comentario, PostDetalle } from "../../types/post";
import type { Usuario } from "../../types/usuario";
import useUsuario from "../../context/useUsuario";
import CarruselImagenes from "../../components/CarruselImagenes/CarruselImagenes";
import ListaComentarios from "../../components/ListaComentarios/ListaComentarios";
import EtiquetasPost from "../../components/EtiquetaPost/EtiquetasPost";
import { obtenerPost } from "../../api/posts";
import { obtenerUsuarios } from "../../api/usuarios";
import { crearComentario } from "../../api/comentarios";

const MAX_COMENTARIO = 500;

const DetallePost = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { usuario } = useUsuario();

  const [post, setPost] = useState<PostDetalle | null>(null);
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [nickNames, setNickNames] = useState<Record<number, string>>({});
  const [cargando, setCargando] = useState(true);
  const [errorCarga, setErrorCarga] = useState<string | null>(null);

  const [nuevoComentario, setNuevoComentario] = useState("");
  const [alerta, setAlerta] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    if (!id) return;

    let cancelado = false;
    const cargarPost = async () => {
      setCargando(true);
      setErrorCarga(null);
      try {
        // El post ya trae sus comentarios visibles, pero de cada comentario solo viene el userId:
        // los usuarios se piden para mostrar el nickName. Si fallan, la página se muestra igual.
        const [datosPost, usuarios] = await Promise.all([
          obtenerPost(id),
          obtenerUsuarios().catch((errorUsuarios): Usuario[] => {
            console.error(errorUsuarios);
            return [];
          }),
        ]);
        if (cancelado) return;
        if (!datosPost) {
          setPost(null);
          setErrorCarga("La publicación que buscás no existe o fue eliminada.");
          return;
        }
        setPost(datosPost);
        setComentarios(datosPost.comentarios);
        setNickNames(Object.fromEntries(usuarios.map((u) => [u.id, u.nickName])));
      } catch (errorDeCarga) {
        console.error(errorDeCarga);
        if (!cancelado) setErrorCarga("No se pudo cargar la publicación. Probá de nuevo más tarde.");
      } finally {
        if (!cancelado) setCargando(false);
      }
    };
    cargarPost();

    return () => {
      cancelado = true;
    };
  }, [id]);

  const agregarComentario = async (evento: SubmitEvent<HTMLFormElement>) => {
    evento.preventDefault();
    setAlerta(null);
    if (!usuario || !id) return;

    const contenido = nuevoComentario.trim();
    if (!contenido) {
      setAlerta("El comentario está vacío");
      return;
    }

    setEnviando(true);
    try {
      const resultado = await crearComentario(id, contenido, usuario.id);
      if (!resultado.ok) {
        setAlerta(resultado.error);
        return;
      }
      // Los comentarios vienen del más nuevo al más viejo: el recién creado va primero.
      setComentarios((previos) => [resultado.comentario, ...previos]);
      setNickNames((previos) => ({ ...previos, [usuario.id]: usuario.nickName }));
      setNuevoComentario("");
    } catch (errorDeRed) {
      console.error(errorDeRed);
      setAlerta("No se pudo publicar el comentario. Probá de nuevo.");
    } finally {
      setEnviando(false);
    }
  };

  // Vuelve a la página anterior. Si se entró directo por la URL no hay página anterior en la app,
  // así que lleva al inicio.
  const volver = () => {
    if (location.key === "default") {
      navigate("/");
    } else {
      navigate(-1);
    }
  };

  if (cargando) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" role="status" />
        <p className="mt-3">Cargando publicación...</p>
      </div>
    );
  }

  if (errorCarga || !post) {
    return (
      <div className={styles.estado}>
        <Alert variant="danger">{errorCarga ?? "No se encontró la publicación."}</Alert>
        <Link to="/">Volver al inicio</Link>
      </div>
    );
  }

  return (
    <>
      <div className={styles.barraVolver}>
        <button type="button" className={styles.volver} onClick={volver}>
          <span aria-hidden="true">‹</span> Volver
        </button>
      </div>

      <div className={styles.contenedor}>
        <div className={styles.contenedor_carrusel_descripcion}>
          {post.imagenes.length > 0 && <CarruselImagenes post={post} />}

          <div className={styles.content_descripcion}>
            <EtiquetasPost post={post} />
            <h3>@{post.usuario.nickName}</h3>
            <p>{post.descripcion}</p>
          </div>
        </div>

        <div className={styles.contenedor_comentarios}>
          <h5>Comentarios</h5>
          <div className={styles.conenedor_comentario}>
            {comentarios.length > 0 ? (
              <ListaComentarios
                comentarios={comentarios}
                nickNames={nickNames}
                autorId={post.usuario.id}
              />
            ) : (
              <p className={styles.sinComentarios}>Todavía no hay comentarios.</p>
            )}
          </div>

          <div className={styles.contenedor_agregarComentario}>
            {usuario ? (
              <>
                {alerta && <Alert variant="danger">{alerta}</Alert>}
                <form onSubmit={agregarComentario}>
                  <textarea
                    value={nuevoComentario}
                    onChange={(evento) => setNuevoComentario(evento.currentTarget.value)}
                    placeholder="Escribe un comentario..."
                    aria-label="Nuevo comentario"
                    maxLength={MAX_COMENTARIO}
                  />

                  <div className={styles.footer_comentario}>
                    <span>{nuevoComentario.length}/{MAX_COMENTARIO}</span>
                    <button type="submit" disabled={enviando}>
                      {enviando ? "Enviando..." : "Comentar"}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <p className="mb-0">
                {/* replace: después del login se vuelve a este post sin dejarlo repetido en el historial,
                    así "Volver" no queda en la misma página. */}
                <Link to="/login" replace state={{ desde: location.pathname }}>Iniciá sesión</Link> para comentar.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DetallePost;
