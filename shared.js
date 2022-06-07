const fs = require("fs");
const path = require("path");

const htmlDir = path.join(__dirname, "html");
const resultDir = path.join(__dirname, "result");

const resultTxt = path.join(resultDir, "result.txt");
const resultJson = path.join(resultDir, "result.json");

if (!fs.existsSync(resultDir)) fs.mkdirSync(resultDir);

const parseTlm = () => {
  const text = fs.readFileSync(resultTxt, "utf8").trim();
  const data = text
    .split("\n")
    .filter((e) => e !== "")
    .map(JSON.parse);

  fs.writeFileSync(resultJson, JSON.stringify(data));
};

module.exports = {
  htmlDir,
  resultTxt,
  resultJson,
  parseTlm,
};
