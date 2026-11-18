import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUsuario from "../../context/useUsuario";
import styles from "./PerfilUsuario.module.css";
import type { Post } from "../../types/post";

function PerfilUsuario() {
    const navigate = useNavigate();
    const { usuario, cerrarSesion } = useUsuario();

    const [publicaciones, setPublicaciones] = useState<Post[]>([]);

    const obtenerPost = async () => {
        if (!usuario) return;

        const response = await fetch("http://localhost:3000/post/");
        const data: Post[] = await response.json();

        const publicacionesFiltradas = data.filter(
            post => post.userId === usuario.id
        );

        setPublicaciones(publicacionesFiltradas);

        console.log("Posts recibidos:", data);
        console.log("Mis publicaciones:", publicacionesFiltradas);
    };

    const salir = () => {
        cerrarSesion();
        navigate("/");
    };

    useEffect(() => {
        obtenerPost();
    }, [usuario]);

    // Si no hay una sesión iniciada, no mostramos el perfil.
    if (!usuario) {
        return <p>Debés iniciar sesión para ver tu perfil.</p>;
    }

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
                        <h2>{usuario.nickName}</h2>
                        <p>{usuario.email}</p>
                        <span>{publicaciones.length} publicaciones</span>
                    </div>

                    <button
                        className={styles.cerrarSesion}
                        onClick={salir}
                    >
                        Cerrar sesión
                    </button>
                </div>
            </section>

            <section className={styles.publicaciones}>
                <h2>Mis publicaciones</h2>

                {publicaciones.map((post) => (
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