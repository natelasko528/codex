import { test, expect } from '@playwright/test';

test.describe('Diagnostic Tests - Finding Correct Selectors', () => {
  test('debug clients page selectors', async ({ page }) => {
    // Add console event listener to catch any JavaScript errors
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.log(`Console error: ${msg.text()}`);
      }
    });

    await page.goto('/clients');
    
    // Log the page URL to confirm navigation
    console.log('Current URL:', page.url());
    
    // Wait for any content to load
    await page.waitForLoadState('networkidle');
    
    // Check for webpack overlay iframe
    const overlay = await page.$('#webpack-dev-server-client-overlay');
    if (overlay) {
      console.log('⚠️ Webpack dev server overlay detected!');
      // Try to hide it
      await page.evaluate(() => {
        const overlay = document.querySelector('#webpack-dev-server-client-overlay');
        if (overlay) {
          (overlay as HTMLElement).style.display = 'none';
        }
      });
    }
    
    // Log all table elements on the page
    const tables = await page.$$eval('table', tables => 
      tables.map(table => ({
        classes: table.className,
        id: table.id,
        parentClasses: table.parentElement?.className
      }))
    );
    console.log('Found tables:', tables);
    
    // Log all divs that might contain the table
    const containers = await page.$$eval('div', divs => 
      divs.filter(div => div.querySelector('table'))
        .map(div => ({
          classes: div.className,
          id: div.id,
          hasTable: true
        }))
    );
    console.log('Table containers:', containers);
    
    // Check for React Bootstrap Table component
    const bootstrapTables = await page.$$eval('.table', tables => 
      tables.map(table => ({
        classes: table.className,
        tagName: table.tagName
      }))
    );
    console.log('Bootstrap tables:', bootstrapTables);
    
    // Try different selectors
    const selectors = [
      '.client-list',
      'table',
      '.table',
      'table.table',
      '[class*="table"]',
      'div:has(table)'
    ];
    
    for (const selector of selectors) {
      const count = await page.locator(selector).count();
      console.log(`Selector "${selector}" found ${count} elements`);
    }
    
    // Take a diagnostic screenshot
    await page.screenshot({ path: 'test-results/diagnostic-clients.png', fullPage: true });
  });

  test('debug hail events page selectors', async ({ page }) => {
    await page.goto('/hail-events');
    await page.waitForLoadState('networkidle');
    
    // Remove overlay if present
    await page.evaluate(() => {
      const overlay = document.querySelector('#webpack-dev-server-client-overlay');
      if (overlay) {
        (overlay as HTMLElement).style.display = 'none';
      }
    });
    
    const selectors = [
      '.hail-event-list',
      'table',
      '.table',
      'table.table',
      '.container table'
    ];
    
    for (const selector of selectors) {
      const count = await page.locator(selector).count();
      console.log(`Hail Events - Selector "${selector}" found ${count} elements`);
    }
    
    await page.screenshot({ path: 'test-results/diagnostic-hail-events.png', fullPage: true });
  });

  test('check for client detail elements', async ({ page }) => {
    await page.goto('/clients');
    await page.waitForLoadState('networkidle');
    
    // Look for links to client details
    const links = await page.$$eval('a', links => 
      links.filter(link => link.href.includes('/clients/') && link.href.includes('/edit'))
        .map(link => ({
          href: link.href,
          text: link.textContent,
          classes: link.className
        }))
    );
    console.log('Client edit links:', links);
    
    // Check for any clickable client elements
    const clientLinks = await page.$$eval('a.client-link', links => links.length);
    console.log('Links with .client-link class:', clientLinks);
  });
});