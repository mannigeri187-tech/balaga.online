const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

async function generateFavicons() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const svgPath = path.resolve('D:/balaga.online/apps/web/public/icon.svg');
  const svgContent = fs.readFileSync(svgPath, 'utf8');
  
  const sizes = [
    { size: 48, filename: 'favicon-48x48.png' },
    { size: 96, filename: 'favicon-96x96.png' },
    { size: 144, filename: 'favicon-144x144.png' },
    { size: 192, filename: 'icon-192.png' },
    { size: 512, filename: 'icon-512.png' }
  ];

  for (const { size, filename } of sizes) {
    await page.setViewportSize({ width: Math.max(size, 100), height: Math.max(size, 100) });
    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            * { margin: 0; padding: 0; }
            body { background: transparent; }
            #container { width: ${size}px; height: ${size}px; display: inline-block; }
            svg { width: ${size}px; height: ${size}px; display: block; }
          </style>
        </head>
        <body>
          <div id="container">${svgContent}</div>
        </body>
      </html>
    `);

    const dest = path.resolve('D:/balaga.online/apps/web/public', filename);
    const element = await page.$('#container');
    await element.screenshot({ path: dest, omitBackground: true });
    console.log(`Generated: ${filename} (${size}x${size})`);
  }

  const p48 = fs.readFileSync(path.resolve('D:/balaga.online/apps/web/public/favicon-48x48.png'));
  fs.writeFileSync(path.resolve('D:/balaga.online/apps/web/public/favicon.ico'), p48);
  console.log('Updated favicon.ico with 48x48 icon');

  await browser.close();
}

generateFavicons().catch(err => {
  console.error(err);
  process.exit(1);
});
