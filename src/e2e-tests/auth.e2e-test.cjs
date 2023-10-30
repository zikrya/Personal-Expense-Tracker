const { chromium } = require('playwright');
const { expect } = require('chai');

let browser;
let page;

before(async function() {
  this.timeout(10000);
  browser = await chromium.launch();
  page = await browser.newPage();
  await page.goto('http://localhost:5174/register');
});

after(async function() {
  this.timeout(10000);
  if (browser) {
    await browser.close();
  }
});

describe('User Authentication', function() {
  this.timeout(100000);

  it('should register a new user', async function() {
    // Input email
    try {
      await page.waitForSelector('input[name="email"]');
      await page.fill('input[name="email"]', 'test@example.com');
    } catch (e) {
      await page.screenshot({ path: 'error-email-input.png' });
      throw e;
    }

    // Input password
    await page.fill('input[name="password"]', 'password123');

    // Click register button and wait for redirection
    try {
      await page.waitForSelector('button[name="register"]:not(:disabled)');
      const clickPromise = page.click('button[name="register"]');
      await page.waitForNavigation({ waitUntil: "load" });
      await clickPromise;
    } catch (e) {
      await page.screenshot({ path: 'error-register-button.png' });
      throw e;
    }

    // Check if redirected to the homepage
    try {
      const currentURL = page.url();
      expect(currentURL).to.equal('http://localhost:5174/');
    } catch (e) {
      await page.screenshot({ path: 'error-redirection-check.png' });
      throw e;
    }
  });

  // Add more tests for login, logout, password reset, etc. as needed
});



