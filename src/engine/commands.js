import { moveToNewPos, canBeMoved, commitPiece, rotate } from "./game";

export function NewPieceCommand(gameState, newPiece) {
  this.type = "NEW_PIECE";
  this.execute = () => {
    gameState.piece = newPiece;
    const newPos = {
      x: gameState.piece.x,
      y: gameState.piece.y,
    };
    const added = true;
    if (canBeMoved(gameState.board, gameState.piece, newPos)) {
      moveToNewPos(gameState.board, gameState.piece, newPos);
      return added;
    } else {
      return !added;
    }
  };
}

export function MoveDownCommand({ board, piece }) {
  this.type = "MOVE_DOWN";
  this.execute = () => {
    const newPos = {
      x: piece.x,
      y: piece.y - 1,
    };

    let commited = false;

    if (canBeMoved(board, piece, newPos)) {
      moveToNewPos(board, piece, newPos);
      piece.y = newPos.y;
    } else {
      commitPiece(board, piece);
      commited = true;
    }

    return commited;
  };
}

export function MoveLeftCommand({ board, piece }) {
  this.type = "MOVE_LEFT";
  this.execute = () => {
    const newPos = {
      x: piece.x - 1,
      y: piece.y,
    };
    if (canBeMoved(board, piece, newPos)) {
      moveToNewPos(board, piece, newPos);
      piece.x = newPos.x;
    }
  };
}

export function MoveRightCommand({ board, piece }) {
  this.type = "MOVE_RIGHT";
  this.execute = () => {
    const newPos = {
      x: piece.x + 1,
      y: piece.y,
    };
    if (canBeMoved(board, piece, newPos)) {
      moveToNewPos(board, piece, newPos);
      piece.x = newPos.x;
    }
  };
}

export function RotateCommand({ board, piece }) {
  this.type = "ROTATE";
  this.execute = () => {
    rotate(board, piece);
  };
}
