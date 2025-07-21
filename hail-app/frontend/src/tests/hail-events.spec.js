import { test, expect } from '@playwright/test';

test.describe('Hail Event Management', () => {
  test('should display the hail event list', async ({ page }) => {
    await page.goto('/hail-events');
    await expect(page.locator('text=Hail Events')).toBeVisible();
    await expect(page.locator('.hail-event-list')).toBeVisible();
  });

  test('should add a new hail event', async ({ page }) => {
    await page.goto('/hail-events');
    await page.click('button:has-text("Add Hail Event")');

    await page.fill('input[name="name"]', 'Test Hail Event');
    await page.fill('input[name="date"]', '2025-07-21');
    await page.fill('textarea[name="description"]', 'A test hail event.');
    await page.click('button[type="submit"]');

    await expect(page.locator('text=Test Hail Event')).toBeVisible();
  });

  test('visual regression test for hail event list', async ({ page }) => {
    await page.goto('/hail-events');
    await expect(page).toHaveScreenshot('hail-event-list.png');
  });
});