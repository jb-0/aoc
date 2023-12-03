const data = require("../data/02");

// Utils
const getHighestDrawsByColour = (gameInfo) => {
  const [game, gameSubsets] = gameInfo.split(":");
  const id = parseInt(game.substring(5));
  const highestDraws = { id };

  gameSubsets.split(";").forEach((subset) =>
    subset.split(",").forEach((colourDraw) => {
      const [_, number, colour] = colourDraw.split(" ");
      if (highestDraws?.[colour] > number) return;

      highestDraws[colour] = parseInt(number);
    })
  );

  return highestDraws;
};

// Part 1
const partOne = (games) => {
  return games.reduce((prev, game) => {
    const { id, red, green, blue } = getHighestDrawsByColour(game);
    if (red <= 12 && green <= 13 && blue <= 14) return prev + id;
    return prev;
  }, 0);
};

const partOneResult = partOne(data.raw.split("\n"));

// Part 2
const partTwo = (games) => {
  return games.reduce((prev, game) => {
    const { red, green, blue } = getHighestDrawsByColour(game);

    return prev + red * green * blue;
  }, 0);
};

const partTwoResult = partTwo(data.raw.split("\n"));

// Print nicely
console.table([
  {
    testCasePasses: partOne(data.test.split("\n")) === data.partOneTestExpect,
    solutionPasses: partOneResult === data.partOneExpect,
    result: partOneResult,
    expected: data.partOneExpect,
  },
  {
    testCasePasses: partTwo(data.test.split("\n")) === data.partTwoTestExpect,
    solutionPasses: partTwoResult === data.partTwoExpect,
    result: partTwoResult,
    expected: data.partTwoExpect,
  },
]);
