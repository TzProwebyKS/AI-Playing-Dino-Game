function didCollide(objectA, objectB) {
    const rightSideA = objectA.x + objectA.width
    const upSideA = objectA.y
    const leftSideA = objectA.x
    const bottomSideA = objectA.y + objectA.height

    const rightSideB = objectB.x + objectB.width
    const upSideB = objectB.y
    const leftSideB = objectB.x
    const bottomSideB = objectB.y + objectB.height

    const u = upSideA > bottomSideB
    const r = rightSideA < leftSideB
    const b = bottomSideA < upSideB
    const l = leftSideA > rightSideB

    if (u || r || b || l) {
        return false
    } 
    return true
}