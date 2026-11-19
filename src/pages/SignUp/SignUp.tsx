import { useState, type SubmitEvent } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Style from './SignUp.module.css'
import { crearUsuario } from '../../api/usuarios';
import useUsuario from '../../context/useUsuario';

const SignUp = () => {
  const { iniciarSesion } = useUsuario();
  const [nickName, setNickName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);

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
      </section>
    </main>
  );
}

export default SignUp;
