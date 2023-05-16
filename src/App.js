import React, { useState, useEffect } from 'react';
import Messages from './Messages';
import Input from './Input';
import './App.css';

const randomName = () => {
  const adjectives = ["autumn", "hidden", "bitter", "misty", "silent", "empty", "dry", "dark", "summer", "icy", "delicate", "quiet", "white", "cool", "spring", "winter", "patient", "twilight", "dawn", "crimson", "wispy", "weathered", "blue", "billowing", "broken", "cold", "damp", "falling", "frosty", "green", "long", "late", "lingering", "bold", "little", "morning", "muddy", "old", "red", "rough", "still", "small", "sparkling", "throbbing", "shy", "wandering", "withered", "wild", "black", "young", "holy", "solitary", "fragrant", "aged", "snowy", "proud", "floral", "restless", "divine", "polished", "ancient", "purple", "lively", "nameless"];
  const nouns = ["waterfall", "river", "breeze", "moon", "rain", "wind", "sea", "morning", "snow", "lake", "sunset", "pine", "shadow", "leaf", "dawn", "glitter", "forest", "hill", "cloud", "meadow", "sun", "glade", "bird", "brook", "butterfly", "bush", "dew", "dust", "field", "fire", "flower", "firefly", "feather", "grass", "haze", "mountain", "night", "pond", "darkness", "snowflake", "silence", "sound", "sky", "shape", "surf", "thunder", "violet", "water", "wildflower", "wave", "water", "resonance", "sun", "wood", "dream", "cherry", "tree", "fog", "frost", "voice", "paper", "frog", "smoke", "star"];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return adjective + noun;
}

const randomColor = () => {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}


const App = () => {
  const [messages, setMessages] = useState([]);
  const [member, setMember] = useState({
    color: randomColor(),
    username: randomName()
  })
  const [drone, setDrone] = useState(null);
  const channelID = 'uI0rRE5A0ZifuZBv';


  useEffect(() => {
    const initializeChat = async () => {
      const drone = new Scaledrone(channelID); // eslint-disable-line

      drone.on('open', error => {
        if (error) {
          console.error(error);
        } else {
          console.log('Connected to Scaledrone');
          const room = drone.subscribe(channelID);

          const stateMember = {...member};
          stateMember.id = drone.clientId;
          setMember({...stateMember});

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
    const messagesList = messages;
    messagesList.push({
      text: messageText,
      member: member
    });
    setMessages([...messagesList]);
  };



  return (
      <div className="app">
        <h1>Chat App</h1>
        <Messages messages={messages} currentMember={member} />
        <Input sendMessage={sendMessage} />
      </div>
  );
};

export default App;