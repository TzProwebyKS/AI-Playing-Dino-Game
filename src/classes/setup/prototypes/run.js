Setup.prototype.run = function() {
    this.canvas.clear()
    this.game.run(this.canvas, this.population.individuals)

    if (this.population.individuals.every(indiv => !indiv.isAlive)) {
        this.population.sortFromBestToWorst()
        
        if (this.population.useBreeding) {
            this.population.breeding()
        }
        else {
            this.population.replicateTheFittest()
        }
        this.population.mutation()

        const indexOfLastPerfomance = this.population.performanceHistory.length - 1
        
        console.log('Name: ', this.name)
        console.log('Generation: ', this.population.generation - 1)
        console.log('Fitness: ', this.population.performanceHistory[indexOfLastPerfomance])
        console.log('Speed: ', this.game.speed)
        console.log('')

        this.game = new Game()
    }

    requestAnimationFrame(() => this.run())
}