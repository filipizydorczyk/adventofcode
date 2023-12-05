const input = fs.readFileSync("04.12.2023.txt").toString();

const cards = [];
const cardCounts = [...Array(input.split("\n").length)].fill(1);

input.split("\n").forEach((line) => {
    const lists = line.split(/(\||\:)/);
    const winningList = lists[2].split(" ").filter(item => item).map( item => Number(item));
    const ourList = lists[4].split(" ").filter(item => item).map( item => Number(item));
    cards.push([winningList, ourList]);
});



const processCard = (index) => {
    const [winningList, ourList] = cards[index];
        let wins = ourList.filter(x => winningList.includes(x)).length;
        let newIndex = index;
        while(wins > 0 && newIndex < cards.length - 1) {
            newIndex += 1;
            wins -= 1;
            cardCounts[newIndex] += 1;
            processCard(newIndex);
        }
}

cards.forEach((_, index) => {
    processCard(index)
})

const sum = cardCounts.reduce((acc, cur) => acc + cur);

console.log(sum)
