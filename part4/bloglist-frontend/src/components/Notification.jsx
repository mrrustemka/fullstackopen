function Notification({ message, type }) {
  if (message === null) {
    return null;
  }

  return <div className={`notify ${type}`}>{message}</div>;
}

export default Notification;
