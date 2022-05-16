const EventEmitter = require("events");
const fs = require("fs-extra");
const VM = require("vm");
const defaultOptions = {
    format: "jas",
    saveCompiledFile: false,
    debug: false
};
let options = defaultOptions;
let file = "";
/**
 * JAS the ts style js
 */
class JAS extends EventEmitter {
    /**
     * Make a jas compiler/reader
     * @param {*} file 
     * @param {*} options 
     */
    constructor (path, opt) {
        super();

        options = {
            format: opt?.format || "jas",
            debug: opt?.debug || false,
            saveCompiledFile: opt?.saveCompiledFile || false
        }

        try {
            file = String(path);
            fs.readFile(path, (err, out) => {
                if (err) {
                    console.error("JAS-System-Error: Could not find " + file);
                    process.exit(404);
                }
                console.log(`JAS-System-info: Found file ${file}`);
                if (options.debug) {
                    console.log(`Contents:\n${out}`);
                }
            });
        } catch(e) {
            throw new Error(e);
        }
    }

    compile(path) {
        if (!(path)) {
            fs.readFile(file, function(error, out) {
                if (error) throw new Error(error);
                VM.runInNewContext(out, {
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
                    }
                });
            });
        } else {
            fs.readFile(path, function(error, out) {
                if (error) throw new Error(error);
                VM.runInNewContext(out, {
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
                    }
                });
            });
        }
    }
}
module.exports = JAS;