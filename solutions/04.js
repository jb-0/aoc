const transformInputData = (rawData) =>
  rawData.split("\n").map((line) => {
    const [winningNumbers, yourNumbers] = line.replace(/  /g, " ").split(": ")[1].split(" | ");
    return [winningNumbers.split(" "), yourNumbers.split(" ")];
  });

const data = transformInputData(raw);

const partOne = data.reduce((prev, [winning, yours]) => {
  return prev + winning.reduce((prev, curr) => (yours.includes(curr) ? prev * 2 || 1 : prev), 0);
}, 0);

const partTwo = () => {
  const cardCounter = {};

  data
    .map(([winning, yours], idx) => {
      cardCounter[idx] = 1;
      return winning.reduce((prev, curr) => (yours.includes(curr) ? (prev += 1) : prev), 0);
    })
    .forEach((copiesWon, idx) => {
      for (let index = 0; index < copiesWon; index++) {
        cardCounter[idx + 1 + index] += cardCounter[idx];
      }
    });

  return Object.values(cardCounter).reduce((prev, curr) => prev + curr, 0);
};

console.log(partTwo());
