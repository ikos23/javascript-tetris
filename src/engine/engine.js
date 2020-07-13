import { createGameBoard, getRandomTetromino, clearLines } from "./game";
import Queue from "./Queue";
import {
  NewPieceCommand,
  MoveDownCommand,
  MoveLeftCommand,
  MoveRightCommand,
  RotateCommand,
} from "./commands";

const gameState = {
  board: createGameBoard(),
  piece: null,
  score: 0,
  gameOver: false,
};

const commandsQ = new Queue();

function getNewPiece() {
  const tetromino = getRandomTetromino();
  const y = 23 - tetromino.getHeight() + 1;
  const x = 4;

  return { tetromino, x, y };
}

// take command from Q and execute it
function handleCommand(cmdQ, gameState) {
  if (!cmdQ.isEmpty()) {
    const command = cmdQ.dequeue();

    if (command.type === "NEW_PIECE") {
      if (!command.execute()) {
        // at some point we simply cannot add new pieces
        gameState.gameOver = true;
        alert("Game Over :(");
      }
    } else if (command.type === "MOVE_DOWN") {
      const commited = command.execute();
      // this command is special
      if (commited) {
        // clear all completed lines
        const score = clearLines(gameState.board);
        gameState.score += score;

        // and show new piece
        cmdQ.clear();
        cmdQ.enqueue(new NewPieceCommand(gameState, getNewPiece()));
      }
    } else {
      command.execute();
    }
  }
}

export function newGame(ui) {
  commandsQ.enqueue(new NewPieceCommand(gameState, getNewPiece()));

  let hanlerId = setInterval(
    (q, state) => {
      if (state.gameOver) {
        clearInterval(hanlerId);
        return;
      }
      handleCommand(q, state);
      ui({ board: [...state.board], score: state.score });
    },
    100,
    commandsQ,
    gameState
  );

  // simulates tetris behavior where a piece is being moved
  // down automatically
  let autoMoveId = setInterval(
    (q, state) => {
      if (state.gameOver) {
        clearInterval(autoMoveId);
        return;
      }
      q.enqueue(new MoveDownCommand(state));
    },
    1000,
    commandsQ,
    gameState
  );

  console.log("New game started :)");
}

export function moveLeft() {
  commandsQ.enqueue(new MoveLeftCommand(gameState));
}

export function moveRight() {
  commandsQ.enqueue(new MoveRightCommand(gameState));
}

export function rotatePiece() {
  commandsQ.enqueue(new RotateCommand(gameState));
}

export function moveDown() {
  commandsQ.enqueue(new MoveDownCommand(gameState));
}
