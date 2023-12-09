const fs = require("fs");

const input = fs.readFileSync("06.12.2023.txt").toString();

const values = input.split("\n");

const time = Number(values[0].replace(/\D+/g, ""));
const distance = Number(values[1].replace(/\D+/g, ""));

let scenarios = 0;

let holdTime = 1;

while (holdTime < time) {
  const distanceTraveled = holdTime * (time - holdTime);

  if (distanceTraveled > distance) {
    scenarios += 1;
  }

  holdTime += 1;
}

console.log(scenarios);
