Individual.prototype.mutateRandomGene = function() {
    const indexOfGene = Math.floor(Math.random() * this.genes.length)
    this.genes[indexOfGene] = newWeight()
}