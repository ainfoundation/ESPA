const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('PAGE ERROR LOG:', msg.text());
    }
  });

  page.on('pageerror', error => {
    console.log('PAGE ERROR EVENT:', error.message);
    console.log('STACK:', error.stack);
  });

  try {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  } catch(e) {
    console.log('Goto Error:', e);
  }
  await browser.close();
})();
