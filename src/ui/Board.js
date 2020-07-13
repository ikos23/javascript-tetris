import React, { useState, useRef } from "react";
import "./Board.css";
import { createGameBoard } from "../engine/game";
import {
  newGame,
  moveLeft,
  moveRight,
  moveDown,
  rotatePiece,
} from "../engine/engine";

export default function Board(props) {
  const [state, setState] = useState({
    board: createGameBoard(),
    score: 0,
  });
  const [showStartBtn, setShowStartBtn] = useState(true);
  const boardRef = useRef(null);

  function start() {
    setShowStartBtn(false);
    boardRef.current.focus();
    newGame(setState);
  }

  function handleOnKeyDown(e) {
    if (e.which === 37) {
      // ArrowLeft
      moveLeft();
    } else if (e.which === 39) {
      // ArrowRight
      moveRight();
    } else if (e.which === 40) {
      // ArrowDown
      moveDown();
    } else if (e.which === 32) {
      // Space
      rotatePiece();
    }
  }

  return (
    <>
      {showStartBtn && (
        <button
          onClick={start}
          style={{
            position: "absolute",
            left: "50px",
            top: "200px",
            fontSize: "20px",
            padding: "5px",
            color: "#fff",
            backgroundColor: "#474747",
            zIndex: "1000",
            cursor: "pointer",
          }}
        >
          Press to Start
        </button>
      )}
      <div
        style={{
          position: "absolute",
          left: "260px",
          top: "5px",
          fontSize: "35px",
          fontWeight: "bold",
        }}
      >
        BuggyTetris
      </div>
      <div style={{ position: "absolute", left: "260px", top: "70px" }}>
        Move: [&larr;], [&rarr;], [&darr;]. Rotate: [Space].
      </div>
      <div
        style={{
          position: "absolute",
          left: "5px",
          top: "5px",
          fontSize: "20px",
          color: "#fff",
          zIndex: 1000,
        }}
      >
        Score: <b>{state.score}</b>
      </div>
      <div
        className="Board"
        tabIndex="-1"
        onKeyDown={handleOnKeyDown}
        ref={boardRef}
      >
        {state.board.map((row, i) => (
          <Row key={`r${i}`} rowNo={i} points={row} />
        ))}
      </div>
    </>
  );
}

function Point({ point, x, y }) {
  const top = `${(23 - y) * 20}px`;
  const left = `${x * 20}px`;

  return (
    <div
      style={{
        top,
        left,
        position: "absolute",
        width: "20px",
        height: "20px",
        backgroundColor: point ? point.color : "#000",
        border: "1px solid #191919",
      }}
    ></div>
  );
}

function Row(props) {
  return (
    <>
      {props.points.map((point, index) => (
        <Point key={`p${index}`} x={index} y={props.rowNo} point={point} />
      ))}
    </>
  );
}
