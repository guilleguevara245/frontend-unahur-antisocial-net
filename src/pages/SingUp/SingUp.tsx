import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const singUpForm = () => {
  return (
    <Form>
        <Form.Group className='mb-3' controlId='singUpName'>
            <Form.Label> Nombre</Form.Label>
            <Form.Control type='name' placeholder='Elias'></Form.Control>    
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="eliasElPro@example.com" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>contraseña</Form.Label>
            <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button variant='info' type='submit'>
            Registrarse
        </Button>
    </Form>
  );
}

export default singUpForm; 