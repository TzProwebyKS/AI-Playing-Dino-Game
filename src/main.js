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
    mutationRate: 0.1,
    useBreeding: true
}

const neuralNetworkCfgA = {
    inputNodes: 4,
    hiddenNodes: 4,
    hiddenLayers: 1,
    outputNodes: 1,
    bias: 1,
    useReLu: true,
    activationFunction: bipolarStep
}

const neuralNetworkCfgB = {
    inputNodes: 4,
    hiddenNodes: 4,
    hiddenLayers: 1,
    outputNodes: 1,
    bias: 1,
    useReLu: true,
    activationFunction: bipolarStep
}

const setupA = new Setup(canvasCfg, populationCfgA, neuralNetworkCfgA, 'a')
setupA.run()

const setupB = new Setup(canvasCfg, populationCfgB, neuralNetworkCfgB, 'b')
setupB.run()