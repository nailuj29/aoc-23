import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { loadData, loadTestData } from "./utils.ts";

const part1test = 4361;
const part2test = 467835;

interface Gear {
    adjacentNums: number;
    ratio: number;
}

const part1 = (data: string) => {
    const lines = data.split("\n");
    const numbers = [];
    const regex = /\d+/g;
    for (let i = 0; i < lines.length; i++) {
        for (const match of lines[i].matchAll(regex)) {
            numbers.push({
                idx: [i, match.index!],
                value: match[0],
            });
        }
    }

    let sum = 0;
    for (const number of numbers) {
        const len = number.value.length;
        const idxs = [];
        for (let i = -1; i <= len; i++) {
            idxs.push([number.idx[0] - 1, number.idx[1] + i]);
            idxs.push([number.idx[0], number.idx[1] + i]);
            idxs.push([number.idx[0] + 1, number.idx[1] + i]);
        }

        for (
            const idx of idxs.filter((idx) =>
                idx[0] >= 0 && idx[0] < lines.length && idx[1] >= 0 &&
                idx[1] < lines[0].length
            )
        ) {
            const char = lines[idx[0]][idx[1]];
            if (char != "." && !("1234567890".includes(char))) {
                sum += parseInt(number.value);
                break;
            }
        }
    }

    return sum;
};

const part2 = (data: string) => {
    const lines = data.split("\n");
    const numbers = [];
    const regex = /\d+/g;
    for (let i = 0; i < lines.length; i++) {
        for (const match of lines[i].matchAll(regex)) {
            numbers.push({
                idx: [i, match.index!],
                value: match[0],
            });
        }
    }

    const gears: Gear[] = new Array(lines[0].length * lines.length).fill(null).map(() => { return { adjacentNums: 0, ratio: 1 } });
    for (const number of numbers) {
        const len = number.value.length;
        const idxs = [];
        for (let i = -1; i <= len; i++) {
            idxs.push([number.idx[0] - 1, number.idx[1] + i]);
            idxs.push([number.idx[0], number.idx[1] + i]);
            idxs.push([number.idx[0] + 1, number.idx[1] + i]);
        }

        for (
            const idx of idxs.filter((idx) =>
                idx[0] >= 0 && idx[0] < lines.length && idx[1] >= 0 &&
                idx[1] < lines[0].length
            )
        ) {
            const char = lines[idx[0]][idx[1]];
            if (char == "*") {
                gears[idx[0] * lines.length + idx[1]].adjacentNums++;
                gears[idx[0] * lines.length + idx[1]].ratio *= parseInt(number.value);
            }
        }
    }

    let sum = 0;

    for (const gear of gears) {
        if (gear.adjacentNums == 2) {
            sum += gear.ratio;
        }
    }

    return sum;
};

assertEquals(part1(await loadTestData(3)), part1test);
console.log(part1(await loadData(3)));
assertEquals(part2(await loadTestData(3)), part2test);
console.log(part2(await loadData(3)));
