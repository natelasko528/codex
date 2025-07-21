import { test, expect } from '@playwright/test';

test.describe('Visual Regression Tests for Properties', () => {
  test('should match the properties list screenshot', async ({ page }) => {
    await page.goto('/properties'); // Navigate to the properties page
    // Hide webpack-dev-server overlay if present
    await page.evaluate(() => {
      const overlay = document.getElementById('webpack-dev-server-client-overlay');
      if (overlay) overlay.style.display = 'none';
    });

    // Wait for the property list to be visible to ensure the page is rendered
    await expect(page.locator('table.table')).toBeVisible();

    // Take a screenshot of the entire page and compare it to the baseline.
    // We can pass specific visual comparison options here if needed, e.g.:
    // await expect(page).toHaveScreenshot({ maxDiffPixels: 150, animations: 'disabled' });
    // For this initial test, we'll let the config defaults apply via the toHaveScreenshot method itself.
    await expect(page).toHaveScreenshot('properties-list-visual.png');
  });

  test('should match a specific property detail screenshot', async ({ page }) => {
    await page.goto('/properties');
    // Assuming there's a link or button to view details of the first property.
    // This selector might need to be adjusted based on the actual DOM structure.
    await page.click('a.btn-warning'); // Click the first edit button

    // Wait for a specific element that indicates detail view is loaded.
    // Changed from '.property-detail' to use a more reliable selector
    await expect(page.locator('form')).toBeVisible();

    // Take a screenshot of the property detail view.
    await expect(page).toHaveScreenshot('property-detail-visual.png');
  });
});