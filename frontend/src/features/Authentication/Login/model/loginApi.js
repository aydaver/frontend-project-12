import axios from 'axios'

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
  catch (error) {
    console.log(error)
    throw error
  }
}

export default login
