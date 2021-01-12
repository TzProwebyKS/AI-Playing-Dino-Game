function Wall({ width: canvasWidth, height: canvasHeight }) {
    this.width =  3
    this.height = Math.floor(Math.random() * 50) + 10

    this.color = 'white'
    this.x = canvasWidth
    this.y = canvasHeight - this.height
}