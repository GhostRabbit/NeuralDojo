let brain

let right
let left
let f
let cm


function setup() {
	createCanvas(400, 400)

	right = random(0.2, 0.8)
	left = random(0.2, 0.8)
	f = x => (right - left) * x + left
	background(100)
	createP('')
	nSlider = createSlider(1, 5, 1)
	nLabel = createSpan()
	createP('')
	updateBrain()

	cm = createRadio()
	cm.option('Predict')
	cm.option('Error')
	cm.selected('Predict')
}

function updateBrain() {
	brain = new NeuralNetwork(2, nSlider.value(), 1)
	nLabel.html(nSlider.value() + ' hidden nodes')
}

function draw() {
	if (brain.hidden_nodes != nSlider.value()) {
		updateBrain()
	}
	drawBoard()
	drawFunctionLine()
	train()
}

function drawFunctionLine() {
	strokeWeight(3)
	stroke(255 * (cm.value() == 'Error'))
	line(0, f(0) * height, width, f(1) * height)
}

function makeColorize(type) {
	if (type == 'Predict')
		return guess => [0, (1 - guess) * 255, 0]
	return (guess, x, y) => {
		let error = abs(guess - abs(f(x) - y))
		return [error * 255, 0, 0]
	}
}

function drawBoard() {
	let colorize = makeColorize(cm.value())

	noStroke()
	let r = 5
	for (let x = r; x < width; x += 2 * r) {
		for (let y = r; y < height; y += 2 * r) {
			let guess = brain.predict([x / width, y / height])[0]
			fill(...colorize(guess, x / width, y / height))
			rect(x - r, y - r, 2 * r, 2 * r)
		}
	}
}

function train() {
	for (let i = 0; i < 1000; i++) {
		let x = random(0, 1)
		let y = random(0, 1)
		brain.train([x, y], [abs(f(x) - y)])
	}
}
