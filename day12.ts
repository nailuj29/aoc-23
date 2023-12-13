import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { loadTestData, loadData } from "./utils.ts";

const part1test = 21;
const part2test = 525152;

const cache: { [key: string]: number } = {}

const numOptions = (springs: string, sizes: number[], inChunk: boolean, damagedAccum: number): number => {
    const json = JSON.stringify({ springs, sizes, inChunk, damagedAccum });
    if (cache[json]) {
        return cache[json];
    }

    if (springs.length == 0) {
        if (sizes.length == 0) {
            cache[json] = 1;
            return 1;
        } else {
            if (inChunk) {
                if (sizes[0] == damagedAccum && sizes.length == 1) {
                    cache[json] = 1;
                    return 1;
                }
            }
            cache[json] = 0;
            return 0;
        }
    }

    if (inChunk && springs[0] == '.') {
        if (sizes[0] != damagedAccum) {
            cache[json] = 0;
            return 0;
        } else {
            cache[json] = numOptions(springs, sizes.slice(1), false, 0);
            return cache[json];
        }
    }

    if (springs[0] == '?') {
        cache[json] = numOptions('#' + springs.substring(1), sizes, inChunk, damagedAccum) + numOptions('.' + springs.substring(1), sizes, inChunk, damagedAccum);
        return cache[json];
    }

    if (springs[0] == '.') {
        cache[json] = numOptions(springs.substring(1), sizes, inChunk, damagedAccum);
        return cache[json];
    }

    if (springs[0] == '#') {
        if (!inChunk) {
            if (sizes.length == 0) {
                cache[json] = 0;
                return 0;
            }
            cache[json] = numOptions(springs, sizes, true, 0);
            return cache[json];
        } else {
            cache[json] = numOptions(springs.substring(1), sizes, inChunk, damagedAccum + 1);
            return cache[json];
        }
    }

    throw ("What");
}

const part1 = (data: string) => {
    const lines = data.split('\n');
    
    let sum = 0;
    for (const line of lines) {
        const [springs, list] = line.split(" ");
        const sizes = list.split(",").map(n => parseInt(n));

        sum += numOptions(springs, sizes, false, 0);
    }

    return sum;
};

const part2 = (data: string) => {
    const lines = data.split('\n');
    
    let sum = 0;
    let counter = 1;
    for (const line of lines) {
        const [fifthSprings, fifthList] = line.split(" ");
        const springs = new Array(5).fill(fifthSprings).join("?");
        const list = new Array(5).fill(fifthList).join(",");
        const sizes = list.split(",").map(n => parseInt(n));

        sum += numOptions(springs, sizes, false, 0);
        console.log(counter++)
        // smths wrong with the memoization lol
  
    }

    return sum;
};

assertEquals(part1(await loadTestData(12)), part1test)
console.log(part1(await loadData(12)))
// assertEquals(part2(await loadTestData(12)), part2test)
// console.log("Part 2 Tested")
// console.log(part2(await loadData(12)))
