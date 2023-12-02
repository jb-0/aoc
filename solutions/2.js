const data = require("./2.data");

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

const partOneResult = partOne(data.partOne.split("\n"));

// Present output in a readable manner
console.table([
  {
    part: "i",
    testCasePasses: partOne(data.partOneTest.split("\n")) === data.partOneTestExpect,
    solutionPasses: partOneResult === data.partOneExpect,
    result: partOneResult,
    expected: data.partOneExpect,
  },
  //   {
  //     part: "ii",
  //     testCasePasses: partTwoTestResult === undefined,
  //     solutionPasses: partTwoResult === undefined,
  //     result: partTwoResult,
  //     expected: undefined,
  //   },
]);
