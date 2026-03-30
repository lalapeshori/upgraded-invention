import React, { useState, useEffect } from 'react';

const API_BASE = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/teams/`)
      .then(res => res.json())
      .then(data => {
        setTeams(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load teams. Make sure the backend is running.');
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center mt-5"><div className="spinner-border" role="status"></div></div>;
  if (error) return <div className="alert alert-warning mt-3">{error}</div>;

  return (
    <div>
      <h2 className="mb-4">👥 Teams</h2>
      <p className="text-muted">Compete together in friendly fitness challenges</p>
      <div className="row">
        {teams.map((team, index) => (
          <div key={team._id || index} className="col-md-6 mb-4">
            <div className="card h-100">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">{team.name}</h5>
              </div>
              <div className="card-body">
                <h6>Team Members:</h6>
                <div className="d-flex flex-wrap gap-2">
                  {(team.members || []).map((member, mIndex) => (
                    <span key={mIndex} className="badge bg-secondary fs-6">
                      {member}
                    </span>
                  ))}
                </div>
                <p className="mt-3 text-muted">
                  <strong>Team Size:</strong> {(team.members || []).length} members
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Teams;
