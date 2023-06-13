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

const drone = new Scaledrone('uI0rRE5A0ZifuZBv'); // eslint-disable-line
const roomName = "martinas-room";

const App = () => {
  const [messages, setMessages] = useState([]);
  const [member, setMember] = useState({color: randomColor(), username: randomName()});

  drone.data = member;

  useEffect(() => {
    const initializeChat = () => {
      drone.on('open', error => { //handla se connection status
        if (error) {
          console.log(error);
          drone.unsubscribe();
        } else {
          console.log('Connected to Scaledrone');
          const stateMember = {...member}; //spread operator or object destructuring - creates a copy of existing object. new object - stateMember
          stateMember.id = drone.clientId;
          setMember(stateMember); //updates member state variablu

          const room = drone.subscribe(roomName); //app će osluškivati u toj sobi
          room.on('data', (data) => { //event listener za dolazeće poruke, kad god dođe nova poruka the code inside the callback function will execute.
            const messagesList = messages; // => [] messagesList is declared and initialized as a reference to the messages array from the component's state.Da se izbjegne direktno modificireANJE messages
            messagesList.push({ //push u messageList
              member: data.user,
              text: data.text
            });
            setMessages([...messagesList]);
          });
        }
      });
    };

    initializeChat();
  }, [messages, member]);

  const sendMessage = (messageText) => {
    // publish to scaledrone room, poruka se šalje u sobu specificiranu imenom roomName
    drone.publish({
      room: roomName,
      message: {
        text: messageText,
        user: member
      }
    });
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