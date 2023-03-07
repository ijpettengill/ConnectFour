const WIDTH = 7;  //the height and width wont change.  const can be used
const HEIGHT = 6;

let currPlayer = 1; // this changes each turn.  var gets changed to let
let board = []; // the board doesnt 'change', but the pieces get add so I use let



function makeBoard() {
  for (let y = 0; y < HEIGHT; y++) {
    board.push(Array.from({ length: WIDTH }));
  }
}//this sets the board limits here instead of making a table in html



function makeTheBoard() {
  const board = document.getElementById('board');

  
  const top = document.createElement('tr');
  top.setAttribute('id', 'column-top');
  top.addEventListener('click', handleClick);//this makes it so all if the player
  //'interaction' is with the top row.  kinds like they are dropping the pieces in.

  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement('td');
    headCell.setAttribute('id', x);
    top.append(headCell);
  }

  board.append(top);

  // make main part of board
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement('tr');

    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement('td');
      cell.setAttribute('id', `${y}-${x}`);
      row.append(cell);
    }

    board.append(row);
  }
}



function findSpotForCol(x) {
  for (let y = HEIGHT - 1; y >= 0; y--) {
    if (!board[y][x]) {
      return y;
    }
  }
  return null;
}//this finds the where to place the piece on the column selected


function placeInTable(y, x) {
  const piece = document.createElement('div');
  piece.classList.add('piece');
  piece.classList.add(`p${currPlayer}`);
  piece.style.top = -50 * (y + 2);

  const spot = document.getElementById(`${y}-${x}`);
  spot.append(piece);
}//this puts the piece there



function endGame(msg) {
  alert(msg);
}//this pops up when the game is over


function handleClick(evt) {
  const x = +evt.target.id;

  
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }//this ignores the click if the column is full

    board[y][x] = currPlayer;
  placeInTable(y, x);
  
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }
  
  if (board.every(row => row.every(cell => cell))) {
    return endGame('Tie!');
  }//this is really unlikely
    
    currPlayer = currPlayer === 1 ? 2 : 1;
}//this is how the players take turns


function checkForWin() {
  function _win(cells) {
    // it uses the place of the last piece.  specifically where it landed
    //then it checks in all directions
    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

            if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeTheBoard();
