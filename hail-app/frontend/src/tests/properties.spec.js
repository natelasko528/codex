import { test, expect } from '@playwright/test';

test.describe('Property Management', () => {
  test('should display the property list', async ({ page }) => {
    await page.goto('/properties');
    await expect(page.locator('text=Properties')).toBeVisible();
    await expect(page.locator('.property-list')).toBeVisible();
  });

  test('should add a new property', async ({ page }) => {
    await page.goto('/properties');
    await page.click('button:has-text("Add Property")');

    await page.fill('input[name="name"]', 'Test Property');
    await page.fill('input[name="address"]', '123 Test St');
    await page.fill('input[name="rent"]', '1500');
    await page.click('button[type="submit"]');

    await expect(page.locator('text=Test Property')).toBeVisible();
  });

  test('visual regression test for property list', async ({ page }) => {
    await page.goto('/properties');
    await expect(page).toHaveScreenshot('property-list.png');
  });
});