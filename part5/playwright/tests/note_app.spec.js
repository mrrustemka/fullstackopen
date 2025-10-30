const { test, expect, describe, beforeEach } = require('@playwright/test');
import { loginWith, createNote } from './helper';
describe('Note App', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset');
    await request.post('/api/users', {
      data: {
        name: 'PW test',
        username: 'PW test',
        password: 'PW test'
      }
    });
    await page.goto('/');
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
    await loginWith(page, 'PW test', 'PW test');

    await expect(page.getByText('PW test logged in')).toBeVisible();
  });

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'PW test', 'PW test');
    });

    test('A new note can be created', async ({ page }) => {
      await createNote(page, '10 Note by PW');

      await expect(page.getByText('10 Note by PW')).toBeVisible();
    });

    describe('and a note exists', () => {
      beforeEach(async ({ page }) => {
        await createNote(page, '10 note by PW');
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
    await loginWith(page, 'PW test', 'wrong');

    const errorDiv = page.locator('.error');
    await expect(errorDiv).toContainText('wrong credentials');
    await expect(errorDiv).toHaveCSS('border-style', 'solid');
    await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)');

    await expect(page.getByText('rustem')).not.toBeVisible();
  });
});
