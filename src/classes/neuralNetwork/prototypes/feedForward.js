NeuralNetwork.prototype.feedForward = function(inputs) {
    if (inputs.length != this.config.inputNodes) {
        throw new Error('INPUTS must be the same length as setted in ARCHITECTURE.')
    }

    // insert bias
    this.inputs = [this.config.bias, ...inputs]
    this.hiddens = [[]]
    this.outputs = []
    
    let indexOfWeight = 0

    // calcs the first hidden
    for (let y = 0; y < this.config.hiddenNodes; y++) {
        this.hiddens[0][y] = 0

        for (let i = 0; i < this.inputs.length; i++) {
            this.hiddens[0][y] += this.inputs[i] * this.weights[indexOfWeight]
            indexOfWeight++
        }

        this.hiddens[0][y] = ReLu(this.hiddens[0][y], this.config.useReLu)
    }

    // insert bias
    this.hiddens[0].unshift(this.config.bias)
    
    // calcs all the left hidden
    for (let c = 1; c < this.config.hiddenLayers; c++) {
        this.hiddens[c] = [0]
        
        for (let r = 0; r < this.config.hiddenNodes; r++) {
            this.hiddens[c][r] = 0

            for (let k = 0; k < this.config.hiddenNodes + 1; k++) {
                this.hiddens[c][r] += this.hiddens[c - 1][k] * this.weights[indexOfWeight]
                indexOfWeight++
            }

            this.hiddens[c][r] = ReLu(this.hiddens[c][r], this.config.useReLu)
        }

        // insert bias
        this.hiddens[c].unshift(this.config.bias)
    }

    const indexOfLastHidden = this.hiddens.length - 1 

    // calcs the output
    for (let c = 0; c < this.config.outputNodes; c++) {
        this.outputs[c] = 0

        for (let r = 0; r < this.hiddens[0].length; r++) {
            this.outputs[c] += this.hiddens[indexOfLastHidden][r] * this.weights[indexOfWeight]
            indexOfWeight++
        }
    }

    // activate outputs
    for (let i = 0; i < this.outputs.length; i++) {
        this.outputs[i] = this.config.activationFunction(this.outputs[i])
    }
}