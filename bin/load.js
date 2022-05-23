#! /usr/bin/env node
(async() => {
const utils = require('./utils.js');
const args = await (require("./parse.js"))(process.argv);
if (args[`_`][0] == "start" || args[`_`][0] == "load") {
    if (!(args.file && args.f)) {
        if (!(args.f)) {
            if (args.file) {
                args.f = args.file;
            }
        }
    }
    if (!(args.f)) {
        console.log(`
Usage <file_path> compiles jas and runs it

Options:
    -f, -file      Path of the file you want to compile            [string] [required]`);
        process.exit(1);
    }
    console.log("Please wait...");
    console.log("\n");
    utils.complile(args.f);
} else if (args[`_`][0] == "version" || args[`_`][0] == "ver" || args[`version`] || args[`ver`]) {
    console.log(`JAS-System-Info: Current file version is ${require(`../package.json`).version}`);
} else {
    console.log(`
Welcome to JAS!

The current jas cli has the following commands:-

load:
    Description: <file_path> compiles jas and runs it

    Usage: jas load -f <file_path>

    Options:
        -f, -file      Path of the file you want to compile            [string] [required]

version:
    Description: Gets the jas current version!

    Usage: jas version`);
    }
})()