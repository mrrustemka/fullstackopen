const SET_NOTIFICATION = 'SET_NOTIFICATION/set';
const CLEAR_NOTIFICATION = 'CLEAR_NOTIFICATION';

const initialState = {
	message: null,
	type: null,
};

const notifyReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_NOTIFICATION:
			return {
				message: action.payload.message,
				type: action.payload.type,
			};

		case CLEAR_NOTIFICATION:
			return initialState;

		default:
			return state;
	}
};

export default notifyReducer;

// action creators
export const setNotification = (message, type = 'info') => ({
	type: SET_NOTIFICATION,
	payload: {
		message,
		type,
	},
});

export const clearNotification = () => ({
	type: CLEAR_NOTIFICATION,
});

// thunk
export const notify = (message, type = 'info', timeout = 3000) => {
	return (dispatch) => {
		dispatch(setNotification(message, type));

		setTimeout(() => {
			dispatch(clearNotification());
		}, timeout);
	};
};
