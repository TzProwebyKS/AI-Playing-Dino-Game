Individual.prototype.breed = function(partner) {
    const childGenes = []
    const randomSplit = Math.floor(Math.random() * this.genes.length)

    for (let i = 0; i < this.genes.length; i++) {
        if (i > randomSplit) {
            childGenes.push(this.genes[i])
        }
        else {
            childGenes.push(partner.genes[i])
        }
    }

    return new Individual(this.neuralNetwork.config, childGenes)
}