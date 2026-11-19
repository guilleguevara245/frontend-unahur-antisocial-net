import { useState, type SubmitEvent } from "react";
import useUsuario from "../../context/useUsuario";
import { crearPost, agregarTagAPost, crearPostImagen } from "../../api/posts";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { CardBody } from "react-bootstrap";
import DescripcionForm from "../../components/CrearPublicacionForm/DescripcionForm";
import ImagenesForm from "../../components/CrearPublicacionForm/ImagenesForm";
import TagSelectorForm from "../../components/CrearPublicacionForm/TagSelectorForm";
import {
  validarPublicacion,
  type ErroresPublicacion,
} from "../../components/CrearPublicacionForm/validacionesForm";

const CrearPublicacion = () => {
  const { usuario } = useUsuario();
  const [descripcion, setDescripcion] = useState("");
  const [imagenes, setImagenes] = useState<File[]>([]);
  const [tagsSeleccionados, setTagsSeleccionados] = useState<number[]>([]);
  const [errors, setErrors] = useState<ErroresPublicacion>({});
  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!usuario) {
      alert("Debes iniciar sesión");
      return;
    }
    const newErrors = validarPublicacion({ descripcion, imagenes });
    setErrors(newErrors);
    console.log("Errores:", newErrors);
    if (Object.keys(newErrors).length > 0) {
      console.log("Complete los campos faltantes");
      return;
    }
    try {
      const nuevoPost = await crearPost(descripcion, usuario.id);
      console.log("Post Creado:", {
        id: nuevoPost.post.id,
        descripcion,
        usuarioId: usuario.id,
      });
      for (const tagId of tagsSeleccionados) {
        await agregarTagAPost(nuevoPost.post.id, tagId);
      }
      for (const imagen of imagenes) {
        await crearPostImagen(nuevoPost.post.id, imagen);
      }
      console.log("Publicación creada con éxito", nuevoPost);
    } catch (error) {
      console.error("Error al crear la publicación:", error);
    }

    setDescripcion("");
    setImagenes([]);
    setTagsSeleccionados([]);
  };
  return (
    <Container className="mt-4">
      <Card className="shadow">
        <CardBody>
          <Card.Title className="mb-4">Crear Publicacion</Card.Title>
          <Form onSubmit={handleSubmit} noValidate>
            <DescripcionForm
              value={descripcion}
              onChange={setDescripcion}
              error={errors.descripcion}
            />
            <ImagenesForm
              imagenes={imagenes}
              onChange={setImagenes}
              error={errors.imagenes}
            />
            <TagSelectorForm
              seleccionados={tagsSeleccionados}
              onChange={setTagsSeleccionados}
            />
            <Button type="submit" variant="primary">
              Publicar
            </Button>
          </Form>
        </CardBody>
      </Card>
    </Container>
  );
};

export default CrearPublicacion;
