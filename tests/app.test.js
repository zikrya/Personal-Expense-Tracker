import { test, expect } from '@playwright/test';
test.use({ headless: false });

test.describe('TransTable Component Tests', () => {

    test('should redirect unauthenticated users', async ({ page }) => {
        await page.goto('http://localhost:5173/transtable');
        await expect(page).toHaveURL('http://localhost:5173/login');
    });

    test('should display transactions for authenticated users', async ({ page }) => {
        // Log in as an authenticated user
        await page.goto('http://localhost:5173/login');
        await page.fill('input[name="email"]', 'user@example.com');
        await page.fill('input[name="password"]', 'password');
        await page.click('text=Login');

        // Navigate to the TransTable component
        await page.goto('http://localhost:5173/transtable');
        await expect(page.locator('table >> text=Date')).toBeVisible(); // Assuming 'Date' is in the transaction list table header
    });

    // test('should allow adding a transaction', async ({ page }) => {
    //     // Assuming you're already logged in and on the TransTable component

    //     // Fill in the Add Transaction form (replace selectors with actual ones from your form)
    //     await page.click('text=New Transaction'); // If there's a button to open the Add Transaction form
    //     await page.fill('input[name="amount"]', '100'); // Replace 'input[name="amount"]' with the actual selector
    //     await page.fill('input[name="description"]', 'Test Transaction'); // Replace 'input[name="description"]' with the actual selector
    //     await page.click('text=Submit'); // Replace with the actual text/selector of the submit button

    //     // Check if the new transaction is in the list
    //     await expect(page.locator('text=Test Transaction')).toBeVisible();
    // });
});
