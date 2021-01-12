function ReLu(x, useReLu) {
    if (!useReLu) {
        return x
    }
    return x > 0 ? x : 0
}