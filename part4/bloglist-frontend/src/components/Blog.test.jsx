import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';
import CreateBlog from './CreateBlog';

test('Blog has any title and author', () => {
  const blog = {
    title: 'Title',
    author: 'Author'
  };

  render(<Blog blog={blog} />);

  const title = screen.getByText('Title');
  const author = screen.getByText('Author');
  expect(title).toBeInTheDocument();
  expect(author).toBeInTheDocument();
});

test('URL and likes shown', async () => {
  const blog = {
    title: 'Title',
    author: 'Author',
    url: 'my_url',
    likes: 5,
    user: { username: 'rustem', id: '1' }
  };

  const mockSetLikes = vi.fn();
  const mockRemove = vi.fn();
  const user = userEvent.setup();

  render(
    <Blog
      blog={blog}
      setBlogLikes={mockSetLikes}
      remove={mockRemove}
      user={{ id: '1' }}
    />
  );

  const button = screen.getByText('View');
  await user.click(button);

  expect(screen.getByText(/Likes/i)).toBeInTheDocument();
  expect(screen.getByText('rustem')).toBeInTheDocument();
});

test('Like button increases likes count and calls handler twice', async () => {
  const blog = {
    title: 'Title',
    author: 'Author',
    url: 'my_url',
    likes: 5,
    user: { username: 'rustem', id: '1' }
  };

  const mockSetLikes = vi.fn();
  const mockRemove = vi.fn();
  const user = userEvent.setup();

  render(
    <Blog
      blog={blog}
      setBlogLikes={mockSetLikes}
      remove={mockRemove}
      user={{ id: '1' }}
    />
  );

  const buttonView = screen.getByText('View');
  await user.click(buttonView);

  const buttonLike = screen.getByText('Like');
  await user.click(buttonLike);
  await user.click(buttonLike);

  expect(mockSetLikes).toHaveBeenCalledTimes(2);
});

test('Form calls handler with right details', async () => {
  const mockCreateBlog = vi.fn();
  const user = userEvent.setup();

  render(<CreateBlog createBlog={mockCreateBlog} />);

  await user.type(screen.getByPlaceholderText('Enter title'), 'New York');
  await user.type(screen.getByPlaceholderText('Enter author'), 'autotest');
  await user.type(screen.getByPlaceholderText('Enter URL'), 'autotest');

  await user.click(screen.getByText('Create'));

  expect(mockCreateBlog).toHaveBeenCalledTimes(1);
  expect(mockCreateBlog).toHaveBeenCalledWith(
    'New York',
    'autotest',
    'autotest',
    expect.any(Object)
  );
});
