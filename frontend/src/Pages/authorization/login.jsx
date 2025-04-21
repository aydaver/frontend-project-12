import { Formik, Form, Field } from 'formik';
import React, { useState } from 'react';
import { Button, Container, Row, Col, Image } from 'react-bootstrap';
import auth from '../../assets/auth.jpg'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [ errorState, handleError ] = useState();

    const navigate = useNavigate();

    return (
        <Container className='bg-black mw-100 h-100 my-0 px-0' sm={12} lg={12}>
            <Row className='py-3 mt-0 shadow-sm bg-white' sm={12} lg={12}>
                <Col sm={1} lg={1}></Col>
                <Col className="justify-content-center" sm={7} lg={7}>
                    <h5 className="fw-light my-0 py-20">Aydaver Chat</h5>
                </Col>
                <Col sm={2} lg={2}></Col>
                <Col sm={2} lg={2}></Col>
            </Row>
            <Row className="middle justify-content-center align-content-center h-100 pb-0 bg-light" sm={12} lg={12}>
                <Col className="bg-white rounded border border-secondary pt-5 shadow-sm" sm={8} lg={8}>
                    <Row className="middle-form" sm={12} lg={12}>
                        <Col className="middle-image justify-content-center d-flex align-items-center px-0 mx-0" sm={6} lg={6}>
                            <Image src={auth} alt="login image" height='300' width="300" roundedCircle />
                        </Col>
                        <Col className="middle-inputs px-5" sm={6} lg={6}>
                            <h1 className='text-center'>Войти</h1>
                            <Formik
                                initialValues={{
                                    userName: '',
                                    password: '',
                                }}
                                onSubmit={async (values) => {
                                    localStorage.removeItem('token');
                                    try {
                                        await axios.post('/api/v1/login', { username: values.userName , password: values.password }).then(
                                            (response) => {
                                            localStorage.setItem('token', response.data.token);
                                            navigate("/");
                                        });
                                    } catch (error){
                                        if (error.status === 401) {
                                            handleError('InValid User, Try Again.');
                                        }
                                    }
                                }}
                            > 
                                {() => (
                                    <div className="">
                                        <Form>
                                            <div style={{height: '20px'}}></div>
                                            <div className="form-group">
                                                <label htmlFor="userName">Ваш ник</label>
                                                <Field type="userName" id="userName" name="userName" className="form-control"/>
                                                <p className='text-danger'>{errorState}</p>
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
                        <Col className="rounded-bottom border-secondary border-top d-flex justify-content-md-center align-items-center mt-5 py-4 bg-white w-100">
                            <p className="my-0">Нет аккаунта?</p>
                            <div style={{width: '10px'}}></div>
                            <a href="#">Регистрация</a>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default Login;