import React from 'react';

function Notification({ message, className }) {
  return <div className={className}>{message}</div>;
}

export default Notification;
