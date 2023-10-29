const { generateLoginInfo, generateValidLoginInfo } = require("./util")
const puppeteer = require("puppeteer");

//unit test
//input cannot be null
test("valid login info test", () => {
    const res = generateLoginInfo("gaoqiangzhouer@gmail.com", "Zhou123123");
    expect(res).toEqual({email: "gaoqiangzhouer@gmail.com", password: "Zhou123123"});
})
test("invalid login info test", () => {
    const res = generateLoginInfo("gaoqiangzhouer@gmail.com", "");
    expect(res).toBe(null);
})
//integration test
test("if both infomation are valid", () => {
    const res = generateValidLoginInfo("gaoqiangzhouer@gmail.com", "Zhou1231232!");
    expect(res).toEqual({email: "gaoqiangzhouer@gmail.com", password: "Zhou1231232!"});
})
test("if one infomation are valid", () => {
    const res = generateValidLoginInfo("gaoqiangzhouergmail.com", "Zhou1231232!");
    expect(res).toBe(null);
})
//e2e test
//when login info is correct
test("try to login with correct info", async () => {
    const browser = await puppeteer.launch({
        headless: false,
        sloMo: 80
    });
    const page = await browser.newPage();
    await page.goto("http://localhost:5173/login");
    await page.click("input#email");
    await page.type("input#email", "gaoqiangzhouer@gmail.com");
    await page.click("input#password");
    await page.type("input#password", "Zhou123123!");
    //after submit, page should go to home page
    await Promise.all([
        page.click("button#submit", {waitUntil: "domcontentloaded",}),
        page.waitForNavigation({waitUntil: 'networkidle2'})
    ]);

    //shou be on home page now
    expect(page.url()).toBe("http://localhost:5173/");
})
test("try to login with wrong info", async () => {
    const browser = await puppeteer.launch({
        headless: false,
        sloMo: 80
    });
    const page = await browser.newPage();
    await page.goto("http://localhost:5173/login");
    await page.click("input#email");
    await page.type("input#email", "gaoqiangzhouergmail.com");
    await page.click("input#password");
    await page.type("input#password", "Zhou123123!");
    await page.click("button#submit");

    //still on the same page
    expect(page.url()).toBe("http://localhost:5173/login");
})