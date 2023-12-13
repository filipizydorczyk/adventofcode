const fs = require("fs");

const input = fs.readFileSync("07.12.2023.txt").toString();
const CARD_ORDER = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J'];

const getSetValue = (set) => {
    const cards = new Set(set.split(''));
    const maxRepets = [...cards].reduce((acc, cur) => {
        const repeats = set.split(cur).length - 1;

        return repeats > acc ? repeats : acc;
    }, 0);

    return [6 - cards.size, maxRepets];
}
const getCardValue = (card) => CARD_ORDER.length - CARD_ORDER.indexOf(card)

const optimizeSet = (set, index) => {
  
    const cards = [...new Set(set.split(''))];
    let optimizedSet = set;

    if(!cards.includes('J')) {
        return [set, index];
    }

    cards.forEach(card => {
        if(card !== 'J') {
            const candidate = set.replace(/J/g, card);
            
            const candidateVal = getSetValue(candidate);
            const optimizedVal = getSetValue(optimizedSet);

            if(candidateVal[0] > optimizedVal[0]) {
                optimizedSet = candidate;
            }
            
            if(candidateVal[0] === optimizedVal[0] && candidateVal[1] > optimizedVal[1]) {
                optimizedSet = candidate;
            }
        }
    });

    return [optimizedSet, index];
}

const sets = input.split("\n").map((line) => line.split(" ")[0]);
const optimizedSets = sets.map((set, index) => optimizeSet(set, index));
const bits = input.split("\n").map((line) => Number(line.split(" ")[1]));

const sum = [...optimizedSets].sort((aa, bb) => {
    const a = aa[0];
    const b = bb[0];

    console.log("CHUJ", aa, bb)

    const setCompA = getSetValue(a);
    const setCompB = getSetValue(b);

    const isFirstTheSame = setCompA[0] === setCompB[0];
    const isSecondTheSame = setCompA[1] === setCompB[1];

    if (isFirstTheSame && !isSecondTheSame) {
      return setCompA[1] - setCompB[1];
    }

    if (isFirstTheSame && isSecondTheSame) {
      const cardsA = sets[aa[1]].split("");
      const cardsB = sets[bb[1]].split("");

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

    return acc + rank * bits[cur[1]];
  }, 0);


console.log(sum);