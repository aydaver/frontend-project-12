import axios from 'axios'

const login = async (credentials) => {
  const response = await axios.post(
    '/import.meta.env.VITE_API_URL/v1/login',
    {
      username: credentials.userName,
      password: credentials.password,
    },
  )
  return response.data
}

export default login
