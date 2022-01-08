const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const routes = require("./routes/index");

app.use(routes);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
