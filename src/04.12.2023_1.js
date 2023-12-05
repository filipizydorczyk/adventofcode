const input = fs.readFileSync("04.12.2023.txt").toString();

const sum = input.split("\n").reduce((acc, line) => {
  const lists = line.split(/(\||\:)/);
  const winningList = lists[2].split(" ").filter(item => item).map( item => Number(item));
  const ourList = lists[4].split(" ").filter(item => item).map( item => Number(item));

  const intersection = ourList.filter(x => winningList.includes(x));

  return intersection.length ? acc + Math.pow(2, intersection.length - 1) : acc;
},0);

console.log(sum)