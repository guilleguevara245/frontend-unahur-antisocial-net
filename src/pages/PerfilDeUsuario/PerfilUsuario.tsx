
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./PerfilUsuario.module.css";
import type { Post } from "../../types/post";


const usuarioLog = {
    nickName: "tomas",
    userId: "1",
    email: "tomas@gmail.com"
};



function PerfilUsuario() {
    const navigate = useNavigate();
    const [publicaciones,setPublicacioens] = useState<Post[]>();

    const cerrarSesion = () => {
        // Pendiente: conectar con AuthContext
    };
      const obtenerPost=  async ()=>{
        const response = await fetch(`http://localhost:3000/post`)
        const data:Post[] = await response.json()
      
        const publicacionesFiltrada =data.filter(post =>
          post.usuario.nickName ==usuarioLog.nickName
        );
        setPublicacioens(publicacionesFiltrada)
      
        console.log("post : ",data,publicacionesFiltrada)
   

      }
    useEffect(() => {
        obtenerPost()

    }, [usuarioLog.userId])
    return (
        <main className={styles.perfil}>
            <h1>Mi perfil</h1>

        <section className={styles.usuario}>
            <div className={styles.datos_usuario}>
                <img
                    src="/img/perfil.jpg"
                    alt="Foto de perfil"
                    className={styles.avatar}
                />

                <div>
                    <h2>{usuarioLog.nickName}</h2>
                    <p>{usuarioLog.email}</p>
                    <span>{ publicaciones &&publicaciones.length} publicaciones</span>
                    
                </div>
                <button className={styles.cerrarSesion} onClick={cerrarSesion}>
                    Cerrar sesión
                </button>
            </div>

        </section>

<section className={styles.publicaciones}>
    <h2>Mis publicaciones</h2>

        {publicaciones && publicaciones.map((post) => (
            <article key={post.id} className={styles.post}>

                {post.imagenes && post.imagenes.length > 0 && (
                    <img
                        src={`http://localhost:3000${post.imagenes[0].urlImage}`}
                        alt="Imagen de la publicación"
                        className={styles.imagen_post}
                    />
                )}

                <p>{post.descripcion}</p>

                <div className={styles.info_post}>
                    <span>
                        {post.comentariosVisibles} comentarios visibles
                    </span>

                    <button onClick={() => navigate(`/post/${post.id}`)}>
                        Ver más
                    </button>
                </div>
            </article>
        ))}
</section>
        </main>
    );
}

export default PerfilUsuario;
