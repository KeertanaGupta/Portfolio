const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 }
  });
  
  await page.goto('http://127.0.0.1:8083');
  
  await page.waitForTimeout(4000);
  
  await page.addStyleTag({ content: `
    section:not(#achievements) { display: none !important; }
    .hero { display: none !important; }
    .loader { display: none !important; }
  ` });
  
  await page.evaluate(() => {
    window.scrollTo(0, 0);
  });
  
  await page.waitForTimeout(1500);
  
  await page.screenshot({ path: 'C:/Users/VSMPRS/.gemini/antigravity/brain/2867ccc5-22e8-4932-b364-8431f90b5e33/achievements_section_check.png' });
  
  console.log('Screenshot saved successfully.');
  await browser.close();
})();
