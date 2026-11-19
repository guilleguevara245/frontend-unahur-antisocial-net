import { Navigate, Outlet, useLocation } from "react-router-dom";
import useUsuario from "../../context/useUsuario";

// Rutas que necesitan sesión: sin usuario, manda al login y recuerda a dónde se quería ir.
const RutaProtegida = () => {
  const { usuario } = useUsuario();
  const location = useLocation();

  if (!usuario) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ desde: location.pathname + location.search }}
      />
    );
  }

  return <Outlet />;
};

export default RutaProtegida;
