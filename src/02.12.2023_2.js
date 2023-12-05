const input = fs.readFileSync("02.12.2023.txt").toString();

// 12 red cubes, 13 green cubes, and 14 blue cubes.

const sumCubeGroup = (acc, curr) => acc + Number(curr.split(" ")[0]);

const sum = input.split("\n").reduce((acc, curent) => {
  const splitedInput = curent.split(":");

  const head = splitedInput[0];
  const body = splitedInput[1];

  const redGroup = body.match(/[0-9]{1,2} red/g) || [];
  const greenGroup = body.match(/[0-9]{1,2} green/g) || [];
  const blueGroup = body.match(/[0-9]{1,2} blue/g) || [];

  const redCounts = Math.max(...redGroup.map((item) => Number(item.split(" ")[0])));
  const greenCounts = Math.max(...greenGroup.map((item) => Number(item.split(" ")[0])));
  const blueCounts = Math.max(...blueGroup.map((item) => Number(item.split(" ")[0])));

  return acc + (redCounts * greenCounts * blueCounts);

}, 0);

console.log(sum);
