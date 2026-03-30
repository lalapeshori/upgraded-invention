import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navigation() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'nav-link active' : 'nav-link';
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src="/octofitapp-small.png" alt="OctoFit" height="40" className="me-2"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <span>OctoFit Tracker</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className={isActive('/leaderboard')} to="/leaderboard">🏆 Leaderboard</Link>
            </li>
            <li className="nav-item">
              <Link className={isActive('/activities')} to="/activities">🏃 Activities</Link>
            </li>
            <li className="nav-item">
              <Link className={isActive('/workouts')} to="/workouts">💪 Workouts</Link>
            </li>
            <li className="nav-item">
              <Link className={isActive('/teams')} to="/teams">👥 Teams</Link>
            </li>
            <li className="nav-item">
              <Link className={isActive('/users')} to="/users">👤 Users</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
