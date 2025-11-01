const { test, expect, beforeEach, describe } = require('@playwright/test');
const { loginWith } = require('./heper');

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Login form is shown', async ({ page }) => {
    loginWith(page, 'test', 'test');

    await expect(page.getByText('test logged in')).toBeVisible();
  });
});
