import * as Yup from 'yup';

const regx = {
    channelName: /^[a-zA-Zа-яА-ЯёЁ\s\d]{3,20}$/,
    password: /^[a-zA-Zа-яА-ЯёЁ\s\d]{6,}$/,
    userName: /^[a-zA-Zа-яА-ЯёЁ\s\d]{3,20}$/,
}

const channelName = Yup.string()
    .matches(regx.channelName, 'От 3 до 20 символов')
    .required('Обязательное поле')
const password = Yup.string()
    .matches(regx.password, 'Не менее 6 символов')
    .required('Обязательное поле')
const userName = Yup.string()
    .matches(regx.channelName, 'От 3 до 20 символов')
    .required('Обязательное поле')
const passwordCheck = password;

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