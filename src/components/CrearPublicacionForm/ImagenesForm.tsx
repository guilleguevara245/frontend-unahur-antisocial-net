import { use, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { validarArchivoImagen } from "./validacionesForm";

interface ImagenesInputProps {
  imagenes: File[];
  onChange: (imagenes: File[]) => void;
  error?: string;
}

function ImagenesForm({ imagenes, onChange, error }: ImagenesInputProps) {
  const [archivoActual, setArchivoActual] = useState<File | null>(null);
  const [inputKey, setInputKey] = useState(0);
  const [errorLocal, setErrorLocal] = useState("");

  const mensajeError = errorLocal || error;

  const agregarImagen = () => {
    if (!archivoActual) {
      setErrorLocal("Selecciona una imagen antes de agregarla");
      return;
    }
    onChange([...imagenes, archivoActual]);
    setArchivoActual(null);
    setInputKey((k) => k + 1);
    setErrorLocal("");
    console.log("Imagen agregada", archivoActual.name);
  };

  const eliminarImagen = (index: number) => {
    onChange(imagenes.filter((_, i) => i !== index));
    console.log("Imagen eliminda en el indice:", index);
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const archivo = e.target.files?.[0] ?? null;
    if (!archivo) {
      setArchivoActual(null);
      setErrorLocal("");
      return;
    }
    const mensaje = validarArchivoImagen(archivo);
    if (mensaje) {
      setErrorLocal(mensaje);
      setArchivoActual(null);
      setInputKey((k) => k + 1);
      return;
    }
    setErrorLocal("");
    setArchivoActual(archivo);
  };

  return (
    <Form.Group className="mb-4">
      <Form.Label>Imágenes</Form.Label>
      <Form.Control
        key={inputKey}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className={mensajeError ? "is-invalid" : ""}
        onChange={handleSubmit}
      />
      {mensajeError && (
        <div className="invalid-feedback d-block">{mensajeError}</div>
      )}
      {archivoActual && !errorLocal && (
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
