const { test, expect, beforeEach, describe } = require('@playwright/test');
const { loginWith } = require('./heper');

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    // I don't want to reset users in DB every time
    // I created test user once and would like to use it

    // await request.post('/api/testin/reset');
    // await request.post('/api/users', {
    //   data: {
    //     name: 'PW test',
    //     username: 'PW test',
    //     password: 'PW test'
    //   }
    // });
    await page.goto('/');
  });

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  });

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      loginWith(page, 'test', 'test');

      await expect(page.getByText('test logged in')).toBeVisible();
    });

    test('fails with wrong credentials', async ({ page }) => {
      loginWith(page, 'test', 'wrong');
      await expect(page.getByText('Wrong username or password')).toBeVisible();
    });
  });
});
