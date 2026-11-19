import Form from "react-bootstrap/Form";

interface DescripcionProps {
  value: string;
  onChange: (value: string) => void;
  max: number;
  // Mensaje a mostrar debajo del campo; si no hay, el campo se ve normal.
  error?: string;
}

const DescripcionForm = ({ value, onChange, max, error }: DescripcionProps) => {
  return (
    <Form.Group className="mb-4" controlId="crearPublicacionDescripcion">
      <Form.Label>Descripción</Form.Label>
      <Form.Control
        as="textarea"
        rows={4}
        value={value}
        onChange={(evento) => onChange(evento.currentTarget.value)}
        placeholder="¿Qué estás pensando?"
        maxLength={max}
        isInvalid={!!error}
      />
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      <Form.Text muted>
        {value.length}/{max}
      </Form.Text>
    </Form.Group>
  );
};

export default DescripcionForm;
