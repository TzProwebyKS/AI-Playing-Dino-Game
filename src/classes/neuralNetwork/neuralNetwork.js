function NeuralNetwork(neuralNetworkCfg, weights) {
    this.config = neuralNetworkCfg
    
    if (weights) {
        this.weights = weights
    }
    else {
        this.weights = []

        let quantityOfWeights = 0
        // inputs weights
        quantityOfWeights += (this.config.inputNodes + 1) * this.config.hiddenNodes
        // hidden weights
        quantityOfWeights += this.config.hiddenNodes * this.config.hiddenLayers * (this.config.hiddenLayers - 1)
        // outputs weights
        quantityOfWeights += this.config.hiddenNodes * this.config.outputNodes
        // bias weights 
        quantityOfWeights += this.config.hiddenLayers

        for (let c = 0; c < quantityOfWeights; c++) {
            this.weights.push(newWeight())
        }
    }
}