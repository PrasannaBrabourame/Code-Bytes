const puppeteer = require('puppeteer');

puppeteer.launch({headless: false}).then(async browser => {
    const page = await browser.newPage();
    await page.goto('http://inet/LeaveTracks/login.aspx',{waitUntil: 'domcontentloaded'});
    await page.type('#txtUsername', 'is7302');
    await page.type('#txtPassword', 'Rajkumar30');
    await page.click("#btnLogin")
    await page.click('#Signout1_LinkButton3')
    //await page.type('#txtReason', 'SL')
    // await page.waitFor('.clsdemo')
    //await browser.close();
});