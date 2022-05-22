const jas = require("../src/index");

function compileToJavascript(path) {
    const compiler = new jas(`${path}`)
    compiler.compile(`${path}`)
    // compiler.compile(path)
}
module.exports = {
    complile: compileToJavascript
}