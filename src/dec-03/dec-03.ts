import * as fs from "node:fs";
import * as console from "node:console";

const inputPath = ".\\input.txt";

const input = fs.readFileSync(inputPath).toString();

const regex =
  /(?<mul>mul\((?<left>\d{1,3}),(?<right>\d{1,3}\)))|(?<do>do\(\))|(?<dont>don't\(\))/g;

let sum = 0;
let enabled = true;
let match: RegExpExecArray | null = regex.exec(input);
while (match) {
  const groups = match.groups;
  if (!groups) throw new Error();

  if (groups["do"]) {
    enabled = true;
  } else if (groups["dont"]) {
    enabled = false;
  } else if (enabled && groups["mul"]) {
    const leftOperand = parseInt(groups["left"]);
    const rightOperand = parseInt(groups["right"]);
    sum += leftOperand * rightOperand;
  }
  match = regex.exec(input);
}

console.log("Sum:", sum);
