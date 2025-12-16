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
		likeBlogs(state, action) {
			const id = action.payload.id;
			const blogToChange = state.find((b) => b.id === id);

			if (blogToChange) {
				blogToChange.likes = action.payload.likes;
			}
		},
		removeBlog(state, action) {
			const id = action.payload;
			return state.filter((blog) => blog.id !== id);
		},
	},
});

const { createBlog, setBlogs, likeBlogs, removeBlog } = blogSlice.actions;

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

export const addLike = (id, blog) => {
	return async (dispatch) => {
		const updateBlog = await blogService.setLikes(id, blog);
		dispatch(likeBlogs(updateBlog));
	};
};

export const deleteBlog = (id) => {
	return async (dispatch) => {
		await blogService.remove(id);
		dispatch(removeBlog(id));
	};
};

export default blogSlice.reducer;
