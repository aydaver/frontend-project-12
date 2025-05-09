import { useSelector } from 'react-redux';
import React from 'react';
import { countMessages } from '../../model/messageCounter';

const CountMessages = (props) => {
  const messages = useSelector((state) => state.messages.messages);

  return (
    <span>
      <p className="py-0 ms-3 pb-0 mb-0 text-secondary" style={{ fontSize: '14px' }}>
        {countMessages(props.channelId, messages)}
      </p>
    </span>
  );
};

export default CountMessages;
