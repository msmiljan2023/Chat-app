import React from 'react';

const Messages = ({ messages }) => {
  return (
    <div className="Messages">
      {messages.map((message, index) => (
        <div key={index} className="Message">
          <span className="Message__user">{message.clientData.user}: </span>
          <span className="Message__text">{message.data}</span>
        </div>
      ))}
    </div>
  );
};

export default Messages;