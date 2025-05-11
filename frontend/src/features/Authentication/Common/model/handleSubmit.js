import { useNavigate } from 'react-router-dom'
import { handleLogin } from '../../Login/model/handlers'
import { handleSignUp } from '../../SignUp/model/handlers'

const handleSubmit = (type, values, setError, setIsLoading) => {
  const navigate = useNavigate()

  return type === 'signup'
  ? handleSignUp(navigate, values, setError, setIsLoading)
  : handleLogin(navigate, values, setError, setIsLoading)
}

export default handleSubmit
