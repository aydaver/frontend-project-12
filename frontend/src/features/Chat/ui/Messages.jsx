
import { io } from "socket.io-client";
import { addMessage, fetchMessages } from '../../../common/messagesSlice';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useMemo, useRef } from "react";
import { handleText } from "../model/messagesHandlers";
import { handleSubmit } from "../model/messagesHandlers";
import CountMessages from "./additionalUI/CountMessages";
import i18next from 'i18next';
import russian from '../../../common/locales/ru';

i18next.init({
    lng: 'ru',
    resources: {
      ru: {
        translation:
          russian,
      },
    },
});
  

const Messages = (props) => {

    const { channelId, channelName } = props;

    const [text, setText] = useState('');
  
    const messages = useSelector((state) => state.messages.messages);

    const filteredMessages = useMemo(() => {
        return messages.filter((message) => message.channelId === props.channelId);
    }, [messages, props.channelId]);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchMessages())
    }, []);
    

    useEffect(() => {

        const socket = io("ws://localhost:5001");

        socket.on('newMessage', (payload) => {
            dispatch(addMessage(payload));
        });

        return () => {
            socket.off('newMessage');
        };

    }, []);

    const scrollContainerRef = useRef(null);

    useEffect(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
        }
      }, [filteredMessages]);

    return (
            <div className="h-100 d-flex flex-column">
                <div className="bg-light py-3 shadow-sm rounded-top">
                    <p className="pt-0 mb-0 ms-3 fw-semibold">{`# ${channelName}`}</p>
                    <CountMessages channelId={channelId}/>
                </div>
                <div className="flex-grow-1 overflow-hidden d-flex flex-column">
                    <div className="h-100 d-flex flex-column">
                        <div ref={scrollContainerRef} className="overflow-auto flex-grow-1 px-3 pt-3 pb-0">
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
                        <form onSubmit={(e) => {
                                e.preventDefault();
                                handleSubmit(text, channelId, setText);
                            }} 
                            className="d-flex border-top p-2">
                            <input 
                            autoFocus
                            className="form-control me-2"
                            value={text}
                            aria-label="Новое сообщение"
                            onChange={handleText(setText)}
                            type="text"
                            placeholder={i18next.t('messagePlaceHolder')}
                            />
                            <button type="submit" className="btn btn-primary">{i18next.t('sendButton')}</button>
                        </form>
                    </div>
                </div>
            </div>
            );
};

export default Messages;