
let brain

function setup() {
	createCanvas(300, 300)

	brain = new NeuralNetwork(2, 2, 2)

	let inputs = [1, 0]
	let expected = [1, 0]

	brain.feedforward(inputs).print('feed')
	brain.train(inputs, expected)
}

function draw() {



	//console.log(brain.feedforward(input))

}
