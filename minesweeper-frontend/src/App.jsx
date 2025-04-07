import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Leaderboard from './pages/Leaderboard';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <nav className="bg-gray-800 text-white px-6 py-3 flex justify-between">
          <h1 className="text-xl font-bold">🧨 Minesweeper</h1>
          <div className="flex gap-4">
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/leaderboard" className="hover:underline">Leaderboard</Link>
          </div>
        </nav>

        <main className="flex-grow p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
