import { handleLogin } from '../../Login/model/handlers'
import { handleSignUp } from '../../SignUp/model/handlers'

const handleSubmit = (type, navigate, values, setError, setIsLoading) => {
  return type === 'signup'
    ? handleSignUp(values, navigate, setError, setIsLoading)
    : handleLogin(values, navigate, setError, setIsLoading)
}

export default handleSubmit
