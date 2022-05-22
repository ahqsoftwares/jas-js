#! /usr/bin/env node
const yargs = require("yargs")
const utils = require('./utils.js')
const usage = "\n Usage <file_path> compiles jas to javascript"
const options = yargs
    .usage(usage)
    .option("f", { alias: "file", describe: "Path of the file you want to comple", type: "string", demandOption: true })
    .help(true)
    .argv;
console.log(options);
console.log(options);
var complileToJS = utils.complile(yargs.argv);