class World {
    constructor(gridsize, numberOfSnakes) {
        this.gridsize = gridsize
        this.snakes = new Array(numberOfSnakes).fill(0)
            .map(() => new Snake(this.gridsize, new SnakeBrain()))
    }

    done() {
        return this.snakes.every(s => !s.alive)
    }

    breed(legendRatio) {
        let gradedSnakes = this.snakes.map(s => {
            return {
                fitness: s.fitness(),
                snake: s
            }
        }).sort((a, b) => b.fitness - a.fitness)
        let fitnessSum = gradedSnakes.reduce((sum, s) => sum + s.fitness, 0)

        const randomSnake = () => {
            let selectPoint = random(fitnessSum)
            let sum = 0
            return gradedSnakes.find(gs => {
                sum += gs.fitness
                return selectPoint < sum
            }).snake
        }

        let legendCount = Math.max(1, (legendRatio * this.snakes.length) | 0)

        this.snakes = gradedSnakes.map((gs, i) => {
            if (i < legendCount) {
                // Legends be more legend
                return new Snake(this.gridsize, gs.snake.brain, 0.99 * (gs.snake.legend + 1))
            }
            if (gs.snake.legend > 0) {
                // Let old legends survive
                return new Snake(this.gridsize, gs.snake.brain, 0.99 * (gs.snake.legend - 1))
            }
            if (i < gradedSnakes.length - legendCount) {
                // Make children
                return randomSnake().makeChild(randomSnake())
            }
            // Let some new blood in
            return new Snake(this.gridsize, new SnakeBrain())
        })
    }

    update() {
        for (let s of this.snakes) {
            s.update()
        }
    }

    show(number) {
        let alive = this.snakes.filter(s => s.alive)
        if (alive.length > number) {
            alive.slice(0, number).forEach(s => s.show())
            return
        }
        number -= alive.length
        let dead = this.snakes.filter(s => !s.alive)
        dead.slice(0, number).forEach(s => s.show())
        alive.forEach(s => s.show())
    }
}