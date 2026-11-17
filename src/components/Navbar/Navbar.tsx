

import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import styles from "./Navbar.module.css";

function NavigationBar() {
  const [expandido, setExpandido] = useState(false);

  function cerrarMenu() {
    setExpandido(false);
  }

  function claseLink({ isActive }: { isActive: boolean }): string {
    return isActive
      ? `nav-link ${styles.link} ${styles.activo}`
      : `nav-link ${styles.link}`;
  }

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

            <NavLink
              to="/login"
              onClick={cerrarMenu}
              className={claseLink}
            >
              Iniciar sesión
            </NavLink>

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
    </Navbar>
  );
}

export default NavigationBar;
