function didPonctuate(objectA, objectB) {
    const bottomSideA = objectA.y + objectA.height
    const upSideB = objectB.y

    let isInTheMiddle = false

    if (objectA.x + objectA.width >= objectB.x - 3 && objectB.x + objectB.width <= objectA.x + objectA.width + 3) {
        isInTheMiddle = true
    }

    const b = bottomSideA < upSideB

    if (b && isInTheMiddle) {
        return true
    }
    return false
}