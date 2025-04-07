export const submitGameResult = async (difficulty, time) => {
    const payload = {
      difficulty,
      time,
      completedAt: new Date().toISOString(),
    };
  
    try {
      const res = await fetch('/api/games', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      if (!res.ok) {
        throw new Error('Failed to submit game result');
      }
  
      return await res.json();
    } catch (err) {
      console.error(err);
      return null;
    }
  };
  