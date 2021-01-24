const canvasCfg = {
    width: 200,
    height: 200,
    color: 'black'
}

const populationCfgA = {
    size: 1000,
    mutationRate: 1,
    useBreeding: false,
}

const populationCfgB = {
    size: 1000,
    mutationRate: 1,
    useBreeding: false
}

const neuralNetworkCfgA = {
    inputNodes: 3,
    hiddenNodes: 2,
    hiddenLayers: 1,
    outputNodes: 2,
    bias: 1,
    useReLu: true,
    activationFunction: softmax
}

const neuralNetworkCfgB = {
    inputNodes: 3,
    hiddenNodes: 2,
    hiddenLayers: 1,
    outputNodes: 2,
    bias: 1,
    useReLu: true,
    activationFunction: softmax
}

const neuralNetworkCfgC = {
    inputNodes: 3,
    hiddenNodes: 5,
    hiddenLayers: 1,
    outputNodes: 2,
    bias: 1,
    useReLu: true,
    activationFunction: softmax
}

const setupA = new Setup(canvasCfg, populationCfgA, neuralNetworkCfgA, 'a')
setupA.run()

const setupB = new Setup(canvasCfg, populationCfgB, neuralNetworkCfgB, 'b')
setupB.run()

const setupC = new Setup(canvasCfg, populationCfgB, neuralNetworkCfgC, 'c')
setupC.run()