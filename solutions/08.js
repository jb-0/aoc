const data = require("../data/08");
const { logResults } = require("../utils");

// Part 1
const partOne = (network) => {
  if (network.length < 2) return;

  const [instructions, _, ...data] = network;
  const nodes = data.reduce((prev, curr) => {
    const [id, parts] = curr.split(" = ");
    prev[id] = parts;

    return prev;
  }, {});

  let instructionIndex = 0;
  let currentNode = "AAA";
  let steps = 0;

  while (currentNode !== "ZZZ") {
    switch (instructions[instructionIndex]) {
      case "L":
        currentNode = nodes[currentNode].slice(1, 4);
        break;
      case "R":
        currentNode = nodes[currentNode].slice(6, 9);
        break;

      default:
        break;
    }

    steps += 1;

    if (instructionIndex === instructions.length - 1) instructionIndex = 0;
    else instructionIndex += 1;
  }

  return steps;
};

logResults(data, partOne);
