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
      if (letter !== "X") return;

      const roomSouth = rowIndex < wordSearch.length - 3;
      const roomNorth = rowIndex >= 3;
      const roomEast = colIndex < line.length - 3;
      const roomWest = colIndex >= 3;

      // N
      if (
        roomNorth &&
        wordSearch[rowIndex - 1][colIndex] === "M" &&
        wordSearch[rowIndex - 2][colIndex] === "A" &&
        wordSearch[rowIndex - 3][colIndex] === "S"
      )
        matches++;
      // NE
      if (
        roomNorth &&
        roomEast &&
        wordSearch[rowIndex - 1][colIndex + 1] === "M" &&
        wordSearch[rowIndex - 2][colIndex + 2] === "A" &&
        wordSearch[rowIndex - 3][colIndex + 3] === "S"
      )
        matches++;
      // E
      if (
        roomEast &&
        wordSearch[rowIndex][colIndex + 1] === "M" &&
        wordSearch[rowIndex][colIndex + 2] === "A" &&
        wordSearch[rowIndex][colIndex + 3] === "S"
      )
        matches++;
      // SE
      if (
        roomSouth &&
        roomEast &&
        wordSearch[rowIndex + 1][colIndex + 1] === "M" &&
        wordSearch[rowIndex + 2][colIndex + 2] === "A" &&
        wordSearch[rowIndex + 3][colIndex + 3] === "S"
      )
        matches++;
      // S
      if (
        roomSouth &&
        wordSearch[rowIndex + 1][colIndex] === "M" &&
        wordSearch[rowIndex + 2][colIndex] === "A" &&
        wordSearch[rowIndex + 3][colIndex] === "S"
      )
        matches++;
      // SW
      if (
        roomSouth &&
        roomWest &&
        wordSearch[rowIndex + 1][colIndex - 1] === "M" &&
        wordSearch[rowIndex + 2][colIndex - 2] === "A" &&
        wordSearch[rowIndex + 3][colIndex - 3] === "S"
      )
        matches++;
      // W
      if (
        roomWest &&
        wordSearch[rowIndex][colIndex - 1] === "M" &&
        wordSearch[rowIndex][colIndex - 2] === "A" &&
        wordSearch[rowIndex][colIndex - 3] === "S"
      )
        matches++;
      // NW
      if (
        roomNorth &&
        roomWest &&
        wordSearch[rowIndex - 1][colIndex - 1] === "M" &&
        wordSearch[rowIndex - 2][colIndex - 2] === "A" &&
        wordSearch[rowIndex - 3][colIndex - 3] === "S"
      )
        matches++;
    });
  });
  console.log("Matches:", matches);
});
