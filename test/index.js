(async() => {
const jas = require("jas-script");
const jaas = new jas("./test/hi.js", {
         debug: false
});
await jaas.compile();
})()