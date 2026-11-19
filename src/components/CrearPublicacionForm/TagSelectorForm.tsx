import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import type { Tag } from "../../types/post";
import { obtenerTags } from "../../api/tags";

interface TagSelectorFormProps {
  seleccionados: number[];
  onChange: (seleccionados: number[]) => void;
}

const TagSelectorForm = ({ seleccionados, onChange }: TagSelectorFormProps) => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const cargarTags = async () => {
      try {
        setTags(await obtenerTags());
      } catch (errorDeCarga) {
        console.error(errorDeCarga);
        setError(true);
      } finally {
        setCargando(false);
      }
    };
    cargarTags();
  }, []);

  const alternarTag = (tagId: number, marcado: boolean) => {
    if (marcado) {
      onChange([...seleccionados, tagId]);
    } else {
      onChange(seleccionados.filter((id) => id !== tagId));
    }
  };

  const contenido = () => {
    if (cargando) return <Form.Text muted>Cargando etiquetas...</Form.Text>;
    if (error) return <Form.Text className="text-danger">No se pudieron cargar las etiquetas.</Form.Text>;
    if (tags.length === 0) return <Form.Text muted>Todavía no hay etiquetas.</Form.Text>;
    return tags.map((tag) => (
      <Form.Check
        key={tag.id}
        id={`crearPublicacionTag-${tag.id}`}
        type="checkbox"
        inline
        label={`#${tag.nombre}`}
        checked={seleccionados.includes(tag.id)}
        onChange={(evento) => alternarTag(tag.id, evento.currentTarget.checked)}
      />
    ));
  };

  return (
    <Form.Group as="fieldset" className="mb-4">
      <Form.Label as="legend" className="fs-6">
        Etiquetas (opcional)
      </Form.Label>
      <div>{contenido()}</div>
    </Form.Group>
  );
};

export default TagSelectorForm;
