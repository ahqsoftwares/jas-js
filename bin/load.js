#! /usr/bin/env node
(async() => {
const chalk = require('chalk');
const utils = require('./utils.js');
const args = await (require("./parse.js"))(process.argv);
const fetch = require("node-fetch");
fetch("https://registry.npmjs.com/jas-script").then(data => data.json()).catch(e =>{
    console.log(chalk.red("Could not check for updates!"));
}).then(data => {
    if (data[`dist-tags`][require("../package.json")[`ver_type`]] !== require("../package.json")[`version`]) {
        console.log(chalk.green(`Seems like an update available! Install the latest update by using ${chalk.yellowBright(`npm i --save-dev jas-script@${require("../package.json")[`ver_type`]}`)}`));
    }
});
if (args[`_`][0] == "start" || args[`_`][0] == "load") {
    if (!(args.file && args.f)) {
        if (!(args.f)) {
            if (args.file) {
                args.f = args.file;
            } else if (args[`_`][1]) {
                args.f = args[`_`][1];
                args.file = args[`_`][1];
            }
        }
    }
    if (!(args.f)) {
        console.log(chalk.blue(`
Description: compiles jas and runs it

Usage: jas load -f <file_path>

Options:
    use:
        -f, -file      Path of the file you want to compile     [string] [required]
    or: 
        jas load <file_path>`));
        process.exit(1);
    }
    console.log(chalk.yellow("Please wait..."));
    console.log("\n");
    utils.complile(args.f);
} else if (args[`_`][0] == "version" || args[`_`][0] == "ver" || args[`version`] || args[`ver`]) {
    console.log(chalk.yellowBright(`JAS-System-info: Current file version is ${chalk.blueBright(require(`../package.json`).version)} under tag ${chalk.red(String(require("../package.json").ver_type))}`));
} else {
    console.log(chalk.blue(`
Welcome to JAS!

The current jas cli has the following commands:-

${chalk.green("load:")}
    ${chalk.red(`Description: Compiles jas code and runs it

    Usage: jas load -f <file_path>

    Options:
        use:
            -f, -file      Path of the file you want to compile     [string] [required]
        or: 
            jas load <file_path>
    `)}

${chalk.green("version:")}
    ${chalk.red(`Description: Gets the jas current version!

    Usage: jas version`)}`));
    }
})()