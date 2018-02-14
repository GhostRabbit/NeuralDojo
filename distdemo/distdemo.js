let brain
let slider
let p
let type
let button

let points

function setup() {
	createCanvas(400, 400)

	createP('')
	slider = createSlider(1, 100, 1)
	p = createP()
	updateBrain()
	type = createRadio()
	type.option('Predict')
	type.option('Error')
	type.selected('Predict')
	button = createButton('Move points')
	button.mousePressed(makePoints)

	makePoints()
	background(100)
}

function makePoints() {
	points = []
	for (let i = 0; i < 2; i++) {
		points.push(createVector(random(0.2, 0.8), random(0.2, 0.8)))
	}
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
	drawPoints()
	if (type.value() != 'Error') {
		train()
	}
}

function drawPoints() {
	for (let i = 0; i < points.length; i++) {
		strokeWeight(3)
		stroke(0, 0, 255)
		fill(0, 255, 255)
		ellipse(points[i].x * width, points[i].y * height, 10)
		strokeWeight(1)
		stroke(255)
		noFill()
		ellipse(points[i].x * width, points[i].y * height, width * 0.2)
	}
}

function drawBoard() {
	noStroke()
	let r = 5

	if (type.value() == 'Predict') {
		for (let x = r; x < width; x += 2 * r) {
			for (let y = r; y < height; y += 2 * r) {
				let guess = brain.predict([x / width, y / height])[0]
				fill(0, 255 * guess, 0)
				rect(x - r, y - r, 2 * r, 2 * r)
			}
		}
	} else {
		for (let x = r; x < width; x += 2 * r) {
			for (let y = r; y < height; y += 2 * r) {
				let error = brain.train([x / width, y / height], [minDistToPoints(x / width, y / height)])[0]
				fill(255 * error, 0, 0)
				rect(x - r, y - r, 2 * r, 2 * r)
			}
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
