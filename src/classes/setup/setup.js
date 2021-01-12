function Setup(canvasCfg, populationCfg, neuralNetworkCfg, name) {
    this.population = new Population(populationCfg, neuralNetworkCfg)
    this.canvas = new Canvas(canvasCfg)
    this.game = new Game()
    this.name = 'setup' + name.toLocaleUpperCase()
}