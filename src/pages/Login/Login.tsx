import type { SubmitEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Style from './Login.module.css'

interface LoginProps {
  show: boolean;
  onHide: () => void;
}

const Login = ({ show, onHide }: LoginProps) => {
  const navigate = useNavigate();

  const manejarSubmit = (evento: SubmitEvent<HTMLFormElement>) => {
    // Evita que el form recargue la página y cierre el modal.
    // Acá va la lógica de inicio de sesión.
    evento.preventDefault();
  };

  const irARegistro = () => {
    onHide();
    navigate('/registro');
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Iniciar sesión</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={manejarSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="eliasElPro@example.com" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>contraseña</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <div className="d-flex gap-2 mb-3">
            <Button variant="primary" type="submit">
              Entrar
            </Button>
            <Button variant='info' type='button' onClick={irARegistro}>
              Registrarse
            </Button>
          </div>
          <Form.Text className="text-muted">
            Si te olvidaste la contraseña cagate
          </Form.Text>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default Login;
