#! /usr/bin/env node
const yargs = require("yargs")
const utils = require('./utils.js')
const usage = "\n Usage <file_path> compiles jas and runs it"
const options = yargs
    .usage(usage)
    .option("f", { alias: "file", describe: "Path of the file you want to comple", type: "string", demandOption: true })
    .help(true)
    .argv;
var complileToJS = utils.complile(yargs.argsv.f);