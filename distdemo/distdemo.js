let brain
let nSlider
let nLabel
let pSlider
let pLabel
let lSlider
let lLabel
let type
let button

let points

function setup() {
	createCanvas(400, 400)

	createP('')
	type = createRadio()
	type.option('Predict')
	type.option('Error')
	type.selected('Predict')


	nSlider = createSlider(1, 100, 1)
	nLabel = createSpan()
	createP('')
	updateBrain()

	lSlider = createSlider(0.001, 0.5, brain.learningRate, 0.001)
	lLabel = createSpan()
	createP('')
	updateLearningRate()

	pSlider = createSlider(1, 5, 2)
	pLabel = createSpan()
	createP('')
	button = createButton('Randomize regions')
	button.mousePressed(makePoints)

	makePoints()
}

function makePoints() {
	points = []
	for (let i = 0; i < pSlider.value(); i++) {
		points.push(createVector(random(0.2, 0.8), random(0.2, 0.8)))
	}
	pLabel.html(pSlider.value() + ' regions')
}

function updateBrain() {
	brain = new NeuralNetwork(2, nSlider.value(), 1)
	nLabel.html(nSlider.value() + ' hidden nodes')
}

function updateLearningRate() {
	brain.learningRate = lSlider.value()
	lLabel.html('LR ' + lSlider.value())
}

function draw() {
	if (brain.hidden_nodes != nSlider.value()) {
		updateBrain()
	}
	if (brain.learningRate != lSlider.value()) {
		updateLearningRate()
	}
	if (points.length != pSlider.value()) {
		makePoints()
	}
	drawBoard()
	drawPoints()
	train()
}

function drawPoints() {
	for (let i = 0; i < points.length; i++) {
		strokeWeight(2)
		stroke(255)
		noFill()
		ellipse(points[i].x * width, points[i].y * height, width * 0.2)
	}
}

function drawBoard() {
	noStroke()
	let r = 5
	let setFill
	if (type.value() == 'Predict') {
		setFill = (x, y) => {
			let guess = brain.predict([x, y])[0]
			fill(0, 255 * guess, 0)
		}
	} else {
		setFill = (x, y) => {
			let guess = brain.predict([x, y])[0]
			let correct = minDistToPoints(x, y)
			let error = Math.abs(correct - guess)
			fill(255 * error, 0, 0)
		}
	}

	for (let x = r; x < width; x += 2 * r) {
		for (let y = r; y < height; y += 2 * r) {
			setFill(x / width, y / height)
			rect(x - r, y - r, 2 * r, 2 * r)
		}
	}
}

function train() {
	for (let i = 0; i < 1000; i++) {
		let x = random(0, 1)
		let y = random(0, 1)
		brain.train([x, y], [minDistToPoints(x, y)])
	}
}

function minDistToPoints(x, y) {
	let from = createVector(x, y)
	let d = min(points.map(p => from.dist(p)))
	return d < 0.1 ? 1 : 0
} 
