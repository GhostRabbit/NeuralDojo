
class Perceptron {
    constructor(numberOfWeights, learningRate) {
        this.weights = []
        this.learningRate = learningRate
        for (let i = 0; i < numberOfWeights; i++) {
            this.weights.push(random(-1, 1))
        }
    }

    guess(inputs) {
        let sum = inputs.map((input, i) => input * this.weights[i]).reduce((sum, s) => sum + s)
        return sum >= 0 ? 1 : -1
    }

    train(inputs, target) {
        let error = target - this.guess(inputs)
        this.weights = this.weights.map((w, i) => w + this.learningRate * error * inputs[i])
        // Lower the learnig rate to increase precision
        this.learningRate -= abs(error) * 0.01 * this.learningRate
        //console.log(this.learningRate)
        return error
    }
}
