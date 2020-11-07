let canvas, ctx, population = [], walls, gameSpeed = 1, actualGeneration = 0

function createCanvas(width, height) {
    canvas = document.createElement('canvas')
    ctx = canvas.getContext('2d')
    canvas.width = width
    canvas.height = height
    document.body.append(canvas)
}

Square.prototype.mutateCromossome = function() {
    const randomIndex = Math.floor(Math.random() * this.Cromossome.length)
    this.Cromossome[randomIndex] = newGene()
}

function newCromossome() {
    const { 
        quantityOfColumnsOfHidden, 
        quantityOfColumnsOfInput, 
        quantityOfColumnsOfOutput, 
        quantityOfRowsOfHidden 
    } = globalThis
        
    let quantityOfWeights = 0
    // weights from input
    quantityOfWeights += quantityOfColumnsOfInput * quantityOfColumnsOfHidden
    // weights from hidden
    quantityOfWeights += quantityOfColumnsOfHidden * quantityOfColumnsOfHidden * (quantityOfRowsOfHidden - 1)
    // weights from output
    quantityOfWeights += quantityOfColumnsOfHidden * quantityOfColumnsOfOutput

    const cromossome = []

    for (let c = 0; c < quantityOfWeights; c++) {
        cromossome.push(newGene())
    }
    
    return cromossome
}

function createPopulation(numberOfIndiv) {
    if (!numberOfIndiv || numberOfIndiv < 1) {
        numberOfIndiv = 1
    }
    
    for (let c = 0; c < numberOfIndiv; c++) {
        population.push(new Square())
    }
}

function Wall() {
    if (walls) {
        this.x = canvas.width + 150 * walls.length
    }
    else {
        this.x = canvas.width
    }

    this.width =  3
    this.height = Math.floor(Math.random() * 25)
    this.color = 'white'
    this.isOutOfView = false
    this.y = canvas.height - this.height

    this.move = function() {
        if (this.x < 0 - this.width * 2) {
            this.isOutOfView = true
        }
        else {
            this.x -= gameSpeed
        }
    }
}

function binaryStep(x) {
    if (x >= 0) {
        return 1
    }
    return 0 
}

function run() {
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    let i = 0
    for (let square of population) {
        for (let wall of walls) {
            if (square.isAlive) {
                if (isThereCollision(square, wall)) {
                    square.isAlive = false
                }
            }
        }
        
        square.fall()
        calcFitness(square, i)

        if (square.isAlive) {
            square.brain()
        }

        draw(square)
        i++
    }

    for (let i = 0; i < walls.length; i++) {
        walls[i].move()
        draw(walls[i])

        if (walls[i].isOutOfView) {
            walls[i] = new Wall()
        }
    }

    if (population.every(square => !square.isAlive)) {
        resetEvolution()
    } 
    else {
        gameSpeed += 0.001
    }
    requestAnimationFrame(run)
}

function resetEvolution() {
    population.sort((a, b) => a.fitness - b.fitness)
    const indexOfBestSquare = population.length - 1
    
    console.log('Resetting Evolution')
    console.log('Generation: ', ++actualGeneration)
    console.log('Best Fitness: ', population[indexOfBestSquare].fitness)
    console.log('Speed: ', gameSpeed)
    console.log('')

    for (let i = 0; i < population.length - 1; i++) {
        population[i] = new Square(population[indexOfBestSquare])
        population[i].mutateCromossome()
    }
    population[indexOfBestSquare] = new Square(population[indexOfBestSquare])
    
    gameSpeed = 1
    createWalls(5)
}

function newGene() {
    if (Math.random() > 0.5) {
        return Math.random()
    }
    return -Math.random()
}  

// perceptron config
globalThis.quantityOfColumnsOfInput = 4
globalThis.quantityOfColumnsOfHidden = 4
globalThis.quantityOfRowsOfHidden = 4
globalThis.quantityOfColumnsOfOutput = 2

