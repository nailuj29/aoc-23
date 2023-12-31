export const loadData = async (day: number) => {
    const decoder = new TextDecoder("utf-8")
    const data = await Deno.readFile(`day${day}.dat`)

    return decoder.decode(data)
}

export const loadTestData = async (day: number, index: any = "") => {
    const decoder = new TextDecoder("utf-8")
    const data = await Deno.readFile(`test${index}_day${day}.dat`)

    return decoder.decode(data)
}