import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./Home.module.css";

const sobreNosotros = [
  {
    titulo: "Compartí sin presión",
    texto: "Publicá lo que quieras, con imágenes y etiquetas, sin contar seguidores ni perseguir likes.",
  },
  {
    titulo: "Comentarios que se van",
    texto: "Los comentarios viejos dejan de mostrarse solos. Lo que importa es la charla de ahora.",
  },
  {
    titulo: "Hecho en la UnaHur",
    texto: "Una red social pensada y construida por estudiantes de la Universidad Nacional de Hurlingham.",
  },
];

function Home() {
  return (
    <>
      <section className={styles.portada}>
        <div className={styles.capa}>
          <p className={styles.bajada}>Bienvenido a</p>
          <h1>UnaHur Anti-Social Net</h1>
          <p className={styles.slogan}>La red social para los que no quieren ser tan sociales.</p>
        </div>
      </section>

      <Container className="py-5">
        <h2 className={`text-center mb-4 ${styles.tituloSeccion}`}>Sobre nosotros</h2>
        <Row className="text-center">
          {sobreNosotros.map((item) => (
            <Col md={4} className={`mb-4 ${styles.item}`} key={item.titulo}>
              <h3>{item.titulo}</h3>
              <p className="mb-0">{item.texto}</p>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default Home;
