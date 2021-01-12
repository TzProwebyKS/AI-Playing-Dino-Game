Population.prototype.sortFromBestToWorst = function() {
    this.individuals.sort((indivA, indivB) => indivB.fitness - indivA.fitness)
    // save best fitness to history
    this.performanceHistory.push(this.individuals[0].fitness)
    this.generation++
}