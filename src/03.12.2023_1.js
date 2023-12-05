const input = fs.readFileSync("03.12.2023.txt").toString();

const RGX = /[^\.\d\n]/;

const lineLength = input.split("\n")[0].length + 1;
const numbers = input.match(/\d+/gm);
const sumArray = [];
let lastIndex = 0;


numbers.forEach((number) => {
    let shouldInsert = false;
    const index = input.indexOf(number, lastIndex);
    const numberDigits = number.length;
    const isShortRange = index % lineLength === 0 || (index + numberDigits) % lineLength === 0;
    const range = numberDigits + (isShortRange ? 1 : 2);

    const topIndex = index % lineLength === 0 ? index - lineLength : index - lineLength - 1;
    const middleIndex = index % lineLength === 0 ? index : index - 1;
    const bottomIndex = index % lineLength === 0 ? index + lineLength : index + lineLength - 1;

    if(index > lineLength) {
        for (let i = topIndex; i < topIndex + range; i++) {
            if(input[i].match(RGX)) shouldInsert = true;
        }
    }

    for (let i = middleIndex; i < middleIndex + range; i++) {
        if(input[i].match(RGX)) shouldInsert = true;
    }

    if(bottomIndex < input.length) {
        for (let i = bottomIndex; i < bottomIndex + range; i++) {
            if(input[i].match(RGX)) shouldInsert = true;
        }
    }


    if(shouldInsert) {
        sumArray.push(Number(number));
    }

    lastIndex = index > 0 ? index : lastIndex;
})

const sum = sumArray.reduce((acc, cur) => acc + cur, 0)

console.log(sum)