import { configureStore } from '@reduxjs/toolkit';

import notifyReducer from './reducers/notifyReducer';
import blogsReducer from './reducers/blogsReducer';

const store = configureStore({
	reducer: {
		blogs: blogsReducer,
		notify: notifyReducer,
	},
});

export default store;
