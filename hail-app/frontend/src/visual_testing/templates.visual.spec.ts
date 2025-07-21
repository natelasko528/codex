import { test, expect } from '@playwright/test';

test.describe('Visual Regression Tests for Templates', () => {
  test('should match the templates list screenshot', async ({ page }) => {
    await page.goto('/templates'); // Navigate to the templates page
    // Hide webpack-dev-server overlay if present
    await page.evaluate(() => {
      const overlay = document.getElementById('webpack-dev-server-client-overlay');
      if (overlay) overlay.style.display = 'none';
    });

    // Wait for the template list to be visible to ensure the page is rendered
    // Using '.table' as a generic selector for a list, adjust if the actual class is different.
    await expect(page.locator('.table')).toBeVisible();

    // Take a screenshot of the entire page and compare it to the baseline.
    // Specific visual comparison options can be passed here, e.g.:
    // await expect(page).toHaveScreenshot({ maxDiffPixels: 150, animations: 'disabled' });
    await expect(page).toHaveScreenshot('templates-list-visual.png');
  });

  test('should match a specific template detail screenshot', async ({ page }) => {
    await page.goto('/templates');
    // Hide webpack-dev-server overlay if present
    await page.evaluate(() => {
      const overlay = document.getElementById('webpack-dev-server-client-overlay');
      if (overlay) overlay.style.display = 'none';
    });
    // Assuming navigation to a template detail page might be via clicking a template name or an 'edit' link.
    // This selector is an example and may need adjustment.
    await page.click('a:has-text("New Template")'); // Example: navigates to create new template page
    
    // Wait for a specific element that indicates the form for a template is loaded.
    // Using an ID selector as an example for input fields.
    await expect(page.locator('#name')).toBeVisible(); 

    // Take a screenshot of the template creation/detail view.
    await expect(page).toHaveScreenshot('template-creation-visual.png');
  });
});