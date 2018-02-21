class World {
    constructor(gridsize, numberOfSnakes) {
        this.snakes = []
        this.gridsize = gridsize
        for (let i = 0; i < numberOfSnakes; i++) {
            this.snakes.push(new Snake(gridsize, new SnakeBrain()))
        }
    }

    done() {
        return this.snakes.every(s => !s.alive)
    }

    breed() {
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
            console.error('failure to find snake at', selectPoint, 'in', sum)
        }

        let legendCount = this.snakes.length / 10 | 0
        this.snakes = gradedSnakes.slice(0, legendCount)
            .map(gs => new Snake(this.gridsize, gs[1].brain))
            .concat(
                gradedSnakes.slice(legendCount)
                    .map(s => randomSnake().makeChild(randomSnake())))
    }

    update() {
        for (let s of this.snakes) {
            s.update()
        }
    }

    show() {
        for (let s of this.snakes) {
            if (!s.alive) s.show()
        }
        for (let s of this.snakes) {
            if (s.alive) s.show()
        }
    }
}