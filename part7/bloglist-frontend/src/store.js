import { configureStore } from '@reduxjs/toolkit';

import notifyReducer, { notify } from './reducers/notifyReducer';

const store = configureStore({
	reducer: {
		notify: notifyReducer,
	},
});

export default store;
