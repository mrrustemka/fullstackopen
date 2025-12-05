import { useState, useEffect } from 'react';

function Notification({ notification }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [notification]);

  if (!visible || !notification) {
    return null;
  }

  return (
    <div style={{ border: '1px solid black', padding: '5px' }}>
      {notification}
    </div>
  );
}

export default Notification;
