const uWSjs = require("uWebSockets.js");
const path = require("path");
const fs = require("fs");
const app = uWSjs.App();

const shared = require("./shared");

app.ws("/telemetry", {
  idleTimeout: 60,
  maxPayloadLength: 612,
  compression: uWSjs.DEDICATED_COMPRESSOR_8KB,
  message: (_ws, message) => {
    fs.appendFileSync(
      shared.resultTxt,
      `${Buffer.from(message).toString("utf8")}\n`
    );
  },
});

app.get("/", (res) =>
  res
    .writeStatus("200 OK")
    .writeHeader("Content-Type", "text/html")
    .end(
      fs.readFileSync(path.join(shared.htmlDir, "./previewer.html"), "utf-8")
    )
);

app.get("/data", (res) => {
  shared.parseTlm();

  res
    .writeStatus("200 OK")
    .writeHeader("Content-Type", "application/json")
    .end(fs.readFileSync(shared.resultJson, "utf-8"));
});

app.listen(3000, (listenSocket) => {
  if (listenSocket) console.log("Listening on port 3000");
});
