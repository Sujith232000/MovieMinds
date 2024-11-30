import React from 'react';
import '../styles/InputField.css';

const InputField = ({ type, placeholder }) => {
  return <input type={type} placeholder={placeholder} required />;
};

export default InputField;
