import { useSelector } from 'react-redux';

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  };
  const notify = useSelector((state) => state.notification);

  return <div style={style}>{notify}</div>;
};

export default Notification;
