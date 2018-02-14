const sigmoid = x => 1 / (1 + Math.exp(-x))
const dsigmoid = y => y * (1 - y)

class NeuralNetwork {
    constructor(input_nodes, hidden_nodes, output_nodes) {
        this.input_nodes = input_nodes
        this.hidden_nodes = hidden_nodes
        this.output_nodes = output_nodes

        this.weights_I2H = new Matrix(this.hidden_nodes, this.input_nodes).randomize()
        this.weights_H2O = new Matrix(this.output_nodes, this.hidden_nodes).randomize()

        this.bias_H = new Matrix(this.hidden_nodes, 1).randomize()
        this.bias_O = new Matrix(this.output_nodes, 1).randomize()

        this.learningRate = 0.1
    }

    print() {
        console.log('brain weights_I2H')
        this.weights_I2H.print()
        console.log('brain weights_H2O')
        this.weights_H2O.print()
    }

    predict(input_array) {
        return this.train(input_array)
    }

    train(input_array, expected_array) {

        const inputs = Matrix.fromArray(input_array)

        const hidden = this.weights_I2H
            .dot(inputs)
            .add(this.bias_H)
            .map(sigmoid)

        const outputs = this.weights_H2O
            .dot(hidden)
            .add(this.bias_O)
            .map(sigmoid)

        const outputs_array = outputs.toArray()
        if (!expected_array) {
            return outputs_array
        }

        // predict
        // ----
        // train

        const targets = Matrix.fromArray(expected_array)
        const output_errors = targets
            .sub(outputs)

        const output_gradients = outputs
            .map(dsigmoid)
            .mult(output_errors)
            .mult(this.learningRate)

        const weight_ho_deltas = output_gradients
            .dot(hidden.transpose())

        this.weights_H2O = this.weights_H2O
            .add(weight_ho_deltas)

        this.bias_O = this.bias_O
            .add(output_gradients)

        const hidden_errors = this.weights_H2O
            .transpose()
            .dot(output_errors)

        const hidden_gradients = hidden
            .map(dsigmoid)
            .mult(hidden_errors)
            .mult(this.learningRate)

        const weight_ih_deltas = hidden_gradients
            .dot(inputs.transpose())

        this.weights_I2H = this.weights_I2H
            .add(weight_ih_deltas)

        this.bias_H = this.bias_H
            .add(hidden_gradients)

        return expected_array.map((e, i) => Math.abs(e - outputs_array[i]))
    }
}
