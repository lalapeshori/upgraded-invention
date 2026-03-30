import React, { useState, useEffect } from 'react';

const API_BASE = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/workouts/`)
      .then(res => res.json())
      .then(data => {
        setWorkouts(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load workouts. Make sure the backend is running.');
        setLoading(false);
      });
  }, []);

  const getIntensityBadge = (intensity) => {
    const badges = {
      'low': 'bg-success',
      'medium': 'bg-warning text-dark',
      'high': 'bg-danger',
    };
    return badges[intensity] || 'bg-secondary';
  };

  if (loading) return <div className="text-center mt-5"><div className="spinner-border" role="status"></div></div>;
  if (error) return <div className="alert alert-warning mt-3">{error}</div>;

  return (
    <div>
      <h2 className="mb-4">💪 Workouts</h2>
      <p className="text-muted">Personalized workout suggestions for Mergington High School athletes</p>
      <div className="row">
        {workouts.map((workout, index) => (
          <div key={workout._id || index} className="col-md-6 mb-4">
            <div className="card h-100">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">{workout.name}</h5>
                <span className={`badge ${getIntensityBadge(workout.intensity)}`}>
                  {workout.intensity}
                </span>
              </div>
              <div className="card-body">
                <p className="card-text">{workout.description}</p>
                <p className="text-muted">
                  <strong>⏱️ Duration:</strong> {workout.duration} minutes
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Workouts;
