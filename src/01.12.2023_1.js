const fs = require("fs");


const input = fs.readFileSync("01.12.2023.txt").toString();

const sum = input.split("\n").map((item) => {
  const numberString = item.replace(/\D+/g, "");

  if (numberString.length === 1) {
    return Number(`${numberString}${numberString}`);
  }

  if (numberString.length !== 2) {
    return Number(`${numberString[0]}${numberString[numberString.length - 1]}`);
  }

  return Number(numberString);
}).reduce((acc, cur) => acc + cur, 0);

console.log(sum);
