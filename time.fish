#! /usr/bin/fish

for i in (seq 1 25)
    if test -e day$i.ts
        echo Day $i
        time deno run --allow-read day$i.ts > /dev/null
    end
end
