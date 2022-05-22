const yargs = require("yargs");

const options = yargs
 .usage("Usage: -f <file path>")
 .option("f", { alias: "file", describe: "Path", type: "string", demandOption: true })
 .argv;
 
console.log(options);