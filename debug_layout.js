const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://127.0.0.1:8082');

  // Wait a bit for JS to run
  await page.waitForTimeout(3000);

  const getRect = async (selector) => {
    return await page.evaluate((sel) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      return {
        top: Math.round(rect.top),
        bottom: Math.round(rect.bottom),
        height: Math.round(rect.height),
        position: style.position,
        display: style.display,
        marginTop: style.marginTop
      };
    }, selector);
  };

  const results = {
    section: await getRect('#certifications'),
    header: await getRect('.certifications__header'),
    zone: await getRect('.certs-zone'),
    row1: await getRect('.certs-row--1'),
    row2: await getRect('.certs-row--2'),
    velocity: await getRect('.cert-velocity')
  };

  console.log(JSON.stringify(results, null, 2));

  await browser.close();
})();
