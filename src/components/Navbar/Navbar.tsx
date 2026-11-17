

import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import styles from "./Navbar.module.css";
import Login from "../../pages/Login/Login";

const NavigationBar = () => {
  const [expandido, setExpandido] = useState(false);
  const [mostrarLogin, setMostrarLogin] = useState(false);

  const cerrarMenu = () => {
    setExpandido(false);
  };

  const abrirLogin = () => {
    cerrarMenu();
    setMostrarLogin(true);
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
            <NavLink
              to="/"
              end
              onClick={cerrarMenu}
              className={claseLink}
            >
              Inicio
            </NavLink>

            <button
              type="button"
              onClick={abrirLogin}
              className={`nav-link ${styles.link}`}
            >
              Iniciar sesión
            </button>

            <NavLink
              to="/registro"
              onClick={cerrarMenu}
              className={`${styles.botonRegistro} ${styles.link}`}
            >
              Registrarse
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>

      <Login show={mostrarLogin} onHide={() => setMostrarLogin(false)} />
    </Navbar>
  );
};

export default NavigationBar;
