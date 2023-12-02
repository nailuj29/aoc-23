import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { loadTestData, loadData } from "./utils.ts";

const part1test = 8; 
const part2test = 2286;

const part1 = (data: string) => {
    const lines = data.split("\n");
    const maxRed = 12;
    const maxGreen = 13;
    const maxBlue = 14;

    let sum = 0;

    for (const line of lines) {
        const parts = line.split(": ");
        const id = parseInt(parts[0].substring(5));

        const rounds = parts[1].split("; ").map(round => round.split(", ").map(item => item.split(" ")));
        let impossible = false;
        for (const round of rounds) {
            for (const item of round) {
                switch (item[1]) {
                    case "red":
                        if (parseInt(item[0]) > maxRed) {
                            impossible = true;
                        }
                        break;
                    case "blue":
                        if (parseInt(item[0]) > maxBlue) {
                            impossible = true;
                        }
                        break;
                    case "green":
                        if (parseInt(item[0]) > maxGreen) {
                            impossible = true;
                        }
                        break;
                }
            }
        }
        if (!impossible) {
            sum += id;
        }
    }

    return sum;
};

const part2 = (data: string) => {
    const lines = data.split("\n");

    let sum = 0;

    for (const line of lines) {
        const parts = line.split(": ");
        const id = parseInt(parts[0].substring(5));

        const rounds = parts[1].split("; ").map(round => round.split(", ").map(item => item.split(" ")));
        let largestRed = 0;
        let largestGreen = 0;
        let largestBlue = 0;
        for (const round of rounds) {
            for (const item of round) {
                switch (item[1]) {
                    case "red":
                        if (parseInt(item[0]) > largestRed) {
                            largestRed = parseInt(item[0]);
                        }
                        break;
                    case "blue":
                        if (parseInt(item[0]) > largestBlue) {
                            largestBlue = parseInt(item[0]);
                        }
                        break;
                    case "green":
                        if (parseInt(item[0]) > largestGreen) {
                            largestGreen = parseInt(item[0]);
                        }
                }
            }
        }
        sum += largestRed * largestGreen * largestBlue;
    }

    return sum;
};

assertEquals(part1(await loadTestData(2)), part1test)
console.log(part1(await loadData(2)))
assertEquals(part2(await loadTestData(2)), part2test)
console.log(part2(await loadData(2)))
