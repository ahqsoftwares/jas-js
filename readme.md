# JASON
Jason(not to be confused with json) : The Easiest and the fastest database file format

## Data Types
JASON supports the following formats:-
1. String ("string")
2. Integer (20)
3. Arrays ["20", 30]
4. Objects (soon!)

## Example Of JASON

Jason file
```jason
data.type=jason;
type;
code=ahqsoftwares;
type=[20];
```

JS Code
```js
//jason example
const jason = require("jason");

const reader = new jason("./test/test.jason");

console.log(reader.get("type"));
//returns [20]
```