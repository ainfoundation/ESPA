const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  page.on('response', async (response) => {
    const url = response.url();
    if (url.endsWith('.js')) {
      console.log('Found JS:', url);
      try {
        const text = await response.text();
        fs.writeFileSync(url.split('/').pop(), text);
      } catch(e) {}
    }
  });

  await page.goto('https://ais-pre-uqjybatwv25ftn2wysp2tl-513225669683.asia-southeast1.run.app/', { waitUntil: 'networkidle2' });
  console.log('Done');
  await browser.close();
})();
