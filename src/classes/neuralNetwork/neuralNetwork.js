function NeuralNetwork(neuralNetworkCfg, weights) {
    this.config = neuralNetworkCfg
    
    if (weights) {
        this.weights = weights
    }
    else {
        this.weights = []

        let quantityOfWeights = 0
        // inputs weights + bias weight
        quantityOfWeights += (this.config.inputNodes + 1) * this.config.hiddenNodes
        // hidden weights
        if (this.config.hiddenLayers > 1) {
            quantityOfWeights += (this.config.hiddenNodes + 1) * (this.config.hiddenLayers + 1) * this.config.hiddenLayers
        }
        // outputs weights
        quantityOfWeights += (this.config.hiddenNodes + 1) * this.config.outputNodes

        for (let c = 0; c < quantityOfWeights; c++) {
            this.weights.push(newWeight())
        }
    }
}