import { Navigate, Outlet, useLocation } from "react-router-dom";
import useUsuario from "../../context/useUsuario";

interface EstadoRedireccion {
  desde?: string;
}

// Rutas solo para quien no inició sesión (login y registro): con usuario,
// vuelve a la página que se quería ver antes del login, o al inicio.
const RutaPublica = () => {
  const { usuario } = useUsuario();
  const location = useLocation();

  if (usuario) {
    const estado = location.state as EstadoRedireccion | null;
    return <Navigate to={estado?.desde ?? "/"} replace />;
  }

  return <Outlet />;
};

export default RutaPublica;
