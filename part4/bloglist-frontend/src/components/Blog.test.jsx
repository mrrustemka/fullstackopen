import { render, screen } from '@testing-library/react';
import Blog from './Blog';
import { expect } from 'vitest';
import userEvent from '@testing-library/user-event';

test('Does blog have any title and author', () => {
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

test('Does blog URL and likes shown', async () => {
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

  //   const url = screen.getByText('url');
  //   const likes = screen.getByText('Likes');
  //   expect(url).toBeInTheDocument();
  expect(screen.getByText(/Likes/i)).toBeInTheDocument();
  expect(screen.getByText('rustem')).toBeInTheDocument();
});
