Individual.prototype.fall = function() {
    this.velocity += 1
    this.y += this.velocity
}