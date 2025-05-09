import i18next from '../../../common/locales/i18n'

export const countMessages = (channelId, messages) => {
  const filtred = messages.filter(message => message.channelId === channelId)
  if (filtred.length.toString().endsWith('1')) {
    return `1 ${i18next.t('oneMessageTitle')}`
  }
  if (filtred.length.toString().endsWith('2') || filtred.length.toString().endsWith('3') || filtred.length.toString().endsWith('3')) {
    return `${filtred.length} ${i18next.t('twoMessagesTitle')}`
  }
  return `${filtred.length} ${i18next.t('moreMessagesTitle')}`
}
