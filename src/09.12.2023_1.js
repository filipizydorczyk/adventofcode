const fs = require("fs");

const input = fs.readFileSync("09.12.2023.txt").toString();

const histories = input
  .split("\n")
  .map((history) => history.split(" ").map(Number));

const processHistoryStep = (hstr) => {
  const diffs = [];

  for (i = 0; i <= hstr.length - 2; i++) {
    diffs.push(hstr[i + 1] - hstr[i]);
  }

  return diffs;
};

const calculateNewValue = (history) => {
  const diffsOfDifs = [history];

  while (
    diffsOfDifs[diffsOfDifs.length - 1].some(x => x)
  ) {
    diffsOfDifs.push(processHistoryStep(diffsOfDifs[diffsOfDifs.length - 1]));
  }

  return diffsOfDifs.reverse().reduce((acc, cur) => {
    const lastValue = cur[cur.length - 1];
    const target = acc;

    return target + lastValue;
  }, 0);
};

const sum = histories.reduce((acc, cur) => {
  return acc + calculateNewValue(cur);
}, 0);

console.log(sum);
