export const generateBoard = (rows, cols, bombs) => {
    const board = Array.from({ length: rows }, () => Array(cols).fill({
      revealed: false,
      flagged: false,
      value: 0
    }));
  
    let bombsPlaced = 0;
    while (bombsPlaced < bombs) {
      const x = Math.floor(Math.random() * rows);
      const y = Math.floor(Math.random() * cols);
      if (board[x][y].value !== -1) {
        board[x][y] = { ...board[x][y], value: -1 };
        bombsPlaced++;
        updateNeighbors(board, x, y);
      }
    }
  
    return board;
  };
  
  const updateNeighbors = (board, x, y) => {
    const rows = board.length;
    const cols = board[0].length;
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        const nx = x + dx, ny = y + dy;
        if (
          nx >= 0 && ny >= 0 && nx < rows && ny < cols &&
          board[nx][ny].value !== -1
        ) {
          board[nx][ny] = {
            ...board[nx][ny],
            value: board[nx][ny].value + 1
          };
        }
      }
    }
  };
  
  export const revealTile = (board, x, y) => {
    if (board[x][y].revealed || board[x][y].flagged) return;
  
    board[x][y].revealed = true;
  
    if (board[x][y].value === 0) {
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          const nx = x + dx, ny = y + dy;
          if (nx >= 0 && ny >= 0 && nx < board.length && ny < board[0].length) {
            revealTile(board, nx, ny);
          }
        }
      }
    }
  };
  
  export const toggleFlag = (board, x, y) => {
    if (board[x][y].revealed) return;
    board[x][y].flagged = !board[x][y].flagged;
  };
  
  export const checkWin = (board, bombs) => {
    let revealed = 0;
    for (let row of board) {
      for (let cell of row) {
        if (cell.revealed) revealed++;
      }
    }
    return revealed === board.length * board[0].length - bombs;
  };
  