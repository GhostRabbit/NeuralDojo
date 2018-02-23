class World {
    constructor(gridsize, numberOfSnakes) {
        this.snakes = []
        this.gridsize = gridsize
        for (let i = 0; i < numberOfSnakes; i++) {
            this.snakes.push(new Snake(this.gridsize, new SnakeBrain()))
        }
    }

    done() {
        return this.snakes.every(s => !s.alive)
    }

    breed(legendRatio) {
        let gradedSnakes = this.snakes.map(s => [s.fitness(), s]).sort((a, b) => b[0] - a[0])
        let fitnessSum = gradedSnakes.reduce((sum, s) => sum + s[0], 0)

        const randomSnake = () => {
            let selectPoint = random(fitnessSum)
            let sum = 0
            for (let i = 0; i < gradedSnakes.length; i++) {
                sum += gradedSnakes[i][0]
                if (selectPoint < sum) {
                    return gradedSnakes[i][1]
                }
            }
        }

        let legendCount = Math.max(1, (legendRatio * this.snakes.length) | 0)

        this.snakes = gradedSnakes.map((gs, i) => {
            if (i < legendCount) {
                // Legends be more legend
                return new Snake(this.gridsize, gs[1].brain, 0.99 * (gs[1].legend + 1))
            }
            if (gs[1].legend > 0) {
                // Let old legends survive
                return new Snake(this.gridsize, gs[1].brain, 0.99 * (gs[1].legend - 1))
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