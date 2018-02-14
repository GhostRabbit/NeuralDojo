let brain

let right
let left
let f


function setup() {
	createCanvas(400, 400)

	brain = new NeuralNetwork(2, 2, 1)
	right = random(0.2, 0.8)
	left = random(0.2, 0.8)
	f = x => (right - left) * x + left
	background(100)
}

function draw() {
	drawBoard()
	drawFunctionLine()
	train()
}

function drawFunctionLine() {
	strokeWeight(3)
	stroke(0, 255, 0)
	line(0, f(0) * height, width, f(1) * height)
}

function drawBoard() {
	noStroke()
	let r = 5
	for (let x = r; x < width; x += 2 * r) {
		for (let y = r; y < height; y += 2 * r) {
			let guess = brain.predict([x / width, y / height])[0]
			fill(255 * guess)
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
