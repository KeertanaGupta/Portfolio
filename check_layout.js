const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://127.0.0.1:8082');

  const getRect = async (selector) => {
    return await page.evaluate((sel) => {
      const el = document.querySelector(sel);
      return el ? el.getBoundingClientRect() : null;
    }, selector);
  };

  const header = await getRect('.certifications__header');
  const zone = await getRect('.certs-zone');
  const row1 = await getRect('.certs-row--1');
  const row2 = await getRect('.certs-row--2');
  const velocity = await getRect('.cert-velocity');
  
  console.log('Header:', header);
  console.log('Zone:', zone);
  console.log('Row 1:', row1);
  console.log('Row 2:', row2);
  console.log('Velocity:', velocity);

  await browser.close();
})();
