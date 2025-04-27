import { Formik, Form, Field, ErrorMessage as Error } from 'formik';
import React, { useState } from 'react';
import { Button, Container, Row, Col, Image, Spinner } from 'react-bootstrap';
import authOff from '../../assets/authOff.jpg'
import authOn from '../../assets/authOn.jpg'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CommonHeader from '../CommonComponents/commonHeader';
import { schemas } from '../../Functions/validation';

const SignUp = () => {

    const [ errorStateUser, setErrorStateUser ] = useState();

    const [ errorStatePassword, setErrorStatePassword] = useState();

    const [image, setImage] = useState(authOff);

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = () => {
        setIsLoading(true);
    }

    const navigate = useNavigate();

    return (
        <Container className='bg-black mw-100 h-100 my-0 px-0' sm={12} lg={12}>
            <CommonHeader />
            <Row className="middle justify-content-center align-content-center h-100 pb-0 bg-light" sm={12} lg={12}>
                <Col className="bg-white rounded border border-secondary pt-5 shadow-sm" sm={8} lg={8}>
                    <Row className="middle-form" sm={12} lg={12}>
                        <Col className="middle-image justify-content-center d-flex align-items-center px-0 mx-0" sm={6} lg={6}>
                            <Image src={image} alt="login image" height='300' width="300" roundedCircle />
                        </Col>
                        <Col className="middle-inputs px-5" sm={6} lg={6}>
                            <h1 className='text-center'>Войти</h1>
                            <Formik
                                initialValues={{
                                    userName: '',
                                    password: '',
                                    passwordCheck: '',
                                }}
                                onSubmit={async (values) => {
                                    handleSubmit();
                                    if (values.password !== values.passwordCheck) {
                                        setErrorStateUser('')
                                        setErrorStatePassword('Пароли не совпадают');
                                        setTimeout(() => {
                                            setIsLoading(false);
                                        }, 500)
                                        return;
                                    }
                                    try {
                                        await axios.post('/api/v1/signup', { username: values.userName , password: values.password }).then(
                                            (response) => {
                                                setTimeout(() => {
                                                    setImage(authOn);
                                                }, 500)
                                            setTimeout(() => {
                                                localStorage.setItem('token', response.data.token);
                                                localStorage.setItem('username', response.data.username)
                                                navigate("/")
                                            }, 1000);
                                        });
                                    } catch (error){
                                        if (error.status === 409) {
                                            setTimeout(() => {
                                                setIsLoading(false);
                                            }, 500)
                                            setErrorStatePassword('')
                                            setErrorStateUser('Такой пользователь уже существует');
                                        }
                                    }
                                }}
                                validationSchema={schemas.signup}
                            > 
                                {() => (
                                    <div className="">
                                        <Form>
                                            <div className="form-group mt-4">
                                                <label htmlFor="userName">Ваш ник</label>
                                                <Field type="userName" id="userName" name="userName" className="form-control"/>
                                                <Error name="userName">{(error) => <span className='text-danger'>{error}</span>}</Error>
                                                <p className='text-danger'>{errorStateUser}</p>
                                            </div>
                                            <div className="form-group mt-4">
                                                <label htmlFor="password">Пароль</label>
                                                <Field type="password" id="password" name="password" className="form-control"/>
                                                <Error name="password">{(error) => <span className='text-danger'>{error}</span>}</Error>
                                            </div>
                                            <div className="form-group mt-4">
                                                <label htmlFor="passwordCheck">Подтвердите пароль</label>
                                                <Field type="password" id="passwordCheck" name="passwordCheck" className="form-control"/>
                                                <Error name="passwordCheck">{(error) => <span className='text-danger'>{error}</span>}</Error>
                                                <p className='text-danger'>{errorStatePassword}</p>
                                            </div>
                                            <Button type="submit" className='w-100 mt-5' disabled={isLoading}>
                                                {isLoading ? (
                                                <>
                                                    <Spinner
                                                    as="span"
                                                    animation="border"
                                                    size="sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                    className="me-2"
                                                    />
                                                    Вход...
                                                </>
                                                ) : (
                                                'Войти'
                                                )}
                                            </Button>
                                        </Form>
                                    </div>
                                )}
                            </Formik>
                        </Col>
                        <Col className="rounded-bottom border-secondary border-top d-flex justify-content-md-center align-items-center mt-5 py-4 bg-white w-100">
                            <p className="my-0">Есть аккаунт?</p>
                            <Button className='ps-2' variant="link" onClick={() => navigate("/login")}>Войти</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default SignUp;