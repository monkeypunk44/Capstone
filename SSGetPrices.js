const { doc } = require("prettier");
const puppeteer = require("puppeteer");
const fs = require("fs");

async function run() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  var args = process.argv[2];
  await page.goto("https://www.atlanticsuperstore.ca/", {
    waitUntil: "networkidle0",
  });

  await page.type("#autocomplete-listbox-site-header-", args);
  await page.keyboard.press("Enter");
  await page.waitForXPath("//h1");

  const prices = await page.evaluate(() => {
    return Array.from(
      document.querySelectorAll(
        "#site-content > div > div > div > div.product-grid > div.product-grid__results > div.product-grid__results__products > div > ul > li > div > div > div.product-tile__details > div.product-tile__details__info > div > div.product-prices.product-prices--product-tile > div > div > span > span.price__value.selling-price-list__item__price.selling-price-list__item__price--now-price__value"
      )
    ).map((x) => x.textContent);
  });
  await fs.writeFile("SSPrices.json", prices.join("\r\n"), function (err) {
    if (err) return console.log(err);
    console.log();
  });
  const items = await page.evaluate(() => {
    return Array.from(
      document.querySelectorAll(
        "#site-content > div > div > div > div.product-grid > div.product-grid__results > div.product-grid__results__products > div > ul > li > div > div > div.product-tile__details > div.product-tile__details__info > h3 > a > span > span.product-name__item.product-name__item--name"
      )
    ).map((x) => x.textContent);
  });
  await fs.writeFile("SSItems.json", items.join("\r\n"), function (err) {
    if (err) return console.log(err);
    console.log();
  });

  browser.close();
}
run().then(console.log).catch(console.error);
