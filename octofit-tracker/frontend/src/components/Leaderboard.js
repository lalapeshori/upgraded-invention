import React, { useState, useEffect } from 'react';

const API_BASE = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/leaderboard/`)
      .then(res => res.json())
      .then(data => {
        setLeaderboard(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load leaderboard. Make sure the backend is running.');
        setLoading(false);
      });
  }, []);

  const getRankClass = (index) => {
    if (index === 0) return 'table-warning';
    if (index === 1) return 'table-secondary';
    if (index === 2) return 'table-danger';
    return '';
  };

  const getRankEmoji = (index) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return index + 1;
  };

  if (loading) return <div className="text-center mt-5"><div className="spinner-border" role="status"></div></div>;
  if (error) return <div className="alert alert-warning mt-3">{error}</div>;

  return (
    <div>
      <h2 className="mb-4">🏆 Leaderboard</h2>
      <p className="text-muted">Top athletes at Mergington High School</p>
      <div className="card">
        <div className="card-body p-0">
          <table className="table table-hover mb-0">
            <thead className="table-dark">
              <tr>
                <th>Rank</th>
                <th>Athlete</th>
                <th>Score</th>
                <th>Progress</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, index) => (
                <tr key={entry._id || index} className={getRankClass(index)}>
                  <td className="fw-bold">{getRankEmoji(index)}</td>
                  <td className="fw-semibold">{entry.username}</td>
                  <td><span className="badge bg-primary fs-6">{entry.score}</span></td>
                  <td>
                    <div className="progress" style={{ height: '20px' }}>
                      <div
                        className="progress-bar bg-success"
                        style={{ width: `${(entry.score / 1000) * 100}%` }}
                      >
                        {Math.round((entry.score / 1000) * 100)}%
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
