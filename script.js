const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const message = document.getElementById('message');
const restartBtn = document.getElementById('restartBtn');

let isXTurn = true;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

cells.forEach(cell => {
  cell.addEventListener('click', handleClick, { once: true });
});

restartBtn.addEventListener('click', startGame);

function handleClick(e) {
  const cell = e.target;
  const currentClass = isXTurn ? 'X' : 'O';
  cell.textContent = currentClass;

  if (checkWin(currentClass)) {
    endGame(false);
  } else if ([...cells].every(cell => cell.textContent !== '')) {
    endGame(true);
  } else {
    isXTurn = !isXTurn;
  }
}

function checkWin(currentClass) {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return cells[index].textContent === currentClass;
    });
  });
}

function endGame(draw) {
  if (draw) {
    message.textContent = "It's a Draw!";
  } else {
    message.textContent = `${isXTurn ? 'X' : 'O'} Wins!`;
  }
  cells.forEach(cell => cell.removeEventListener('click', handleClick));
}

function startGame() {
  isXTurn = true;
  message.textContent = '';
  cells.forEach(cell => {
    cell.textContent = '';
    cell.addEventListener('click', handleClick, { once: true });
  });
}
