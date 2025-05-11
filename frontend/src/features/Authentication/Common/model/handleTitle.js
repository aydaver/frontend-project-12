import i18next from '../../../../common/locales/i18n'

const handleTitle = (type) => {
  return type === 'signup' 
  ? i18next.t('signupTitle') 
  : i18next.t('loginTitle')
}

export default handleTitle
