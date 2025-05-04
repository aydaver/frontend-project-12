import messagePost from "./messagesApi";
import filter from 'leo-profanity';

export const handleText = (setText) => (e) => {
    setText(e.target.value);
};


export const handleSubmit = (text, channelId, setText) => { 

    const token = localStorage.getItem('token');

    filter.loadDictionary('ru')

    const newMessage = {
        body: filter.clean(text),
        channelId: channelId,
        username: localStorage.getItem('username'),
    };

    if(text.trim() !== '') {
        messagePost(newMessage, token)
    }

    setText('');
}