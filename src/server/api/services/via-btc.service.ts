import puppeteer from "puppeteer";
import * as cheerio from "cheerio";

async function scarpe(pageContent: string) {
  const $ = cheerio.load(pageContent);

  const hashRateInfoPanel = $(".title span")
    .map((index, element) => {
      const title = $(element).text();
      const data = $(element)
        .parentsUntil(".info-panel")
        .next()
        .find(".f-num")
        .text();

      return {
        title,
        data,
      };
    })
    .get();

  return hashRateInfoPanel.length <= 0
    ? []
    : [hashRateInfoPanel[0], hashRateInfoPanel[1], hashRateInfoPanel[2]];
}

export async function scrapeViaBTC() {
  // Launch headless browser
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate to the URL
  // "https://www.viabtc.com/observer/dashboard?access_key=4cf10e0b877a76547a3901c63d0ae89b&coin=LTC&type=active";
  await page.goto(process.env.VIA_BTC_URL!, { waitUntil: "networkidle0" });

  // Get the page content
  const pageContent = await page.content();

  const data = await scarpe(pageContent);

  // Close the browser
  await browser.close();
  return data;
}
