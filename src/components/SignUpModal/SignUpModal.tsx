import { useState, type SubmitEvent } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Style from './SignUpModal.module.css'
import { crearUsuario } from '../../api/usuarios';
import useUsuario from '../../context/useUsuario';

interface SignUpModalProps {
  show: boolean;
  onHide: () => void;
}

const SignUpModal = ({ show, onHide }: SignUpModalProps) => {
  const { iniciarSesion } = useUsuario();
  const [nickName, setNickName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);

  const limpiarFormulario = () => {
    setNickName('');
    setEmail('');
    setError(null);
  };

  const manejarSubmit = async (evento: SubmitEvent<HTMLFormElement>) => {
    evento.preventDefault();
    setError(null);
    setCargando(true);
    try {
      const resultado = await crearUsuario({ nickName: nickName.trim(), email: email.trim() });
      if (!resultado.ok) {
        setError(resultado.error);
        return;
      }
      // Usuario creado: queda con la sesión iniciada.
      iniciarSesion(resultado.usuario);
      onHide();
    } catch (errorDeRed) {
      console.error(errorDeRed);
      setError('No se pudo conectar con el servidor. Probá de nuevo.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} onExited={limpiarFormulario} centered>
      <Modal.Header closeButton>
        <Modal.Title>Registrarse</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={manejarSubmit}>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form.Group className='mb-3' controlId='signUpNickName'>
            <Form.Label>NickName</Form.Label>
            <Form.Control
              type='text'
              placeholder='eliasElPro'
              value={nickName}
              onChange={(evento) => setNickName(evento.currentTarget.value)}
              minLength={3}
              maxLength={50}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="signUpEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="eliasElPro@example.com"
              value={email}
              onChange={(evento) => setEmail(evento.currentTarget.value)}
              required
            />
          </Form.Group>
          <div className={Style.botones}>
            <Button type='submit' disabled={cargando} className={`${Style.boton} ${Style.botonRegistrarse}`}>
              {cargando ? 'Registrando...' : 'Registrarse'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default SignUpModal;
