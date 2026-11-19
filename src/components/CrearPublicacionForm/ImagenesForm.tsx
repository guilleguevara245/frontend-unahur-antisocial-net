import { useState } from "react";
import { Button, Form } from "react-bootstrap";

interface ImagenesInputProps {
  imagenes: string[];
  onChange: (imagenes: string[]) => void;
}

function ImagenesForm({ imagenes, onChange }: ImagenesInputProps) {
  const [imagenActual, setImagenActual] = useState("");

  const agregarImagen = () => {
    if (imagenActual.trim() === "") {
      alert("Por favor, completa la URL de la imagen antes de agregar otra.");
      return;
    }
    onChange([...imagenes, imagenActual]);
    setImagenActual("");
  };

  const eliminarImagen = (index: number) => {
    onChange(imagenes.filter((_, i) => i !== index));
    console.log("Imagen eliminda en el indice:", index);
  };

  return (
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
  );
}

export default ImagenesForm;
