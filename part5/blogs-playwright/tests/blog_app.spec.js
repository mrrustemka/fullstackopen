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
  });
});
