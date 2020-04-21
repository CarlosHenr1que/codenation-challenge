const menu = require("inquirer-menu");
const { option1, option2, option3 } = require("./MenuOptions");
const chalk = require("chalk");

const clear = require("clear");
const figlet = require("figlet");

function createMenu() {
  clear();
  console.log(
    chalk.yellow(figlet.textSync("CODENATION", { horizontalLayout: "full" }))
  );
  return {
    message:
      "C0DEN4TION CHALLENGE MENU - CarlosHenr1que \n What would you like to do ? \n",
    choices: {
      "GET MY CHALLENGE TOKEN FROM CODENATION": option1,
      "RESOLVE MY CHALLENGE": option2,
      "SEND ANSWER TO CODENATION": option3,
    },
  };
}

menu(createMenu)
  .then(function () {
    console.log("bye");
  })
  .catch(function (err) {
    console.log(err.stack);
  });
