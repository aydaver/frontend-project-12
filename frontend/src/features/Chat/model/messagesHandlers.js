import messagePost from "./messagesApi";

export const handleText = (setText) => (e) => {
    setText(e.target.value);
};


export const handleSubmit = (text, channelId, setText) => { 

    const token = localStorage.getItem('token');

    const newMessage = {
        body: text,
        channelId: channelId,
        username: localStorage.getItem('username'),
    };

    if(text.trim() !== '') {
        messagePost(newMessage, token)
    }

    setText('');
}