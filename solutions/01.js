const { data, partOneTestData, partTwoTestData } = require("./01.data");

/**
 * Utils
 */
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

/**
 * Solution functions
 */
const partOne = (stringList) => stringList.split("\n").reduce((prev, curr) => prev + getNumber(curr), 0);

const partTwo = (stringList) =>
  stringList.split("\n").reduce((prev, curr) => prev + getNumber(findAllNumbersInString(curr)), 0);

/**
 * Run solution functions with data
 */
const partOneTestResult = partOne(partOneTestData);
const partOneResult = partOne(data);

const partTwoTestResult = partTwo(partTwoTestData);
const partTwoResult = partTwo(data);

/**
 * Present output in a readable manner
 */
console.table([
  {
    part: "i",
    testCasePasses: partOneTestResult === 142,
    solutionPasses: partOneResult === 55971,
    result: partOneResult,
    expected: 55971,
  },
  {
    part: "ii",
    testCasePasses: partTwoTestResult === 281,
    solutionPasses: partTwoResult === 54719,
    result: partTwoResult,
    expected: 54719,
  },
]);
