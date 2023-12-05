const input = fs.readFileSync("01.12.2023.txt").toString();

const DIGIT_MATCHERS = {
  one: "1",
  two: "2",
  three: "3",
  four: "4", 
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

const NUMBERS = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

const getIndexes = (string, match) => {
  const indices = [];
  let startIndex = 0;
  while ((index = string.indexOf(match, startIndex)) > -1) {
    indices.push(index);
    startIndex = index + match.length;
  }
  return indices;
};

function replaceCharacter(string, index, replacement) {
  return (
    string.slice(0, index) + replacement + string.slice(index + replacement.length)
  );
}

const sum = input
  .split("\n")
  .map((item) => {
    let transformedString = item;

    NUMBERS.forEach((number) => {
      const finds = getIndexes(item, number);
      
      finds.forEach(
        (find) => transformedString = replaceCharacter(transformedString, find, DIGIT_MATCHERS[number]));
    });

    transformedString = transformedString.replace(/\D+/g, "");

    if (transformedString.length === 1) {
      return Number(`${transformedString[0]}${transformedString[0]}`);
    }

    if (transformedString.length !== 2) {
      return Number(
        `${transformedString[0]}${
          transformedString[transformedString.length - 1]
        }`
      );
    }

    return Number(transformedString);
  })
  .reduce((acc, cur) => acc + cur, 0);

console.log(sum);
