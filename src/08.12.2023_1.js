const fs = require("fs");

const input = fs.readFileSync("08.12.2023.txt").toString();

const order = input.split("\n")[0];

const mapElements = [...input.split("\n\n")[1].matchAll(/[A-Z]{3}/gm)].map(found => found[0]);
const map = {};

for( i = 0 ; i < mapElements.length ; i+=3) {
    map[mapElements[i]] = [mapElements[i + 1], mapElements[i + 2]];
}

let steps = 0;
let currentPoint = 'AAA';

while(currentPoint != 'ZZZ') {
    const intruction = order[steps % order.length];
    currentPoint = map[currentPoint][intruction === 'L' ? 0 : 1];

    steps += 1;
}

console.log(steps);