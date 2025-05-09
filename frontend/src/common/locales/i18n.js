import i18next from 'i18next'
import russian from './ru'

i18next.init({
  lng: 'ru',
  resources: {
    ru: {
      translation:
          russian,
    },
  },
})

export default i18next
