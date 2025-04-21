import meme from '../../assets/404.gif'

import { Container, Row, Col, Image } from 'react-bootstrap';

const NotFound = () => {
    return (
      <Container fluid className="bg-dark h-100">
        <Row>
          <Col></Col>
          <Col>
            <Image src={meme} className="border rounded border-danger border-2 mt-4 bg-light" alt="404 not found"/>
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <Col></Col>
          <Col className="text-center border rounded border-danger border-2 mt-4 bg-light">
            <h1 className="text-danger mt-1">404 Not Found</h1>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    )
  }

  export default NotFound;