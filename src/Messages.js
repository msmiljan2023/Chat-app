import React from 'react';

const Messages = (props) => {
    const {messages, currentMember} = props;

    return (
        <ul className="messages">
            {messages?.map((m, i) => renderMessages(m, i, currentMember))}
        </ul>
    )
};

const renderMessages = (message, index, currentMember) => {
    const messageFromMe = message?.member?.id === currentMember?.id;
    const className = messageFromMe ? 'message currentMember' : 'message';

    return (
        <li key={index} className={className}>
            <span
                className="avatar"
                style={{backgroundColor: message.member.color}}
            >
                {message.member.username.charAt(0).toUpperCase()}
            </span>
            <div key={index} className="texts">
                <span className="user">{message.member.username}: </span>
                <span className="text">{message.text}</span>
            </div>
        </li>
    )
}

export default Messages;