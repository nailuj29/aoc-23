import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { loadTestData, loadData } from "./utils.ts";

const part1test = 35;
const part2test = 46;

interface Mapping {
    destStart: number;
    sourceStart: number;
    length: number;
}

const map = (input: number, mappings: Mapping[]) => {
    for (const mapping of mappings) {
        if (input >= mapping.sourceStart && input < mapping.sourceStart + mapping.length) {
            return mapping.destStart + input - mapping.sourceStart;
        }
    }

    return input;
}

const splitRange = (range: number[], splitter: number[]): number[][][] => {
    // (ignored[in)out]
    if (range[0] >= splitter[0] && splitter[0] + splitter[1] >= range[0] && range[0] + range[1] >= splitter[0] + splitter[1]) {
      return [
        [[range[0], (splitter[0] + splitter[1]) - range[0]]], 
        [[splitter[0] + splitter[1], range[1] - ((splitter[0] + splitter[1]) - range[0])]]
      ]
    }
  
    // [out(in]ignored)
    if (range[0] <= splitter[0] && range[0] + range[1] < splitter[0] + splitter[1] && splitter[0] <= range[0] + range[1]) {
      return [
        [[splitter[0], (splitter[0] + splitter[1]) - (range[0] + range[1])]],
        [[range[0], splitter[0] - range[0]]],
      ]
    }
  
    // [out(in)out]
    if (range[0] <= splitter[0] && range[0] + range[1] >= splitter[0] + splitter[1]) {
      return [
        [splitter],
        [[range[0], splitter[0] - range[0]], [splitter[0] + splitter[1], (range[0] + range[1]) - (splitter[0] + splitter[1])]]
      ];
    }
  
    // (ignored[in]ignored)
    if (splitter[0] < range[0] && splitter[0] + splitter[1] > range[0] + range[1]) {
      return [[range], []]
    }
  
    // (ignored)[out]
    if (splitter[0] < range[0] && splitter[0] + splitter[1] < range[0]) {
      return [[], [range]]
    }
  
    // [out](ignored)
    if (range[0] < splitter[0] && range[0] + range[1] < splitter[0]) {
      return [[], [range]]
    }
  
    console.log("???");
    console.table({ range, splitter })
    return [];
}

const mapRanges = (ranges: number[][], mappings: Mapping[]) => {
    const done = [];
    let cur = ranges.filter(val => val[1] > 0);

    for (const mapping of mappings) {
        const splitResults: number[][][][] = [[], []];
        for (const curRange of cur) {
            const res = splitRange(curRange, [mapping.sourceStart, mapping.length]);
            splitResults[0].push(res[0]);
            splitResults[1].push(res[1]);
        }

        const split = [splitResults[0].flat(1), splitResults[1].flat(1)];
        cur = split[1].filter(val => val[1] > 0);

        for (const item of split[0]) {
            done.push([map(item[0], [mapping]), item[1]]);
        }
    }

    for (const range of cur) {
        done.push(range);
    }

    return done;
}

const part1 = (data: string) => {
    const maps: Mapping[][] = data
        .split("\n\n")
        .slice(1)
        .map(map => map
            .split("\n")
            .slice(1)
            .map(line => line.
                split(" ")
                .map(num => parseInt(num)))
            .map(([destStart, sourceStart, length]) => ({ destStart, sourceStart, length })));

    const seeds = data
        .split("\n")[0]
        .split(": ")[1]
        .split(" ")
        .map(num => parseInt(num));

    const results = seeds
        .map(seed => {
            let value = seed;
            for (const currentMap of maps) {
                value = map(value, currentMap);
            }

            return value;
        });

    return Math.min(...results);
};

const part2 = (data: string) => {
    const maps: Mapping[][] = data
        .split("\n\n")
        .slice(1)
        .map(map => map
            .split("\n")
            .slice(1)
            .map(line => line.
                split(" ")
                .map(num => parseInt(num)))
            .map(([destStart, sourceStart, length]) => ({ destStart, sourceStart, length })));

    const seedIndices = data
        .split("\n")[0]
        .split(": ")[1]
        .split(" ")
        .map(num => parseInt(num));

    const seedRanges: number[][] = [];

    for (let i = 0; i < seedIndices.length; i += 2) {
        seedRanges.push([seedIndices[i], seedIndices[i + 1]]);
    }

    const results = seedRanges.map(seed => {
        let value = [seed];
        for (const currentMap of maps) {
            value = mapRanges(value, currentMap);
        }

        return value;
    }).flat(1);

    return Math.min(...results.filter(res => res[1] > 0).map(res => res[0]));
};

assertEquals(part1(await loadTestData(5)), part1test)
console.log(part1(await loadData(5)))
assertEquals(part2(await loadTestData(5)), part2test)
console.log(part2(await loadData(5)))
