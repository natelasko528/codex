import { test, expect } from '@playwright/test';

test.describe('Client Management', () => {
    test('should display the client list', async ({ page }) => {
        await page.goto('/clients');
        await expect(page.locator('text=Clients')).toBeVisible();
        await expect(page.locator('.client-list')).toBeVisible();
    });

    test('should add a new client', async ({ page }) => {
        await page.goto('/clients');
        await page.click('button:has-text("Add Client")');
        
        await page.fill('input[name="name"]', 'Test Client');
        await page.fill('input[name="email"]', 'test@client.com');
        await page.fill('input[name="phone"]', '1234567890');
        
        await page.click('button[type="submit"]');
        
        await expect(page.locator('text=Test Client')).toBeVisible();
    });

    test('visual regression: client list', async ({ page }) => {
        await page.goto('/clients');
        await expect(page).toHaveScreenshot('client-list.png');
    });
});