import { useState } from "react";
import { Form } from "react-bootstrap";

interface DescripcionProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

function DescripcionForm({ value, onChange, error }: DescripcionProps) {
  return (
    <Form.Group className="mb-4">
      <Form.Label>Descripción</Form.Label>
      <Form.Control
        as="textarea"
        rows={4}
        value={value}
        onChange={(e) => {
          (onChange(e.target.value),
            console.log("descripcion:", e.target.value));
        }}
        className={error ? "is-invalid" : ""}
        placeholder="¿Qué estás pensando?"
      />
      {error && <div className="invalid-feedback d-block">{error}</div>}
      <Form.Control.Feedback type="invalid">
        Por favor, escribe una descripción antes de publicar.
      </Form.Control.Feedback>
    </Form.Group>
  );
}

export default DescripcionForm;
