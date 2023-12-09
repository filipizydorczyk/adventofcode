const fs = require("fs");

const input = fs.readFileSync("07.12.2023.txt").toString();

// A, K, Q, J, T, 9, 8, 7, 6, 5, 4, 3, or 2

// Five of a kind, where all five cards have the same label: AAAAA
// Four of a kind, where four cards have the same label and one card has a different label: AA8AA
// Full house, where three cards have the same label, and the remaining two cards share a different label: 23332
// Three of a kind, where three cards have the same label, and the remaining two cards are each different from any other card in the hand: TTT98
// Two pair, where two cards share one label, two other cards share a second label, and the remaining card has a third label: 23432
// One pair, where two cards share one label, and the other three cards have a different label from the pair and each other: A23A4
// High card, where all cards' labels are distinct: 23456

// console.log(getSetValue('AAAAA'))
// console.log(getSetValue('AA8AA'))
// console.log(getSetValue('23332'))
// console.log(getSetValue('TTT98'))
// console.log(getSetValue('23432'))
// console.log(getSetValue('A23A4'))
// console.log(getSetValue('23456'))

const CARD_ORDER = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];

const getSetValue = (set) => {
    const cards = new Set(set.split(''));
    const maxRepets = [...cards].reduce((acc, cur) => {
        const repeats = set.split(cur).length - 1;

        return repeats > acc ? repeats : acc;
    }, 0);

    return [6 - cards.size, maxRepets];
}
const getCardValue = (card) => CARD_ORDER.length - CARD_ORDER.indexOf(card)

const sets = input.split("\n").map((line) => line.split(" ")[0]);
const bits = input.split("\n").map((line) => Number(line.split(" ")[1]));

const sum = [...sets].sort((a, b) => {
    const setCompA = getSetValue(a);
    const setCompB = getSetValue(b);

    const isFirstTheSame = setCompA[0] === setCompB[0];
    const isSecondTheSame = setCompA[1] === setCompB[1];

    if (isFirstTheSame && !isSecondTheSame) {
      return setCompA[1] - setCompB[1];
    }

    if (isFirstTheSame && isSecondTheSame) {
      const cardsA = a.split("");
      const cardsB = b.split("");

      for (i = 0; i < a.length; i++) {
        const valueA = getCardValue(cardsA[i]);
        const valueB = getCardValue(cardsB[i]);

        if (valueA !== valueB) {
          return valueA - valueB;
        }
      }

      return 0;
    }

    return setCompA[0] - setCompB[0];
  })
  .reduce((acc, cur, index) => {
    const rank = index + 1;

    return acc + rank * bits[sets.indexOf(cur)];
  }, 0);

console.log(sum);