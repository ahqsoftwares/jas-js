const chalk = need("chalk");
print(`Tempbase tutorial...
JAS Script
         By AHQ\n`);
print(chalk.yellow(`To set a value you need to use ${chalk.red(`tempbase.set(key, value)`)}`));
tempbase.set("Hello", "World");
tempbase.set("number", 0);
print(chalk.yellow(`To get a value you need to use ${chalk.red(`tempbase.fetch(key)`)}`));
print(tempbase.fetch("Hello"));
print(chalk.white(tempbase.fetch("number")));
print(chalk.yellow(`To delete a key you need to use ${chalk.red(`tempbase.delete(key);`)}`));
print(chalk.yellow(`To add a key (whose value is a number) you need to use ${chalk.red(`tempbase.add(key, int);`)}`));
tempbase.add("number", 20);
print(chalk.white(tempbase.fetch("number")));
print(chalk.yellow(`To subtract from a key (whose value is a number) you need to use ${chalk.red(`tempbase.subtract(key, int);`)}`));
tempbase.subtract("number", 19);
print(chalk.white(tempbase.fetch("number")));
print(chalk.yellow(`And you learnt the tempbase basics successfully!`))