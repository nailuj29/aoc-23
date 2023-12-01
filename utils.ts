export const loadData = async (day: number) => {
    const decoder = new TextDecoder("utf-8")
    const data = await Deno.readFile(`day${day}.dat`)

    return decoder.decode(data)
}

export const loadTestData = async (day: number) => {
    const decoder = new TextDecoder("utf-8")
    const data = await Deno.readFile(`test_day${day}.dat`)

    return decoder.decode(data)
}