//*CONSTANTS
class Cell {
  constructor(x, y, direction = 'left') {
    this.x = x
    this.y = y
    this.direction = direction
  }
}

class Apple {
  constructor() {
    this.cell = this.createUniqueCoordinates()
  }
  createUniqueCoordinates() {
    const cell = new Cell(randomIndex(), randomIndex())
    if (snake.coordinates.includes(cell)) {
      this.createUniqueCoordinates()
    } else {
      return cell
    }
  }
  display() {
    boardCellEls.forEach(displayedCell => {
      const point = getCoordinates(displayedCell)
      if (point.x === this.cell.x && point.y === this.cell.y) {
        displayedCell.className = 'apple'
      }
    })
  }
}

class Snake {
  constructor(x, y) {
    this.length = 3
    this.coordinates = [new Cell (x, y), new Cell(x, y + 1), new Cell(x, y + 2)]
    this.body = this.coordinates.slice(1)
    this.head = this.coordinates[0]
    this.timer = 0
  }
  display() {
    boardCellEls.forEach(displayedCell => {
      const point = getCoordinates(displayedCell)
      this.coordinates.forEach(coordinate => {
        if (point.x === coordinate.x && point.y === coordinate.y) {
          displayedCell.className = 'snake'
        }
      })
    })
  }
  moveOnce() {
    this.coordinates.forEach(coordinate => {
      if(coordinate.direction === 'left') {
        coordinate.y -= 1
      } else if(coordinate.direction === 'up') {
        coordinate.x -= 1
      } else if(coordinate.direction === 'right') {
        coordinate.y += 1
      } else {
        coordinate.x += 1
      }
    })
    clearBoard()
    this.display()
  }
  moveContinuously() {
    const moveTimer = setInterval(this.moveOnce.bind(this), 250)
  }
  changeHeadDirection(direction) {
    this.coordinates[0].direction = direction
  }
}

function getCoordinates(displayedCell) {
  const cellId = displayedCell.getAttribute('id')
  const x = parseInt(cellId[4] + cellId[5])
  const y = parseInt(cellId[7] + cellId[8])
  const newCell = new Cell(x, y)
  return newCell
}

function clearBoard() {
  boardCellEls.forEach(cellEl => {
    if (!cellEl.classList.contains('apple'))
    cellEl.className = 'cell'
})
}

//*STATE VARIABLES
let board = [];
let score, snake, apple

//*CACHED ELEMENT REFERENCES

const boardEl = document.getElementById('board')
generateBoardCells()
const boardCellEls = document.querySelectorAll('.cell')
const scoreEl = document.getElementById('score-display')

//*EVENT LISTENERS

document.addEventListener('keydown', handleArrowKeydown)

//*FUNCTIONS

init()

function init() {
  score = 0
  snake = new Snake(10, 10)
  apple = new Apple()
  render()
}

function render() {
  generateBoardArray()
  clearBoard()
  apple.display()
  snake.display()
  // snake.moveContinuously()
}

function generateBoardCells() {
  for (let i = 1; i < 21; i++) {
    for (let j = 1; j < 21; j++) {
      const cell = document.createElement('div')
      let x = (i).toString()
      let y = (j).toString()
      if (i < 10) {
        x = x.padStart(2, 0)
      }
      if (j < 10) {
        y = y.padStart(2, 0)
      }
      cell.setAttribute('id', `cell${x}-${y}`)
      cell.className = 'cell'
      boardEl.appendChild(cell)
    }
  }
}

function handleArrowKeydown(e) {
  if (e.key === 'ArrowUp') {
    snake.coordinates[0].direction = 'up'
  } else if (e.key === 'ArrowDown') {
    snake.coordinates[0].direction = 'down'
  } else if (e.key === 'ArrowRight') {
    snake.coordinates[0].direction = 'right'
  } else if (e.key === 'ArrowLeft') {
    snake.coordinates[0].direction = 'left'
  }
}

function generateBoardArray() {
  for (let i = 1; i < 21; i++) {
    for (let j = 1; j < 21; j++) {
      let x = (i).toString()
      let y = (j).toString()
      if (i < 10) {
        x = x.padStart(2, 0)
      }
      if (j < 10) {
        y = y.padStart(2, 0)
      }
      let cell = new Cell (x, y, false, false, false, 'left')
      board.push(cell)
    }
  }
}

function randomIndex() {
  const index = Math.floor(Math.random() * 20)
  return index + 1
}

function incrementScore(score) {
}

function displayScore() {
}

function checkForLoss() {
  snake.coordinates.forEach(coordinate => {
    if (coordinate.x < 1 || 
        coordinate.y < 1 ||
        coordinate.x > 20 ||
        coordinate.y > 20) {
      console.log('Game Over!')
    }
  })
}

function displayResult() {
}

//*SOURCES

//*For running keydown eveent listeners
// https://www.javascripttutorial.net/javascript-dom/javascript-keyboard-events/

