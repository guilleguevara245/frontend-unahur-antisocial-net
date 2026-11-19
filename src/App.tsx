import "./App.css";
import { Navigate, Route, Routes, BrowserRouter } from "react-router-dom";

import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import DetallePost from "./pages/PostDetalle/DetallePost";
import PerfilUsuario from "./pages/PerfilDeUsuario/PerfilUsuario";
import CrearPublicacion from "./pages/CrearPublicacion/CrearPublicacion";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<DetallePost />} />
        <Route path="/perfil" element={<PerfilUsuario />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/create-post" element={<CrearPublicacion />} />
      </Routes>
    </>
  );
}

export default App;
