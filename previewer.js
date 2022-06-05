const express = require("express");
const path = require("path");

const shared = require("./shared");

const app = express();

app.get("/", (req, res) =>
  res.sendFile(path.join(shared.htmlDir, "./previewer.html"))
);
app.get("/data", (req, res) => res.sendFile(shared.resultJson));

app.listen(3000);
