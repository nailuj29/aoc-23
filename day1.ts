import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import {loadTestData, loadData } from "./utils.ts";

const part1test = 142;
const part2test = 281;

const part1 = (data: string) => {
    const lines: string[] = data.split("\n")
    const calibrationValues: number[] = [];
    for (const line of lines) {
        const digits: string[] = [];
        for (let i = 0; i < line.length; i++) {
            const char = line.charAt(i);
            if (parseInt(char)) {
                digits.push(char)
            }
        }
        calibrationValues.push(parseInt(digits[0]) * 10 + parseInt(digits[digits.length - 1]))
    }

    let sum = 0;
    for (const calibrationValue of calibrationValues) {
        sum += calibrationValue;
    }

    return sum;
};

const part2 = (data: string) => {
    const lines: string[] = data.split("\n")
    const calibrationValues: number[] = [];
    const regex = /(?=(one|two|three|four|five|six|seven|eight|nine|zero|\d))/g;
    const nums = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]
    for (const line of lines) {
        const matches = Array.from(line.matchAll(regex));
        const first = matches[0];
        const last = matches[matches.length - 1];
        let firstNum = nums.findIndex((num) => num === first[1]);
        if (firstNum == -1) {
            firstNum = parseInt(first[1]);
        }

        let lastNum = nums.findIndex((num) => num === last[1]);
        if (lastNum == -1) {
            lastNum = parseInt(last[1]);
        }

        calibrationValues.push(firstNum * 10 + lastNum)   
    }

    let sum = 0;
    for (const calibrationValue of calibrationValues) {
        sum += calibrationValue;
    }

    return sum;
};

assertEquals(part1test, part1(await loadTestData(1)))
console.log(part1(await loadData(1)))
assertEquals(part2test, part2(await loadTestData(1, 2)))
console.log(part2(await loadData(1)))
