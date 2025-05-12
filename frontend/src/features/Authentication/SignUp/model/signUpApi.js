import axios from 'axios'

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
