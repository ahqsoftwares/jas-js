# **JAS**
"JAS" is simply Javascript Actions Script based on the idea of a unique style js syntaxes

## Example
```js
const jas = require("jas-script");
const compiler = new jas();
compile.compile("./test/code.js");
```
test/code.js 
```ts
//A simple discord bot code on jas
const discord = need(`eris`);
client.connect()
client.on("error", (err) => print(err));
```

# **Docs**

Table of contents:-
1. [Basics](#understanding-the-basics)
2. [Inter Process Database](#inter-process-jas-database)
3. [Difference](#difference-between-js-and-jas)

# Understanding the Basics
First of all make an index.js file
```js
const jas = require("jas-script");
const module = new jas("./test/code.js");
module.compile();
```
#### Now create a folder `test` and inside the folder make a file `code.js`
#### Contents:-
```js
print(`Hello world!`);
```
now just run `node index.js` and you'll see the result
```js
JAS-System-info: Found file ./test/code.ts
Hello world
``` 
# Inter process jas database

#### The object is `tempbase`

#### The jas database has the following functions as a general db
```js
/*
Set data to tempbase
*/
tempbase.set(`Hello`, "world");
tempbase.set(`number`, 1);

/*
Get data from tempbase
*/
tempbase.fetch(`Hello`); //returns "world"

/*
Delete data from tempbase
*/
tempbase.delete(`Hello`);

/*
Add data to tempbase
*/
tempbase.add(`number`, 3); //number is now 4

/*
Subtract data from tembase
*/
tempbase.subtract(`number`, 3); //number is now 1
```

# Difference between js and jas

#### Following the differences between js and jas

# 1. require() is now need()

js
```js
const fs = require("fs");
```
jas
```js
const fs = need("fs");
```

# 2. Constructor

### `new module(...options)` is now `a(module, ...options)`

js
```js
const jas = require("jas-script");
const compiler = new jas("./test/code.js");
```

same code in jas
```js
const jas = need("jas-script");
const compiler =  a(jas, "./test/code.js");
/*
You can still use new if you're not accustomed to it
*/
const compiler = new jas("./test/code.js"); //using legacy one
```

# 3. Process object changes
## In jas process.cwd() will return "home/vm" and process.mainCwd() will return the correct dir

### js
```js
console.log(process.cwd())
//returns dir
```

### jas
```js
print(process.cwd())
//returns "home/vm"
print(process.mainCwd())
//returns dir name
```

# NOTE
## **1.** JAS cannot be used to make packages
## **2.** JAS script once loaded cannot be terminated until node process dies
## **3.** JAS script is still in BETA