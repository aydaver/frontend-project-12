import * as Yup from 'yup';

const regx = {
    channelName: /^[a-zA-Zа-яА-ЯёЁ]{3,20}$/,
}

const channelName = Yup.string()
    .matches(regx.channelName, 'От 3 до 20 символов')
    .required('Обязательное поле')

export const schemas = {
    custom: Yup.object().shape({
        channelName,
    })
}