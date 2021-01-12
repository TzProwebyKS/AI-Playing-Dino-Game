Population.prototype.breeding = function() {
    const bestGenes = [...this.individuals[0].genes]
    
    for (let i = 1; i < this.individuals.length; i++) {
        this.individuals[i] = this.individuals[0].breed(this.individuals[i])
    }

    this.individuals[0] = new Individual(this.individuals[0].neuralNetwork.config, [...bestGenes])
}