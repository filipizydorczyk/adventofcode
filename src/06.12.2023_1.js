const fs = require("fs");

const input = fs.readFileSync("06.12.2023.txt").toString();
const values = input.split("\n");

const times = values[0].split(/\s+/g).map((number) => Number(number)).filter((number) => !isNaN(number));
const distances = values[1].split(/\s+/g).map((number) => Number(number)).filter((number) => !isNaN(number));

let scenarios = 1;

for(i=0; i<times.length; i++) {
    let holdTime = 1;
    let recordBeatScenarios = 0;

    while(holdTime < times[i]){
        const distanceTraveled = holdTime * (times[i] - holdTime);    

        if(distanceTraveled > distances[i]) {
            recordBeatScenarios += 1;
        }

        holdTime += 1;
    }

    scenarios = scenarios * recordBeatScenarios;
}


console.log(scenarios)