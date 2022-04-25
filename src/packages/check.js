/**
 * Check JASON file
 * @param {*} check
 * @param {*} type
 * @returns Boolean
 */
module.exports = async function(check, type) {
    if (check.length !== type.length) {
        return true;
    } else {
        return false;
    }
}