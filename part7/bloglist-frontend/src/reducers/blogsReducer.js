import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

const blogSlice = createSlice({
	name: 'blogs',
	initialState: [],
	reducers: {
		createBlog(state, action) {
			return [...state, action.payload];
		},
		setBlogs(state, action) {
			return action.payload;
		},
	},
});

const { createBlog, setBlogs } = blogSlice.actions;

export const initializeBlogs = () => {
	return async (dispatch) => {
		const blogs = await blogService.getAll();
		dispatch(setBlogs(blogs));
	};
};

export const newBlog = (content) => {
	return async (dispatch) => {
		const newBlog = await blogService.create(content);
		dispatch(createBlog(newBlog));
	};
};

export default blogSlice.reducer;
