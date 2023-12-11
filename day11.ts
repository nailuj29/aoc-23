import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { loadTestData, loadData } from "./utils.ts";

const part1test = 374; // fill this in
const part2test10 = 1030;
const part2test100 = 8410;

const pairs = <T>(array: T[]): T[][] => {
    const pairs = [];
    for (let i = 0; i < array.length; i++) {
        for (let j = i + 1; j < array.length; j++) {
            pairs.push([array[i], array[j]])
        }
    }

    return pairs;
}

const solution = (data: string, factor: number) => {
    const grid = data.split('\n');
    const emptyRows = [];
    for (let i = 0; i < grid.length; i++) {
        const line = grid[i];
        if (!line.includes("#")) {
            emptyRows.push(i);
        }
    };

    const emptyColumns = [];
    for (let i = 0; i < grid[0].length; i++) {
        let found = false;
        for (let j = 0; j < grid.length; j++) {
            if (grid[j][i] == '#') {
                found = true;
                break;
            }
        }
        if (!found) {
            emptyColumns.push(i);
        }
    }


    const galaxies = [];
    for (let i = 0; i < grid[0].length; i++) {
        for (let j = 0; j < grid.length; j++) {
            if (grid[j][i] == '#') {
                galaxies.push([i, j]);
            }
        }
    }

    const galaxyPairs = pairs(galaxies);
    let sum = 0;

    for (const pair of galaxyPairs) {
        for (let i = Math.min(pair[0][0], pair[1][0]); i < Math.max(pair[0][0], pair[1][0]); i++) {
            if (emptyColumns.includes(i)) {
                sum += factor - 1;
            }
        }

        for (let i = Math.min(pair[0][1], pair[1][1]); i < Math.max(pair[0][1], pair[1][1]); i++) {
            if (emptyRows.includes(i)) {
                sum += factor - 1;
            }
        }
        sum += Math.abs(pair[0][0] - pair[1][0]) + Math.abs(pair[0][1] - pair[1][1]);
    }
    
    return sum;
};

assertEquals(solution(await loadTestData(11), 2), part1test)
console.log(solution(await loadData(11), 2))
assertEquals(solution(await loadTestData(11), 10), part2test10)
assertEquals(solution(await loadTestData(11), 100), part2test100)
console.log(solution(await loadData(11), 1000000))
