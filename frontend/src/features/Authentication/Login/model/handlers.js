import login from './loginApi'
import { connectionErrorToast } from '../../../Chat/ui/additionalUI/Toasts'

export const handleLogin = async (credentials, navigate, setError, setIsLoading) => {
  setIsLoading(true)
  setError('')
  try {
    const data = await login(credentials)
    localStorage.setItem('token', data.token)
    localStorage.setItem('username', data.username)
    navigate('/')
  }
  catch (error) {
    if (error.status === 401) {
      setTimeout(() => {
        setIsLoading(false)
      }, 500)
      setError('Неверные имя пользователя или пароль')
    }
    connectionErrorToast()
  }
}
