const EventEmitter = require("events");
const fs = require("fs-extra");
const defaultOptions = {
    mode: "binary"
};
let data = [`data.type=jason;\ntype;`];
/**
 * JASON the best humanreadable data format
 */
class JASON extends EventEmitter {
    /**
     * Make a jason reader
     * @param {*} file 
     * @param {*} options 
     */
    constructor (file, options) {
        super();

        if (!(file)) {
            throw new TypeError("Missing parameter: file")
        }
        this.afile = file;
        if (!(options)) {
            options = defaultOptions;
        }

        if (!(fs.existsSync(`${file.replace(".jason", "")}.jason`))) {
            fs.writeFileSync(`${file.replace(".jason", "")}.jason`, data.join("\n"));
            this.emit("fileCreate");
        } else {
            this.emit("fileCreate");
        }
        
        if(!fs.readFileSync(`${file.replace(".jason", "")}.jason`).includes(`data.type=jason;\ntype;`)) {
            throw new TypeError(`${`${file.replace(".jason", "")}.jason`} is not a valid jason file!`)
        }
        
        let check = (String(fs.readFileSync(`${file.replace(".jason", "")}.jason`)).replace("type;", "").split(";"));
        let type = (String(fs.readFileSync(`${file.replace(".jason", "")}.jason`)).replace("type;", "").split("="));
        (async() => {
            if (await(require("./packages/check")(check, type))) {
                throw new SyntaxError("Invalid JASON syntax")
            }
        })()
    }

    /**
     * Get Everything from db in raw form
     * @returns String
     */
    all(){
        return (fs.readFileSync(`${this.afile.replace(".jason", "")}.jason`, {
            encoding: "binary"
        }).replace("data.type=jason;", ""))
    }

    raw(){
        return (fs.readFileSync(`${this.afile.replace(".jason", "")}.jason`, {
            encoding: "binary"
        }));
    }

    parse(){
        this.raw = this.all().replace("type", "");
        this.data = this.raw.split(";");
        this.filter = {};
        this.rawfilter

        this.data.forEach(async(func, data) => {
            data = func.replace(`\n`, "");
            this.rawfilter = data.split("=");
            
            if (!data[0] == "") {
                this.filter[this.rawfilter[0]] = `${this.rawfilter[1]}`;
            }
        });
        return this.filter
    }



    /**
     * Get a specific element from JASON database
     * @param {*} data 
     * @returns String/Array/Integer
     */
    get(data){
        if (!data) throw new Error("Missing Parameter: data");
        try {
            if (String(this.parse()[data]).startsWith("{")) {
                return require("./packages/objectify")(this.parse()[data]);
            } else if (String(this.parse()[data]).startsWith("[")) {
                return JSON.parse(this.parse()[data]);
            } else if (this.parse()[data].startsWith(`t(`)) {
                if (this.parse()[data] == `t(null)`) return null
                else return undefined;
            } else if (this.parse()[data].startsWith(`int(`)) {
                return Number(String(this.parse()[data]).replace(`int(`, "").replace(`)`, ""));
            } else if (this.parse()[data].startsWith(`b(`)) {
                if (this.parse()[data] == "b(0)") {
                    return false;
                } else {
                    return true;
                }
            }
            return this.parse()[data];
        } catch(e) {
            console.error(e);
            return undefined;
        }
    }

    /**
     * Set A file to database
     * @param {*} key 
     * @param {*} value 
     */
    set(key, value) {
        if (typeof(key) !== "string") {
            throw new SyntaxError("key must be non-empty strings");
        }
        if (value === null) {
            value = "t(null)";
        } 
        else 
        if (value === undefined) {
            value = "t(undefined)";
        } 
        else 
        if (typeof(value) == "number") {
            let temp = value;
            value = `int(${temp})`;
        } 
        else 
        if (typeof(value) == "boolean") {
            if (String(value) == "false") {
                value = `b(0)`;
            } else {
                value = `b(1)`;
            }
        }

        (async() => {
            this.newdata = await require("./packages/removify")(this.all(), key);

            fs.writeFile(`${this.afile.replace(".jason", "")}.jason`, `${this.newdata}\n${key}=${value};`, function(err) {
                if (err) {
                    try {
                        throw new Error(err);
                    } catch (e) {
                        return err;
                    }
                }
                return true;
            });
        })()
        
    }
}
module.exports = JASON;