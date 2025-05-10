import i18next from '../../../../common/locales/i18n'
import { connectionErrorToast } from '../../../Chat/ui/additionalUI/Toasts'
import signUp from './signUpApi'

export const handleSignUp = async (credentials, navigate, setError, setIsLoading) => {
  setIsLoading(true)
  setError('')
  try {
    const data = await signUp(credentials)
    localStorage.setItem('token', data.token)
    localStorage.setItem('username', data.username)
    navigate('/')
  }
  catch (error) {
    if (error.status === 409) {
      setTimeout(() => {
        setIsLoading(false)
      }, 500)
      setError(i18next.t('userExist'))
    }
    connectionErrorToast()
  }
}
