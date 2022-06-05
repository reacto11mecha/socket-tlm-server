const fs = require("fs");
const { Server } = require("socket.io");

const shared = require("./shared");

const io = new Server({
  cors: {
    origin: "http://localhost:5000",
  },
});

io.on("connection", (socket) => {
  socket.on("tlm", (data) =>
    fs.appendFileSync(shared.resultTxt, `${JSON.stringify(data)}\n`)
  );
});

io.listen(3000);
console.log("Listening on port 3000");

const parseTlm = () => {
  const text = fs.readFileSync(shared.resultTxt, "utf8").trim();
  const data = text
    .split("\n")
    .filter((e) => e !== "")
    .map(JSON.parse);

  fs.writeFileSync(shared.resultJson, JSON.stringify(data));
};

process.on("SIGINT", parseTlm);
process.on("disconnect", parseTlm);
