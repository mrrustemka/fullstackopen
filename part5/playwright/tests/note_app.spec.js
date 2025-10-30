const { test, expect, describe, beforeEach } = require('@playwright/test');
// const { beforeEach } = require('node:test');
describe('Note App', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3001');
  });

  test('front page can be opened', async ({ page }) => {
    const locator = page.getByText('Notes');
    await expect(locator).toBeVisible();
    await expect(
      page.getByText(
        'Note app, Department of Computer Science, University of Helsinki 2025'
      )
    ).toBeVisible();
  });

  test('user can log in', async ({ page }) => {
    await page.getByRole('button', { name: 'login' }).click();
    await page.getByLabel('username').fill('rustem');
    await page.getByLabel('password').fill('rustem');
    await page.getByRole('button', { name: 'login' }).click();

    await expect(page.getByText('rustem logged in')).toBeVisible();
  });

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByRole('button', { name: 'login' }).click();
      await page.getByLabel('Username').fill('rustem');
      await page.getByLabel('Password').fill('rustem');
      await page.getByRole('button', { name: 'login' }).click();
    });

    test('A new note can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'new note' }).click();
      await page.getByLabel('Enter note').fill('A note created by Playwright');
      await page.getByRole('button', { name: 'Save' }).click();
      await expect(
        page.getByText('A note created by Playwright')
      ).toBeVisible();
    });
  });
});
