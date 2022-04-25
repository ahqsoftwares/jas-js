function odd(int) {
    if (String(int/2).includes(".")) {
        return true;
    } else return false;
}
function parse(all, key) {
    let raw = all.replace("type", "");
    let data = raw.split(";");
    let filter = [];
    let rawfilter;

    data.forEach(async(func, data) => {
        data = func.replace(`\n`, "");
        rawfilter = data.split("=");
        
        if (!data[0] == key) {
            filter.push(`${rawfilter[0]}:`);
            filter.push(`${rawfilter[1]}\n`);
        }
    });

    return `data.type=jason;\ntype;${filter.join("")}`
}
module.exports = async function(data, key) {
    return parse(data, key)
}
