const source = `import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { loadTestData, loadData } from "./utils.ts";

const part1test = // fill this in
// const part2test = // fill this in

const part1 = (data: string) => {
    // fill this in
};

const part2 = (data: string) => {
    // fill this in
};

assertEquals(part1(await loadTestData(${Deno.args[0]})), part1test)
console.log(part1(await loadData(${Deno.args[0]})))
// assertEquals(part2(await loadTestData(${Deno.args[0]})), part2test)
// console.log(part2(await loadData(${Deno.args[0]})))
`

const encoder = new TextEncoder();
await Deno.writeFile(`day${Deno.args[0]}.ts`, encoder.encode(source))