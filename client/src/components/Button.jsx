import React from 'react';

const Button = ({ children, onClick, className, type }) => {
  return (
    <button type={type} onClick={onClick} className={`px-4 py-2 rounded-lg ${className}`}>
      {children}
    </button>
  );
};

export default Button;
