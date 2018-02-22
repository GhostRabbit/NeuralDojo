let world

// Controls
let draws
let displayCount
let hightscore
let lifescore
let generations
let genCounter = 0

// Stats
let maxLength = 0
let maxMeanLength = 0
let maxLife = 0
let maxMeanLife = 0


function setup() {
	createCanvas(320, 320)
	createP('')
	world = new World(10, 256)

	draws = createSpan('Draw snakes: ')
	displayCount = createSlider(0, world.snakes.length, world.snakes.length)
	//doDraw = createCheckbox('Do draw', true)
	generations = createSpan('')
	createP('')
	highscore = createSpan('')
	createP('')
	lifescore = createSpan('')

}

function draw() {
	if (displayCount.value() > 0) {
		drawBoard()
		world.show(displayCount.value())
		update()
	} else {
		for (let i = 0; i < 100; i++) {
			update()
		}
	}
}

function drawBoard() {
	background(40)
}

function update() {
	if (world.done()) {
		updateStatistics()
		world.breed()
	} else {
		world.update()
	}
}

function updateStatistics() {
	let currentMaxLength = world.snakes.reduce((max, s) => Math.max(max, s.tail.length + 1), 0)
	let currentMeanLength = world.snakes.reduce((sum, s) => sum + s.tail.length + 1, 0) / world.snakes.length
	let currentMaxLife = world.snakes.reduce((max, s) => Math.max(max, s.lifetime), 0)
	let currentMeanLife = world.snakes.reduce((sum, s) => sum + s.lifetime, 0) / world.snakes.length

	maxLength = max(maxLength, currentMaxLength)
	maxMeanLength = max(maxMeanLength, currentMeanLength)
	maxLife = max(maxLife, currentMaxLife)
	maxMeanLife = max(maxMeanLife, currentMeanLife)

	draws.html('Draw ' + displayCount.value() + ' snakes:')
	generations.html('Generations: ' + (++genCounter))
	highscore.html(
		'Longest snake: ' + maxLength + ' (' + currentMaxLength + ')' +
		' mean: ' + maxMeanLength + ' (' + currentMeanLength + ')'
	)
	lifescore.html(
		'Longest life: ' + maxLife + ' (' + currentMaxLife + ')' +
		' mean: ' + maxMeanLife + ' (' + currentMeanLife + ')'
	)
}

function listMr() {
	return world.snakes.map(s => s.mutationrate)
}

function listLegends() {
	return world.snakes.map(s => s.legend)
}