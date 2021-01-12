Individual.prototype.jump = function() {
    if (!this.isInTheAir) {
        this.velocity = -12.2
        this.y += this.velocity
        
        this.height = this.defaultHeight
        this.width = this.defaultWidth

        this.isInTheAir = true
        this.isCrouching = false
    }
}