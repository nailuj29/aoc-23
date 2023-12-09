import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { loadTestData, loadData } from "./utils.ts";

const part1test = 114;
const part2test = 2;

const part1 = (data: string) => {
    const histories = data
        .split('\n')
        .map(line => line
            .split(" ")
            .map(n => parseInt(n)));

    let sum = 0;
    for (const history of histories) {
        const diffs = [history];
        while (diffs[diffs.length - 1].filter(x => x != 0).length > 0) {
            const last = diffs[diffs.length - 1];
            const newDiffs = [];
            for (let i = 1; i < last.length; i++) {
                newDiffs.push(last[i] - last[i - 1]);
            }
            diffs.push(newDiffs);
        }
        const lasts = diffs.map(diff => diff[diff.length - 1]);
        sum += lasts.reduce((a, b) => a + b);
    }

    return sum;
};

const part2 = (data: string) => {
    const histories = data
        .split('\n')
        .map(line => line
            .split(" ")
            .map(n => parseInt(n)));

    let sum = 0;
    for (const history of histories) {
        const diffs = [history];
        while (diffs[diffs.length - 1].filter(x => x != 0).length > 0) {
            const last = diffs[diffs.length - 1];
            const newDiffs = [];
            for (let i = 1; i < last.length; i++) {
                newDiffs.push(last[i] - last[i - 1]);
            }
            diffs.push(newDiffs);
        }
        
        let extrap = 0;
        for (let i = diffs.length - 2; i >= 0; i--) {
            extrap = diffs[i][0] - extrap;
        }

        sum += extrap
    }

    return sum;
};

assertEquals(part1(await loadTestData(9)), part1test)
console.log(part1(await loadData(9)))
assertEquals(part2(await loadTestData(9)), part2test)
console.log(part2(await loadData(9)))
