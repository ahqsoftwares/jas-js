const EventEmitter = require("events");
const fs = require("fs-extra");
const VM = require("vm");
const chalk = require("chalk");
const fetch = require("node-fetch");
let dbase = {};
let datas = {};
let file = "";
/**
 * JAS the ts style js
 */
class JAS extends EventEmitter {
    /**
     * Make a jas compiler/reader
     * @param {*} path 
     * @param {*} options 
     */
    constructor (path, options) {
        let opt = options;
        super();
        if(!options) {
            this.options = {
                format: "jas",
                saveCompiledFile: false,
                debug: false,
                cli: false
            };
        } else {
            this.options = {
                format: opt?.format || "jas",
                debug: opt?.debug || false,
                saveCompiledFile: opt?.saveCompiledFile || false,
                cli: opt?.cli || false
            }
        }
        (async() => {
        try {
            if (!(path)) {
                console.log(chalk.yellow("File is not mentioned!\nYou have to mention the file path every time you use jas"));
                return;
            }
            this.file = String(path);
            file = String(path);
            fs.readFile(path, (err, out) => {
                if (err) {
                    console.error(chalk.redBright("JAS-System-Error: Could not find " + file));
                    process.exit(404);
                }
                console.log(chalk.yellowBright(`JAS-System-info: Found file ${file}`));
                if (this.options.debug) {
                    console.log(`Contents:\n${out}`);
                }
            });
        } catch(e) {
            throw new Error(e);
        }
        })()
        fetch("https://registry.npmjs.com/jas-script").then(data => data.json()).catch(e =>{
            console.log(chalk.red("Could not check for updates!"));
        }).then(data => {
            if (!(this.options.cli)) {
                if (data[`dist-tags`][require("../package.json")[`ver_type`]] !== require("../package.json")[`version`]) {
                    console.log(chalk.green(`Seems like an update available! Install the latest update by using ${chalk.yellowBright(`npm i --save-dev jas-script@${require("../package.json")[`ver_type`]}`)}`));
                }
            }
        });
    }

