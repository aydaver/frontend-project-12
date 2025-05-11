import {
  Formik, Form, Field, ErrorMessage as Error,
} from 'formik'
import { useState } from 'react'
import {
  Button, Container, Row, Col, Image, Spinner,
} from 'react-bootstrap'
import imager from '../model/image'
import PasswordConfirm from './passwordConfirm'
import NoAccMenu from './noAccMenu'
import handleSubmit from '../model/handleSubmit'
import i18next from '../../../../common/locales/i18n'
import CommonHeader from '../../../../common/ui/CommonHeader'
import schemas from '../../../../common/helpers/validation'
import handleTitle from '../model/handleTitle'
import { useNavigate } from 'react-router-dom'

const Authentication = (props) => {
  const { type } = props

  const [errorState, setError] = useState()

  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  return (
    <Container className="bg-black mw-100 h-100 my-0 px-0" sm={12} lg={12}>
      <CommonHeader />
      <Row className="middle justify-content-center align-content-center h-100 pb-0 bg-light" sm={12} lg={12}>
        <Col className="bg-white rounded border border-secondary pt-5 shadow-sm" sm={8} lg={8}>
          <Row className="middle-form" sm={12} lg={12}>
            <Col className="middle-image justify-content-center d-flex align-items-center px-0 mx-0" sm={6} lg={6}>
              <Image src={imager(type)} alt="login image" height="300" width="300" roundedCircle />
            </Col>
            <Col className="middle-inputs px-5" sm={6} lg={6}>
              <h1 className="text-center mb-4">{handleTitle(type)}</h1>
              <Formik
                initialValues={{
                  userName: '',
                  password: '',
                }}
                onSubmit={values => handleSubmit(type, navigate, values, setError, setIsLoading)}
                validationSchema={type === 'signup' ? schemas.signup : schemas.login}
              >
                {() => (
                  <div className="">
                    <Form>
                      <div className="form-group mb-4">
                        <label htmlFor="userName" className="w-100">
                          {type === 'signup' ? i18next.t('nickNameFormTitleSignUp') : i18next.t('nickNameFormTitleLogin')}
                          <Field id="userName" type="userName" name="userName" className="form-control" />
                        </label>
                        <Error id="userName" name="userName">{error => <span className="text-danger">{error}</span>}</Error>
                        <p className="text-danger my-0">{errorState}</p>
                      </div>
                      <div className="form-group mb-4">
                        <label htmlFor="password" className="w-100">
                          {i18next.t('passwordFormTitle')}
                          <Field id="password" type="password" name="password" className="form-control" />
                        </label>
                        <Error id="password" name="password">{error => <span className="text-danger">{error}</span>}</Error>
                      </div>
                      <PasswordConfirm type={type} />
                      <Button type="submit" className="w-100" disabled={isLoading}>
                        {isLoading
                          ? (
                              <>
                                <Spinner
                                  as="span"
                                  animation="border"
                                  size="sm"
                                  role="status"
                                  aria-hidden="true"
                                  className="me-2"
                                />
                                {' '}
                                {
                                  `${handleTitle(type)}...`
                                }
                              </>
                            )
                          : (
                              handleTitle(type)
                            )}
                      </Button>
                    </Form>
                  </div>
                )}
              </Formik>
            </Col>
            <NoAccMenu type={type} />
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default Authentication
