import axios from 'axios'

export const channelPost = async (newChannel, token) => {
    await axios.post('/api/v1/channels', newChannel, {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    });
}

export const channelEdit = async (channelId, newChannel, token) => {
    await axios.patch(`/api/v1/channels/${channelId}`, newChannel, {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    });
}

export const channelRemove = async (channelId, token) => {
    await axios.delete(`/api/v1/channels/${channelId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
}