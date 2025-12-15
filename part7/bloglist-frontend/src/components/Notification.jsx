import { useSelector } from 'react-redux';

function Notification() {
	const { message, type } = useSelector((state) => state.notify);

	if (!message) return null;

	return <div className={`notify ${type}`}>{message}</div>;
}

export default Notification;
