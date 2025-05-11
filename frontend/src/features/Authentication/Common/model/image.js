import loginIcon from '../../../../assets/images/avatar.jpg'
import signUpIcon from '../../../../assets/images/avatar_1.jpg'

const imager = (type) => {
    return type === 'login' ? loginIcon : signUpIcon
}

export default imager
