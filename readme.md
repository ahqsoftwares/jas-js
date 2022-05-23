# **JAS**
"JAS" is simply Javascript Actions Script based on the idea of a unique style js syntaxes

## Contribuers
Cli: [Retro](https://github.com/retrouser955)

Package: [AHQ Softwares](https://github.com/ahqsoftwares)

## Installation

Installing JAS without CLI

```bash
npm i jas-script
```

With CLI

```bash
npm i -D jas-script
# or install it globally
npm i -g jas-script
```

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
4. [CLI](#cli)

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
```bash
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

# 3. `__dirname` is now `dir`

# CLI
JAS also has a new CLI, as of 0.2.0.
Contents under CLI:-
1. [How to use?](#how-to-install-the-cli)
2. [Run jas code](#run-your-jas-code-from-the-cli)
3. [Get jas version from cli](#get-version-name-from-the-cli)

## How to install the cli?
To install the `cli` use the following command
```bash
npm i jas-script -g --save
```

## Run your jas code from the cli
You can run your jas code directly from the cli without using a js file by the following cmd

### If installed globally
```bash
jas load -f <fs file path>
/*
You can exclude -f also
*/
jas load <fs file path>
```

### If install a devDeps

Make a script in your package.json named "start"

```json
"scripts": {
    "start": "jas load -f \"pathToYourFile.js\""
},
/*
You can also exclude -f
*/
"scripts": {
    "start": "jas load \"pathToYourFile.js\""
},
```
Then run

```bash
npm start
```

## Get version name from the CLI
You can get the jas version directly from the cli with the following command
```bash
jas version
/*
You can use `jas ver` also
*/
jas ver
```
or 
```bash
jas --version
/*
You can use `jas --ver` also
*/
jas --ver
```

# NOTE
## **1.** JAS cannot be used to make packages
## **2.** JAS script once loaded cannot be terminated until node process dies
## **3.** JAS script is still in PRE RELEASE