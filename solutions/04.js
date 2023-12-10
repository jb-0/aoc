const transformInputData = (rawData) =>
  rawData.split("\n").map((line) => {
    const [winningNumbers, yourNumbers] = line.replace(/  /g, " ").split(": ")[1].split(" | ");
    return [winningNumbers.split(" "), yourNumbers.split(" ")];
  });

const data = transformInputData(raw);

const partOne = data.reduce((prev, [winning, yours]) => {
  return prev + winning.reduce((prev, curr) => (yours.includes(curr) ? prev * 2 || 1 : prev), 0);
}, 0);

console.log(partOne);
