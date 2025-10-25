import { render, screen } from '@testing-library/react';
import Blog from './Blog';
import { expect } from 'vitest';

test('Does blog have any title and author', async () => {
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
