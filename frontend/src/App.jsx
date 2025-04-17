import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './authorization/login.jsx';
import { Container, Row, Col, Image } from 'react-bootstrap';
import meme from './assets/404.gif';

const App = () => {
  const NotFound = () => {
    return (
      <Container fluid>
        <Row>
          <Col></Col>
          <Col>
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
  const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("token");
  
    return token ? children : <Navigate to="/login" />;
  };
  
  const AuthPage = () => {
    return <Login />
  }

  const MainPage = () => {
    return <h1>There's will be a main page</h1>
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<PrivateRoute>
                                  <MainPage />
                                </PrivateRoute>}/>
        <Route path="login" element={<AuthPage/>}/>
        <></>
      </Routes>
    </BrowserRouter>
  );
  
}

export default App;
