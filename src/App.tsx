import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'

import Home from "./pages/Home/Home"
import Login from "./pages/Login/Login"
import SignUp from "./pages/SignUp/SignUp"
import DetallePost from './pages/PostDetalle/DetallePost'
import PerfilUsuario from './pages/PerfilDeUsuario/PerfilUsuario'
import NavigationBar from "./components/Navbar/Navbar"
import RutaProtegida from "./components/RutaProtegida/RutaProtegida"
import RutaPublica from "./components/RutaPublica/RutaPublica"

// El BrowserRouter está en main.tsx: no se puede anidar otro acá.
const App = () => {
  return (
    <>
      <NavigationBar />

      <Routes>
        {/* Solo sin sesión */}
        <Route element={<RutaPublica />}>
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<SignUp />} />
        </Route>

        {/* Solo con sesión: sin usuario redirigen a /login */}
        <Route element={<RutaProtegida />}>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<DetallePost />} />
          <Route path="/perfil" element={<PerfilUsuario />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App