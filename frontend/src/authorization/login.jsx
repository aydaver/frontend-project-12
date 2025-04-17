import { Formik, Form, Field } from 'formik';
import React from 'react';
import { Button, Container, Row, Col, Image } from 'react-bootstrap';
import damn from '../assets/damn.png'

const Login = () => {
    return (
        <Container className='bg-light w-100' sm={12}>
            <header className='my-5 shadow-sm bg-white'>
                <Row>
                    <Col sm={8}>
                    <h1>Aydaver Chat</h1>
                    </Col>
                    <Col sm={2}></Col>
                    <Col sm={2}></Col>
                </Row>
            </header>
            <div className="body">
                <Row className="middle shadow-sm justify-content-center" sm={12}>
                    <Col sm={8}>
                        <Row className="middle-form" sm={12}>
                            <Col className="middle-image justify-content-center d-flex align-items-center" sm={6}>
                                <Image src={damn} alt="login image" height='150' rounded />
                            </Col>
                            <Col className="middle-inputs" sm={6}>
                                <h1>Войти</h1>
                                <Formik
                                    initialValues={{
                                        email: '',
                                        password: '',
                                    }}
                                    onSubmit={values => {
                                        console.log('submit', values);
                                    }}
                                > 
                                    {() => (
                                        <div className="">
                                            <Form>
                                                <div style={{height: '20px'}}></div>
                                                <div className="form-group">
                                                    <label htmlFor="email">Ваш ник</label>
                                                    <Field type="name" name="name" className="form-control"/>
                                                </div>
                                                <div style={{height: '20px'}}></div>
                                                <div className="form-group">
                                                    <label htmlFor="password">Пароль</label>
                                                    <Field type="password" name="password" className="form-control"/>
                                                </div>
                                                <Button className="w-100 my-5" type='submit'>Войти</Button>
                                            </Form>
                                        </div>
                                    )}
                                </Formik>
                            </Col>
                        </Row>
                    </Col>
                    <Row className="middle-footer">
                        <Col className="d-flex justify-content-md-center my-5 bg-white w-100">
                            <p>Нет аккаунта?</p>
                            <div style={{width: '10px'}}></div>
                            <a href="#">Регистрация</a>
                        </Col>
                    </Row>
                </Row>
            </div>
        </Container>
    )
}

export default Login;