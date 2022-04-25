function iseven(no) {
    if (!(String(no/2).includes("."))) return true;
    else return false;
}

function objectify(str) {
     let object = {};
     raw = str.replace("{", "").replace("}", "").split(",");
     let array = [];

     raw.forEach(ar => {
         if (ar.split(":")) {
             array.push(ar.split(":")[0]);
             array.push(ar.split(":")[1]);
         }
     });

     for (i = 0; i < array.length; i++) {
         if ((iseven(i))) {
             let parsed = {
                 key: "",
                 value: ""
             };
             parsed[`value`] = array[i + 1].replace("\n", "");
             parsed[`key`] = array[i].replace("\n", "");

             for (j = 0; j < parsed[`key`].length; j++) {
                 let fix;
                 if (parsed[`key`].startsWith(" ")) {
                     fix = parsed[`key`].replace(" ", "");
                     parsed[`key`] = fix;
                 }
             }
             for (j = 0; j < parsed[`value`].length; j++) {
                 let fix;
                 if (parsed[`value`].startsWith(" ")) {
                     fix = parsed[`value`].replace(" ", "");
                     parsed[`value`] = fix;
                 }
             }

             if (parsed[`value`].startsWith("[")) {
                 console.log(parsed)
                 arrayfilter = JSON.parse(parsed[`value`].split("").forEach(arr => arr.replace(";", ",").join("")));
                 object[parsed[`key`]] = arrayfilter;
                 console.log(arrayfilter)
             } else {
                 object[parsed[`key`]] = parsed[`value`];
             }
         }
     }

    return object;
}

module.exports = objectify;