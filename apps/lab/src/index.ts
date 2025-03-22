import "dotenv/config";
import ora from "ora";
import { Command } from "commander";
import lab1 from "./lab1";
import lab2 from "./lab2";

const program = new Command();
program
  .option("-l, --lab <lab>", "Lab", "none")
  .option("-a, --action <action>", "Action", "none")
  .parse();

const options = program.opts();

const lab = options.lab;
const action = options.action;

if (lab === "none") {
  console.log("No lab selected");
  process.exit(1);
}

if (action === "none") {
  console.log("No action selected");
  process.exit(1);
}

const spinner = ora(`Running ${lab} ${action}...`).start();

switch (lab) {
  case "lab1":
    await lab1(action, { ora: spinner });
    break;
  case "lab2":
    await lab2(action, { ora: spinner });
    break;
}

spinner.succeed(`${lab} ${action} completed`);
