const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  page.on('response', async (response) => {
    const url = response.url();
    if (url.includes('ManagementApp') && url.endsWith('.js')) {
      console.log('Found JS:', url);
      const text = await response.text();
      fs.writeFileSync('ManagementApp-recovered.js', text);
    }
  });

  await page.goto('https://ais-pre-uqjybatwv25ftn2wysp2tl-513225669683.asia-southeast1.run.app/', { waitUntil: 'networkidle2' });
  await browser.close();
})();
