import { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import useUsuario from "../../context/useUsuario";
import styles from "./PerfilUsuario.module.css";
import type { Post } from "../../types/post";
import TarjetaPost from "../../components/TarjetaPost/TarjetaPost";
import { obtenerPostsDeUsuario } from "../../api/posts";

const PerfilUsuario = () => {
    const { usuario, cerrarSesion } = useUsuario();

    const [publicaciones, setPublicaciones] = useState<Post[]>([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const idUsuario = usuario?.id;

    useEffect(() => {
        if (idUsuario === undefined) return;

        let cancelado = false;
        const cargarPublicaciones = async () => {
            try {
                const datos = await obtenerPostsDeUsuario(idUsuario);
                if (!cancelado) setPublicaciones(datos);
            } catch (errorDeCarga) {
                console.error(errorDeCarga);
                if (!cancelado) setError("No se pudieron cargar tus publicaciones. Probá de nuevo más tarde.");
            } finally {
                if (!cancelado) setCargando(false);
            }
        };
        cargarPublicaciones();

        return () => {
            cancelado = true;
        };
    }, [idUsuario]);

    // RutaProtegida redirige al login si no hay sesión (también al cerrarla desde acá):
    // este chequeo es para que TypeScript sepa que hay usuario.
    if (!usuario) return null;

    const contenidoPublicaciones = () => {
        if (cargando) {
            return (
                <div className={`text-center py-4 ${styles.mensaje}`}>
                    <Spinner animation="border" role="status" />
                    <p className="mt-3">Cargando publicaciones...</p>
                </div>
            );
        }
        if (error) {
            return <Alert variant="danger" className={styles.mensaje}>{error}</Alert>;
        }
        if (publicaciones.length === 0) {
            return <p className={styles.mensaje}>Todavía no hiciste ninguna publicación.</p>;
        }
        return publicaciones.map((post) => <TarjetaPost key={post.id} post={post} />);
    };

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
                        {!cargando && !error && (
                            <span>
                                {publicaciones.length === 1 ? "1 publicación" : `${publicaciones.length} publicaciones`}
                            </span>
                        )}
                    </div>

                    <button
                        type="button"
                        className={styles.cerrarSesion}
                        onClick={cerrarSesion}
                    >
                        Cerrar sesión
                    </button>
                </div>
            </section>

            <section className={styles.publicaciones}>
                <h2>Mis publicaciones</h2>
                {contenidoPublicaciones()}
            </section>
        </main>
    );
};

export default PerfilUsuario;
