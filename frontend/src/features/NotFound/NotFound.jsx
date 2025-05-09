import {
  Container, Row, Col, Image,
} from 'react-bootstrap';
import meme from '../../assets/images/404.gif';

const NotFound = () => (
  <Container fluid className="bg-dark h-100">
    <Row>
      <Col />
      <Col>
        <Image src={meme} className="border rounded border-danger border-2 mt-4 bg-light" alt="404 not found" />
      </Col>
      <Col />
    </Row>
    <Row>
      <Col />
      <Col className="text-center border rounded border-danger border-2 mt-4 bg-light">
        <h1 className="text-danger mt-1">404 Not Found</h1>
      </Col>
      <Col />
    </Row>
  </Container>
);

export default NotFound;
