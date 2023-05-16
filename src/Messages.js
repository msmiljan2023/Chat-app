import React from 'react';

const Messages = ({messages}) => {

    if(messages.lenght){console.log(messages);
        return (
            <ul className="Messages">
               {
                messages?.map((message, index) => renderMessage(message, index))
                }
              
            </ul>
          );
    }

    


};

const renderMessage = (message, index) => {
    const {text} = message;
    
    return (
    <li>
         <div key={index} className="Message">
          <span className="Message__user">{message.clientData.username}: </span>
          <span className="Message__text">{text}</span>
        </div>
    </li>
    )

}

export default Messages;