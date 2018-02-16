let brain
let slider
let p

const training_data = [
	{
		input: [0, 0, 0],
		output: [0]
	},
	{
		input: [0, 0, 1],
		output: [1]
	},
	{
		input: [1, 0, 0],
		output: [1]
	},
	{
		input: [1, 0, 1],
		output: [0]
	},
	{
		input: [0, 1, 0],
		output: [1]
	},
	{
		input: [0, 1, 1],
		output: [0]
	},
	{
		input: [1, 1, 0],
		output: [0]
	},
	{
		input: [1, 1, 1],
		output: [1]
	},
]

function setup() {
	createCanvas(400, 400, WEBGL)
	//perspective(60 / 180 * PI, width / height, 0.01, 1);

	createP('')
	slider = createSlider(1, 8, 1)
	p = createP()
	cm = createRadio()
	cm.option('HSB')
	cm.option('RGB')
	cm.selected('RGB')
	updateBrain()

}

function updateBrain() {
	brain = new NeuralNetwork(3, slider.value(), 1)
	p.html(slider.value() + ' hidden nodes')
}

function draw() {
	if (cm.value() == 'HSB') {
		colorMode(HSB)
	} else {
		colorMode(RGB)
	}
	background(200)
	translate(0, 0, -500)
	rotateX(frameCount * 0.002)
	rotateY(frameCount * 0.006)
	rotateZ(frameCount * 0.024)
	drawCorners()
	drawCube()

	if (brain.hidden_nodes != round(slider.value())) {
		updateBrain()
	}
	train()
}

function makePaint(type) {
	switch (type) {
		case 'HSB':
			return guess => {
				noStroke()
				fill(255 * guess, 255, 255, 1)
			}

		default:
			return guess => {
				noFill()
				stroke(0, 255 * guess)
			}
	}
}

function drawCube() {
	let paint = makePaint(cm.value())
	let side = 0.1
	let bSide = side * width
	for (let x = 0; x < 1; x += side) {
		for (let y = 0; y < 1; y += side) {
			for (let z = 0; z < 1; z += side) {
				let inputs = [x, y, z]
				let guess = brain.predict(inputs)[0]
				paint(guess)
				push()
				translate(...inputs.map(v => width * (v - 0.5)))
				box(bSide)
				pop()
			}
		}
	}
}

function drawCorners() {
	let side = 0.1
	let bSide = side * width
	noStroke()
	for (let d of training_data) {
		fill((1 - d.output[0]) * 255)
		let [x, y, z] = d.input.map(v => width * (v - 0.5))
		push()
		translate(x, y, z)
		sphere(10)
		pop()
	}
}

function train() {
	for (let i = 0; i < 1000; i++) {
		let data = random(training_data)
		brain.train(data.input, data.output)
	}
}

