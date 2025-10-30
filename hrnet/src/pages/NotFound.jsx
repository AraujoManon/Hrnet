import React from 'react';
import './NotFound.css';

function NotFound() {
  return (
    <div className="container not-found-container">
      <h1 className="not-found-title">404</h1>
      <h2 className="not-found-subtitle">Page Not Found</h2>
      <p className="not-found-message">
        The page you are looking for does not exist or has been moved.
      </p>
      <div className="not-found-button-container">
        <a href="/" className="not-found-button">
          Go back to Home
        </a>
      </div>
    </div>
  );
}

export default NotFound;