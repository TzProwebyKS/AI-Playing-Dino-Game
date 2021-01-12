function Population(populationCfg, neuralNetworkCfg) {
    this.config = populationCfg
    this.generation = 1
    this.individuals = []
    this.mutationRate = this.config.mutationRate
    this.performanceHistory = []

    for (let c = 0; c < this.config.size; c++) {
        this.individuals.push(new Individual(neuralNetworkCfg))
    }
}