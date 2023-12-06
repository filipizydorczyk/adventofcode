const input = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`;

const mapAMap = (string) => {
  return string
    .split(/\s|\n/gm)
    .map((number) => Number(number))
    .filter((number) => !isNaN(number));
};

const copmleteTheMap = (targetMap, parsedMap) => {
  for (let i = 0; i < parsedMap.length; i += 3) {
    const start = parsedMap[i + 1];
    const end = parsedMap[i];
    const range = parsedMap[i + 2];

    for (let j = 0; j < range; j++) {
      targetMap[start + j] = end + j;
    }
  }
};

const getDestination = (map, start) => {
  return map[start] || start;
};

const walkAMap = (seed) => {
  let location = seed;

  location = getDestination(seedToSoilMap, location);
  location = getDestination(soilToFertilizerMap, location);
  location = getDestination(fertilizerToWaterMap, location);
  location = getDestination(waterToWightMap, location);
  location = getDestination(lightToWemperatureMap, location);
  location = getDestination(temperatureToHumidityMap, location);
  location = getDestination(humidityToWocationMap, location);

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

const seedToSoilMap = {};
const soilToFertilizerMap = {};
const fertilizerToWaterMap = {};
const waterToWightMap = {};
const lightToWemperatureMap = {};
const temperatureToHumidityMap = {};
const humidityToWocationMap = {};

copmleteTheMap(seedToSoilMap, seedToSoil);
copmleteTheMap(soilToFertilizerMap, soilToFertilizer);
copmleteTheMap(fertilizerToWaterMap, fertilizerToWater);
copmleteTheMap(waterToWightMap, waterToWight);
copmleteTheMap(lightToWemperatureMap, lightToWemperature);
copmleteTheMap(temperatureToHumidityMap, temperatureToHumidity);
copmleteTheMap(humidityToWocationMap, humidityToWocation);

console.log(Math.min(...seeds.map((cur) => walkAMap(cur))));
