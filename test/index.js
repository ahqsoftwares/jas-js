(async() => {
const jas = require("../src/index");
const jaas = new jas("./test/hi.js", {
         debug: false
});
await jaas.compile();
})()