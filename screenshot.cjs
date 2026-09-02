const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto('https://ais-pre-uqjybatwv25ftn2wysp2tl-513225669683.asia-southeast1.run.app/', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: 'screenshot.png' });
  console.log('Saved screenshot');
  await browser.close();
})();
