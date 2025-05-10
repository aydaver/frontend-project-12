import axios from 'axios'
import { connectionErrorToast } from '../../../Chat/ui/additionalUI/Toasts'

const signUp = async (credentials) => {
  const response = await axios.post(
    '/api/v1/signup',
    {
      username: credentials.userName,
      password: credentials.password,
    },
  )
  return response.data
}

export default signUp
