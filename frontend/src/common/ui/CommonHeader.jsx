import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CommonHeader = ({ children }) => {

    const navigate = useNavigate();

    if(children) {
        return  <Row className='py-2 mt-0 shadow-sm bg-white' sm={12} lg={12}>
                    <Col sm={1} lg={1}></Col>
                    <Col className="justify-content-center align-content-center" sm={9} lg={9}>
                        <a className="fw-light my-0" onClick={() => {navigate("/")}} style={{ cursor: 'pointer', textDecoration: 'none', fontSize: '20px', color: 'black'}}>Hexlet Chat</a>
                    </Col>
                    <Col sm={2} lg={2}>{children}</Col>
                </Row>
    }
    return  <Row className='py-3 mt-0 shadow-sm bg-white' sm={12} lg={12}>
                <Col sm={1} lg={1}></Col>
                <Col className="justify-content-center" sm={9} lg={9}>
                    <a className="fw-light my-0 py-20" onClick={() => {navigate("/")}} style={{ cursor: 'pointer', textDecoration: 'none', fontSize: '25px', color: 'black'}}>Hexlet Chat</a>
                </Col>
                <Col sm={2} lg={2}></Col>
            </Row>
};

export default CommonHeader;