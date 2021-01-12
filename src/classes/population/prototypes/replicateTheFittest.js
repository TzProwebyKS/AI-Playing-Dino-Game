Population.prototype.replicateTheFittest = function() {
    const bestGenes = [...this.individuals[0].genes]

    for (let i = 0; i < this.individuals.length; i++) {
        this.individuals[i] = new Individual(this.individuals[0].neuralNetwork.config, [...bestGenes])
    }
}