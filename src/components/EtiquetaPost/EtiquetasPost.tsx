import type { Post } from '../../types/post'
import styles from './EtiquetasPost.module.css'

interface EtiquetasPostProps {
    post: Post 
}

function EtiquetasPost({ post }: EtiquetasPostProps) {
    return (
        <div className={styles.content_tag}>
            {post.tags.map((tag) => (
                <span key={tag.id}>{tag.nombre}</span>
            ))}
        </div>
    )
}

export default EtiquetasPost