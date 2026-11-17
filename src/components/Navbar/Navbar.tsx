

import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import styles from "./Navbar.module.css";
import LoginModal from "../LoginModal/LoginModal";
import SignUpModal from "../SignUpModal/SignUpModal";

type ModalAbierto = "login" | "registro" | null;

const NavigationBar = () => {
  const [expandido, setExpandido] = useState(false);
  const [modalAbierto, setModalAbierto] = useState<ModalAbierto>(null);

  const cerrarMenu = () => {
    setExpandido(false);
  };

  const abrirModal = (modal: ModalAbierto) => {
    cerrarMenu();
    setModalAbierto(modal);
  };

  const cerrarModal = () => {
    setModalAbierto(null);
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
              onClick={() => abrirModal("login")}
              className={`nav-link ${styles.link}`}
            >
              Iniciar sesión
            </button>

            <button
              type="button"
              onClick={() => abrirModal("registro")}
              className={`${styles.botonRegistro} ${styles.link}`}
            >
              Registrarse
            </button>
          </Nav>
        </Navbar.Collapse>
      </Container>

      <LoginModal
        show={modalAbierto === "login"}
        onHide={cerrarModal}
        onIrARegistro={() => setModalAbierto("registro")}
      />
      <SignUpModal show={modalAbierto === "registro"} onHide={cerrarModal} />
    </Navbar>
  );
};

export default NavigationBar;
