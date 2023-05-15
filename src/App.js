import React, { useState, useEffect } from 'react';
import Messages from './Messages';
import Input from './Input';
import './App.css';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [drone, setDrone] = useState(null);
  const channelID = '1jJPqqZfTkgfKXNM'; // Replace with your own channel ID

  useEffect(() => {
    const initializeChat = async () => {
      const Scaledrone = require('scaledrone-react-native').default;
      const drone = new Scaledrone('ulFkgG6JXx5Ei5VShbTbEagc9ZEyeuNCY'); // Replace with your own Scaledrone API key

      drone.on('open', error => {
        if (error) {
          console.error(error);
        } else {
          setDrone(drone);
        }
      });

      drone.on('message', message => {
        setMessages(prevMessages => [...prevMessages, message]);
      });
    };

    initializeChat();
  }, []);

  const sendMessage = messageText => {
    if (drone) {
      drone.publish({
        room: channelID,
        message: messageText
      });
    }
  };

  return (
    <div className="App">
      <h1>Chat App</h1>
      <Messages messages={messages} />
      <Input sendMessage={sendMessage} />
    </div>
  );
};

export default App;