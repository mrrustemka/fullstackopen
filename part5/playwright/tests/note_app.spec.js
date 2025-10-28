const { test, expect, describe } = require('@playwright/test');
describe('Note App', () => {
  test('front page can be opened', async ({ page }) => {
    await page.goto('http://localhost:5173');

    const locator = page.getByText('Notes');
    await expect(locator).toBeVisible();
    await expect(
      page.getByText(
        'Note app, Department of Computer Science, University of Helsinki 2025'
      )
    ).toBeVisible();
  });

  test('user can log in', async ({ page }) => {
    await page.goto('http://localhost:3001');

    await page.getByRole('button', { name: 'login' }).click();
    const textboxes = await page.getByRole('textbox').all();
    await page.getByLabel('username').fill('rustem');
    await page.getByLabel('password').fill('rustem');
    await page.getByRole('button', { name: 'login' }).click();

    await expect(page.getByText('rustem logged in')).toBeVisible();
  });
});
