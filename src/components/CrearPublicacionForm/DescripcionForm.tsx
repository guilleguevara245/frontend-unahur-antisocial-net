import { Form } from "react-bootstrap";

interface DescripcionProps {
  value: string;
  onChange: (value: string) => void;
}

function DescripcionForm({ value, onChange }: DescripcionProps) {
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
        placeholder="¿Qué estás pensando?"
        required
      />
    </Form.Group>
  );
}

export default DescripcionForm;
