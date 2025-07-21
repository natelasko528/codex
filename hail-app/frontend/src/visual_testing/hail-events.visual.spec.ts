import { test, expect } from '@playwright/test';

test.describe('Visual Regression Tests for Hail Events', () => {
  test('should match the hail event list screenshot', async ({ page }) => {
    await page.goto('/hail-events'); // Navigate to the hail events page
    // Hide webpack-dev-server overlay if present
    await page.evaluate(() => {
      const overlay = document.getElementById('webpack-dev-server-client-overlay');
      if (overlay) overlay.style.display = 'none';
    });

    // Wait for the hail event list to be visible to ensure the page is rendered
    await expect(page.locator('table.table')).toBeVisible();

    // Take a screenshot of the entire page and compare it to the baseline.
    // Specific visual comparison options can be passed here, e.g.:
    // await expect(page).toHaveScreenshot({ maxDiffPixels: 150, animations: 'disabled' });
    await expect(page).toHaveScreenshot('hail-events-list-visual.png');
  });

  test('should match a specific hail event detail screenshot', async ({ page }) => {
    await page.goto('/hail-events');
    // Assuming navigation to a hail event detail page might be via clicking an event entry or an 'edit' button.
    // This selector is an example and may need adjustment.
    await page.click('a.btn-info'); // Click the first "View Properties" button

    // Wait for an element indicating the hail event detail view is loaded.
    // Changed from '.hail-event-detail' to use a more reliable selector
    await expect(page.locator('form')).toBeVisible();

    // Take a screenshot of the hail event detail view.
    await expect(page).toHaveScreenshot('hail-event-detail-visual.png');
  });
});