import React, { useState, useEffect } from 'react';

const API_BASE = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/activities/`)
      .then(res => res.json())
      .then(data => {
        setActivities(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load activities. Make sure the backend is running.');
        setLoading(false);
      });
  }, []);

  const getActivityIcon = (type) => {
    const icons = {
      'running': '🏃',
      'walking': '🚶',
      'strength': '💪',
      'swimming': '🏊',
      'cycling': '🚴',
      'yoga': '🧘',
    };
    for (const [key, icon] of Object.entries(icons)) {
      if (type.toLowerCase().includes(key)) return icon;
    }
    return '🏋️';
  };

  if (loading) return <div className="text-center mt-5"><div className="spinner-border" role="status"></div></div>;
  if (error) return <div className="alert alert-warning mt-3">{error}</div>;

  return (
    <div>
      <h2 className="mb-4">🏃 Activities</h2>
      <p className="text-muted">Recent fitness activities logged by athletes</p>
      <div className="row">
        {activities.map((activity, index) => (
          <div key={activity._id || index} className="col-md-6 col-lg-4 mb-3">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">
                  {getActivityIcon(activity.activity_type)} {activity.activity_type}
                </h5>
                <p className="card-text">
                  <strong>Athlete:</strong> {activity.username}<br />
                  <strong>Duration:</strong> {activity.duration} minutes<br />
                  <strong>Date:</strong> {new Date(activity.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Activities;
