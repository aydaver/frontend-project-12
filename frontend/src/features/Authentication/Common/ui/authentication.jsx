import { Formik, Form, Field, ErrorMessage as Error } from 'formik';
import React, { useState } from 'react';
import { Button, Container, Row, Col, Image, Spinner } from 'react-bootstrap';
import authOff from '../../../../assets/images/authOff.jpg'
import { useNavigate } from 'react-router-dom';
import CommonHeader from '../../../Common/ui/CommonHeader';
import { schemas } from '../../../Common/helpers/validation';
import { handleLogin } from '../../Login/model/handlers';
import { handleSignUp } from '../../SignUp/model/handlers';

const Authentication = (props) => {

    const { type } = props;

    const [ errorState, setError ] = useState();

    const [image, setImage] = useState(authOff);

    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handlePasswordCheck = () => {
        return type === 'signup' ? 
        <div className="form-group mb-4">
            <label htmlFor="passwordCheck">Подтвердите пароль</label>
            <Field type="password" name="passwordCheck" className="form-control"/>
            <Error name="passwordCheck">{(error) => <span className='text-danger'>{error}</span>}</Error>
        </div> 
        : 
        null;
    }

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
                            <h1 className='text-center mb-4'>{type === 'signup' ? 'Регистрация' : 'Войти'}</h1>
                            <Formik
                                initialValues={{
                                    userName: '',
                                    password: '',
                                }}
                                onSubmit={async (values) =>  type === "signup" ? await handleSignUp(values, navigate, setError, setImage, setIsLoading) : await handleLogin(values, navigate, setError, setImage, setIsLoading)}
                                validationSchema={type === 'signup' ? schemas.signup : schemas.login}
                            > 
                                {() => (
                                    <div className="">
                                        <Form>
                                            <div className="form-group mb-4">
                                                <label htmlFor="userName">Ваш ник</label>
                                                <Field type="userName" id="userName" name="userName" className="form-control"/>
                                                <Error name="userName">{(error) => <span className='text-danger'>{error}</span>}</Error>
                                                <p className='text-danger my-0'>{errorState}</p>
                                            </div>
                                            <div className="form-group mb-4">
                                                <label htmlFor="password">Пароль</label>
                                                <Field type="password" name="password" className="form-control"/>
                                                <Error name="password">{(error) => <span className='text-danger'>{error}</span>}</Error>
                                            </div>
                                            {handlePasswordCheck()}
                                            <Button type="submit" className='w-100' disabled={isLoading}>
                                                {isLoading ? (
                                                <>
                                                    <Spinner
                                                    as="span"
                                                    animation="border"
                                                    size="sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                    className="me-2"
                                                    /> {
                                                    type === 'signup' ? 'Регистрация' : 'Вход...'
                                                    }
                                                </>
                                                ) : (
                                                type === 'signup' ? 'Регистрация' : 'Войти'
                                                )}
                                            </Button>
                                        </Form>
                                    </div>
                                )}
                            </Formik>
                        </Col>
                        <Col className="rounded-bottom border-secondary border-top d-flex justify-content-md-center align-items-center mt-5 py-4 bg-white w-100">
                            <p className="my-0">{type === 'signup' ? 'Есть аккаунт?' : 'Нет аккаунта?'}</p>
                            <Button className='my-0 pe-0 ps-2' variant='link' onClick={() => {navigate(type === 'signup' ? "/login" : "/signup")}}>{type === 'signup' ? 'Войти' : 'Регистрация'}</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default Authentication;