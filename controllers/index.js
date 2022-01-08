const { scrapeAllMoves } = require("../services/scrape");

exports.getAllMoves = async (req, res, next) => {
  try {
    let movesList = await scrapeAllMoves();
    return res.json({
      success: true,
      movesList,
    });
  } catch (error) {
    return res.json({
      success: false,
    });
  }
};
