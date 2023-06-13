import React from 'react';

const Messages = (props) => { //def kao funk komp, prima props kao parametar koji predstavlja property passan kompoenenti
    const {messages, currentMember} = props; //poruke i trenutni član su ekstraktani iz propsa koristeći object destructuring

    return ( // 
        <ul className="messages">
            {messages?.map((m, i) => renderMessages(m, i, currentMember))} 
        </ul>
    )
};
//The map function allows us to transform each item in the array and return a new array of transformed items.

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