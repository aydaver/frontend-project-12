/* eslint-disable react-hooks/exhaustive-deps */
import { io } from "socket.io-client";
import { addMessage, fetchMessages } from '../../../store/messagesSlice';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";

const Messages = (props) => {
  
  const [text, setText] = useState('');

  const dispatch = useDispatch();


  const handleText = (e) => {
    setText(e.target.value);
  };

  const messages = useSelector((state) =>
    state.messages.messages
  );

  const filteredMessages = useMemo(() => {
    return messages.filter((message) => message.channelId === props.channelId);
  }, [messages, props.channelId]);

  useEffect(() => {
          dispatch(fetchMessages())
      }, []);
      

  const handleSubmit = (e) => { 
      e.preventDefault();

      const token = localStorage.getItem('token');

      const newMessage = {
        body: text,
        channelId: props.channelId,
        username: localStorage.getItem('username'),
      };

      if(text.trim() !== '') {
        axios.post('/api/v1/messages', newMessage, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
      }

      setText('');
  }

  useEffect(() => {

    const socket = io("ws://localhost:5002");

    socket.on('newMessage', (payload) => {
      dispatch(addMessage(payload));
    });

    return () => {
      socket.off('newMessage');
    };
    
  }, []);

  return (
    <div className="h-100 d-flex flex-column">
      <div className="overflow-auto flex-grow-1 px-3 pt-3 pb-0">
        <ul style={{listStyleType: 'none', paddingLeft: 0}}>
          {filteredMessages.map((message) => (
            <li key={message.id}>
              <span className="d-flex">
                <h5 className="pe-1 mb-0 pt-1">{`${message.username}:`}</h5>
                <p className="mb-0 align-content-end">{message.body}</p>
              </span>
            </li>
          ))}
        </ul>
      </div>
      <form onSubmit={handleSubmit} className="d-flex border-top p-2">
        <input
          className="form-control me-2"
          value={text}
          onChange={handleText}
          type="text"
          placeholder="Введите сообщение"
        />
        <button type="submit" className="btn btn-primary">Отправить</button>
      </form>
    </div>
  );
};

export default Messages;