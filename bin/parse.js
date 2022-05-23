/**
 * Parse data [i]
 * @param {Array} data 
 * @returns parsed data in object
 */
module.exports = async function parse(data) {
         let ans = {
                  "_": []
         };
         for (i = 2; i < data.length; i++) {
                  if (data[i].includes("-")) {
                           if (data[i].includes("--")) {
                                    ans[data[i].replace("-", "").replace("-", "")] = true;
                           } else {
                                    ans[data[i].replace("-", "").replace("-", "")] = data[i + 1];
                           }
                  } else {
                           ans["_"].push(data[i]);
                  }
         }
         return ans;
}