const { chromium } = require("playwright");
const routes = [
  "/",
  "/about",
  "/community",
  "/sponsor",
  "/events",
  "/contact",
  "/register",
  "/login",
  "/trust-center",
  "/privacy",
  "/terms",
  "/security",
  "/code-of-conduct",
  "/academy",
  "/blog",
  "/glossary",
];
const devices = [
  { name: "iPhone SE", width: 320, height: 568 },
  { name: "iPhone 13", width: 390, height: 844 },
  { name: "iPad Mini", width: 768, height: 1024 },
];

(async () => {
  console.log("Starting dev server...");
  const { exec } = require("child_process");
  const server = exec("npm run dev -- --port 8080");

  await new Promise((r) => setTimeout(r, 5000));

  const browser = await chromium.launch();
  for (const device of devices) {
    const context = await browser.newContext({
      viewport: { width: device.width, height: device.height },
    });
    const page = await context.newPage();

    for (const route of routes) {
      console.log(`Testing ${route} on ${device.name}...`);
      try {
        await page.goto(`http://localhost:8080${route}`, { waitUntil: "load", timeout: 15000 });

        // Let animations settle
        await page.waitForTimeout(1000);

        const hasOverflow = await page.evaluate(() => {
          const docWidth = document.documentElement.scrollWidth;
          const winWidth = window.innerWidth;
          if (docWidth > winWidth) {
            // Find culprits
            const elements = document.querySelectorAll("*");
            const culprits = [];
            for (const el of elements) {
              if (el.scrollWidth > winWidth && el.tagName !== "HTML" && el.tagName !== "BODY") {
                culprits.push(el.tagName + "." + el.className);
              }
            }
            return { docWidth, winWidth, culprits: culprits.slice(0, 5) };
          }
          return false;
        });

        if (hasOverflow) {
          console.log(
            `[OVERFLOW] ${route} on ${device.name}: ${hasOverflow.docWidth} > ${hasOverflow.winWidth}`,
          );
          console.log(`Culprits: `, hasOverflow.culprits);
        } else {
          console.log(`[OK] ${route} on ${device.name}`);
        }
      } catch (e) {
        console.error(`Failed ${route}:`, e.message);
      }
    }
    await context.close();
  }
  await browser.close();
  server.kill();
  process.exit(0);
})();
