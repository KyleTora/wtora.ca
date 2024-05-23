import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ComingSoonPage.css';

function ComingSoonPage() {
  return (
    <div className="coming-soon-container">
      <h1>Coming Soon</h1>
      <p>Stay tuned for updates!</p>
      <Link to="/" className="home-link">Go to Homepage</Link>
    </div>
  );
}

export default ComingSoonPage;
