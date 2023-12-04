import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { loadTestData, loadData } from "./utils.ts";

const part1test = 13;
const part2test = 30;

interface Card {
    winningNumbers: Set<number>,
    yourNumbers: Set<number>,
    id: number,
}

const checkWins = (card: Card): number[] => {
    const winnings = new Set(
        Array.from(card.winningNumbers).filter(x => card.yourNumbers.has(x))
    ).size;
    
    return [...Array(winnings).keys()].map(num => num + card.id + 1);
}

const part1 = (data: string) => {
    let sum = 0;
    const lines = data.split("\n").map(line => line.split(": ")[1]) // we don't need the card number
    const numbers = lines.map(
        line => line.split("|").map(
            numList => numList.trim().split(" ").map(
                num => parseInt(num.trim())).filter(
                    num => !isNaN(num))).map(
                        numList => new Set(numList)));

    const winningNumbers = numbers.map(
        (item: Set<number>[]) => new Set(
            Array.from(item[0]).filter(x => item[1].has(x))
        ));

    const scores = winningNumbers.map(wins =>
        Math.floor(Math.pow(2, wins.size - 1))
    );

    for (const score of scores) {
        sum += score;
    }

    return sum;
};

const part2 = (data: string) => {
    const lines = data.split("\n").map(line => line.split(": ")[1]) // we don't need the card number
    const numbers = lines.map(
        line => line.split("|").map(
            numList => numList.trim().split(" ").map(
                num => parseInt(num.trim())).filter(
                    num => !isNaN(num))).map(
                        numList => new Set(numList)));
    
    let id = 0;
    const cards: Card[] = numbers.map(([winningNumbers, yourNumbers]) => ({
        winningNumbers, yourNumbers,
        id: id++
    }));

    let count = cards.length;
    let hand = cards;
    while (hand.length > 0) {
        const winnings = hand.flatMap(card => checkWins(card)).map(id => cards[id]);
        count += winnings.length;

        hand = winnings;
    }

    return count;
};

assertEquals(part1(await loadTestData(4)), part1test)
console.log(part1(await loadData(4)))
assertEquals(part2(await loadTestData(4)), part2test)
console.log(part2(await loadData(4)))
