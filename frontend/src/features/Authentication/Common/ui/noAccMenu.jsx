import { useNavigate } from 'react-router-dom'
import i18next from '../../../../common/locales/i18n'
import {
  Button, Col,
} from 'react-bootstrap'

const NoAccMenu = (props) => {
  const { type } = props

  const navigate = useNavigate()

  return type === 'login'
    ? (
        <Col
          className="rounded-bottom border-secondary border-top d-flex justify-content-md-center align-items-center mt-5 py-4 bg-white w-100"
        >
          <p className="my-0">{i18next.t('noAccountQuestion')}</p>
          <Button className="my-0 pe-0 ps-2" variant="link" onClick={() => { navigate('/signup') }}>{i18next.t('signupTitle')}</Button>
        </Col>
      )
    : null
}

export default NoAccMenu
