//*CONSTANTS
class Cell {
  constructor(x, y) {
    this.x = x
    this.y = y
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
  constructor(x, y, direction = 'left') {
    this.length = 3
    this.coordinates = [new Cell (x, y), new Cell(x, y + 1), new Cell(x, y + 2)]
    this.direction = direction
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
    let cloneHead = Object.assign({}, this.coordinates[0])
    if (this.direction === 'left') {
      cloneHead.y -= 1
    } else if(this.direction === 'up') {
      cloneHead.x -= 1
    } else if(this.direction === 'right') {
      cloneHead.y += 1
    } else {
      cloneHead.x += 1
    }
    this.coordinates.unshift(cloneHead)
    this.coordinates.pop()
    clearBoard()
    this.display()
  }
  moveContinuously() {
    const moveTimer = setInterval(this.moveOnce.bind(this), 200)
  }
}

//*STATE VARIABLES
let board = []
let tempArray = []
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
    if (snake.direction !== 'down') {
      snake.direction = 'up'
    }
  } else if (e.key === 'ArrowDown') {
    if (snake.direction !== 'up') {
      snake.direction = 'down'
    }
  } else if (e.key === 'ArrowRight') {
    if (snake.direction !== 'left') {
      snake.direction = 'right'
    }
  } else if (e.key === 'ArrowLeft') {
    if (snake.direction !== 'right') {
      snake.direction = 'left'
    }
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

function clearBoard() {
  boardCellEls.forEach(cellEl => {
    if (!cellEl.classList.contains('apple'))
    cellEl.className = 'cell'
})
}

function getCoordinates(displayedCell) {
  const cellId = displayedCell.getAttribute('id')
  const x = parseInt(cellId[4] + cellId[5])
  const y = parseInt(cellId[7] + cellId[8])
  const newCell = new Cell(x, y)
  return newCell
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

//*For running keydown event listeners
// https://www.javascripttutorial.net/javascript-dom/javascript-keyboard-events/

// https://stackoverflow.com/questions/56496376/get-previous-item-seen-in-js-for-of-loop