import * as fs from "node:fs";
import * as console from "node:console";

const inputPath = ".\\input.txt";

const inputContents = fs.readFileSync(inputPath).toString();

const leftNums: number[] = [];
const rightNums: number[] = [];
const regex = /^(\d+)\s+(\d+)$/gm;

let match: RegExpExecArray | null = regex.exec(inputContents);
while (match) {
  leftNums.push(parseInt(match[1]));
  rightNums.push(parseInt(match[2]));
  match = regex.exec(inputContents);
}

leftNums.sort();
rightNums.sort();

console.log("Left numbers", leftNums);
console.log("Right numbers", rightNums);

// Part 1 solution
const totalDiff = leftNums.reduce(
  (prev, curr, i) => prev + Math.abs(curr - rightNums[i]),
  0,
);
console.log(totalDiff);

// Part 2
const rightNumCounts = new Map<number, number>();
rightNums.forEach((rightNum) => {
  let count = rightNumCounts.get(rightNum) ?? 0;
  rightNumCounts.set(rightNum, ++count);
});

const similarityScore = leftNums.reduce(
  (prev, curr) => prev + curr * (rightNumCounts.get(curr) ?? 0),
  0,
);
console.log(similarityScore);
