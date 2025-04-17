import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './authorization/login.jsx';
import { Container, Row, Col, Image } from 'react-bootstrap';
import meme from './assets/404.gif'

const App = () =>{

  const NotFound = () => {
    return (
      <Container fluid>
        <Row>
          <Col></Col>
          <Col fluid>
            <Image src={meme} alt="404 not found"/>
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <Col></Col>
          <Col >
            <h1>404 Not Found</h1>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    )
  }

  const MainPage = () => {
    return <div>
      <h1>There's will be a main page</h1>
    </div>
  }

  const AuthPage = () => {
    return (
      <div className="w-100">
        <Login />
      </div>
    )
  }


  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="" element={<MainPage />} />
        <Route path="login" element={<AuthPage />} />
        <></>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
