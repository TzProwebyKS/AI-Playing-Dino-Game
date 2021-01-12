Population.prototype.mutation = function() {
    for (let i = 1; i < this.individuals.length; i++) {
        if (Math.random() < this.mutationRate) {
            this.individuals[i].mutateRandomGene()
        }
    }
} 