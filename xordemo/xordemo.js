let brain
let slider
let p

const training_data = [
	{
		input: [0, 0],
		output: [0]
	},
	{
		input: [1, 0],
		output: [1]
	},
	{
		input: [0, 1],
		output: [1]
	},
	{
		input: [1, 1],
		output: [0]
	},
]

function setup() {
	createCanvas(400, 400)
	createP('')
	slider = createSlider(1, 8, 1)
	p = createSpan()
	updateBrain()
}

function updateBrain() {
	brain = new NeuralNetwork(2, slider.value(), 1)
	p.html(slider.value() + ' hidden nodes')
}

function draw() {
	if (brain.hidden_nodes != round(slider.value())) {
		updateBrain()
	}
	drawBoard()
	for (let i = 0; i < 1000; i++) {
		let data = random(training_data)
		brain.train(data.input, data.output)
	}
}

function drawBoard() {
	let side = 10
	noStroke()
	for (let x = 0; x < width; x += side) {
		for (let y = 0; y < height; y += side) {
			let inputs = [x / width, y / height]
			fill(brain.predict(inputs)[0] * 255)
			rect(x, y, side, side)
		}
	}
	for (let d of training_data) {
		stroke(255 - d.output[0] * 255)
		fill(d.output[0] * 255)
		ellipse(d.input[0] * width, d.input[1] * height, 60)
	}
}

