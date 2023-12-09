const data = require("../data/08");

// Data prep
const [instructions, _, ...rawNodeStrings] = data.raw;
const nodes = rawNodeStrings.reduce((prev, curr) => {
  const [id, parts] = curr.split(" = ");
  prev[id] = parts;

  return prev;
}, {});

// Utils
const gcd = (a, b) => (a ? gcd(b % a, a) : b);
const lcm = (a, b) => (a * b) / gcd(a, b);
const countStepsToZNode = (node) => {
  let instructionIndex = 0;
  let currentNode = node;
  let steps = 0;

  while (currentNode[2] !== "Z") {
    if (instructions[instructionIndex] === "L") currentNode = nodes[currentNode].slice(1, 4);
    if (instructions[instructionIndex] === "R") currentNode = nodes[currentNode].slice(6, 9);

    if (instructionIndex === instructions.length - 1) instructionIndex = 0;
    else instructionIndex += 1;

    steps += 1;
  }

  return steps;
};

// Solutions
const partOne = () => countStepsToZNode("AAA");
const partTwo = () => {
  const starterNodes = Object.keys(nodes).filter((node) => node[2] === "A");
  const steps = starterNodes.map((node) => countStepsToZNode(node, nodes, instructions)).reduce(lcm);

  return steps;
};

console.log("Part one passes: ", partOne() === data.partOneExpect);
console.log("Part two passes: ", partTwo() === data.partTwoExpect);
