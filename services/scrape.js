const puppeteer = require("puppeteer");

exports.scrapeAllMoves = async () => {
  try {
    let chessUrl = "https://www.chessgames.com/chessecohelp.html";
    console.log("here");
    let browser = await puppeteer.launch({ headless: false });
    let page = await browser.newPage();

    await page.goto(chessUrl);
    await page.waitForSelector("table");
    let data = await page.evaluate(() => {
      let table = document.querySelector("table > tbody");

      let movesList = [];
      //table.map((obj) => {
      //   movesList.push({
      //     id: obj.querySelector("tr>td>font").innerText,
      //     name: obj.querySelector("tr>td>font>b").innerText,
      //     sequence: querySelector("tr>td>font>font").innerText,
      //   });
      // });

      return movesList;
    });
    console.log(data);
    //await browser.close();
  } catch (err) {
    console.log(err);
  }
};
