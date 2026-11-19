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

const CrearPublicacion = () => {
  const { usuario } = useUsuario();
  const [descripcion, setDescripcion] = useState("");
  const [imagenes, setImagenes] = useState<File[]>([]);
  const [tagsSeleccionados, setTagsSeleccionados] = useState<number[]>([]);

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!usuario) {
      alert("Debes iniciar sesión");
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
      console.log(
        `Tags asociados al post ${nuevoPost.post.id}:`,
        tagsSeleccionados.length > 0 ? tagsSeleccionados : "Sin tags",
      );
      for (const imagen of imagenes) {
        await crearPostImagen(nuevoPost.post.id, imagen);
      }
      console.log(
        `Imagenes asociados al post ${nuevoPost.post.id}:`,
        imagenes.length > 0 ? imagenes : "Sin imagenes",
      );

      console.log("Publicación creada con éxito", nuevoPost);
    } catch (error) {
      console.error("Error al crear la publicación:", error);
    }
  };
  return (
    <Container className="mt-4">
      <Card className="shadow">
        <CardBody>
          <Card.Title className="mb-4">Crear Publicacion</Card.Title>
          <Form onSubmit={handleSubmit}>
            <DescripcionForm value={descripcion} onChange={setDescripcion} />
            <ImagenesForm imagenes={imagenes} onChange={setImagenes} />
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
// {/* <main>
//       <h1>Crear Publicacion</h1>
//       {/* <CrearPublicacionForm /> */}
//       <DescripcionForm />
//     </main> */}
