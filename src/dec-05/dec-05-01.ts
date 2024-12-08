import * as fs from "node:fs";
import * as readline from "node:readline";
import * as console from "node:console";
import { Graph } from "./graph";

const inputPath = ".\\sample.txt";
const input = fs.createReadStream(inputPath);
const rl = readline.createInterface({ input });

let finishedReadingRules = false;
const rules = new Graph();
const sequences: number[][] = [];
const validSequences: number[] = [];

rl.on("line", (line) => {
  if (line.trim() === "") {
    finishedReadingRules = true;
    return;
  }

  if (!finishedReadingRules) {
    const [predecessor, successor] = line
      .split("|")
      .map((str) => parseInt(str));
    rules.addEdge(predecessor, successor);
    return;
  }

  const sequenceNum = sequences.length;
  const pages = line.split(",").map((str) => parseInt(str));
  sequences.push(pages);

  // const rulePages = pages.filter((page) => rules.hasVertex(page));
  if (rules.isTopologicallySorted(pages)) {
    validSequences.push(sequenceNum);
  }
});

rl.on("close", () => {
  console.log("Valid sequence count: ", validSequences.length);
  console.log(validSequences.map((seqIndex) => sequences[seqIndex]));
});
