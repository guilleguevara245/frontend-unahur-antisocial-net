import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Style from './Login.module.css'

const login = () => {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="eliasElPro@example.com" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>contraseña</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Entrar
      </Button>
      <Button variant='info' type='submit'>
        Registrarse
      </Button>
      <Form.Text className="text-muted">
        Si te olvidaste la contraseña cagate    
      </Form.Text>
    </Form>
  );
}

export default login;