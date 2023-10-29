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