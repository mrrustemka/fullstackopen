import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { newBlog } from '../reducers/blogsReducer';

function CreateBlog({ createBlog }) {
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [url, setUrl] = useState('');
	const dispatch = useDispatch();

	function addBlog(event) {
		event.preventDefault();
		createBlog(title, author, url, event);
		setTitle('');
		setAuthor('');
		setUrl('');
	}

	return (
		<>
			<h2>Create Blog</h2>
			<form onSubmit={addBlog}>
				<div>
					<label>
						Title
						<input
							type='text'
							value={title}
							onChange={({ target }) => {
								setTitle(target.value);
							}}
							placeholder='Enter title'
						/>
					</label>
				</div>
				<div>
					<label>
						Author
						<input
							type='text'
							value={author}
							onChange={({ target }) => {
								setAuthor(target.value);
							}}
							placeholder='Enter author'
						/>
					</label>
				</div>
				<div>
					<label>
						URL
						<input
							type='text'
							value={url}
							onChange={({ target }) => {
								setUrl(target.value);
							}}
							placeholder='Enter URL'
						/>
					</label>
				</div>
				<button type='submit'>Create</button>
			</form>
		</>
	);
}

export default CreateBlog;
