import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { loadTestData, loadData } from "./utils.ts";

const part1test = 405;
const part2test = 400;

const numDifferent = (string1: string, string2: string): number => {
    if (string1 == undefined || string2 == undefined) {
        return 0;
    }
    let count = 0;
    for (let i = 0; i < string1.length; i++) {
        if (string1[i] != string2[i]) {
            count++;
        }
    }

    return count;
}

const part1 = (data: string) => {
    const patterns = data.split("\n\n");
    let sum = 0;

    for (const pattern of patterns) {
        const grid = pattern.split("\n");
        const candidateRows = []
        for (let i = 1; i < grid.length; i++) {
            if (grid[i] == grid[i - 1]) {
                candidateRows.push(i);
            }
        }

        for (const row of candidateRows) {
            let found = true; // go to top
            for (let i = row, j = row - 1; i < grid.length && j >= 0; i++, j--) {
                if (grid[i] != grid[j]) {
                    found = false;
                }
            }
            if (found) {
                sum += row * 100;
                break;
            }
        }

        const rotated: string[][] = new Array(grid[0].length).fill(null).map(() => []);
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[0].length; j++) {
                rotated[j].push(grid[i][j]);
            } 
        }
        const rotatedGrid = rotated.map(l => l.join(""));
        const candidateColumns = []
        for (let i = 1; i < rotatedGrid.length; i++) {
            if (rotatedGrid[i] == rotatedGrid[i - 1]) {
                candidateColumns.push(i);
            }
        }

        for (const column of candidateColumns) {
            let found = true; // go to top
            for (let i = column, j = column - 1; i < rotatedGrid.length && j >= 0; i++, j--) {
                if (rotatedGrid[i] != rotatedGrid[j]) {
                    found = false;
                }
            }
            if (found) {
                sum += column;
                break;
            }
        }
    }

    return sum;
};

const part2 = (data: string) => {
    const patterns = data.split("\n\n");
    let sum = 0;

    for (const pattern of patterns) {
        const grid = pattern.split("\n");
        const candidateRows = []
        for (let i = 1; i < grid.length; i++) {
            if (numDifferent(grid[i], grid[i - 1]) <= 1) {
                candidateRows.push(i);
            }
        }

        for (const row of candidateRows) {
            let count = 0;
            for (let i = row, j = row - 1; i < grid.length && j >= 0; i++, j--) {
                count += numDifferent(grid[i], grid[j]);
            }
            if (count == 1) {
                sum += row * 100;
                break;
            }
        }

        const rotated: string[][] = new Array(grid[0].length).fill(null).map(() => []);
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[0].length; j++) {
                rotated[j].push(grid[i][j]);
            } 
        }
        const rotatedGrid = rotated.map(l => l.join(""));
        const candidateColumns = []
        for (let i = 1; i < rotatedGrid.length; i++) {
            if (numDifferent(rotatedGrid[i], rotatedGrid[i - 1]) <= 1) {
                candidateColumns.push(i);
            }
        }

        for (const column of candidateColumns) {
            let count = 0;
            for (let i = column, j = column - 1; i < rotatedGrid.length && j >= 0; i++, j--) {
                count += numDifferent(rotatedGrid[i], rotatedGrid[j]);
            }

            if (count == 1) {
                sum += column;
                break;
            }
        }
    }

    return sum;
};

assertEquals(part1(await loadTestData(13)), part1test)
console.log(part1(await loadData(13)))
assertEquals(part2(await loadTestData(13)), part2test)
console.log(part2(await loadData(13)))
