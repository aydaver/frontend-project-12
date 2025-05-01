export const countMessages = (channelId, messages) => {

    const filtred = messages.filter((message) => message.channelId === channelId);
    if (filtred.length === 1) {
        return '1 сообщение'
    } else if (filtred.length === 2 || filtred.length === 3 || filtred.length === 4) {
        return `${filtred.length} сообщения`
    }
        return `${filtred.length} сообщений`
}