Game.prototype.getTheClosestWall = function(indiv) {
    let indexOfClosestWall = 0
    let closestX = Infinity

    for (let i = 0; i < this.walls.length; i++) {
        if (this.walls[i].x > indiv.x && this.walls[i].x < closestX) {
            indexOfClosestWall = i
            closestX = this.walls[i].x
        } 
    }

    return this.walls[indexOfClosestWall]
}