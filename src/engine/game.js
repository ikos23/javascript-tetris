import {
  StraightTetromino,
  S_Tetromino,
  SquareTetromino,
  T_Tetromino,
  L_Tetromino,
} from "../model/tetrominos";

// simply a matrix 24x12 to keep game state
export function createGameBoard() {
  const gameBoard = [];

  for (let i = 0; i < 24; i++) {
    const newRow = new Array(12);
    newRow.fill(null, 0);
    gameBoard[i] = newRow;
  }

  return gameBoard;
}

export function moveToNewPos(gameBoard, piece, newPosition) {
  removeFromCurrentPos(gameBoard, piece);

  const body = piece.tetromino.getBody();
  const { x: newX, y: newY } = newPosition;
  const obj = {
    color: piece.tetromino.getColor(),
    commited: false,
  };

  let x1 = body[0][0];
  let y1 = body[0][1];
  let x2 = body[1][0];
  let y2 = body[1][1];
  let x3 = body[2][0];
  let y3 = body[2][1];
  let x4 = body[3][0];
  let y4 = body[3][1];

  gameBoard[y1 + newY][x1 + newX] = obj;
  gameBoard[y2 + newY][x2 + newX] = obj;
  gameBoard[y3 + newY][x3 + newX] = obj;
  gameBoard[y4 + newY][x4 + newX] = obj;
}

// this is probably the most tricky operation
export function rotate(gameBoard, piece) {
  const { tetromino, x, y } = piece;
  const nextBody = tetromino.nextRotation();

  // that is where it will appear if we proceed with rotation
  let x1 = nextBody[0][0] + x;
  let y1 = nextBody[0][1] + y;
  let x2 = nextBody[1][0] + x;
  let y2 = nextBody[1][1] + y;
  let x3 = nextBody[2][0] + x;
  let y3 = nextBody[2][1] + y;
  let x4 = nextBody[3][0] + x;
  let y4 = nextBody[3][1] + y;

  const maxX = Math.max(x1, x2, x3, x4);
  const maxY = Math.max(y1, y2, y3, y4);
  const xdiff = maxX - 11;
  const ydiff = maxY - 23;
  const newPos = { x, y };

  if (maxX > 11) {
    x1 -= xdiff;
    x2 -= xdiff;
    x3 -= xdiff;
    x4 -= xdiff;
    newPos.x -= xdiff;
  }

  if (maxY > 23) {
    y1 -= ydiff;
    y2 -= ydiff;
    y3 -= ydiff;
    y4 -= ydiff;
    newPos.y -= ydiff;
  }

  // case 1: we end up in an already taken position
  if (
    (gameBoard[y1][x1] && gameBoard[y1][x1].commited) ||
    (gameBoard[y2][x2] && gameBoard[y2][x2].commited) ||
    (gameBoard[y3][x3] && gameBoard[y3][x3].commited) ||
    (gameBoard[y4][x4] && gameBoard[y4][x4].commited)
  ) {
    return;
  } else {
    removeFromCurrentPos(gameBoard, piece);
    tetromino.rotate();
    piece.x = newPos.x;
    piece.y = newPos.y;
    moveToNewPos(gameBoard, piece, newPos);
  }
}

function removeFromCurrentPos(gameBoard, { tetromino, x, y }) {
  const body = tetromino.getBody();

  let x1 = body[0][0];
  let y1 = body[0][1];
  let x2 = body[1][0];
  let y2 = body[1][1];
  let x3 = body[2][0];
  let y3 = body[2][1];
  let x4 = body[3][0];
  let y4 = body[3][1];

  // based on them we can calc current location of tetromino
  gameBoard[y1 + y][x1 + x] = null;
  gameBoard[y2 + y][x2 + x] = null;
  gameBoard[y3 + y][x3 + x] = null;
  gameBoard[y4 + y][x4 + x] = null;
}

export function canBeMoved(gameBoard, { tetromino }, newPosition) {
  const { x: newX, y: newY } = newPosition;
  const body = tetromino.getBody();

  // the most obvious (we can't move something outside the board)
  if (newY < 0 || newX < 0 || newX + tetromino.getWidth() > 12) {
    return false;
  }

  // these are coordinates of new position
  let x1 = body[0][0] + newX;
  let y1 = body[0][1] + newY;
  let x2 = body[1][0] + newX;
  let y2 = body[1][1] + newY;
  let x3 = body[2][0] + newX;
  let y3 = body[2][1] + newY;
  let x4 = body[3][0] + newX;
  let y4 = body[3][1] + newY;

  if (
    (gameBoard[y1][x1] && gameBoard[y1][x1].commited) ||
    (gameBoard[y2][x2] && gameBoard[y2][x2].commited) ||
    (gameBoard[y3][x3] && gameBoard[y3][x3].commited) ||
    (gameBoard[y4][x4] && gameBoard[y4][x4].commited)
  ) {
    // we will intersect with another tetromino, so cannot move
    return false;
  }

  return true;
}

export function commitPiece(gameBoard, { tetromino, x, y }) {
  const body = tetromino.getBody();
  const obj = {
    color: tetromino.getColor(),
    commited: true,
  };

  let x1 = body[0][0] + x;
  let y1 = body[0][1] + y;
  let x2 = body[1][0] + x;
  let y2 = body[1][1] + y;
  let x3 = body[2][0] + x;
  let y3 = body[2][1] + y;
  let x4 = body[3][0] + x;
  let y4 = body[3][1] + y;

  gameBoard[y1][x1] = obj;
  gameBoard[y2][x2] = obj;
  gameBoard[y3][x3] = obj;
  gameBoard[y4][x4] = obj;
}

export function isCommited(gameBoard, { tetromino, x, y }) {
  const body = tetromino.getBody();

  let x1 = body[0][0] + x;
  let y1 = body[0][1] + y;

  return gameBoard[y1][x1] && gameBoard[y1][x1].commited;
}

// to be improved (when I have time. probably never)
export function clearLines(gameBoard) {
  let completed = 0;
  let score = 0;
  let copy = [...gameBoard];

  gameBoard.splice(0, gameBoard.length); // clean

  for (let i = 0; i < 23; i++) {
    if (lineCompleted(copy[i])) {
      completed++;
      score += 100 * completed;
    } else {
      gameBoard.push(copy[i]);
    }
  }

  while (gameBoard.length < 24) {
    const newRow = new Array(12);
    newRow.fill(null, 0);
    gameBoard.push(newRow);
  }

  return score;
}

function lineCompleted(line) {
  let completed = true;

  for (let i = 0; i < 12; i++) {
    if (line[i] == null) {
      completed = false;
      break;
    }
  }

  return completed;
}

const getRandomInt = makeRandomIntGenerator(5);

export function getRandomTetromino() {
  const randInt = getRandomInt(5);

  switch (randInt) {
    case 0:
      return new StraightTetromino();
    case 1:
      return new S_Tetromino();
    case 2:
      return new SquareTetromino();
    case 3:
      return new T_Tetromino();
    default:
      return new L_Tetromino();
  }
}

// hope this will produce more random random numbers
function makeRandomIntGenerator(max) {
  let prevVal = -1;

  return function () {
    let newVal = Math.floor(Math.random() * Math.floor(max));
    if (newVal === prevVal) {
      newVal = Math.floor(Math.random() * Math.floor(max));
    }

    prevVal = newVal;
    return newVal;
  };
}
