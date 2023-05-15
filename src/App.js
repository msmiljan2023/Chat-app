import React, { useState, useEffect } from 'react';
import Messages from './Messages';
import Input from './Input';
import './App.css';
import Scaledrone from 'scaledrone-react-native';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [drone, setDrone] = useState(null);
  const channelID = 'uI0rRE5A0ZifuZBv';
  const apiKey = '7EnBDGcEt13jmBY7FdeF2adaoSfJ9OAf';

  useEffect(() => {
    const initializeChat = async () => {
      const drone = new Scaledrone(apiKey);

      drone.on('open', error => {
        if (error) {
          console.error(error);
        } else {
          console.log('Connected to Scaledrone');
          const room = drone.subscribe(channelID);
          room.on('open', error => {
            if (error) {
              console.error(error);
            } else {
              console.log('Joined room');
            }
          });
        }
      });

      drone.on('message', (message, room) => {
        const newMessage = {
          text: message.data,
          sender: message.clientId,
        };
        setMessages(prevMessages => [...prevMessages, newMessage]);
      });

      setDrone(drone);
    };

    initializeChat();
  }, []);

  const sendMessage = messageText => {
    if (drone) {
      drone.publish({
        room: channelID,
        message: messageText,
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