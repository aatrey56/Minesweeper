import React from 'react';

const Cell = ({ cell, onClick, onRightClick }) => {
  const getDisplay = () => {
    if (cell.isRevealed) {
      if (cell.isBomb) return '💣';
      return cell.adjacentBombs > 0 ? cell.adjacentBombs : '';
    } else if (cell.isFlagged) {
      return '🚩';
    } else {
      return '';
    }
  };

  return (
    <div
      className={`w-8 h-8 border border-gray-400 text-center text-sm leading-8 font-mono select-none 
        ${cell.isRevealed ? 'bg-gray-300' : 'bg-gray-100'} 
        ${cell.isRevealed && cell.isBomb ? 'bg-red-400' : ''}`}
      onClick={onClick}
      onContextMenu={(e) => {
        e.preventDefault();
        onRightClick();
      }}
    >
      {getDisplay()}
    </div>
  );
};

export default Cell;
