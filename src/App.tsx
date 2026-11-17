import SingUp from "./pages/SingUp/SingUp"
import Home from "./pages/Home/Home"
import NavigationBar from "./components/Navbar/Navbar"
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'

const App = () => {

  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registro" element={<SingUp />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App
