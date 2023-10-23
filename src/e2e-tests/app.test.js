import { test, expect } from '@playwright/test';
test.use({ headless: false });

test('user can login successfully', async ({ page }) => {
  // Navigate to login
  await page.goto('http://localhost:5173/login'); // Update with your React app's URL

  await page.fill('input[name="email"]', 'samira@example.com'); // Update with a valid email
  await page.fill('input[name="password"]', 'password123'); // Update with a valid password
  
  // Click login
  await page.click('button:text("Login")');
  await page.waitForNavigation();

  await expect(page.url()).toBe('http://localhost:5173/');
});
