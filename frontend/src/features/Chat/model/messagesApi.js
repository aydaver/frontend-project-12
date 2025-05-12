import axios from 'axios'
import { connectionErrorToast } from '../ui/additionalUI/Toasts'

const messagePost = (newMessage, token) => {
  try {
    axios.post('/import.meta.env.VITE_API_URL/v1/messages', newMessage, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }
  catch {
    connectionErrorToast()
  }
}

export default messagePost
