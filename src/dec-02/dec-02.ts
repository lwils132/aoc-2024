import * as fs from "node:fs";
import * as readline from "node:readline";
import * as console from "node:console";

const inputPath = ".\\input.txt";

const input = fs.createReadStream(inputPath);
const rl = readline.createInterface({ input });

let safeCount = 0;
rl.on("line", (line) => {
  const parsedLine = line.split(" ").map((str) => parseInt(str));

  for (let i = 0; i < parsedLine.length; i++) {
    const nums = parsedLine.toSpliced(i, 1);

    const asc = nums.toSorted((a, b) => a - b);
    const desc = asc.toReversed();
    const ordered =
      nums.every((value, i) => value === asc[i]) ||
      nums.every((value, i) => value === desc[i]);

    const safeDelta = nums.every((value, i) => {
      if (i === nums.length - 1) return true;

      const diff = Math.abs(value - nums[i + 1]);
      return 1 <= diff && diff <= 3;
    });

    const safe = safeDelta && ordered;
    if (safe) {
      safeCount++;
      return;
    }
  }
});

rl.on("close", () => {
  console.log("Safe count: ", safeCount);
});
