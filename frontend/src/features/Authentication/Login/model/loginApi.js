import axios from 'axios'
import connectionErrorToast from '../ui/additionalUI/Toasts'

const login = async (credentials) => {
  try {
    const response = await axios.post(
      '/api/v1/login',
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

export default login
