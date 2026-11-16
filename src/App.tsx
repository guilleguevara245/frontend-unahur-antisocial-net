import { useState } from 'react'

import './App.css'
import { Route, Routes,BrowserRouter } from 'react-router-dom'
import DetallePost from './pages/PostDetalle/DetallePost'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
 <BrowserRouter>
            <Routes>
                <Route path="/post/:id" element={<DetallePost />} />
                
            </Routes>
  </BrowserRouter>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        

    </>
    )
}

export default App
