Canvas.prototype.draw = function(that) {
    this.ctx.fillStyle = that.color
    this.ctx.fillRect(
        that.x ? that.x : 0, 
        that.y ? that.y : 0, 
        that.width, that.height
    )
}