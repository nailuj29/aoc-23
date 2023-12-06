import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { loadTestData, loadData } from "./utils.ts";

const part1test = 288;
const part2test = 71503;

const part1 = (data: string) => {
    const [times, distances] = data
        .split("\n")
        .map(line => line
            .split(" ")
            .map(val => parseInt(val))
            .filter(val => !isNaN(val)))

    let product = 1;
    for (let i = 0; i < times.length; i++) {
        const time = times[i];
        const distance = distances[i];

        let count = 0;
        for (let t = 0; t <= time; t++) {
            if ((t * (time - t)) > distance) {
                count++;
            }
        }

        if (count > 0) {
            product *= count
        }
    }

    return product;
};

const part2 = (data: string) => {
    const [times, distances] = data
        .split("\n")
        .map(line => line
            .split(" ")
            .map(val => parseInt(val))
            .filter(val => !isNaN(val)))

    const time = parseInt(times.join(""));
    const distance = parseInt(distances.join(""));

    let count = 0;
    for (let t = 0; t <= time; t++) {
        if ((t * (time - t)) > distance) {
            count++;
        }
    }

    return count;
};

assertEquals(part1(await loadTestData(6)), part1test)
console.log(part1(await loadData(6)))
assertEquals(part2(await loadTestData(6)), part2test)
console.log(part2(await loadData(6)))
