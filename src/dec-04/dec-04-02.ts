import * as fs from "node:fs";
import * as readline from "node:readline";
import * as console from "node:console";

const inputPath = ".\\input.txt";
const input = fs.createReadStream(inputPath);
const rl = readline.createInterface({ input });

const wordSearch: string[][] = [];
rl.on("line", (line) => {
  const letters: string[] = [];
  for (const letter of line) {
    letters.push(letter);
  }
  wordSearch.push(letters);
});

let matches = 0;
rl.on("close", () => {
  wordSearch.forEach((line, rowIndex) => {
    line.forEach((letter, colIndex) => {
      if (letter !== "A") return;

      const roomSouth = rowIndex < wordSearch.length - 1;
      const roomNorth = rowIndex >= 1;
      const roomEast = colIndex < line.length - 1;
      const roomWest = colIndex >= 1;

      if (!roomNorth || !roomEast || !roomSouth || !roomWest) return;

      const ne = wordSearch[rowIndex - 1][colIndex + 1];
      const se = wordSearch[rowIndex + 1][colIndex + 1];
      const sw = wordSearch[rowIndex + 1][colIndex - 1];
      const nw = wordSearch[rowIndex - 1][colIndex - 1];

      if (
        ((ne === "M" && sw === "S") || (ne === "S" && sw === "M")) &&
        ((nw === "M" && se === "S") || (nw === "S" && se === "M"))
      )
        matches++;
    });
  });
  console.log("Matches:", matches);
});
