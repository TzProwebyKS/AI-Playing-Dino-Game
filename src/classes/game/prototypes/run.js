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

            if (this.walls[0]) {
                wall = this.getTheClosestWall(indiv)
                distanceFromWall = Math.abs(wall.x - (indiv.x + indiv.width))
            }

            indiv.neuralNetwork.feedForward([
                distanceFromWall,
                this.speed,
                indiv.isCrouching ? 1 : 0,
                indiv.isInTheAir ? 1 : 0
            ])

            if (indiv.neuralNetwork.outputs[0] == 1) {
                indiv.jump()
            }
            else if (indiv.neuralNetwork.outputs[0] == -1) {
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