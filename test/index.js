const jason = require("../src/index");

const reader = new jason("./test/test");

reader.on("fileCreate", async() => console.log("created file"));
reader.on("fileUpdate", async() => console.log("created file"));

console.log(reader.get("type", true));