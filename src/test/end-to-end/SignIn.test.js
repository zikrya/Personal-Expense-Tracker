import puppeteer from "puppeteer";

test('Puppeteer', async () => {
   // below creates a browser and returns a promise
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 80,
        args: ['--window-size=1920,1080']
   });
   // const newPage = await browser.newPage();
})