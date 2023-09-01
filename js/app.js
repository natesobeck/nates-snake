//*CONSTANTS



//*STATE VARIABLES
let board = [];
let xcoordinate, ycoordinate, appleCoordinates, snakeCoordinates, travelDirection, score, snakeLength  

//*CACHED ELEMENT REFERENCES

const boardEl = document.getElementById('board')

generateBoardCells()
const boardCellEls = document.querySelectorAll('.cell')
const snakeEls = ''
const appleEl = ''
const scoreEl = ''

//*EVENT LISTENERS

//*FUNCTIONS

init()

function init() {
  travelDirection = 'right'
  snakeLength = 3
  score = 0
  render()
}

function render() {
  generateBoardArray()
  displayBoard()
  moveSnake()
}

function generateBoardCells() {
  for (let i = 1; i < 21; i++) {
    for (let j = 1; j < 21; j++) {
      let cell = document.createElement('div')
      cell.setAttribute('id', `cell${i}-${j}`)
      cell.className = 'cell'
      boardEl.appendChild(cell)
    }
  }
}

function generateBoardArray() {
  for (let i = 1; i < 21; i++) {
    board.push([null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null])
  }
}


function displayBoard() {
  displayApple()
  displaySnake()
}

function randomIndex() {
  return Math.floor(Math.random() * 20)
}

function displayApple() {
  appleCoordinates = [randomIndex(), randomIndex()]
  const appleId = `cell${appleCoordinates[0]}-${appleCoordinates[1]}`
  console.log(appleId)
  boardCellEls.forEach(cell => {
    if (cell.getAttribute('id') === appleId) {
      cell.className = 'apple'
    }
  })
}

function displaySnake() {
}

function moveSnake() {
}

function turnSnake() {
}

function eatApple() {
}

function incrementScore(score) {
}

function displayScore() {
}

function endGame() {
}

function displayResult() {
}


// Create a grid of html elements that represent cells on the board using flexbox. 
// Create state variables for X and Y coordinates, travelDirection(which way the snake is going), score, and snakeLength
// Create an array that represents the position of the cells of the board, so that you can update it with the location of the snake. This will be an array of arrays, and each array element will represent a row of the board. This can be initialized to an empty array. The X coordinate will be represented with the index of which array row the cell is in and Y will be represented by the index in said array.
// Create cached element references
// For the snake
// For the apple
// For the start and reset buttons
// For the cells on the board
// For the score display
// Create an init function to render the state at the start of the game. Invoke this function at the top of your functions code section. This needs:
// Reset travelDirection to default 
// Reset X and Y coordinates to middle of board
// Reset snakeLength to 3
// Reset score to 0
// Render the board, snake and apple
// Create a function render() that renders the current state of the game. Invoke this function in Init().
// Create a function displayBoard() that renders the board using the position of the apple and the snake. Function displaySnake() and displayApple() will be invoked inside this function. Invoke displayBoard() in render().
// Create a function displaySnake() that displays the snake on the board based on its coordinates. Invoke this in render().
// Create a function displayApple() that displays the apple on the board based on its coordinates. It will select a random coordinate that the snake does not occupy and place a new apple there. Invoke this in render().
// Create a function moveSnake() that moves the snake in the orientation of the direction variable until turnSnake() is invoked. From the start of the game, this function will run to make the snake move. Invoke this function in render().
// Create a function turnSnake() that will listen for a keydown, and will orient its direction towards that keydown. This will set the travelDirection to match the keydown and then render().
// Create a function eatApple() which adds a cell in length to the snake when it eats an apple. This will add one to the snakeLength, will run displayApple() to get a new apple in a new position, then will render().
// Create a function incrementScore() which will increment the score by 10 points each time eatApple() is called.
// Create a function displayScore() that will be displayed at the top of the page.
// Create a function endGame() that ends the game when either of the following end conditions are met:
// The snake impacts the boundary and tries to go beyond the board. This means if the value of either the x or y coordinate is not a valid index of our arrays, the game will end because the snake is going beyond the boundary of the board.
// The snake impacts itself. So the game will end if the snake tries to occupy a square that it is already occupying. In other words, if there are duplicate coordinates for any of the cells of the snake’s body the game will end.
// Create a function displayResult() that displays the final points for the game after it has ended in a larger HTML box that will overlay the board when they lose the game. Invoke this function inside endGame().
