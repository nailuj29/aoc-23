import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { loadTestData, loadData } from "./utils.ts";

interface Node {
    name: string,
    left: string,
    right: string,
}

const part1test = 2;
const part1test2 = 6;
const part2test = 6;

const gcd = (x: number, y: number) => {
    while (x != y) {
        if (x > y) {
            x -= y;
        } else {
            y -= x;
        }
    }

    return x;
}

const lcm = (x: number, y: number) => x * y / gcd(x, y);

const part1 = (data: string) => {
    const [path, rawNodes] = data.split("\n\n");

    const nodeRegex = /^(\w{3}) = \((\w{3}), (\w{3})\)$/;
    const nodes = rawNodes
        .split("\n")
        .map(line => line.match(nodeRegex));

    const nodeMap = new Map<string, Node>();
    for (const node of nodes) {
        nodeMap.set(node![1], { name: node![1], left: node![2], right: node![3] });
    }

    let current = nodeMap.get('AAA')!;
    let count = 0;
    while (current.name != "ZZZ") {
        switch (path[count++ % path.length]) {
            case 'L':
                current = nodeMap.get(current.left)!;
                break;
            case 'R':
                current = nodeMap.get(current.right)!;
                break;
        }
    }

    return count;
};

const part2 = (data: string) => {
    const [path, rawNodes] = data.split("\n\n");

    const nodeRegex = /^(.{3}) = \((.{3}), (.{3})\)$/;
    const nodes = rawNodes
        .split("\n")
        .map(line => line.match(nodeRegex));

    const nodeMap = new Map<string, Node>();
    let currentNodes: Node[] = [];
    for (const node of nodes) {
        nodeMap.set(node![1], { name: node![1], left: node![2], right: node![3] });
        if (node![1][2] == 'A') {
            currentNodes.push({ name: node![1], left: node![2], right: node![3] })
        }
    }

    const times = currentNodes.map(current => {
        let count = 0;
        while (current.name[2] != "Z") {
            switch (path[count++ % path.length]) {
                case 'L':
                    current = nodeMap.get(current.left)!;
                    break;
                case 'R':
                    current = nodeMap.get(current.right)!;
                    break;
            }
        }

        return count;
    });

    return times.reduce(lcm);
};

assertEquals(part1(await loadTestData(8)), part1test)
assertEquals(part1(await loadTestData(8, '2')), part1test2)
console.log(part1(await loadData(8)))
assertEquals(part2(await loadTestData(8, '3')), part2test)
console.log(part2(await loadData(8)))
