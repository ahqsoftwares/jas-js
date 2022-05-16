(async() => {
const jas = require("../src/index");
const jaas = new jas("./test/hi.ts", {
         debug: false
});
await jaas.compile("./test/hi.ts");
})()