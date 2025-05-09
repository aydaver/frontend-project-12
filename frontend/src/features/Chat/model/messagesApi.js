import axios from 'axios';

const messagePost = (newMessage, token) => {
  axios.post('/api/v1/messages', newMessage, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default messagePost;
