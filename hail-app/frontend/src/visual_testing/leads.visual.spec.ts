import { test, expect } from '@playwright/test';

test.describe('Visual Regression Tests for Leads', () => {
  test('should match the leads list screenshot', async ({ page }) => {
    await page.goto('/leads'); // Navigate to the leads page
    // Hide webpack-dev-server overlay if present
    await page.evaluate(() => {
      const overlay = document.getElementById('webpack-dev-server-client-overlay');
      if (overlay) overlay.style.display = 'none';
    });

    // Wait for the lead list to be visible to ensure the page is rendered
    await expect(page.locator('table.table')).toBeVisible();

    // Take a screenshot of the entire page and compare it to the baseline.
    // Specific visual comparison options can be passed here:
    // await expect(page).toHaveScreenshot({ maxDiffPixels: 100, animations: 'disabled' });
    await expect(page).toHaveScreenshot('leads-list-visual.png');
  });

  test('should match a specific lead detail screenshot', async ({ page }) => {
    await page.goto('/leads');
    // Assuming navigation to a lead detail page might be via clicking a lead name or an 'edit' button.
    // This selector is an example and may need adjustment.
    await page.click('a.btn-info'); // Click the first edit button

    // Wait for an element indicating the lead detail view is loaded.
    // Changed from '.lead-detail' to use a more reliable selector
    await expect(page.locator('form')).toBeVisible();

    // Take a screenshot of the lead detail view.
    await expect(page).toHaveScreenshot('lead-detail-visual.png');
  });
});