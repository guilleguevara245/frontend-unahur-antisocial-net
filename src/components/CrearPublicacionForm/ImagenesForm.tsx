import { use, useState } from "react";
import { Button, Form } from "react-bootstrap";

interface ImagenesInputProps {
  imagenes: File[];
  onChange: (imagenes: File[]) => void;
}

const FORMATOS_PERMITIDOS = ["image/jpeg", "image/png", "image/webp"];
const TAMANIO_MAXIMO_MB = 5;

function ImagenesForm({ imagenes, onChange }: ImagenesInputProps) {
  const [archivoActual, setArchivoActual] = useState<File | null>(null);
  const [inputKey, setInputKey] = useState(0);

  const agregarImagen = () => {
    if (!archivoActual) {
      alert("Por favor, selecciona una imagen antes de agregar otra .");
      return;
    }
    onChange([...imagenes, archivoActual]);
    setArchivoActual(null);
  };

  const eliminarImagen = (index: number) => {
    onChange(imagenes.filter((_, i) => i !== index));
    console.log("Imagen eliminda en el indice:", index);
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const archivo = e.target.files?.[0] ?? null;
    if (!archivo) {
      setArchivoActual(null);
      return;
    }

    if (!FORMATOS_PERMITIDOS.includes(archivo.type)) {
      alert("La imagen debe ser jpg,png o webp");
      setArchivoActual(null);
      setInputKey((k) => k + 1);
      return;
    }

    if (archivo.size > TAMANIO_MAXIMO_MB * 1024 * 1024) {
      alert(`La imagen no puede superar los ${TAMANIO_MAXIMO_MB}`);
      setArchivoActual(null);
      setInputKey((k) => k + 1);
      return;
    }
    setArchivoActual(archivo);
  };

  return (
    <Form.Group className="mb-4">
      <Form.Label>Imágenes</Form.Label>
      <Form.Control
        key={inputKey}
        type="file"
        accept="image/jpeg, image/png ,image/webp"
        onChange={handleSubmit}
      />

      {archivoActual && (
        <div className="mt-2 text-muted">
          <small>
            Seleccionada: <code>{archivoActual.name}</code>
          </small>
        </div>
      )}

      <Button
        className="mt-2"
        variant="outline-secondary"
        type="button"
        onClick={agregarImagen}
      >
        Agregar imagen
      </Button>

      <div className="mt-3">
        {imagenes.map((file, index) => (
          <div
            key={index}
            className="d-flex justify-content-between align-items-center border rounded p-2 mb-2"
          >
            <span>{file.name}</span>
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