    compile(path) {
        if (!path) {
            fs.readFile(file, function(error, out) {
                if (error) throw new Error(String(error));
                VM.runInNewContext(String(out), {
                    need: require,
                    process: {
                        ...process,
                        cwd: function() {
                            return "home/vm";
                        },
                        mainCwd: function() {
                            return process.cwd()
                        }
                    },
                    print: console.log,
                    a: function(name, ...options) {
                        return new name(...options);
                    },
                    tempbase: {
                        fetch: function(key) {
                            if (!key) throw new Error("key is required!");
                            return dbase[key];
                        },
                        set: function(key, value) {
                            if (!key) throw new Error("key is required!");
                            if (typeof(value) == "undefined") throw new Error("value is required!");
                            dbase[key] = value;
                        },
                        add: function(key, int) {
                            if (!key) throw new Error("key is required!");
                            if (!int) throw new Error("value is required!");
                            let temp = dbase[key];
                            dbase[key] = (temp + Number(int));
                        },
                        subtract: function(key, int) {
                            if (!key) throw new Error("key is required!");
                            if (!int) throw new Error("value is required!");
                            let temp = dbase[key];
                            dbase[key] = (temp - Number(int));
                        },
                        delete: function(key) {
                            if (!key) throw new Error("key is required!");
                            delete dbase[key];
                        }
                    },
                    dir: (process.cwd() + file.replace(".", "")),
                    _make: {
                        int: function(key, value, change) {
                            if (!key) throw new Error("key is required!");
                            if (!(typeof(value) == "number")) throw new Error("value must be a number!");
                            let options = {
                                data: value,
                                type: change || false,
                                data_type: "number"
                            }
                            datas[this.file][key] = options;
                        },
                        string: function(key, value, change) {
                            if (!key) throw new Error("key is required!");
                            if (!(typeof(value) == "string")) throw new Error("value must be a string!");
                            let options = {
                                data: value,
                                type: change || false,
                                data_type: "string"
                            }
                            datas[this.file][key] = options;
                        },
                        boolean: function(key, value, change) {
                            if (!key) throw new Error("key is required!");
                            if (!(typeof(value) == "string")) throw new Error("value must be a boolean!");
                            let options = {
                                data: value,
                                type: change || false,
                                data_type: "boolean"
                            }
                            datas[this.file][key] = options;
                        },
                        any: function(key, value, change) {
                            if (!key) throw new Error("key is required!");
                            if (!(typeof(value) == "undefined")) throw new Error("value is required!");
                            let options = {
                                data: value,
                                type: change || false,
                                data_type: "any"
                            }
                            datas[this.file][key] = options;
                        }
                    },
                    _fetch: function(key) {
                        if (!(datas[this.file][key])) {
                            return null;
                        }
                        return (datas[this.file][key][`value`], {
                            type: datas[this.file][key][`data_type`],
                            static: datas[this.file][key][`type`]
                        });
                    }
                });
            });
        } else {
            fs.readFile(path, function(error, out) {
                if (error) throw new Error(String(error));
                VM.runInNewContext(String(out), {
                    need: require,
                    process: {
                        ...process,
                        cwd: function() {
                            return "home/vm";
                        },
                        mainCwd: function() {
                            return process.cwd()
                        }
                    },
                    print: console.log,
                    a: function(name, ...options) {
                        return new name(...options);
                    },
                    tempbase: {
                        fetch: function(key) {
                            if (!key) throw new Error("key is required!");
                            return dbase[key];
                        },
                        set: function(key, value) {
                            if (!key) throw new Error("key is required!");
                            if (typeof(value) == "undefined") throw new Error("value is required!");
                            dbase[key] = value;
                        },
                        add: function(key, int) {
                            if (!key) throw new Error("key is required!");
                            if (!int) throw new Error("value is required!");
                            let temp = dbase[key];
                            dbase[key] = (temp + Number(int));
                        },
                        subtract: function(key, int) {
                            if (!key) throw new Error("key is required!");
                            if (!int) throw new Error("value is required!");
                            let temp = dbase[key];
                            dbase[key] = (temp - Number(int));
                        },
                        delete: function(key) {
                            if (!key) throw new Error("key is required!");
                            delete dbase[key];
                        }
                    },
                    dir: (process.cwd() + file.replace(".", "")),
                    _make: {
                        int: function(key, value, change) {
                            if (!key) throw new Error("key is required!");
                            if (!(typeof(value) == "number")) throw new Error("value must be a number!");
                            let options = {
                                data: value,
                                type: change || false,
                                data_type: "number"
                            }
                            datas[path][key] = options;
                        },
                        string: function(key, value, change) {
                            if (!key) throw new Error("key is required!");
                            if (!(typeof(value) == "string")) throw new Error("value must be a string!");
                            let options = {
                                data: value,
                                type: change || false,
                                data_type: "string"
                            }
                            datas[path][key] = options;
                        },
                        boolean: function(key, value, change) {
                            if (!key) throw new Error("key is required!");
                            if (!(typeof(value) == "string")) throw new Error("value must be a boolean!");
                            let options = {
                                data: value,
                                type: change || false,
                                data_type: "boolean"
                            }
                            datas[path][key] = options;
                        },
                        any: function(key, value, change) {
                            if (!key) throw new Error("key is required!");
                            if (!(typeof(value) == "undefined")) throw new Error("value is required!");
                            let options = {
                                data: value,
                                type: change || false,
                                data_type: "any"
                            }
                            datas[path][key] = options;
                        }
                    },
                    _fetch: function(key) {
                        if (!(datas[path][key])) {
                            return null;
                        }
                        return (datas[path][key][`value`], {
                            type: datas[path][key][`data_type`],
                            static: datas[path][key][`type`]
                        });
                    }
                });
            });
        }
    }
}
module.exports = JAS;