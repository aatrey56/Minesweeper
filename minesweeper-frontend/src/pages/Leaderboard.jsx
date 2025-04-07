import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [data, setData] = useState([]);
  const [difficulty, setDifficulty] = useState('Easy');

  useEffect(() => {
    fetch(`/api/games/leaderboard/${difficulty}`)
      .then(res => res.json())
      .then(json => {
        if (Array.isArray(json)) {
          setData(json);
        } else {
          console.error("Expected array but got:", json);
          setData([]);
        }
      })
      .catch(err => {
        console.error("Failed to load leaderboard:", err);
        setData([]);
      });
  }, [difficulty]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Leaderboard - {difficulty}</h2>
      
      <select
        onChange={e => setDifficulty(e.target.value)}
        value={difficulty}
        className="mb-4 border p-2 rounded"
      >
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>

      <ul className="space-y-2">
        {Array.isArray(data) && data.length > 0 ? (
          data.map((entry, i) => (
            <li key={entry.id || i} className="bg-white shadow-md p-2 rounded">
              #{i + 1} - Time: {entry.time}s -{' '}
              {entry.completedAt
                ? new Date(entry.completedAt).toLocaleString()
                : 'Unknown date'}
            </li>
          ))
        ) : (
          <li className="text-gray-500 italic">No leaderboard data available.</li>
        )}
      </ul>
    </div>
  );
};

export default Leaderboard;
