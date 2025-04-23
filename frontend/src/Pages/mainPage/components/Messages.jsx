/* eslint-disable react-hooks/exhaustive-deps */
import { io } from "socket.io-client";
import { addMessage, clearMessages } from '../../../store/messagesSlice';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";

const Messages = (props) => {
  
  const [text, setText] = useState('');

  const dispatch = useDispatch();

  const handleClear = () => {
    dispatch(clearMessages());
  };

  const handleText = (e) => {
    setText(e.target.value);
  };

  const messages = useSelector((state) =>
    state.messages.messages
  );

  const handleSubmit = (e) => { 
      e.preventDefault();

      const token = localStorage.getItem('token');

      const newMessage = {
        body: text,
        channelId: props.currentChannelId,
        username: localStorage.getItem('username'),
      };

      axios.post('/api/v1/messages', newMessage, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setText('');

      console.log(messages);
  }

  useEffect(() => {

    const socket = io("ws://localhost:5002");

    socket.on('newMessage', (payload) => {
      dispatch(addMessage(payload));
    });

    return () => {
      socket.off('newMessage');
    };
    
  }, [handleSubmit]);

  return (
    <div>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>
            <span className="d-flex">
              <h5>{message.username}</h5>
              <p>{message.body}</p>
            </span>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          value={text}
          onChange={handleText}
          type="text"
          placeholder="Введите сообщение"
        />
        <button type="submit">Отправить</button>
      </form>
      <button onClick={handleClear}>Clear</button>
    </div>
  );
};

export default Messages;