// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // --- General Configuration ---
  // Directory for test files. Playwright will automatically look for tests here.
  // We will create this directory and populate it with visual testing scenarios.
  testDir: './src/visual_testing',
  // Timeout for each test in milliseconds. Increased for potentially complex visual tests.
  timeout: 45000,
  
  // Global test use options
  use: {
    baseURL: 'http://localhost:3000', // Set the base URL for relative paths to resolve correctly
  },
  
  expect: {
    // NOTE: maxDiffPixels for toHaveScreenshot must be passed directly to the method call,
    // to enable specific visual comparison thresholds. Example:
    // await expect(page).toHaveScreenshot({ maxDiffPixels: 150, animations: 'disabled' });
    // Animations are disabled in the example, which is generally recommended for stable screenshots.
  },

  // --- Parallel Execution Configuration ---
  // Configures the number of parallel worker processes.
  // Defaults to the number of CPU cores. Setting a fixed number for CI helps manage resources.
  // If running in CI, use 3 workers, otherwise use default.
  workers: 4,

  // --- Project Configuration for Different Environments/Browsers ---
  // Define different test configurations (projects) to run tests on.
  // This allows for cross-browser testing and specific viewport configurations.
  projects: [
    {
      name: 'chromium-latest',
      use: {
        ...devices['Desktop Chrome'], // Use desktop Chrome settings
        browserName: 'chromium', // Specify browser
        headless: true, // Run in headless mode
      },
    },
    {
      name: 'firefox-latest',
      use: {
        ...devices['Desktop Firefox'],
        browserName: 'firefox',
        headless: true,
      },
    },
    {
      name: 'webkit-latest',
      use: {
        ...devices['Desktop Safari'], // Use desktop Safari settings
        browserName: 'webkit',
        headless: true,
      },
    },
    // Example for a responsive test on a mobile viewport
    {
      name: 'chromium-mobile',
      use: {
        ...devices['Pixel 5'], // Use Pixel 5 mobile device settings
        browserName: 'chromium',
        headless: true,
      },
    },
    // Example showing how to specify a custom viewport if needed
    // {
    //   name: 'custom-desktop',
    //   use: {
    //     viewport: { width: 1280, height: 720 },
    //     browserName: 'chromium',
    //     headless: true,
    //   },
    // },
  ],

  // --- Reporting ---
  // Configure reporters. 'html' generates a detailed HTML report.
  // 'list' is a simple console reporter.
  reporter: [
    ['list'],
    ['html', { outputDir: 'playwright-report' }]
  ],

  // --- Output Directory for Screenshots and Traces ---
  // Where Playwright saves screenshots, traces, and other artifacts.
  // This aligns with Playwright's default behavior.
  outputDir: 'test-results/',

  // --- Server URL (optional configuration) ---
  // If your application needs to be run by Playwright or if you want to point to an already running instance,
  // you can configure 'webServer'. For now, we'll assume the app is run separately.
  // Example for running an app and waiting for it:
  webServer: {
    command: 'npm run start', // Start the frontend development server
    url: 'http://localhost:3000', // The URL Playwright should wait for
    reuseExistingServer: true,    // Use if the server is already running (like the one in Terminal 2)
  },
});