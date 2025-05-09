import { Row, Col, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const CommonHeader = ({ children }) => {
  const navigate = useNavigate()

  return children
    ? (
        <Row className="py-2 mt-0 shadow-sm bg-white" sm={12} lg={12}>
          <Col sm={1} lg={1} />
          <Col className="justify-content-center align-content-center" sm={9} lg={9}>
            <Button
              variant="link"
              className="fw-light my-0"
              onClick={() => navigate('/login')}
              style={{
                cursor: 'pointer', textDecoration: 'none', fontSize: '20px', color: 'black',
              }}
            >
              Hexlet Chat
            </Button>
          </Col>
          <Col sm={2} lg={2}>{children}</Col>
        </Row>
      )
    : (
        <Row className="py-3 mt-0 shadow-sm bg-white" sm={12} lg={12}>
          <Col sm={1} lg={1} />
          <Col className="justify-content-center" sm={9} lg={9}>
            <Button
              variant="link"
              className="fw-light my-0 py-20"
              onClick={() => navigate('/login')}
              style={{
                cursor: 'pointer',
                textDecoration: 'none',
                fontSize: '25px',
                color: 'black',
              }}
            >
              Hexlet Chat
            </Button>
          </Col>
          <Col sm={2} lg={2} />
        </Row>
      )
}

export default CommonHeader
