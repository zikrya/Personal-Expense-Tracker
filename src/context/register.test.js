const puppeteer = require('puppeteer');

describe('Registration Process', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  it('registers a new user', async () => {
    await page.goto('http://localhost:5173/register'); 

    // Click on the registration link/button
    await page.click('a[href="/register"]');

    // Fill in the registration form
    await page.type('input[name="email"]', 'test@example.com');
    await page.type('input[name="password"]', 'testPassword');

    // Submit the form
    await page.click('button[type="submit"]');

    
    await page.waitForSelector('.registration-success');

    // successful registration
    const registrationSuccessText = await page.$eval('.registration-success', (el) => el.textContent);
    expect(registrationSuccessText).toBe('Registration successful');
  });
});
