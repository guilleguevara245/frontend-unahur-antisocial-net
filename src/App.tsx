import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'

import Home from "./pages/Home/Home"
import Navbar from "./components/Navbar/Navbar"
import DetallePost from './pages/PostDetalle/DetallePost'
import PerfilUsuario from './pages/PerfilDeUsuario/PerfilUsuario'

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<DetallePost />} />
        <Route path="/perfil" element={<PerfilUsuario />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App