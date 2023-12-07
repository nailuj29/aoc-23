import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { loadTestData, loadData } from "./utils.ts";

interface Hand {
    cards: number[],
    bet: number,
}

const part1test = 6440;
const part2test = 5905;
const part2test2 = 6839;

const handValue1 = (hand: Hand) => {
    const counts = new Array(17).fill(0);
    for (let i = 0; i < 17; i++) {
        for (const card of hand.cards) {
            if (card == i) {
                counts[i]++;
            }
        }
    }

    if (counts.includes(5)) {
        return 7;
    } else if (counts.includes(4)) {
        return 6;
    } else if (counts.includes(3) && counts.includes(2)) {
        return 5;
    } else if (counts.includes(3)) {
        return 4;
    }else if (counts.indexOf(2) != -1 && counts.slice(counts.indexOf(2) + 1).includes(2)) {
        return 3;
    } else if (counts.includes(2)) {
        return 2;
    } else {
        return 1;
    }
}

const handValue2 = (hand: Hand) => {
    const counts = new Array(17).fill(0);
    for (let i = 0; i < 17; i++) {
        for (const card of hand.cards) {
            if (card == i) {
                counts[i]++;
            }
        }
    }

    const jokers = new Array(counts[0] + 1).fill(0).map((_, i) => i)

    if (jokers.map(i => counts.slice(1).includes(5 - i)).includes(true)) {
        return 7;
    } else if (jokers.map(i => counts.slice(1).includes(4 - i)).includes(true)) {
        return 6;
    } else if (
        (counts.slice(1).includes(2) && counts.slice(counts.indexOf(2) + 1).includes(2) && counts[0] == 1) ||
        (counts.includes(3) && counts.includes(2))) {
        return 5;
    } else if (jokers.map(i => counts.slice(1).includes(3 - i)).includes(true)) {
        return 4;
    }else if (counts.indexOf(2) != -1 && counts.slice(counts.indexOf(2) + 1).includes(2)) {
        return 3;
    } else if (jokers.map(i => counts.slice(1).includes(2 - i)).includes(true)) {
        return 2;
    } else {
        return 1;
    }
}

const compareHands1 = (hand1: Hand, hand2: Hand) => {
    const value1 = handValue1(hand1);
    const value2 = handValue1(hand2);

    if (value2 == value1) {
        for (let i = 0; i < hand1.cards.length; i++) {
            const value = hand1.cards[i] - hand2.cards[i];
            if (value != 0) {
                return value;
            }
        }

        return 0;
    } else {
        return value1 - value2;
    }
}

const compareHands2 = (hand1: Hand, hand2: Hand) => {
    const value1 = handValue2(hand1);
    const value2 = handValue2(hand2);

    if (value2 == value1) {
        for (let i = 0; i < hand1.cards.length; i++) {
            const value = hand1.cards[i] - hand2.cards[i];
            if (value != 0) {
                return value;
            }
        }

        return 0;
    } else {
        return value1 - value2;
    }
}

const part1 = (data: string) => {
    const rawHands = data.split("\n").map(s => s.split(' '))
    const hands = rawHands.map(
        rh => ({
            cards: Array.from(rh[0])
                .map(c => {
                    if (c == 'T') {
                        return '11';
                    } else if (c == 'J') {
                        return '12';
                    } else if (c == 'Q') {
                        return '13';
                    } else if (c == 'K') {
                        return '15';
                    } else if (c == 'A') {
                        return '16';
                    } else {
                        return c;
                    }
                }).map(n => parseInt(n)),

            bet: parseInt(rh[1])
        })
    ).sort(compareHands1);

    let sum = 0;
    for (let i = 0; i < hands.length; i++) {
        sum += hands[i].bet * (i+1);
    }

    return sum;
};

const part2 = (data: string) => {
    const rawHands = data.split("\n").map(s => s.split(' '))
    const hands = rawHands.map(
        rh => ({
            cards: Array.from(rh[0])
                .map(c => {
                    if (c == 'T') {
                        return '11';
                    } else if (c == 'J') {
                        return '0';
                    } else if (c == 'Q') {
                        return '13';
                    } else if (c == 'K') {
                        return '15';
                    } else if (c == 'A') {
                        return '16';
                    } else {
                        return c;
                    }
                }).map(n => parseInt(n)),

            bet: parseInt(rh[1])
        })
    ).sort(compareHands2);

    let sum = 0;
    for (let i = 0; i < hands.length; i++) {
        sum += hands[i].bet * (i+1);
    }

    return sum;
};

assertEquals(part1(await loadTestData(7)), part1test)
console.log(part1(await loadData(7)))
assertEquals(part2(await loadTestData(7)), part2test)
assertEquals(part2(await loadTestData(7, '2')), part2test2)
console.log(part2(await loadData(7)))
