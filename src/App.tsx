import { useState } from 'react'

import './App.css'
import { Route, Routes,BrowserRouter } from 'react-router-dom'
import DetallePost from './pages/PostDetalle/DetallePost'
import Navbar from './components/Navbar/Navbar'

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
            <Routes>
                <Route path="/post/:id" element={<DetallePost />} />
                
            </Routes>
      </BrowserRouter>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        

    </>
    )
}

export default App
