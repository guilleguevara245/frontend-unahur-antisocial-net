import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { useAuth } from "../../context/AuthContext";
import styles from "./Navbar.module.css";

function NavigationBar() {
  const [expandido, setExpandido] = useState(false);
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  function cerrarMenu() {
    setExpandido(false);
  }

  function cerrarSesion() {
    logout();
    cerrarMenu();
    navigate("/");
  }

  function claseLink({ isActive }: { isActive: boolean }): string {
    return isActive ? `nav-link ${styles.link} ${styles.activo}` : `nav-link ${styles.link}`;
  }

  return (
    <Navbar expand="md" expanded={expandido} variant="dark" className={styles.barra}>
      <Container>
        <Link to="/" onClick={cerrarMenu} className={`navbar-brand ${styles.marca}`}>
          Anti-Social Net
        </Link>
        <Navbar.Toggle aria-controls="menu-principal" onClick={() => setExpandido(!expandido)} />
        <Navbar.Collapse id="menu-principal">
          <Nav className={`ms-auto ${styles.menu}`}>
            <NavLink to="/" end onClick={cerrarMenu} className={claseLink}>Inicio</NavLink>
            {usuario ? (
              <>
                <NavLink to="/crear-post" onClick={cerrarMenu} className={claseLink}>Crear publicación</NavLink>
                <NavLink to="/perfil" onClick={cerrarMenu} className={claseLink}>@{usuario.nickName}</NavLink>
                <button type="button" className={styles.botonSesion} onClick={cerrarSesion}>
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" onClick={cerrarMenu} className={claseLink}>Iniciar sesión</NavLink>
                <NavLink to="/registro" onClick={cerrarMenu} className={`${styles.botonRegistro} ${styles.link}`}>
                  Registrarse
                </NavLink>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
