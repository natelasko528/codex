import { test, expect } from '@playwright/test';

test.describe('Lead Management', () => {
  test('should display the lead list', async ({ page }) => {
    await page.goto('http://localhost:3000/leads');
    await expect(page.locator('text=Leads')).toBeVisible();
    await expect(page.locator('.lead-list')).toBeVisible();
  });

  test('should add a new lead', async ({ page }) => {
    await page.goto('http://localhost:3000/leads');
    await page.click('text=Add Lead');
    await page.fill('input[name="name"]', 'John Doe');
    await page.fill('input[name="email"]', 'john.doe@example.com');
    await page.fill('input[name="phone"]', '1234567890');
    await page.click('button[type="submit"]');
    await expect(page.locator('text=John Doe')).toBeVisible();
  });

  test('visual regression test for lead list', async ({ page }) => {
    await page.goto('http://localhost:3000/leads');
    await expect(page).toHaveScreenshot();
  });
});