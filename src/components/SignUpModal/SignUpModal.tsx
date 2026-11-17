import type { SubmitEvent } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Style from './SignUpModal.module.css'

interface SignUpModalProps {
  show: boolean;
  onHide: () => void;
}

const SignUpModal = ({ show, onHide }: SignUpModalProps) => {
  const manejarSubmit = (evento: SubmitEvent<HTMLFormElement>) => {
  evento.preventDefault();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Registrarse</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={manejarSubmit}>
          <Form.Group className='mb-3' controlId='signUpName'>
            <Form.Label>Nombre</Form.Label>
            <Form.Control type='text' placeholder='Elias' />
          </Form.Group>
          <Form.Group className="mb-3" controlId="signUpEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="eliasElPro@example.com" />
          </Form.Group>
          <div className={Style.botones}>
            <Button type='submit' className={`${Style.boton} ${Style.botonRegistrarse}`}>
              Registrarse
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default SignUpModal;
