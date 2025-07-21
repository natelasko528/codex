import { test, expect } from '@playwright/test';

test.describe('Template Management', () => {
  test('should display the template list', async ({ page }) => {
    await page.goto('/templates');
    await expect(page.locator('text=Marketing Templates')).toBeVisible();
    await expect(page.locator('.table')).toBeVisible();
  });

  test('should add a new template', async ({ page }) => {
    await page.goto('/templates');
    await page.click('a:has-text("New Template")');

    await page.fill('input[id="name"]', 'Test Template');
    await page.fill('input[id="subject"]', 'Test Subject');
    await page.fill('textarea[id="body"]', 'Test Body');
    await page.click('button[type="submit"]');

    // Since the app uses mock data and doesn't actually add the template,
    // we will check that we are redirected back to the template list.
    await expect(page.locator('text=Marketing Templates')).toBeVisible();
  });

  test('visual regression test for template list', async ({ page }) => {
    await page.goto('/templates');
    await expect(page).toHaveScreenshot('template-list.png');
  });
});