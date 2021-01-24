function softmax(values) {
    const max = Math.max(...values)
    const exps = []

    let expsSum = 0

    for (let i = 0; i < values.length; i++) {
        const value = values[i]
        const current = Math.exp(value - max)

        exps.push(current)
        expsSum += current
    }

    return exps.map((e) => e / expsSum)
}