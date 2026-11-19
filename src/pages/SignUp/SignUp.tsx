import { useState, type SubmitEvent } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Style from './SignUp.module.css'
import { crearUsuario } from '../../api/usuarios';
import useUsuario from '../../context/useUsuario';

const EMAIL_VALIDO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ErroresRegistro {
  nickName?: string;
  email?: string;
}

// Mismas reglas que valida el backend (Joi): nickName de 3 a 50 caracteres y email válido.
const validar = (nickName: string, email: string): ErroresRegistro => {
  const errores: ErroresRegistro = {};
  if (nickName.length < 3 || nickName.length > 50) {
    errores.nickName = 'El nickName debe tener entre 3 y 50 caracteres';
  }
  if (!EMAIL_VALIDO.test(email)) {
    errores.email = 'Ingresá un email válido (por ejemplo, nombre@mail.com)';
  }
  return errores;
};

const SignUp = () => {
  const { iniciarSesion } = useUsuario();
  const [nickName, setNickName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);
  // Los errores de cada campo se muestran recién después del primer intento de envío.
  const [intentoEnviar, setIntentoEnviar] = useState(false);

  const errores = validar(nickName.trim(), email.trim());

  const manejarSubmit = async (evento: SubmitEvent<HTMLFormElement>) => {
    evento.preventDefault();
    setError(null);
    setIntentoEnviar(true);
    if (errores.nickName || errores.email) {
      return;
    }

    setCargando(true);
    try {
      const resultado = await crearUsuario({ nickName: nickName.trim(), email: email.trim() });
      if (!resultado.ok) {
        setError(resultado.error);
        return;
      }
      // Usuario creado: queda con la sesión iniciada y RutaPublica redirige al inicio.
      iniciarSesion(resultado.usuario);
    } catch (errorDeRed) {
      console.error(errorDeRed);
      setError('No se pudo conectar con el servidor. Probá de nuevo.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <main className={Style.pagina}>
      <section className={Style.tarjeta}>
        <h1 className={Style.titulo}>Registrarse</h1>

        <Form noValidate onSubmit={manejarSubmit}>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form.Group className='mb-3' controlId='signUpNickName'>
            <Form.Label>NickName</Form.Label>
            <Form.Control
              type='text'
              placeholder='eliasElPro'
              value={nickName}
              onChange={(evento) => setNickName(evento.currentTarget.value)}
              maxLength={50}
              isInvalid={intentoEnviar && !!errores.nickName}
            />
            <Form.Control.Feedback type='invalid'>{errores.nickName}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="signUpEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="eliasElPro@example.com"
              value={email}
              onChange={(evento) => setEmail(evento.currentTarget.value)}
              isInvalid={intentoEnviar && !!errores.email}
            />
            <Form.Control.Feedback type='invalid'>{errores.email}</Form.Control.Feedback>
          </Form.Group>
          <div className={Style.botones}>
            <Button type='submit' disabled={cargando} className={`${Style.boton} ${Style.botonRegistrarse}`}>
              {cargando ? 'Registrando...' : 'Registrarse'}
            </Button>
          </div>
        </Form>
      </section>
    </main>
  );
};

export default SignUp;
