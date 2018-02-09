let brain
let points = []

// Coordinate space
const xmin = -1;
const ymin = -1;
const xmax = 1;
const ymax = 1;

let f

function setup() {
	createCanvas(500, 500)
	brain = new Perceptron(3, 0.5)
	f = ((dx, dy) => x => dx * x + dy)(random(-1, 1), random(-1, 1))
	for (let i = 0; i < 5000; i++) {
		let x = random(xmin, xmax)
		let y = random(ymin, ymax)
		let answer = f(x) > y ? 1 : -1
		points.push({
			inputs: [x, y, 1],
			output: answer
		})
	}
}

let trainingIndex = 0
function singleTraining() {
	let first = trainingIndex
	let goOn = true
	while (goOn) {
		let p = points[trainingIndex]
		goOn = 0 == brain.train(p.inputs, p.output)
		trainingIndex = (trainingIndex + 1) % points.length
		if (first == trainingIndex) {
			break;
		}
	}
}

function draw() {
	background(200)
	drawFunctionLine()
	drawWeightLine();

	stroke(100)
	for (let p of points) {
		let guess = brain.guess(p.inputs)
		if (guess == p.output) {
			fill(0, 255, 0)
		} else {
			fill(255, 0, 0)
		}

		let x = map(p.inputs[0], xmin, xmax, 0, width)
		let y = map(p.inputs[1], ymin, ymax, 0, height)
		ellipse(x, y, 6)
	}
	singleTraining()
}

function drawFunctionLine() {
	stroke(255)
	line(map(xmin, xmin, xmax, 0, width),
		map(f(xmin), ymin, ymax, 0, height),
		map(xmax, xmin, xmax, 0, width),
		map(f(xmax), ymin, ymax, 0, height)
	)
}

function drawWeightLine() {
	stroke(0)
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
