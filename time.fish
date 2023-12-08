#! /usr/bin/fish

for i in (seq 1 8)
    echo Day $i
    time deno run --allow-read day$i.ts > /dev/null
end