Square.prototype.brain = function() {
    const { wallHeight, wallWidth, wallDistance } = getTheClosestWall(this)

    const inputs = [
        wallHeight,
        wallWidth, 
        wallDistance,
        gameSpeed
    ]

    const hidden = [[]]
    let indexOfWeight = 0

    // calcs the first hidden
    for (let y = 0; y < globalThis.quantityOfColumnsOfHidden; y++) {
        hidden[0][y] = 0

        for (let i = 0; i < globalThis.quantityOfColumnsOfInput; i++) {
            hidden[0][y] += inputs[i] * this.Cromossome[indexOfWeight]
            indexOfWeight++
        }
    }

    // calcs all the left hidden
    for (let c = 1; c < globalThis.quantityOfRowsOfHidden; c++) {
        hidden[c] = [0]
        
        for (let r = 0; r < globalThis.quantityOfColumnsOfHidden; r++) {
            hidden[c][r] = 0

            for (let k = 0; k < globalThis.quantityOfColumnsOfHidden; k++) {
                hidden[c][r] += hidden[c - 1][k] * this.Cromossome[indexOfWeight]
                indexOfWeight++
            }
        }
    }

    const output = []
    const indexOfLastHidden = hidden.length - 1 

    // calcs the output
    for (let c = 0; c < globalThis.quantityOfColumnsOfOutput; c++) {
        output[c] = 0

        for (let r = 0; r < globalThis.quantityOfColumnsOfHidden; r++) {
            output[c] += hidden[indexOfLastHidden][r] * this.Cromossome[indexOfWeight]
            indexOfWeight++
        }
    }

    // here is where we decide what to do with outputs
    if (binaryStep(output[0]) == 1) {
        this.jump()
    }
    if (binaryStep(output[1]) == 1) {
        this.crouch()
    }
}


function Square(bestSquare) {
    if (bestSquare) {
        this.Cromossome = bestSquare.Cromossome.slice()
    }
    else {
        this.Cromossome = newCromossome()
    }

    this.fitness = 0
    this._width = 10
    this._height = 19
    this.hasJustScored = false
    this.width = this._width
    this.height = this._height
    this.color = newColor()
    this.isOnTheAir = false
    this.velocity = 0
    this.isAlive = true
    this.x = 10
    this.y = canvas.height - this.height
    this.isCrouching = false

    this.fall = function() {
        if (!this.isAlive) {
            this.x--
        }
        else if (this.y > canvas.height - this.height) {
            this.isOnTheAir = false
            this.y = canvas.height - this.height
        } 
        else if (this.isAlive && this.isOnTheAir) {
            this.velocity += 1
            this.y += this.velocity
        }
    }
    this.jump = function() {
        if (!this.isOnTheAir) {
            this.velocity = -12.2
            this.y += this.velocity
            this.height = this._height
            this.width = this._width
            this.isOnTheAir = true
            this.isCrouching = false
        }
    }
    this.crouch = function() {
        if (!this.isCrouching) {
            this.height = this.height / 2
            this.width += this.width / 2
            this.y += this.height
            this.velocity += 10
            this.isCrouching = true
        }
    }
}

function calcFitness(square, i) {
    if (isThereCollision(square, getTheClosestWall(square).wall, 'onlyX') && !square.hasJustScored && population[i].isAlive) {
        square.fitness++
        square.hasJustScored = true

        setTimeout(() => {
            square.hasJustScored = false
        }, 150)
    }
}

function isThereCollision(a, b, option) {
    const disX = a.x - b.x
    const disY = a.y - b.y

    if (option == 'onlyX' && !(disY > -a.height && disY < b.height)) {
        return disX > -a.width && disX < b.width
    }
    else if (disX > -a.width && disX < b.width && disY > -a.height && disY < b.height) {
        return true
    }
    return false
}

function draw(that) {
    ctx.fillStyle = that.color
    ctx.fillRect(that.x, that.y, that.width, that.height)
}

function getTheClosestWall(square) {
    let indexOfClosestWall = 0
    let closestX = Infinity

    for (let i = 0; i < walls.length; i++) {
        if (walls[i].x > square.x && walls[i].x < closestX) {
            indexOfClosestWall = i
            closestX = walls[i].x
        } 
    }

    return {
        wallHeight: walls[indexOfClosestWall].height,
        wallDistance: Math.abs(walls[indexOfClosestWall].x - square.x),
        wallWidth: walls[indexOfClosestWall].width,
    }
}

function createWalls(amount) {
    walls = []

    for (let i = 0; i < amount; i++) {
        walls.push(new Wall())
    }
}

function newColor() {
    const hexadecimal = '0123456789ABCDEF'
    let color = '#'

    for (let i = 0; i < 6; i++) {
        color += hexadecimal[Math.floor(Math.random() * 16)]
    }
    return color
}

createCanvas(300, 300)
createPopulation(1000)
createWalls(5)

run()