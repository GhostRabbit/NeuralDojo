let brain
let points = []

// Coordinate space
const xmin = -1;
const ymin = -1;
const xmax = 1;
const ymax = 1;

let f
let answer
let dx
let dy
let dxSlider
let dySlider
let slider

function setup() {
	dx = random(-1, 1)
	dy = random(-1, 1)
	f = x => dx * x + dy
	answer = (x, y) => f(x) > y ? 1 : -1

	createCanvas(500, 500)
	createP('Points:')
	slider = createSlider(10, 10000, 1000)
	createP('dX:')
	dxSlider = createSlider(-1, 1, dx, 0.01)
	createP('dY:')
	dySlider = createSlider(-1, 1, dy, 0.01)
	brain = new Perceptron(3, 0.5)
}

let trainingIndex = 0
function singleTraining() {
	if (points.length != slider.value()) {
		points = []
		trainingIndex = 0
		for (let i = 0; i < slider.value(); i++) {
			let x = random(xmin, xmax)
			let y = random(ymin, ymax)
			points.push([x, y, 1])
		}
	}

	let first = trainingIndex
	let goOn = true
	while (goOn) {
		let p = points[trainingIndex]
		let expected = answer(p[0], p[1])
		goOn = 0 == brain.train(p, expected)
		trainingIndex = (trainingIndex + 1) % points.length
		if (first == trainingIndex) {
			break;
		}
	}
}

function draw() {
	if (dx != dxSlider.value() || dy != dySlider.value()) {
		dx = dxSlider.value()
		dy = dySlider.value()
		brain.learningRate = 0.5
	}

	drawBoard()
	drawFunctionLine()
	drawWeightLine();
	singleTraining()
}

function drawBoard() {
	background(100)

	noStroke()

	for (let p of points) {
		let guess = brain.predict(p)
		if (guess == answer(p[0], p[1])) {
			fill(0, 255, 0)
		} else {
			fill(255, 0, 0)
		}

		let x = map(p[0], xmin, xmax, 0, width)
		let y = map(p[1], ymin, ymax, 0, height)
		ellipse(x, y, 6)
	}
}

function drawFunctionLine() {
	stroke(255)
	strokeWeight(3)
	line(map(xmin, xmin, xmax, 0, width),
		map(f(xmin), ymin, ymax, 0, height),
		map(xmax, xmin, xmax, 0, width),
		map(f(xmax), ymin, ymax, 0, height)
	)
}

function drawWeightLine() {
	stroke(0)
	strokeWeight(3)
	let weights = brain.weights
	let x1 = xmin
	let y1 = (-weights[2] - weights[0] * x1) / weights[1]
	let x2 = xmax
	let y2 = (-weights[2] - weights[0] * x2) / weights[1]

	line(map(x1, xmin, xmax, 0, width),
		map(y1, ymin, ymax, 0, height),
		map(x2, xmin, xmax, 0, width),
		map(y2, ymin, ymax, 0, height)
	)
}
