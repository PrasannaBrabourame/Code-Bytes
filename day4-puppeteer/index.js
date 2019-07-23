const puppeteer = require('puppeteer');

puppeteer.launch({headless: false}).then(async browser => {
    const page = await browser.newPage();
    await page.goto('http://localhost:9999/',{waitUntil: 'domcontentloaded'});
    await page.type('#demoTextArea', 'Hello World');
    await page.click("#demobutton")
    await page.waitFor('.clsdemo')
    await browser.close();
});