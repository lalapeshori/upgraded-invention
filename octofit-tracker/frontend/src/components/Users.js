import React, { useState, useEffect } from 'react';

const API_BASE = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/users/`)
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load users. Make sure the backend is running.');
        setLoading(false);
      });
  }, []);

  const getFitnessLevelBadge = (level) => {
    const badges = {
      'beginner': 'bg-success',
      'intermediate': 'bg-warning text-dark',
      'advanced': 'bg-danger',
    };
    return badges[level] || 'bg-secondary';
  };

  if (loading) return <div className="text-center mt-5"><div className="spinner-border" role="status"></div></div>;
  if (error) return <div className="alert alert-warning mt-3">{error}</div>;

  return (
    <div>
      <h2 className="mb-4">👤 Athletes</h2>
      <p className="text-muted">Registered athletes at Mergington High School</p>
      <div className="row">
        {users.map((user, index) => (
          <div key={user._id || index} className="col-md-6 col-lg-4 mb-3">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{user.username}</h5>
                <p className="card-text text-muted">{user.email}</p>
                <p className="card-text">
                  <strong>Age:</strong> {user.age}<br />
                  <strong>Fitness Level:</strong>{' '}
                  <span className={`badge ${getFitnessLevelBadge(user.fitness_level)}`}>
                    {user.fitness_level}
                  </span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Users;
