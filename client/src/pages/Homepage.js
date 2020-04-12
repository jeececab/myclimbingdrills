import React from 'react';
import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
    <>
      <h1>Homepage</h1>
      <Link to="/login">Login</Link>
      <Link to="/account">Account</Link>
    </>
  );
};

export default Homepage;
