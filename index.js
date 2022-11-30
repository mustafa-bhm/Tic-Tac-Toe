const cells = document.querySelectorAll(".cell");

const player_X = "X";
const player_O = "O";

let turn = player_X;

const board = Array(cells.length);
// to set value to null for board
board.fill(null);

//Get elements
const playAgainBtn = document.getElementById("play-again");
const gameOverBox = document.getElementById("game-over-box");
const gameOverText = document.getElementById("game-over-text");

cells.forEach((tile) => {
  tile.addEventListener("click", cellClick);
});

function hoverEffect() {
  // remove pre hover
  cells.forEach((cell) => {
    cell.classList.remove("X-hover");
    cell.classList.remove("O-hover");
  });
  const hoverClass = `${turn}-hover`;
  cells.forEach((cell) => {
    if (cell.innerText == "") {
      cell.classList.add(hoverClass);
    }
  });
}
hoverEffect();

function cellClick(event) {
  // to check if the gamme is over , no clicks on cells are allowed
  if (gameOverBox.classList.contains("visible")) {
    return;
  }
  // to acces the html element that was cliked
  const cell = event.target;
  const cellNumber = cell.dataset.index;

  // to check if ther is already a value inside the tile, if yes exit function
  if (cell.innerText != "") {
    return;
  }
  // to populate the cell and switch player
  if (turn === player_X) {
    cell.innerText = player_X;
    board[cellNumber - 1] = player_X;
    turn = player_O;
  } else {
    cell.innerText = player_O;
    board[cellNumber - 1] = player_O;
    turn = player_X;
  }
  hoverEffect();
  checkWinner();
}
function checkWinner() {
  for (let i = 0; i < winningCombinations.length; i++) {
    let condition = winningCombinations[i];
    // to get the value from boardstate array
    const cell1 = board[condition[0]];
    const cell2 = board[condition[1]];
    const cell3 = board[condition[2]];

    if (cell1 != null && cell1 === cell2 && cell1 === cell3) {
      gameOverScreen(cell1);
      return;
    }
  }
  // to check for draw
  const allCellsFilled = board.every((tile) => tile !== null);
  if (allCellsFilled) {
    gameOverScreen(null);
  }
}

function gameOverScreen(winnerText) {
  let text = "Draw";
  if (winnerText != null) {
    text = `Winner is ${winnerText} !`;
  }
  gameOverBox.className = "visibile";
  gameOverText.innerText = text;
}

playAgainBtn.addEventListener("click", newGame);

function newGame() {
  board.fill(null);
  gameOverBox.className = "hidden";
  cells.forEach((e) => {
    e.innerText = "";
  });
  hoverEffect();
}

/// winning combination

const winningCombinations = [
  // rows
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  // colomns
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  // diagonal
  [0, 4, 8],
  [2, 4, 6],
];
