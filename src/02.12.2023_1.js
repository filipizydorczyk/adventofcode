const fs = require("fs");

const input = fs.readFileSync("02.12.2023.txt").toString();

// 12 red cubes, 13 green cubes, and 14 blue cubes.

const sumCubeGroup = (acc, curr) => (acc + Number(curr.split(" ")[0]));

const sum = input.split("\n").reduce((acc, curent) => {
  const splitedInput = curent.split(":");

  const head = splitedInput[0];
  const body = splitedInput[1];

  const id = head.split(" ")[1];

  const isValid = body.split(";").reduce((acc, cur) => {
    const redGroup = cur.match(/[0-9]{1,2} red/g)
    const greenGroup = cur.match(/[0-9]{1,2} green/g)
    const blueGroup = cur.match(/[0-9]{1,2} blue/g)

    const redCount = redGroup ? redGroup.reduce(sumCubeGroup,0) : 0;
    const greenCount = greenGroup ? greenGroup.reduce(sumCubeGroup,0) : 0;
    const blueCount = blueGroup ? blueGroup.reduce(sumCubeGroup,0) : 0;

    const isSetValid = redCount <= 12 && greenCount <= 13 && blueCount <= 14;

    if(id === "100") console.log(redGroup, redCount, isSetValid)

    return acc ? isSetValid : false;

  }, true)

  if(isValid) console.log(id)

  return isValid ? acc + Number(id) : acc;
},0);

console.log(sum)
