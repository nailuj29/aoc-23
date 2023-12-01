const source = `import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import {loadTestData, loadData } from "./utils.ts";

//const part1test = // fill this in
// const part2test = // fill this in

const part1 = (data: string) => {
    // fill this in
};

const part2 = (data: string) => {
    // fill this in
};

assertEquals(part1test, part1(loadTestData(${Deno.args[0]})))
console.log(part1(loadData(${Deno.args[0]})))
// assertEquals(part2test, part2(loadTestData(${Deno.args[0]})))
// console.log(part2(loadData(${Deno.args[0]})))
`

const encoder = new TextEncoder();
await Deno.writeFile(`day${Deno.args[0]}.ts`, encoder.encode(source))