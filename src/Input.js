import React, { useState } from 'react';

const Input = ({ sendMessage }) => {
  const [inputValue, setInputValue] = useState('');
  

  const handleChange = event => {
    setInputValue(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (inputValue.trim() !== '') {
      sendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <form className="input" onSubmit={e => handleSubmit(e)}>
      <input
        type="text"
        value={inputValue}
        onChange={e => handleChange(e)}
        placeholder="Upišite svoju poruku..."
      />
      <button type="submit">Pošalji</button>
    </form>
  );
};

export default Input;