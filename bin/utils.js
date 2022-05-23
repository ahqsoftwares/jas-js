const jas = require("../src/index");

function compileToJavascript(path) {
    const compiler = new jas(`${path}`, {cli: true})
    compiler.compile(`${path}`)
    // compiler.compile(path)
}
module.exports = {
    complile: compileToJavascript
}