const { test, expect, describe, beforeEach } = require('@playwright/test');
describe('Note App', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3001/api/testing/reset');
    await request.post('http://localhost:3001/api/users', {
      data: {
        name: 'PW test',
        username: 'PW test',
        password: 'PW test'
      }
    });
    await page.goto('http://localhost:3001');
  });

  test.only('front page can be opened', async ({ page }) => {
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
    await page.getByLabel('username').fill('PW test');
    await page.getByLabel('password').fill('PW test');
    await page.getByRole('button', { name: 'login' }).click();

    await expect(page.getByText('PW test logged in')).toBeVisible();
  });

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByRole('button', { name: 'login' }).click();
      await page.getByLabel('Username').fill('PW test');
      await page.getByLabel('password').fill('PW test');
      await page.getByRole('button', { name: 'login' }).click();
    });

    test('A new note can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'new note' }).click();
      await page.getByLabel('Enter note').fill('2 PW note');
      await page.getByRole('button', { name: 'Save' }).click();
      await expect(page.getByText('2 PW note')).toBeVisible();
    });

    describe('and a note exists', () => {
      beforeEach(async ({ page }) => {
        await page.getByRole('button', { name: 'new note' }).click();
        await page.getByRole('textbox').fill('Another note by PW');
        await page.getByRole('button', { name: 'Save' }).click();
      });

      test('Importance can be changed', async ({ page }) => {
        await page
          .getByRole('button', { name: 'make not important' })
          .last()
          .click();
        expect(
          page.getByRole('button', { name: 'make important' }).last()
        ).toBeVisible();
      });
    });
  });

  test('login fails with wrong wdong password', async ({ page }) => {
    await page.getByRole('button', { name: 'login' }).click();
    await page.getByLabel('username').fill('PW test');
    await page.getByLabel('password').fill('wrong');
    await page.getByRole('button', { name: 'login' }).click();

    const errorDiv = page.locator('.error');
    await expect(errorDiv).toContainText('wrong credentials');
    await expect(errorDiv).toHaveCSS('border-style', 'solid');
    await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)');

    await expect(page.getByText('rustem')).not.toBeVisible();
  });
});
