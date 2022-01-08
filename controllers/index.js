const { scrapeAllMoves } = require("../services/scrape");
const NodeCache = require("node-cache");
const myCache = new NodeCache({ stdTTL: 180 });

exports.getAllMoves = async (req, res, next) => {
  try {
    if (req.params.CODE === undefined) {
      let inCache = await myCache.get("myKey");
      if (inCache) {
        return res.json({
          success: true,
          inCache,
        });
      } else {
        let movesList = await scrapeAllMoves();
        let cached = myCache.set("myKey", movesList);

        return res.json({
          success: true,
          movesList,
        });
      }
    } else {
      let inCache = await myCache.get(req.params.CODE);
      if (inCache) {
        return res.json({
          success: true,
          inCache,
        });
      } else {
        let movesList = await scrapeAllMoves();
        let result = movesList.filter((obj) => obj.id === req.params.CODE)[0];
        delete result["id"];
        let cached = myCache.set(req.params.CODE, result);

        return res.json({
          success: true,
          result,
        });
      }
    }
  } catch (error) {
    return res.json({
      success: false,
    });
  }
};
