const { doc } = require("prettier");
const puppeteer = require("puppeteer");
const fs = require("fs");

const device_width = 1920;
const device_height = 1080;

// https://stackoverflow.com/questions/52497252/puppeteer-wait-until-page-is-completely-loaded/52501934 By Anand Mahajan. Needed to make the page load fully
const waitTillHTMLRendered = async (page, timeout = 30000) => {
  const checkDurationMsecs = 1000;
  const maxChecks = timeout / checkDurationMsecs;
  let lastHTMLSize = 0;
  let checkCounts = 1;
  let countStableSizeIterations = 0;
  const minStableSizeIterations = 3;

  while (checkCounts++ <= maxChecks) {
    let html = await page.content();
    let currentHTMLSize = html.length;

    let bodyHTMLSize = await page.evaluate(
      () => document.body.innerHTML.length
    );

    console.log(
      "last: ",
      lastHTMLSize,
      " <> curr: ",
      currentHTMLSize,
      " body html size: ",
      bodyHTMLSize
    );

    if (lastHTMLSize != 0 && currentHTMLSize == lastHTMLSize)
      countStableSizeIterations++;
    else countStableSizeIterations = 0; //reset the counter

    if (countStableSizeIterations >= minStableSizeIterations) {
      console.log("Page rendered fully..");
      break;
    }

    lastHTMLSize = currentHTMLSize;
    await page.waitFor(checkDurationMsecs);
  }
};

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
  await waitTillHTMLRendered(page);
  const data = await page.content();

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
