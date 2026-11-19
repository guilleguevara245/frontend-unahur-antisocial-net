import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

interface ImagenesFormProps {
  imagenes: File[];
  onChange: (imagenes: File[]) => void;
}

// Mismas reglas que el backend (multer): jpg, png o webp de hasta 5 MB.
const FORMATOS_PERMITIDOS = ["image/jpeg", "image/png", "image/webp"];
const TAMANIO_MAXIMO_MB = 5;

// Devuelve el problema del archivo, o null si se puede subir.
const validarArchivo = (archivo: File): string | null => {
  if (!FORMATOS_PERMITIDOS.includes(archivo.type)) {
    return `"${archivo.name}" no es jpg, png ni webp`;
  }
  if (archivo.size > TAMANIO_MAXIMO_MB * 1024 * 1024) {
    return `"${archivo.name}" supera los ${TAMANIO_MAXIMO_MB} MB`;
  }
  return null;
};

const ImagenesForm = ({ imagenes, onChange }: ImagenesFormProps) => {
  const [errores, setErrores] = useState<string[]>([]);
  // Cambiar la key vacía el input, así se puede volver a elegir el mismo archivo.
  const [inputKey, setInputKey] = useState(0);

  // Cada archivo elegido se agrega directo a la lista (antes había que apretar "Agregar"
  // y, si no, la imagen elegida se perdía al publicar).
  const elegirArchivos = (archivos: File[]) => {
    const nuevosErrores: string[] = [];
    const validos: File[] = [];
    for (const archivo of archivos) {
      const problema = validarArchivo(archivo);
      if (problema) {
        nuevosErrores.push(problema);
      } else {
        validos.push(archivo);
      }
    }
    setErrores(nuevosErrores);
    if (validos.length > 0) {
      onChange([...imagenes, ...validos]);
    }
    setInputKey((key) => key + 1);
  };

  const quitarImagen = (indice: number) => {
    onChange(imagenes.filter((_, i) => i !== indice));
  };

  return (
    <Form.Group className="mb-4" controlId="crearPublicacionImagenes">
      <Form.Label>Imágenes (opcional)</Form.Label>
      <Form.Control
        key={inputKey}
        type="file"
        multiple
        accept={FORMATOS_PERMITIDOS.join(",")}
        isInvalid={errores.length > 0}
        onChange={(evento) =>
          elegirArchivos(Array.from((evento.currentTarget as HTMLInputElement).files ?? []))
        }
      />
      <Form.Control.Feedback type="invalid">
        {errores.map((problema) => (
          <div key={problema}>{problema}</div>
        ))}
      </Form.Control.Feedback>
      <Form.Text muted>Formatos jpg, png o webp, de hasta {TAMANIO_MAXIMO_MB} MB cada una.</Form.Text>

      {imagenes.length > 0 && (
        <ul className="list-unstyled mt-3 mb-0">
          {imagenes.map((archivo, indice) => (
            <li
              key={`${archivo.name}-${archivo.lastModified}-${indice}`}
              className="d-flex justify-content-between align-items-center border rounded p-2 mb-2"
            >
              <span className="text-break me-2">{archivo.name}</span>
              <Button
                variant="outline-danger"
                size="sm"
                type="button"
                onClick={() => quitarImagen(indice)}
              >
                Quitar
              </Button>
            </li>
          ))}
        </ul>
      )}
    </Form.Group>
  );
};

export default ImagenesForm;
