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
      await createNote(page, '20 Note by PW');

      await expect(page.getByText('20 Note by PW')).toBeVisible();
    });

    describe('and several notes exists', () => {
      beforeEach(async ({ page }) => {
        await createNote(page, '21 note by PW');
        await createNote(page, '22 note by PW');
        await createNote(page, '23 note by PW');
      });

      test('one of those can be made nonimortant', async ({ page }) => {
        const otherNoteText = page.getByText('22 note by PW');
        const otherNoteElement = otherNoteText.locator('..');

        await otherNoteElement
          .getByRole('button', { name: 'make not important' })
          .click();
        await expect(
          otherNoteElement.getByText('make important')
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
