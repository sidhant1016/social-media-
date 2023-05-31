import React from 'react';
import { Link } from 'react-router-dom';

import './Homepage.css';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to Snapgram</h1>
      <Link to="/register">
        <button className="registerButton">Register</button>
      </Link>
      <Link to= "/login">
      <button className="loginButton">Login</button>
      </Link>
    </div>
  );
};

export default HomePage;