import Image from 'react-bootstrap/Image'
import ListGroup from 'react-bootstrap/ListGroup'
import type { Usuario, Comentario } from '../../types/post'
import styles from './ListaComentarios.module.css'

interface ListaComentariosProps {
    comentarios: Comentario[]
    usuarios: Usuario[]
    usuario: Usuario | undefined
}

function ListaComentarios({ comentarios, usuarios, usuario }: ListaComentariosProps) {
    return (
        <ListGroup variant="flush">
            {comentarios.map((comentario) => {
                const usuarioComent = usuarios.find(
                    (u) => u.id === comentario.userId
                )

                return (
                    <ListGroup.Item
                        key={comentario.id}
                        className={styles.comentario}
                    >
                        <Image
                            src="/img/perfil.jpg"
                            className={styles.imagen_usuario}
                            roundedCircle
                        />

                        <div className={styles.contenido_comentario}>
                            <strong>
                                {usuarioComent?.nickName ?? "Usuario"}
                                <b className={styles.autor}>
                                    {usuarioComent?.nickName === usuario?.nickName
                                        ? " autor"
                                        : ""}
                                </b>
                            </strong>

                            <p>{comentario.contenido}</p>
                        </div>
                    </ListGroup.Item>
                )
            })}
        </ListGroup>
    )
}

export default ListaComentarios