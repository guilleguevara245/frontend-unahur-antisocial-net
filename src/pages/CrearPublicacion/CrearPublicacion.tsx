import { useState, type SubmitEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import useUsuario from "../../context/useUsuario";
import { crearPost, agregarTagAPost, crearPostImagen } from "../../api/posts";
import DescripcionForm from "../../components/CrearPublicacionForm/DescripcionForm";
import ImagenesForm from "../../components/CrearPublicacionForm/ImagenesForm";
import TagSelectorForm from "../../components/CrearPublicacionForm/TagSelectorForm";
import styles from "./CrearPublicacion.module.css";

const MIN_DESCRIPCION = 3;
const MAX_DESCRIPCION = 500;

// Mismas reglas que valida el backend (Joi): descripción de 3 a 500 caracteres, sin contar espacios de los bordes.
const validarDescripcion = (descripcion: string): string | undefined => {
  const largo = descripcion.trim().length;
  if (largo < MIN_DESCRIPCION || largo > MAX_DESCRIPCION) {
    return `La descripción debe tener entre ${MIN_DESCRIPCION} y ${MAX_DESCRIPCION} caracteres`;
  }
  return undefined;
};

const CrearPublicacion = () => {
  const { usuario } = useUsuario();
  const navigate = useNavigate();
  const [descripcion, setDescripcion] = useState("");
  const [imagenes, setImagenes] = useState<File[]>([]);
  const [tagsSeleccionados, setTagsSeleccionados] = useState<number[]>([]);
  // El error de la descripción se muestra recién después del primer intento de envío.
  const [intentoEnviar, setIntentoEnviar] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Id del post que se creó pero al que le faltó alguna imagen o etiqueta.
  const [postIncompleto, setPostIncompleto] = useState<number | null>(null);

  const errorDescripcion = validarDescripcion(descripcion);

  const manejarSubmit = async (evento: SubmitEvent<HTMLFormElement>) => {
    evento.preventDefault();
    setError(null);
    setIntentoEnviar(true);
    // RutaProtegida ya asegura la sesión: el chequeo de usuario es para TypeScript.
    if (!usuario || errorDescripcion) return;

    setEnviando(true);
    let postId: number;
    try {
      const respuesta = await crearPost(descripcion.trim(), usuario.id);
      postId = respuesta.post.id;
    } catch (errorAlCrear) {
      console.error(errorAlCrear);
      setError("No se pudo crear la publicación. Probá de nuevo.");
      setEnviando(false);
      return;
    }

    // Con el post creado se asocian las etiquetas y se suben las imágenes (en orden, para que el carrusel
    // las muestre como se eligieron). Si alguna falla, el post igual queda creado.
    let fallas = 0;
    for (const tagId of tagsSeleccionados) {
      try {
        await agregarTagAPost(postId, tagId);
      } catch (errorTag) {
        console.error(errorTag);
        fallas++;
      }
    }
    for (const imagen of imagenes) {
      try {
        await crearPostImagen(postId, imagen);
      } catch (errorImagen) {
        console.error(errorImagen);
        fallas++;
      }
    }

    setEnviando(false);
    if (fallas > 0) {
      setPostIncompleto(postId);
      return;
    }
    navigate(`/post/${postId}`);
  };

  return (
    <main className={styles.pagina}>
      <Card className={styles.tarjeta}>
        <Card.Body>
          <h1 className={styles.titulo}>Crear publicación</h1>

          {error && <Alert variant="danger">{error}</Alert>}
          {postIncompleto !== null && (
            <Alert variant="warning">
              La publicación se creó, pero no se pudieron guardar algunas imágenes o etiquetas.{" "}
              <Link to={`/post/${postIncompleto}`}>Ver publicación</Link>
            </Alert>
          )}

          <Form noValidate onSubmit={manejarSubmit}>
            <DescripcionForm
              value={descripcion}
              onChange={setDescripcion}
              max={MAX_DESCRIPCION}
              error={intentoEnviar ? errorDescripcion : undefined}
            />
            <ImagenesForm imagenes={imagenes} onChange={setImagenes} />
            <TagSelectorForm
              seleccionados={tagsSeleccionados}
              onChange={setTagsSeleccionados}
            />
            <Button
              type="submit"
              className={styles.boton}
              disabled={enviando || postIncompleto !== null}
            >
              {enviando ? "Publicando..." : "Publicar"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </main>
  );
};

export default CrearPublicacion;
