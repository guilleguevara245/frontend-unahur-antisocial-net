import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import styles from "./Navbar.module.css";
import useUsuario from "../../context/useUsuario";

const NavigationBar = () => {
  const { usuario, cerrarSesion } = useUsuario();

  const [expandido, setExpandido] = useState(false);

  const cerrarMenu = () => {
    setExpandido(false);
  };

  // Al borrar el usuario, RutaProtegida redirige al login.
  const salir = () => {
    cerrarMenu();
    cerrarSesion();
  };

  const claseLink = ({ isActive }: { isActive: boolean }): string =>
    isActive
      ? `nav-link ${styles.link} ${styles.activo}`
      : `nav-link ${styles.link}`;

  return (
    <Navbar
      expand="md"
      expanded={expandido}
      variant="dark"
      className={styles.barra}
    >
      <Container>
        <Link
          to="/"
          onClick={cerrarMenu}
          className={`navbar-brand ${styles.marca}`}
        >
          Anti-Social Net
        </Link>

        <Navbar.Toggle
          aria-controls="menu-principal"
          onClick={() => setExpandido(!expandido)}
        />

        <Navbar.Collapse id="menu-principal">
          <Nav className={`ms-auto ${styles.menu}`}>
            {usuario ? (
              <>
                <NavLink to="/" end onClick={cerrarMenu} className={claseLink}>
                  Inicio
                </NavLink>
                <NavLink
                  to="/create-post"
                  onClick={cerrarMenu}
                  className={claseLink}
                >
                  Crear publicación
                </NavLink>

                <NavDropdown
                  title={`@${usuario.nickName}`}
                  id="menu-usuario"
                  align="end"
                  className={styles.dropdownUsuario}
                >
                  <NavDropdown.Item as={Link} to="/perfil" onClick={cerrarMenu}>
                    Mi perfil
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as="button" onClick={salir}>
                    Cerrar sesión
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <NavLink to="/login" onClick={cerrarMenu} className={claseLink}>
                  Iniciar sesión
                </NavLink>

                <NavLink
                  to="/registro"
                  onClick={cerrarMenu}
                  className={`${styles.botonRegistro} ${styles.link}`}
                >
                  Registrarse
                </NavLink>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
