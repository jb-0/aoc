const { data, partOneTestData, partTwoTestData } = require("./01.data");

// Utils
const numberStrings = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

const getNumber = (s) => {
  const first = Array.from(s).find((char) => Number(char) >= 0);
  const last = Array.from(s)
    .reverse()
    .find((char) => Number(char) >= 0);

  return Number(`${first}${last}`) || 0;
};

const findAllNumbersInString = (s) => {
  const numberLocsWithReplacements = [];

  // find the location of all strings
  numberStrings.forEach((numberString, idx) => {
    const re = new RegExp(numberString, "g");

    while ((match = re.exec(s)) != null)
      numberLocsWithReplacements.push({ location: match.index, replacementValue: idx + 1 });
  });

  // create a new string with just numbers
  const numbersOnly = Array.from(s).reduce((prev, curr, idx) => {
    const replacement = numberLocsWithReplacements.find(({ location }) => location === idx);

    if (replacement) return `${prev}${replacement.replacementValue}`;
    if (Number(curr)) return `${prev}${curr}`;

    return prev;
  }, "");

  return numbersOnly;
};

// Solutions
const partOne = (stringList) => stringList.split("\n").reduce((prev, curr) => prev + getNumber(curr), 0);
const partTwo = (stringList) =>
  stringList.split("\n").reduce((prev, curr) => prev + getNumber(findAllNumbersInString(curr)), 0);
const partOneResult = partOne(data);
const partTwoResult = partTwo(data);

// Print nicely
console.table([
  {
    testCasePasses: partOne(partOneTestData) === 142,
    solutionPasses: partOneResult === 55971,
    result: partOneResult,
    expected: 55971,
  },
  {
    testCasePasses: partTwo(partTwoTestData) === 281,
    solutionPasses: partTwoResult === 54719,
    result: partTwoResult,
    expected: 54719,
  },
]);
