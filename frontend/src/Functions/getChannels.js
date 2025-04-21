import axios from 'axios';

const getChannels = (token) => {
    axios.get('/api/v1/channels', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then((response) => {
        console.log(response);
        return (response);
    });
}

export default getChannels;