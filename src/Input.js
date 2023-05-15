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
    <form className="Input" onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Upišite svoju poruku..."
      />
      <button type="submit">Pošalji</button>
    </form>
  );
};

export default Input;