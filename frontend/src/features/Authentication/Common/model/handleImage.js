import loginIcon from '../../../../assets/images/avatar.jpg'
import signUpIcon from '../../../../assets/images/avatar_1.jpg'

const handleImage = (type) => {
  return type === 'login' ? loginIcon : signUpIcon
}

export default handleImage
