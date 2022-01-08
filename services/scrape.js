const puppeteer = require("puppeteer");

exports.scrapeAllMoves = async () => {
  try {
    let chessUrl = "https://www.chessgames.com/chessecohelp.html";
    let browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    let page = await browser.newPage();

    await page.goto(chessUrl);

    const movesList = await page.evaluate(async () => {
      let data = [];

      let table = document.querySelectorAll("tr");

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
    return err;
  }
};
