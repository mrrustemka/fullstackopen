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
  });
});
