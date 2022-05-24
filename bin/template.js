(async() => {
         const inquirer = require("inquirer");
         const chalk = require("chalk");
         const exec = require("node:child_process").execSync;
         const fs = require("fs-extra");
         const options = [chalk.green("Hello World"), chalk.red("JAS tempbase")];
         const parse = {
                 "\x1B[32mHello World\x1B[39m" : "world",
                 "\x1B[31mJAS tempbase\x1B[39m": "cli"
         }
         inquirer
         .prompt([
                  {
                           type: "input",
                           name: "project_name",
                           message: chalk.yellow("What should be your app name?"),
                           default: chalk.red("my cool jas"),
                           validate: (msg) => msg.length > 3
                  },
                  {
                           type: "list",
                           name: "project_type",
                           default: 0,
                           message: chalk.blue("Select the type of your JAS project"),
                           choices: options
                  },
                  {
                           type: "confirm",
                           name: "install_packages",
                           default: false,
                           message: chalk.green("Would you like to install the packages for a discord bot (i.e. Eris or discord.js)?")
                  }
         ]).then(async(answers) => {
                  let temp = answers;
                  answers.project_name = temp.project_name.replace(chalk.red("my cool jas"), "my cool jas");
                  try {
                           if (fs.readdirSync(`${process.cwd()}/${answers.project_name}`).length != 0) {
                                    await inquirer.prompt([
                                             {
                                                      type: "confirm",
                                                      name: "clean_dir",
                                                      default: false,
                                                      message: "This process will empty the directory " + answers.project_name + ".\nAre you sure about that?"
                                             }

                                    ])
                                    .then(async(answer) => {
                                             if (answer.clean_dir) {
                                                      await fs.emptyDirSync(`${process.cwd()}/${answers.project_name}`);
                                                      console.log(chalk.green("Directory cleaned!"));
                                             } else {
                                                      console.log(chalk.red("Could not do the action!"));
                                                      process.exit(1);
                                             }
                                    })
                           }
                  } catch(e) {
                           console.log(chalk.yellow("Creating the folder!"));
                  }
                  fs.copy(`./templates/${parse[answers.project_type]}`, `${process.cwd()}/${answers.project_name}`, async function(error, out) {
                           if (error) throw new Error(String(chalk.red(error)));
                           console.log(chalk.yellowBright("Copied the required files!\nStarting to install packages!"));
                           await exec(`cd "${process.cwd()}/${answers.project_name}" && npm init -y && npm i . --force`);
                           console.log(chalk.greenBright(`Successfully installed required packages!`));
                           if (answers.install_packages == true) {
                                    await inquirer.prompt([
                                             {
                                                      type: "list",
                                                      name: "dsc_package",
                                                      message: "What discord package you use?",
                                                      choices: ["discord.js", "Eris", "other"],
                                                      default: 1
                                             }
                                    ])
                                    .then(async(answer) => {
                                             if (answer.dsc_package == "Eris") {
                                                      console.log(chalk.yellowBright("Installing latest Eris version!"));
                                                      await exec(`cd "${process.cwd()}/${answers.project_name}" && npm i eris@latest`);
                                                      console.log(chalk.green("Eris installed successfully!"));
                                             } else if (answer.dsc_package == "discord.js") {
                                                      console.log(chalk.yellowBright("Installing latest discord.js version!"));
                                                      await exec(`cd "${process.cwd()}/${answers.project_name}" && npm i discord.js@latest`);
                                                      console.log(chalk.green("discord.js installed successfully!"));
                                             } else {
                                                      console.log(chalk.yellow(`In case of any other package, use ${chalk.red(`npm i <package>[, @<version>]`)}!`));
                                             }
                                    });
                           }
                           console.log(chalk.yellow(`\nJAS compiler:\nYour template is now set up!\n${chalk.green(`Use ${chalk.red(`cd "${process.cwd()}/${answers.project_name}" ${chalk.green("then run")} npm start`)} to run your new jas template!`)}`));
                  });
         })
         .catch(e => {
                  if (e.isTtyError) {
                           console.log(chalk.red("Could not parse data due to an error!"));
                  } else {
                           console.log(chalk.red("Unknown Error!"));
                  }
                  process.exit(1);
         });
})()