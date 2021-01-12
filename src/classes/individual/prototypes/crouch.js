Individual.prototype.crouch = function() {
    if (!this.isCrouching) {
        this.height = this.height / 2
        this.width += this.width / 2
        this.y += this.height
        this.velocity += 10
        this.isCrouching = true
    }
}