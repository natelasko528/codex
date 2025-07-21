import { test, expect } from '@playwright/test';

test.describe('Visual Regression Tests for Clients', () => {
  test('should match the clients list screenshot', async ({ page }) => {
    await page.goto('/clients'); // Navigate to the clients page
    // Hide webpack-dev-server overlay if present
    await page.evaluate(() => {
      const overlay = document.getElementById('webpack-dev-server-client-overlay');
      if (overlay) overlay.style.display = 'none';
    });

    // Wait for the client list to be visible to ensure the page is rendered
    await expect(page.locator('table.table')).toBeVisible();

    // Take a screenshot of the entire page and compare it to the baseline.
    // Specific visual comparison options can be passed here, e.g.:
    // await expect(page).toHaveScreenshot({ maxDiffPixels: 150, animations: 'disabled' });
    await expect(page).toHaveScreenshot('clients-list-visual.png');
  });

  test('should match a specific client detail screenshot', async ({ page }) => {
    await page.goto('/clients');
    // Assuming navigation to a client detail page might be via clicking a client name or an 'edit' button.
    // This selector is an example and may need adjustment.
    await page.click('a.btn-info'); // Click the first edit button

    // Wait for an element indicating the client detail view is loaded.
    // Changed from '.client-detail' to use a more reliable selector
    await expect(page.locator('form')).toBeVisible();

    // Take a screenshot of the client detail view.
    await expect(page).toHaveScreenshot('client-detail-visual.png');
  });
});