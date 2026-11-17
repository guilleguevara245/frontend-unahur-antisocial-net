import Login from "./pages/Login/Login"
import SingUp from "./pages/SingUp/SingUp"
import Home from "./pages/Home/Home"
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SingUp />} />
      <Route path="/home" element={<Home />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App
