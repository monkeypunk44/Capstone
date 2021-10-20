const { doc } = require("prettier");
const puppeteer = require("puppeteer");
const fs = require("fs");

const device_width = 1920;
const device_height = 1080;

async function run() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  var args = process.argv[2];
  await page.setViewport({ width: device_width, height: device_height });
  await page.goto("https://www.qualityfoods.com", {
    waitUntil: "networkidle0",
  });

  await page.click("#menuBar > div.search");
  await page.waitForXPath("//h1");
  await page.type("#keywordTextBox", args);
  await page.keyboard.press("Enter");
  await page.waitForXPath("//h1");

  const prices = await page.evaluate(() => {
    return Array.from(
      document.querySelectorAll(
        "#bodyContainerPlaceHolder_bodyPlaceHolder_desktopPanel > ul > table > tbody > tr > td > strong"
      )
    ).map((x) => x.textContent);
  });
  await fs.writeFile("QFPrices.txt", prices.join("\r"), function (err) {
    if (err) return console.log(err);
    console.log();
  });
  const items = await page.evaluate(() => {
    return Array.from(
      document.querySelectorAll(
        "#bodyContainerPlaceHolder_bodyPlaceHolder_desktopPanel > ul > table > tbody > tr > td:nth-child(2)"
      )
    ).map((x) => x.textContent);
  });
  await fs.writeFile("QFItems.txt", items.join("\r"), function (err) {
    if (err) return console.log(err);
    console.log();
  });

  browser.close();
}
run().then(console.log).catch(console.error);
