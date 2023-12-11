import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { loadTestData, loadData } from "./utils.ts";

const part1test = 8;
const part2test = 4;

const part1 = (data: string) => {
    const grid = data.split("\n");
    let start: number[] = [];
    for (let i = 0; i < grid.length; i++) {
        if (grid[i].includes('S')) {
            start = [grid[i].indexOf('S'), i];
        }
    }

    const map: { [key: string]: string[] } = {};

    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            const curr = [x, y];
            const neighbors = [grid[y][x]];
            const point = grid[curr[1]][curr[0]];
            switch (point) {
                case '|':
                    neighbors.push([curr[0], curr[1] + 1].toString());
                    neighbors.push([curr[0], curr[1] - 1].toString());
                    break;
                case '-':
                    neighbors.push([curr[0] - 1, curr[1]].toString());
                    neighbors.push([curr[0] + 1, curr[1]].toString());
                    break;
                case 'L':
                    neighbors.push([curr[0], curr[1] - 1].toString());
                    neighbors.push([curr[0] + 1, curr[1]].toString());
                    break;
                case 'J':
                    neighbors.push([curr[0], curr[1] - 1].toString());
                    neighbors.push([curr[0] - 1, curr[1]].toString());
                    break;
                case '7':
                    neighbors.push([curr[0], curr[1] + 1].toString());
                    neighbors.push([curr[0] - 1, curr[1]].toString());
                    break;
                case 'F':
                    neighbors.push([curr[0], curr[1] + 1].toString());
                    neighbors.push([curr[0] + 1, curr[1]].toString());
                    break;
                case 'S':
                    if (curr[0] - 1 >= 0 && ['-', 'F', 'L'].includes(grid[curr[1]][curr[0] - 1])) {
                        neighbors.push([curr[0] - 1, curr[1]].toString());
                    }
                    if (curr[0] + 1 < grid[curr[1]].length && ['-', 'J', '7'].includes(grid[curr[1]][curr[0] + 1])) {
                        neighbors.push([curr[0] + 1, curr[1]].toString());
                    } 
                    if (curr[1] - 1 >= 0 && ['|', 'L', 'J'].includes(grid[curr[1] - 1][curr[0]])) {
                        neighbors.push([curr[0], curr[1] - 1].toString());
                    } 
                    if (curr[1] + 1 < grid.length && ['|', '7', 'F'].includes(grid[curr[1] + 1][curr[0]])) {
                        neighbors.push([curr[0], curr[1] + 1].toString());
                    }
            };
            map[curr.toString()] = neighbors;
        }
    }

    let curr = map[start.toString()][1]
    let prev = start.toString();
    let count = 1;
    while (curr != start.toString()) {
        const neighbors = map[curr].slice(1)
        for (const n of neighbors) {
            if (n.toString() != prev) {
                prev = curr; 
                curr = n;
                count++;
                break;
            }
        }
    }

    return count / 2;
};

const part2 = (data: string) => {
    const grid = data.split("\n");
    let start: number[] = [];
    for (let i = 0; i < grid.length; i++) {
        if (grid[i].includes('S')) {
            start = [grid[i].indexOf('S'), i];
        }
    }
    
    const map: { [key: string]: string[] } = {};

    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            const curr = [x, y];
            const neighbors = [grid[y][x]];
            const point = grid[curr[1]][curr[0]];
            switch (point) {
                case '|':
                    neighbors.push([curr[0], curr[1] + 1].toString());
                    neighbors.push([curr[0], curr[1] - 1].toString());
                    break;
                case '-':
                    neighbors.push([curr[0] - 1, curr[1]].toString());
                    neighbors.push([curr[0] + 1, curr[1]].toString());
                    break;
                case 'L':
                    neighbors.push([curr[0], curr[1] - 1].toString());
                    neighbors.push([curr[0] + 1, curr[1]].toString());
                    break;
                case 'J':
                    neighbors.push([curr[0], curr[1] - 1].toString());
                    neighbors.push([curr[0] - 1, curr[1]].toString());
                    break;
                case '7':
                    neighbors.push([curr[0], curr[1] + 1].toString());
                    neighbors.push([curr[0] - 1, curr[1]].toString());
                    break;
                case 'F':
                    neighbors.push([curr[0], curr[1] + 1].toString());
                    neighbors.push([curr[0] + 1, curr[1]].toString());
                    break;
                case 'S':
                    if (curr[0] - 1 >= 0 && ['-', 'F', 'L'].includes(grid[curr[1]][curr[0] - 1])) {
                        neighbors.push([curr[0] - 1, curr[1]].toString());
                    }
                    if (curr[0] + 1 < grid[curr[1]].length && ['-', 'J', '7'].includes(grid[curr[1]][curr[0] + 1])) {
                        neighbors.push([curr[0] + 1, curr[1]].toString());
                    } 
                    if (curr[1] - 1 >= 0 && ['|', 'L', 'J'].includes(grid[curr[1] - 1][curr[0]])) {
                        neighbors.push([curr[0], curr[1] - 1].toString());
                    } 
                    if (curr[1] + 1 < grid.length && ['|', '7', 'F'].includes(grid[curr[1] + 1][curr[0]])) {
                        neighbors.push([curr[0], curr[1] + 1].toString());
                    }
            };
            map[curr.toString()] = neighbors;
        }
    }

    let curr = map[start.toString()][1]
    let prev = start.toString();
    const path = [curr]
    while (curr != start.toString()) {
        const neighbors = map[curr].slice(1)
        for (const n of neighbors) {
            if (n.toString() != prev) {
                prev = curr; 
                curr = n;
                path.push(curr);
                break;
            }
        }
    }

    path.push(path[0]);

    const numericalPath = path.map(str => str
        .split(",")
        .map(n => parseInt(n)));

    let sum1 = 0;
    let sum2 = 0;

    for (let i = 0; i < numericalPath.length - 1; i++) {
        sum1 += numericalPath[i][0] * numericalPath[i + 1][1];
        sum2 += numericalPath[i][1] * numericalPath[i + 1][0];
    }

    return Math.abs(sum1 - sum2) / 2 - (path.length - 1) / 2 + 1;
};

assertEquals(part1(await loadTestData(10)), part1test)
console.log(part1(await loadData(10)))
assertEquals(part2(await loadTestData(10, '2')), part2test)
console.log(part2(await loadData(10)))
