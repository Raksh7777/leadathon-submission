const puppeteer = require("puppeteer");

exports.scrapeAllMoves = async () => {
  try {
    let chessUrl = "https://www.chessgames.com/chessecohelp.html";
    let browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    let page = await browser.newPage();

    await page.goto(
      chessUrl
      // , { timeout: 10000, waitUntil: "load" }
    );

    const movesList = await page.evaluate(async () => {
      let data = [];

      let table = document.querySelectorAll("tr");
      console.log(typeof table);
      console.log(table);
      table.forEach((obj) => {
        let currentMove = {
          id: obj.querySelector("td>font").innerText,
          name: obj.querySelector("td>font>b").innerText,
          sequence: obj.querySelector("td>font>font").innerText,
        };

        data.push(currentMove);
      });
      return data;
    });
    await browser.close();
    return movesList;
  } catch (err) {
    console.log(err);
  }
};
