const fs = require("fs");
const path = require("path");

const htmlDir = path.join(__dirname, "html");
const resultDir = path.join(__dirname, "result");

const resultTxt = path.join(resultDir, "result.txt");
const resultJson = path.join(resultDir, "result.json");

if (!fs.existsSync(resultDir)) fs.mkdirSync(resultDir);

module.exports = {
  htmlDir,
  resultTxt,
  resultJson,
};
