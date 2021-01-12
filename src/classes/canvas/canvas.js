function Canvas(canvasCfg) {
    this.canvas = document.createElement('canvas')
    this.canvas.width = canvasCfg.width
    this.canvas.height = canvasCfg.height
    this.canvas.color = canvasCfg.color
    
    this.ctx = this.canvas.getContext('2d')

    document.body.append(this.canvas)
}