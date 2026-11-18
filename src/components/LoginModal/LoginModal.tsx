import { useState, type SubmitEvent } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Style from './LoginModal.module.css'
import { obtenerUsuarioPorNickName } from '../../api/usuarios';
import useUsuario from '../../context/useUsuario';

interface LoginModalProps {
  show: boolean;
  onHide: () => void;
  onIrARegistro: () => void;
}

const LoginModal = ({ show, onHide, onIrARegistro }: LoginModalProps) => {
  // Contraseña única para todos los usuarios
  const CONTRASENA_VALIDA = '123456';

  const { iniciarSesion } = useUsuario();
  const [nickName, setNickName] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);

  const limpiarFormulario = () => {
    setNickName('');
    setContrasena('');
    setError(null);
  };

  const manejarSubmit = async (evento: SubmitEvent<HTMLFormElement>) => {
    evento.preventDefault();
    setError(null);

    const nickNameLimpio = nickName.trim();
    if (!nickNameLimpio) {
      setError('Ingresá tu nickName');
      return;
    }

    setCargando(true);
    try {
      const usuario = await obtenerUsuarioPorNickName(nickNameLimpio);
      if (!usuario) {
        setError('No existe un usuario con ese nickName');
        return;
      }
      if (contrasena !== CONTRASENA_VALIDA) {
        setError('Contraseña incorrecta');
        return;
      }
      iniciarSesion(usuario);
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
        <Modal.Title>Iniciar sesión</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={manejarSubmit}>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form.Group className="mb-3" controlId="loginNickName">
            <Form.Label>NickName</Form.Label>
            <Form.Control
              type="text"
              placeholder="eliasElPro"
              value={nickName}
              onChange={(evento) => setNickName(evento.currentTarget.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="loginPassword">
            <Form.Label>contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={contrasena}
              onChange={(evento) => setContrasena(evento.currentTarget.value)}
              required
            />
          </Form.Group>
          <div className={`mb-3 ${Style.botones}`}>
            <Button type="submit" disabled={cargando} className={`${Style.boton} ${Style.botonEntrar}`}>
              {cargando ? 'Verificando...' : 'Entrar'}
            </Button>
            <Button type='button' onClick={onIrARegistro} className={`${Style.boton} ${Style.botonRegistro}`}>
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

export default LoginModal;
