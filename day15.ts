import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { loadTestData, loadData } from "./utils.ts";

const part1test = 1320;
const part2test = 145;

interface Lens {
    label: string;
    focalLength: number;
}

const hash = (str: string): number => {
    let curr = 0;
    while (str.length > 0) {
        curr += str.charCodeAt(0);
        str = str.substring(1);
        curr *= 17;
        curr %= 256;
    }

    return curr;
}

const part1 = (data: string) => {
    const parts = data.split(",");
    const hashed = parts.map(hash);

    return hashed.reduce((a, b) => a + b);
};

const part2 = (data: string) => {
    const parts = data.split(",");
    const boxes: Lens[][] = new Array(256).fill(null).map(() => []);

    for (const part of parts) {
        let label: string;
        if (part.includes('=')) {
            label = part.split("=")[0];
        } else {
            label = part.substring(0, part.length - 1);
        }

        const hashed = hash(label);

        if (part.includes('=')) {
            const lens = boxes[hashed].filter(l => l.label == label)[0];
            const focalLength = parseInt(part.split('=')[1]);
            if (lens) {
                lens.focalLength = focalLength;
            } else {
                boxes[hashed].push({
                    label,
                    focalLength,
                });
            }
        } else {
            boxes[hashed] = boxes[hashed].filter(l => l.label != label);
        }
    }

    let sum = 0;
    for (let boxNum = 0; boxNum < boxes.length; boxNum++) {
        const box = boxes[boxNum];
        for (let lensNum = 0; lensNum < box.length; lensNum++) {
            const focalLength = box[lensNum].focalLength;
            
            sum += (boxNum + 1) * (lensNum + 1) * focalLength;
        }
    }

    return sum;
};

assertEquals(part1(await loadTestData(15)), part1test)
console.log(part1(await loadData(15)))
assertEquals(part2(await loadTestData(15)), part2test)
console.log(part2(await loadData(15)))
