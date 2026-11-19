import { useState, useEffect, type SubmitEvent } from "react";
import useUsuario from "../../context/useUsuario";
import {
  crearPost,
  agregarTagAPost,
  obtenerTags,
  crearPostImagen,
} from "../../api/posts";
import type { Tag } from "../../types/post";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Card, Form } from "react-bootstrap";

function CrearPublicacionForm() {
  const [descripcion, setDescripcion] = useState("");
  const { usuario } = useUsuario();

  const [imagenActual, setImagenActual] = useState("");

  const [imagenes, setImagenes] = useState<string[]>([]);

  const [tags, setTags] = useState<Tag[]>([]);
  const [tagsSeleccionados, setTagsSeleccionados] = useState<number[]>([]);

  useEffect(() => {
    const cargarTags = async () => {
      try {
        const data = await obtenerTags();
        setTags(data);
        console.log("Tags:", data);
      } catch (error) {
        console.error(error);
      }
    };

    cargarTags();
  }, []);

  const agregarImagen = () => {
    if (imagenActual.trim() === "") {
      alert("Por favor, completa la URL de la imagen antes de agregar otra.");
      return;
    }
    setImagenes([...imagenes, imagenActual]);
    setImagenActual("");
  };

  const eliminarImagen = (index: number) => {
    setImagenes(imagenes.filter((_, i) => i !== index));
    console.log("Imagen eliminada en el índice:", index);
  };

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!usuario) {
      alert("Debes inicair sesion");
      return;
    }
    try {
      const nuevoPost = await crearPost(descripcion, usuario.id);
      console.log("nuevoPost:", nuevoPost);

      for (const tagId of tagsSeleccionados) {
        await agregarTagAPost(nuevoPost.post.id, tagId);
      }

      for (const imagenUrl of imagenes) {
        await crearPostImagen(nuevoPost.post.id, imagenUrl);
      }

      console.log("Publicación creada con éxito", nuevoPost);
    } catch (error) {
      console.error("Error al crear la publicación:", error);
    }
  };

  return (
    <Container className="mt-4">
      <Card className="shadow">
        <Card.Body>
          <Card.Title className="mb-4">Crear publicación</Card.Title>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4">
              <Form.Label>Descripción</Form.Label>

              <Form.Control
                as="textarea"
                rows={4}
                value={descripcion}
                onChange={(e) => {
                  setDescripcion(e.target.value);
                  console.log("Descripcion:", e.target.value);
                }}
                placeholder="¿Qué estás pensando?"
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Imágenes</Form.Label>

              <Form.Control
                type="text"
                placeholder="https://imagen.com/foto.jpg"
                value={imagenActual}
                onChange={(e) => {
                  (setImagenActual(e.target.value),
                    console.log("Imagen:", e.target.value));
                }}
              />

              <Button
                className="mt-2"
                variant="outline-secondary"
                type="button"
                onClick={agregarImagen}
              >
                Agregar imagen
              </Button>

              <div className="mt-3">
                {imagenes.map((url, index) => (
                  <div
                    key={index}
                    className="d-flex justify-content-between align-items-center border rounded p-2 mb-2"
                  >
                    <span>{url}</span>

                    <Button
                      variant="danger"
                      size="sm"
                      type="button"
                      onClick={() => eliminarImagen(index)}
                    >
                      Borrar
                    </Button>
                  </div>
                ))}
              </div>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Tags</Form.Label>

              {tags.map((tag) => (
                <Form.Check
                  key={tag.id}
                  type="checkbox"
                  label={tag.nombre}
                  value={tag.id}
                  onChange={(e) => {
                    const tagId = Number(e.target.value);

                    if (e.target.checked) {
                      setTagsSeleccionados([...tagsSeleccionados, tagId]);
                    } else {
                      setTagsSeleccionados(
                        tagsSeleccionados.filter((id) => id !== tagId),
                      );
                    }
                  }}
                />
              ))}
            </Form.Group>

            <Button type="submit" variant="primary">
              Publicar
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default CrearPublicacionForm;
