import axios from 'axios'
import { connectionErrorToast, channelAddedToast, channelEditedToast, channelDeletedToast } from '../ui/additionalUI/Toasts'

export const channelPost = async (newChannel, token) => {
  try {
    await axios.post('/api/v1/channels', newChannel, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    channelAddedToast()
  }
  catch (error) {
    connectionErrorToast()
  }
}

export const channelEdit = async (channelId, newChannel, token) => {
  try {
    await axios.patch(`/api/v1/channels/${channelId}`, newChannel, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    })
    channelEditedToast()
  }
  catch (error) {
    connectionErrorToast()
  }
}

export const channelRemove = async (channelId, token) => {
  try {
    await axios.delete(`/api/v1/channels/${channelId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    })
    channelDeletedToast()
  }
  catch (error) {
    connectionErrorToast()
  }
}
