import Image from 'react-bootstrap/Image'
import ListGroup from 'react-bootstrap/ListGroup'
import type { Comentario } from '../../types/post'
import styles from './ListaComentarios.module.css'

interface ListaComentariosProps {
    comentarios: Comentario[]
    // nickName de cada usuario, por id (el backend solo manda el userId del comentario)
    nickNames: Record<number, string>
    // id del autor del post, para marcar sus comentarios
    autorId: number
}

const ListaComentarios = ({ comentarios, nickNames, autorId }: ListaComentariosProps) => {
    return (
        <ListGroup variant="flush">
            {comentarios.map((comentario) => {
                const nickName = nickNames[comentario.userId] ?? "Usuario"

                return (
                    <ListGroup.Item
                        key={comentario.id}
                        className={styles.comentario}
                    >
                        <Image
                            src="/img/perfil.jpg"
                            alt={`Foto de perfil de ${nickName}`}
                            className={styles.imagen_usuario}
                            roundedCircle
                        />

                        <div className={styles.contenido_comentario}>
                            <strong>
                                {nickName}
                                {comentario.userId === autorId && (
                                    <b className={styles.autor}> autor</b>
                                )}
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
