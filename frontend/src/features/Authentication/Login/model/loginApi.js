import axios from 'axios'

const login = async (credentials) => {
  const response = await axios.post(
    '/api/v1/login',
    {
      username: credentials.userName,
      password: credentials.password,
    },
  )
  return response.data
}

export default login
