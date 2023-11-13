// used the resource: https://www.youtube.com/watch?v=r9HdJ8P6GQI to guide e2e test to understand puppeteer syntax
// with html file that was converted from the Login.jsx file since the react/js integration was giving me trouble.
import puppeteer from 'puppeteer';

test('url updates after submitting login form', async () => {
   const visual = await puppeteer.launch({
    headless: false, // show visual
    slowMo: 80, // slowdown visuals
    args: ['--window-size=1920,1080']
   });

   const newPage = await visual.newPage(); // make a visual browser
   await newPage.goto('file:///Users/siemaalam/Desktop/Fall 2023/Topics in SWE/Test-Wise-Wallet/src/test/end-to-end/SignIn.html');
   await newPage.type('input#email', 'testing@gmail.com');
   await newPage.type('input#password', 'test1234!');
   await newPage.click('input#remember');
   await newPage.click('#submitBtn');
   const updatedUrl = await newPage.url(); // get updated url
   // this test below should pass, as when the submit button is clicked, the url will be changed to capture the info
   expect(updatedUrl).toBe('file:///Users/siemaalam/Desktop/Fall%202023/Topics%20in%20SWE/Test-Wise-Wallet/src/test/end-to-end/SignIn.html?email=testing%40gmail.com&password=test1234%21');
   await visual.close(); // close browser
}, 30000); // add more time to test