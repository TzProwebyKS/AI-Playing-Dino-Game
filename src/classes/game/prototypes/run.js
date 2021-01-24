Game.prototype.run = function(canvas, individuals) {
    for (let indiv of individuals) {
        canvas.draw(indiv)

        if (indiv.isAlive) {
            if (indiv.isInTheAir) {
                indiv.fall()
    
                if (indiv.y + indiv.height > canvas.canvas.height) {
                    indiv.isInTheAir = false
                    indiv.y = canvas.canvas.height - indiv.height
                }
            }

            if (this.walls[0]) {
                for (let i = 0; i < this.walls.length; i++) {
                    if (didCollide(this.walls[i], indiv)) {
                        indiv.isAlive = false
                        break
                    }

                    if (didPonctuate(indiv, this.walls[i]) && !indiv.didJustPonctuate) {
                        indiv.fitness++
                        indiv.didJustPonctuate = true
                        
                        setTimeout(() => {
                            indiv.didJustPonctuate = false
                        }, 450)
                        break
                    }
                }
            }

            let distanceFromWall = 0
            let wallHeight = 0

            if (this.walls[0]) {
                const wall = this.getTheClosestWall(indiv)
                wallHeight = wall.height
                distanceFromWall = Math.abs(wall.x - (indiv.x + indiv.width))
            }

            indiv.neuralNetwork.feedForward([
                distanceFromWall,
                wallHeight,
                this.speed
            ])

            if (indiv.neuralNetwork.outputs[0] > indiv.neuralNetwork.outputs[1]) {
                indiv.jump()
            }
            else if (indiv.neuralNetwork.outputs[1] > indiv.neuralNetwork.outputs[0]) {
                indiv.crouch()
            }
        }
        else {
            indiv.x -= this.speed
        }
    }

    for (let wall of this.walls) {
        wall.move(this.speed)
        canvas.draw(wall)
    }   

    if (!this.walls[0]) {
        for (let i = 0; i < 1; i++) {
            this.walls.push(new Wall(canvas.canvas))
            this.walls[i].x += 60 * i
        }
    }

    if (this.walls[0].x < 0) {
        for (let i = 0; i < 1; i++) {
            this.walls[i] = new Wall(canvas.canvas)
            this.walls[i].x += 60 * i
        }
    }

    this.increaseSpeed()
} 