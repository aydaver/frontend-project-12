import axios from 'axios'
import { connectionErrorToast, channelAddedToast, channelEditedToast, channelDeletedToast } from '../ui/additionalUI/Toasts'

export const channelPost = async (newChannel, token) => {
  try {
    await axios.post('/import.meta.env.VITE_API_URL/v1/channels', newChannel, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    channelAddedToast()
  }
  catch {
    connectionErrorToast()
  }
}

export const channelEdit = async (channelId, newChannel, token) => {
  try {
    await axios.patch(`/import.meta.env.VITE_API_URL/v1/channels/${channelId}`, newChannel, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    channelEditedToast()
  }
  catch {
    connectionErrorToast()
  }
}

export const channelRemove = async (channelId, token) => {
  try {
    await axios.delete(`/import.meta.env.VITE_API_URL/v1/channels/${channelId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    channelDeletedToast()
  }
  catch {
    connectionErrorToast()
  }
}
