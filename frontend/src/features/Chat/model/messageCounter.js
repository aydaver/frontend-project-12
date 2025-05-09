import i18next from '../../../common/locales/i18n'

export const countMessages = (channelId, messages) => {
  const filtred = messages.filter(message => message.channelId === channelId)
  if (filtred.length === 1) {
    return `1 ${i18next.t('oneMessageTitle')}`
  } if (filtred.length === 2 || filtred.length === 3 || filtred.length === 4) {
    return `${filtred.length} ${i18next.t('twoMessagesTitle')}`
  }
  return `${filtred.length} ${i18next.t('moreMessagesTitle')}`
}
