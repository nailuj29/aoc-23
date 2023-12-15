import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { loadTestData, loadData } from "./utils.ts";
import md5 from "npm:md5";

const part1test = 136;
const part2test = 64;

const tiltNorth = (grid: string[][]): string[][] => {
    const newGrid = [];
    for (const line of grid) {
        newGrid.push(line.slice())
    }

    let done = false;
    while (!done) {
        done = true;

        for (let i = 1; i < newGrid.length; i++) {
            for (let j = 0; j < newGrid[i].length; j++) {
                if (newGrid[i - 1][j] == '.' && newGrid[i][j] == 'O') {
                    newGrid[i][j] = '.';
                    newGrid[i - 1][j] = 'O';
                    done = false;
                }
            }
        }
    }

    return newGrid;
}

const tiltSouth = (grid: string[][]): string[][] => {
    const newGrid = [];
    for (const line of grid) {
        newGrid.push(line.slice())
    }

    let done = false;
    while (!done) {
        done = true;

        for (let i = 1; i < newGrid.length; i++) {
            for (let j = 0; j < newGrid[i].length; j++) {
                if (newGrid[i - 1][j] == 'O' && newGrid[i][j] == '.') {
                    newGrid[i][j] = 'O';
                    newGrid[i - 1][j] = '.';
                    done = false;
                }
            }
        }
    }

    return newGrid;
}

const tiltWest = (grid: string[][]): string[][] => {
    const newGrid = [];
    for (const line of grid) {
        newGrid.push(line.slice())
    }

    let done = false;
    while (!done) {
        done = true;

        for (let i = 0; i < newGrid.length; i++) {
            for (let j = 1; j < newGrid[i].length; j++) {
                if (newGrid[i][j - 1] == '.' && newGrid[i][j] == 'O') {
                    newGrid[i][j] = '.';
                    newGrid[i][j - 1] = 'O';
                    done = false;
                }
            }
        }
    }

    return newGrid;
}

const tiltEast = (grid: string[][]): string[][] => { // Future me: the issue is somewhere here
    const newGrid = [];
    for (const line of grid) {
        newGrid.push(line.slice())
    }

    let done = false;
    while (!done) {
        done = true;

        for (let i = 0; i < newGrid.length; i++) {
            for (let j = 0; j < newGrid[i].length - 1; j++) {
                if (newGrid[i][j + 1] == '.' && newGrid[i][j] == 'O') {
                    newGrid[i][j] = '.';
                    newGrid[i][j + 1] = 'O';
                    done = false;
                }
            }
        }
    }

    return newGrid;
}

const part1 = (data: string) => {
    const lines = data.split("\n");
    const grid = lines.map(line => Array.from(line));

    const tilted = tiltNorth(grid).reverse();
    
    let sum = 0;
    for (let i = 0; i < tilted.length; i++) {
        for (let j = 0; j < tilted[i].length; j++) {
            if (tilted[i][j] == 'O') {
                sum += i + 1;
            }
        }
    }

    return sum;
};

const part2 = (data: string) => {
    const lines = data.split("\n");
    const grid = lines.map(line => Array.from(line));

    let tilted = grid;
    let done = false;
    const hashes: Map<string, { state: string[][], count: number }> = new Map();
    let count = 0;
    while (!done) {
        tilted = tiltNorth(grid);
        tilted = tiltWest(grid);
        tilted = tiltSouth(grid);
        tilted = tiltEast(grid);

        const str = tilted.toString();
        const hash = md5(str);
        if (hashes.has(hash)) {
            const cycleSize = count - hashes.get(hash)!.count;
            const firstOccurence = hashes.get(hash)!.count;
            const index = (1000000000 - firstOccurence) % cycleSize;
            tilted = [...hashes.entries()].filter(([_, { count }]) => count == index + firstOccurence)[0][1].state;
            done = true;
        } else {
            hashes.set(hash, { state: tilted, count: count++ });
        }
    }

    tilted = tilted.reverse();
    
    
    let sum = 0;
    for (let i = 0; i < tilted.length; i++) {
        for (let j = 0; j < tilted[i].length; j++) {
            if (tilted[i][j] == 'O') {
                sum += i + 1;
            }
        }
    }

    return sum;
};

assertEquals(part1(await loadTestData(14)), part1test)
console.log(part1(await loadData(14)))
// assertEquals(part2(await loadTestData(14)), part2test)
// console.log(part2(await loadData(14)))
