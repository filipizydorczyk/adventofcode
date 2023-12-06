const fs = require("fs");

const input = fs.readFileSync("05.12.2023.txt").toString();

const mapAMap = (string) => {
  return string
    .split(/\s|\n/gm)
    .map((number) => Number(number))
    .filter((number) => !isNaN(number));
};


const getDestination = (mapArray, source) => {
  let destination = source;

  for (let i = 0; i < mapArray.length; i += 3) {
    const start = mapArray[i + 1];
    const end = mapArray[i];
    const range = mapArray[i + 2];

    if( source >= start && source <= start + range) {
      destination = end + (source - start);
    }
  }

  return destination;
}

const walkAMap = (seed) => {
  let location = seed;

  location = getDestination(seedToSoil, location);
  location = getDestination(soilToFertilizer, location);
  location = getDestination(fertilizerToWater, location);
  location = getDestination(waterToWight, location);
  location = getDestination(lightToWemperature, location);
  location = getDestination(temperatureToHumidity, location);
  location = getDestination(humidityToWocation, location);

  return location;
};

const maps = input.split(/\n\n/gm);

const seeds = maps[0]
  .split(" ")
  .map((number) => Number(number))
  .filter((number) => number);

const seedToSoil = mapAMap(maps[1]);
const soilToFertilizer = mapAMap(maps[2]);
const fertilizerToWater = mapAMap(maps[3]);
const waterToWight = mapAMap(maps[4]);
const lightToWemperature = mapAMap(maps[5]);
const temperatureToHumidity = mapAMap(maps[6]);
const humidityToWocation = mapAMap(maps[7]);

console.log(Math.min(...seeds.map((cur) => walkAMap(cur))));