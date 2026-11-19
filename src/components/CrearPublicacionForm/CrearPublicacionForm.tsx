import { useState, type SubmitEvent } from "react";
import useUsuario from "../../context/useUsuario";
import { crearPost, agregarTagAPost, obtenerTags } from "../../api/posts";
// import type { Tag } from "../../types";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Card, Form } from "react-bootstrap";

function CrearPublicacionForm() {
  const [descripcion, setDescripcion] = useState("");
  const { usuario } = useUsuario();
  const [imagenes, setImagenes] = useState<string[]>([""]);

  const agregarImagen = () => {
    setImagenes;
  };

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!usuario) {
      alert("Debes inicair sesion");
      return;
    }
    try {
      (await crearPost(descripcion, usuario.id),
        alert("Publicación creada con éxito"));
    } catch (error) {
      console.error("Error al crear la publicación:", error);
    }
  };

  const handleAgregarImagen = (index: number, value: string) => {
    const nuevasImagenes = [...imagenes];
    nuevasImagenes[index] = value;
    setImagenes(nuevasImagenes);
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
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="¿Qué estás pensando?"
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Imágenes</Form.Label>

              {imagenes.map((imagen, index) => (
                <Row key={index} className="mb-2">
                  <Col>
                    <Form.Control
                      type="text"
                      placeholder="https://imagen.com/foto.jpg"
                      value={imagen}
                      onChange={(e) =>
                        handleAgregarImagen(index, e.target.value)
                      }
                    />
                  </Col>
                </Row>
              ))}

              <Button
                variant="outline-secondary"
                type="button"
                onClick={agregarImagen}
              >
                Agregar imagen
              </Button>
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
