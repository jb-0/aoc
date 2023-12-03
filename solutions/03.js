const data = require("../data/03");
const { logResults } = require("../utils");

// Utils
const isSymbol = (char) => !!char && char !== "." && isNaN(char);
const checkIfRangeIncludesSymbol = (line, start, end) => Array.from(line.substring(start, end + 1)).some(isSymbol);
const findEndOfNumberIndex = (line, index) => {
  if (index + 1 === line.length || isNaN(line[index + 1])) return index;
  return findEndOfNumberIndex(line, index + 1);
};

const findNumbersInLine = (line) => {
  const numberLocs = [];

  for (let index = 0; index < line.length; index++) {
    if (!isNaN(line[index])) {
      const endOfNumberIndex = findEndOfNumberIndex(line, index);
      numberLocs.push({ start: index, end: endOfNumberIndex });
      index = endOfNumberIndex + 1;
    }
  }

  return numberLocs;
};

const isValidPartNumber = (numberLoc, lineIndex, engineSchematic) => {
  const numberIsAtStart = numberLoc.start === 0;
  const numberIsAtEnd = numberLoc.end + 1 === engineSchematic[lineIndex].length;
  const diagonalStart = numberIsAtStart ? numberLoc.start : numberLoc.start - 1;
  const diagonalEnd = numberIsAtEnd ? numberLoc.end : numberLoc.end + 1;

  // check for a symbol on the the current line, before and after
  if (!numberIsAtStart && isSymbol(engineSchematic[lineIndex][numberLoc.start - 1])) return true;
  if (!numberIsAtEnd && isSymbol(engineSchematic[lineIndex][numberLoc.end + 1])) return true;

  // check the line above and below
  if (lineIndex > 0 && checkIfRangeIncludesSymbol(engineSchematic[lineIndex - 1], diagonalStart, diagonalEnd))
    return true;
  if (
    lineIndex + 1 < engineSchematic.length &&
    checkIfRangeIncludesSymbol(engineSchematic[lineIndex + 1], diagonalStart, diagonalEnd)
  )
    return true;

  return false;
};

// Part 1
const partOne = (engineSchematic) => {
  const result = engineSchematic.reduce((prev, curr, lineIndex) => {
    let lineSum = 0;
    findNumbersInLine(curr).forEach((numberLoc) => {
      if (isValidPartNumber(numberLoc, lineIndex, engineSchematic))
        lineSum += Number(curr.substring(numberLoc.start, numberLoc.end + 1));
    });

    return prev + lineSum;
  }, 0);

  return result;
};

logResults(data, partOne);
