// src/pages/Home.jsx
import React, { useState } from 'react';
import GameBoard from '../components/GameBoard';

const Home = () => {
  const [difficulty, setDifficulty] = useState('Easy');

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <h1 className="text-3xl font-bold">Minesweeper</h1>
      <div className="flex gap-4 items-center">
        <label className="text-lg font-medium">Difficulty:</label>
        <select
          className="border p-2 rounded shadow-sm"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="Easy">Easy (9x9)</option>
          <option value="Medium">Medium (16x16)</option>
          <option value="Hard">Hard (32x16)</option>
        </select>
      </div>
      <GameBoard difficulty={difficulty} />
    </div>
  );
};

export default Home;
