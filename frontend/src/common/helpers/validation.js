import * as Yup from 'yup';
import i18next from 'i18next';
import russian from '../locales/ru';

i18next.init({
    lng: 'ru',
    resources: {
      ru: {
        translation:
          russian,
      },
    },
});

const regx = {
    channelName: /^[a-zA-Zа-яА-ЯёЁ\s\d]{3,20}$/,
    password: /^[a-zA-Zа-яА-ЯёЁ\s\d]{6,}$/,
    userName: /^[a-zA-Zа-яА-ЯёЁ\s\d]{3,20}$/,
}

const channelName = Yup.string()
    .matches(regx.channelName, i18next.t('threeToTwenty'))
    .required(i18next.t('requiredField'))
const password = Yup.string()
    .matches(regx.password, i18next.t('fromSix'))
    .required(i18next.t('requiredField'))
const userName = Yup.string()
    .matches(regx.channelName, i18next.t('threeToTwenty'))
    .required(i18next.t('requiredField'))
const passwordCheck = Yup.string()
    .oneOf([Yup.ref('password'), null], i18next.t('passwordsMustMatch'))
    .required(i18next.t('requiredField'))

export const schemas = {
    channel: Yup.object().shape({
        channelName,

    }),
    login: Yup.object().shape({
        userName,
    }),
    signup: Yup.object().shape({
        userName,
        password,
        passwordCheck,
    })
}