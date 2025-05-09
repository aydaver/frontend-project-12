import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import i18next from 'i18next'
import russian from '../../../../common/locales/ru'

i18next.init({
  lng: 'ru',
  resources: {
    ru: {
      translation:
          russian,
    },
  },
})

const ExitButton = () => {
  const navigate = useNavigate()

  const handleRemoveToken = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div>
      <form onSubmit={handleRemoveToken}>
        <Button type="submit">{i18next.t('exitButton')}</Button>
      </form>
    </div>
  )
}

export default ExitButton
