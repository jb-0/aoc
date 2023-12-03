const logResults = (data, partOneFn = () => null, partTwoFn = () => null) => {
  const partOneResult = partOneFn(data.raw);
  const partTwoResult = partTwoFn(data.raw);

  console.table([
    {
      testCasePasses: partOneFn(data.testDataset) === data.partOneTestExpect,
      solutionPasses: partOneResult === data.partOneExpect,
      result: partOneResult,
      expected: data.partOneExpect,
    },
    {
      testCasePasses: partTwoFn(data?.testDatasetTwo || data.testDataset) === data.partTwoTestExpect,
      solutionPasses: partTwoResult === data.partTwoExpect,
      result: partTwoResult,
      expected: data.partTwoExpect,
    },
  ]);
};

module.exports = { logResults };
