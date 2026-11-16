import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import type { Post } from "../../types/post";
function DetallePost() {
   const { id } = useParams<{ id: string }>()
   const [postDetalle,setPostDetalle] = useState<Post>()
    const obtenerPost=  async ()=>{
        const response = await fetch(`http://localhost:3000/post/${id}`)
        const data = await response.json()
        setPostDetalle(data)
        console.log(data)

      }
    useEffect( ()=>{
        obtenerPost()
    },[])
  return (
    <div>
        <p>descpcion : {postDetalle?.descripcion}</p>
    </div>
  )
}

export default DetallePost