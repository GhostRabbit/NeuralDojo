class NeuralNetwork {
    constructor(input_nodes, hidden_nodes, output_nodes) {
        this.input_nodes = input_nodes
        this.hidden_nodes = hidden_nodes
        this.output_nodes = output_nodes

        this.weights_IH = new Matrix(this.hidden_nodes, this.input_nodes).randomize()
        this.weights_HO = new Matrix(this.output_nodes, this.hidden_nodes).randomize()

        this.bias_H = new Matrix(this.hidden_nodes, 1).randomize()
        this.bias_O = new Matrix(this.output_nodes, 1).randomize()
    }

    print() {
        this.weights_IH.print()
        this.weights_HO.print()
    }

    feedforward(input_array) {
        const sigmoid = x => 1 / (1 + Math.exp(-x))

        const hidden = this.weights_IH
            .mult(Matrix.fromArray(input_array))
            .add(this.bias_H)
            .map(sigmoid)

        const output = this.weights_HO
            .mult(hidden)
            .add(this.bias_O)
            .map(sigmoid)

        return output
    }

    train(input_array, expected) {
        const outputs = this.feedforward(input_array)
        outputs.print('outputs')

        const output_errors = Matrix.fromArray(expected)
            .sub(outputs)
            .print('output errors')

        const hidden_errors = this.weights_HO
            .transpose()
            .mult(output_errors)
            .print('hidden_errors')
    }
}
