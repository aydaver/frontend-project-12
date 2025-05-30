import filter from 'leo-profanity'
import messagePost from './messagesApi'

export const handleText = setText => (e) => {
  setText(e.target.value)
}

export const handleSubmit = (text, channelId, setText) => {
  const token = localStorage.getItem('token')

  filter.loadDictionary('ru')
  filter.loadDictionary('en')

  const newMessage = {
    body: filter.clean(text),
    channelId,
    username: localStorage.getItem('username'),
  }

  if (text.trim() !== '') {
    messagePost(newMessage, token)
  }

  setText('')
}
