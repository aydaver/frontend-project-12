import axios from 'axios'
import connectionErrorToast from '../ui/additionalUI/Toasts'

const signUp = async (credentials) => {
  try {
    const response = await axios.post(
      '/api/v1/signup',
      {
        username: credentials.userName,
        password: credentials.password,
      },
    )
    return response.data
  }
  catch {
    connectionErrorToast()
  }
}

export default signUp
