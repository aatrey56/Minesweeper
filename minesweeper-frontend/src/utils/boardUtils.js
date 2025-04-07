export const createBoard = (rows, cols, bombs, safeX, safeY) => {
  const board = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      isRevealed: false,
      isFlagged: false,
      isBomb: false,
      adjacentBombs: 0,
    }))
  );

  let placed = 0;
  while (placed < bombs) {
    const x = Math.floor(Math.random() * rows);
    const y = Math.floor(Math.random() * cols);

    // Skip if it's the safe zone (first click or its neighbors)
    if (
      (x === safeX && y === safeY) ||
      (Math.abs(x - safeX) <= 1 && Math.abs(y - safeY) <= 1) ||
      board[x][y].isBomb
    ) {
      continue;
    }

    board[x][y].isBomb = true;
    incrementNeighbors(board, x, y);
    placed++;
  }

  return board;
};

const incrementNeighbors = (board, x, y) => {
  const directions = [-1, 0, 1];
  for (let dx of directions) {
    for (let dy of directions) {
      if (dx === 0 && dy === 0) continue;
      const nx = x + dx;
      const ny = y + dy;
      if (
        nx >= 0 &&
        ny >= 0 &&
        nx < board.length &&
        ny < board[0].length &&
        !board[nx][ny].isBomb
      ) {
        board[nx][ny].adjacentBombs++;
      }
    }
  }
};

export const revealCell = (board, x, y) => {
  const cell = board[x][y];
  if (cell.isRevealed || cell.isFlagged) return board;
  cell.isRevealed = true;

  if (cell.adjacentBombs === 0 && !cell.isBomb) {
    const directions = [-1, 0, 1];
    for (let dx of directions) {
      for (let dy of directions) {
        const nx = x + dx;
        const ny = y + dy;
        if (
          nx >= 0 &&
          ny >= 0 &&
          nx < board.length &&
          ny < board[0].length &&
          !board[nx][ny].isRevealed
        ) {
          revealCell(board, nx, ny);
        }
      }
    }
  }

  return board;
};

export const toggleFlag = (board, x, y) => {
  const cell = board[x][y];
  if (!cell.isRevealed) {
    cell.isFlagged = !cell.isFlagged;
  }
  return board;
};

export const checkWinCondition = (board, bombCount) => {
  let revealedCount = 0;
  for (const row of board) {
    for (const cell of row) {
      if (cell.isRevealed) revealedCount++;
    }
  }
  return revealedCount === board.length * board[0].length - bombCount;
};
