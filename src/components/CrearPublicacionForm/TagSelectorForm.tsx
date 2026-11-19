import React, { useEffect, useState } from "react";
import type { Tag } from "../../types/post";
import { obtenerTags } from "../../api/posts";
import { Form } from "react-bootstrap";

interface TagSelectorFormProps {
  seleccionados: number[];
  onChange: (seleccionados: number[]) => void;
}

function TagSelectorForm({ seleccionados, onChange }: TagSelectorFormProps) {
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    const cargarTags = async () => {
      try {
        const data = await obtenerTags();
        setTags(data);
      } catch (error) {
        console.error("error");
      }
    };
    cargarTags();
  }, []);

  const alternarTag = (tagId: number, checked: boolean) => {
    if (checked) {
      onChange([...seleccionados, tagId]);
    } else {
      onChange(seleccionados.filter((id) => id !== tagId));
    }
  };
  return (
    <Form.Group className="mb-4">
      <Form.Label>Tags</Form.Label>
      {tags.map((tag) => (
        <Form.Check
          key={tag.id}
          type="checkbox"
          label={tag.nombre}
          checked={seleccionados.includes(tag.id)}
          onChange={(e) => {
            (alternarTag(tag.id, e.target.checked),
              console.log(
                e.target.checked ? "Marcado:" : "Desmarcado:",
                tag.nombre,
              ));
          }}
        />
      ))}
    </Form.Group>
  );
}

export default TagSelectorForm;
