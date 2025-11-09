const { test, expect, beforeEach, describe } = require('@playwright/test');
const { loginWith, createBlog } = require('./heper');

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await page.goto('/');
  });

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  });

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'test', 'test');

      await expect(page.getByText('test logged in')).toBeVisible();
    });

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'test', 'wrong');

      await expect(page.getByText('Wrong username or password')).toBeVisible();
    });
  });

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'test', 'test');
    });

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'Test PW Title', 'Test PW Author', 'Test PW url');

      await expect(
        page.getByText('A new blog Test PW Title by Test PW Author added')
      ).toBeVisible();
    });

    test('a blog can be liked', async ({ page }) => {
      await page.getByRole('button', { name: 'View' }).first().click();

      const likesElement = page.locator('.likes');
      const likesText = await likesElement.textContent();
      const initialLikes = likesText.split(' ')[1];
      const curLikes = 0;

      await page.getByRole('button', { name: 'Like' }).click();
      setTimeout(async () => {
        likesText = await likesElement.textContent();
        curLikes = likesText.split(' ')[1];
      }, 3000);

      expect(curLikes === initialLikes + 1);
    });

    test('a new blog can be deleted', async ({ page }) => {
      await page.getByRole('button', { name: 'View' }).last().click();
      await page.getByRole('button', { name: 'Remove' }).click();

      page.on('dialog', async (dialog) => {
        await dialog.accept();
      });

      await expect(page.getByText('Test PW Title')).toBeHidden();
    });

    test('only the user who added the blog sees the blog remove button', async ({
      page
    }) => {
      const blogs = await page.locator('.blog').all();

      for (const blog of blogs) {
        await page.getByRole('button', { name: 'View' }).click();

        const author = await blog.locator('.author').textContent();

        if (author !== 'test') {
          await expect(
            blog.getByRole('button', { name: 'Remove' }).toBeHidden()
          );
        }
      }
    });

    test('blog with the most likes first', async ({ page }) => {
      const blogCount = await page.locator('.blog').count();

      const likesArray = [];

      for (let i = 0; i < blogCount; i++) {
        const blog = page.locator('.blog').nth(i);
        await blog.getByRole('button', { name: 'View' }).click();

        const textLikes = await blog.locator('.likes').textContent();
        const likes = parseInt(textLikes.split(' ')[1]);
        likesArray.push(likes);
      }

      for (let i = 0; i < likesArray.length - 1; i++) {
        expect(likesArray[i]).toBeGreaterThanOrEqual(likesArray[i + 1]);
      }
    });
  });
});
