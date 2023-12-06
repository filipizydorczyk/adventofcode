const fs = require("fs");

const input = fs.readFileSync("03.12.2023.txt").toString();

const numbers = input.match(/\d+/gm);
const lineLength = input.split("\n")[0].length + 1;
const numersToIndecies = {};
let lastIndexNumber = 0;
let lastIndexStar = 0;


numbers.forEach((number) => {
    const index = input.indexOf(number, lastIndexNumber);
    const numberDigits = number.length;

    if(numersToIndecies[number] === undefined) numersToIndecies[number] = [];

    for (let i = index; i < index + numberDigits; i++) { 
        numersToIndecies[number].push(i);
    }

    lastIndexNumber = index > 0 ? index + numberDigits : lastIndexNumber;
})

const sum = input.match(/\*/gm)
    .reduce((acc, _) => {
        const index = input.indexOf('*', lastIndexStar + 1);
        const starIndecies = [
            index - lineLength - 1, index - lineLength, index - lineLength + 1,
            index - 1,              index,              index + 1,
            index + lineLength - 1, index + lineLength, index + lineLength + 1
        ];

        const touching = Object.entries(numersToIndecies)
        .map(([key, value]) => {
            const isTouching = value.some((numberIndex) => {
            return starIndecies.includes(numberIndex);
            });

            return isTouching ? key : null;
        })
        .filter((item) => !!item);
        
        lastIndexStar = index > 0 ? index : lastIndexStar;

        if(touching.length === 2) {
            return acc + (Number(touching[0]) * Number(touching[1]))
        }

        return acc;
}, 0)


console.log(sum);
