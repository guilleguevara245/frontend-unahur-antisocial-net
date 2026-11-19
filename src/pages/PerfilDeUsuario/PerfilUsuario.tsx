import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUsuario from "../../context/useUsuario";
import styles from "./PerfilUsuario.module.css";
import type { Post } from "../../types/post";
import TarjetaPost from "../../components/TarjetaPost/TarjetaPost";
import { obtenerPosts } from "../../api/posts";
function PerfilUsuario() {
    const navigate = useNavigate();
    const { usuario, cerrarSesion } = useUsuario();

    const [publicaciones, setPublicaciones] = useState<Post[]>([]);

    const obtenerPostDeUsuario = async () => {
        if (!usuario) return;

        const data: Post[] = await obtenerPosts();

        const publicacionesFiltradas = data.filter(
            post => post.userId === usuario.id
        );

        setPublicaciones(publicacionesFiltradas);

    };

    const salir = () => {
        cerrarSesion();
        navigate("/");
    };

    useEffect(() => {
        obtenerPostDeUsuario();
    }, [usuario]);

    // Si no hay una sesión iniciada, se muestra el perfil.
if (!usuario) {
    navigate("/login");
    return null;
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

                {publicaciones && publicaciones.map((post) => (
                    <TarjetaPost post={post}></TarjetaPost>
                ))}
            </section>
        </main>
    );
}

export default PerfilUsuario;