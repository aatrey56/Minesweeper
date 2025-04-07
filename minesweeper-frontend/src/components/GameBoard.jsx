import React, { useEffect, useState } from 'react';
import Cell from './Cell';
import { submitGameResult } from '../api/game';
import {
  createBoard,
  revealCell,
  toggleFlag,
  checkWinCondition,
} from '../utils/boardUtils';

const DIFFICULTY_SETTINGS = {
  Easy: { rows: 9, cols: 9, bombs: 10 },
  Medium: { rows: 16, cols: 16, bombs: 40 },
  Hard: { rows: 16, cols: 32, bombs: 99 },
};

const GameBoard = ({ difficulty }) => {
  const { rows, cols, bombs } = DIFFICULTY_SETTINGS[difficulty];
  const [board, setBoard] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsed, setElapsed] = useState(0);


  useEffect(() => {
    let interval;
    if (startTime && !gameOver && !win) {
      interval = setInterval(() => {
        setElapsed(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [startTime, gameOver, win]);

  const resetGame = () => {
    setBoard(Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => ({
        isRevealed: false,
        isFlagged: false,
        isBomb: false,
        adjacentBombs: 0,
      }))
    ));
    setGameOver(false);
    setWin(false);
    setGameStarted(false);
    setStartTime(null);
    setElapsed(0);
  };

  const handleClick = (x, y) => {
    if (gameOver || win) return;

    
    if (!gameStarted) {
      const safeBoard = createBoard(rows, cols, bombs, x, y);
      const updated = revealCell(safeBoard, x, y);
      setBoard([...updated]);
      setGameStarted(true);
      setStartTime(Date.now());
      return;
    }

    const updated = revealCell(board, x, y);
    setBoard([...updated]);

    if (updated[x][y].isBomb) {
      setGameOver(true);
      alert('Game Over!');
    } else if (checkWinCondition(updated, bombs)) {
      setWin(true);
      alert(`You won in ${elapsed}s!`);
      submitGameResult(difficulty, elapsed);
    }
  };

  const handleFlag = (x, y) => {
    if (gameOver || win || !gameStarted) return;
    const updated = toggleFlag(board, x, y);
    setBoard([...updated]);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex justify-between w-full max-w-lg">
        <div className="text-lg font-bold">Time: {elapsed}s</div>
        <button
          className="bg-yellow-400 px-3 py-1 rounded font-bold shadow"
          onClick={resetGame}
        >
          🙂
        </button>
        <div className="text-lg font-bold">
          Bombs: {bombs - board.flat().filter(cell => cell.isFlagged).length}
        </div>
      </div>
      <div
        className="grid gap-1 bg-gray-200 p-2 rounded"
        style={{ gridTemplateColumns: `repeat(${cols}, 32px)` }}
      >
        {board.map((row, x) =>
          row.map((cell, y) => (
            <Cell
              key={`${x}-${y}`}
              cell={cell}
              onClick={() => handleClick(x, y)}
              onRightClick={() => handleFlag(x, y)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default GameBoard;
