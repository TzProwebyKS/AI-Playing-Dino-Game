function Individual(neuralNetworkCfg, childGenes) {
    this.neuralNetwork = new NeuralNetwork(neuralNetworkCfg, childGenes)
    this.genes = this.neuralNetwork.weights
    
    this.defaultWidth = 8
    this.defaultHeight = 20
    this.width = this.defaultWidth
    this.height = this.defaultHeight
    this.color = newColor()
    
    this.fitness = 0
    this.velocity = 0

    this.x = 10
    this.y = 0

    this.isAlive = true
    this.isInTheAir = true
    this.isCrouching = false
    this.didJustPonctuate = false
}