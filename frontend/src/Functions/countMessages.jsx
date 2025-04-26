import { useSelector } from "react-redux";
import React from "react";

const CountMessages = (props) => {

    const messages = useSelector((state) => state.messages.messages);

    const countMessages = (channelId) => {
        const filtred = messages.filter((message) => message.channelId === channelId);
        if (filtred.length === 1) {
            return '1 сообщение'
        } else if (filtred.length === 2 || filtred.length === 3 || filtred.length === 4) {
            return `${filtred.length} сообщения`
        }
            return `${filtred.length} сообщений`
    }

    return (
        <span><p className="py-0 ms-3 pb-0 mb-0 text-secondary" style={{ fontSize: '14px' }}>{countMessages(props.channelId)}</p></span>
    )
}

export default CountMessages;