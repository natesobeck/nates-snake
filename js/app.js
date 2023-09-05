//*CONSTANTS
class Cell {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
}

class Apple {
  constructor() {
    this.coordinate = this.createUniqueCoordinates()
  }
  createUniqueCoordinates() {
    const coordinate = new Cell(randomIndex(), randomIndex())
    if (snake.coordinates.includes(coordinate)) {
      this.createUniqueCoordinates()
    } else {
      return coordinate
    }
  }
  display() {
    boardCellEls.forEach(displayedCell => {
      const point = getCoordinates(displayedCell)
      if (point.x === this.coordinate.x && point.y === this.coordinate.y) {
        displayedCell.className = 'apple'
      } else {
        snake.coordinates.forEach(coordinate => {
          if (point.x !== coordinate.x || point.y !== coordinate.y) {
            displayedCell.className = 'cell'
          }
        })
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
    let popped = this.coordinates.pop()
    eatApple(popped)
  }
  moveContinuously() {
    moveTimer = setInterval(function(moveTimer) {
      this.moveOnce()
      checkForLoss()
      if (lostGame) {
        stopTimer()
      }
      clearBoard()
      this.display()
    }, 150)
    function stopTimer() {
      stopTimer = clearInterval(moveTimer)
    }
  }
}

//*STATE VARIABLES
let board = []
let score, snake, apple, lostGame, lossTimer,moveTimer

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
  generateBoardArray()
  render()
}

function render() {
  clearBoard()
  apple.display()
  moveContinuously(moveTimer)
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
    if (!cellEl.classList.contains('apple') || lostGame === true)
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

function eatApple(popped) {
  let appleClone = Object.assign({}, apple.coordinate)
  snake.coordinates.forEach(coordinate => {
    if (coordinate.x === appleClone.x && coordinate.y === appleClone.y) {
      snake.coordinates.push(popped)
      apple.coordinate = apple.createUniqueCoordinates()
      apple.display()
      score += 10
      console.log(score)
    }
  })
}

function checkForLoss(moveTimer) {
  snake.coordinates.forEach((coordinate, i)=> {
    if (coordinate.x < 1 || 
        coordinate.y < 1 ||
        coordinate.x > 20 ||
        coordinate.y > 20) {
      lostGame = true
    } else {
      lostGame = false
    }
    snake.coordinates.forEach((copy, j)=> {
      if (coordinate.x === copy.x &&
          coordinate.y === copy.y &&
          i !== j) {
        lostGame = true
      }
    })
  })
}

function moveContinuously() {
  moveTimer = setInterval(function(moveTimer) {
    snake.moveOnce()
    checkForLoss()
    if (lostGame) {
      stopTimer()
    }
    clearBoard()
    snake.display()
  }, 150)
  function stopTimer() {
    stopTimer = clearInterval(moveTimer)
  }
}



function displayResult() {
}

//*SOURCES

//*For running keydown event listeners
// https://www.javascripttutorial.net/javascript-dom/javascript-keyboard-events/

//Jackson helped me reorganize my data, I was looping through everything too many times before