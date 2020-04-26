import React from 'react';
import useGlobal from '../store';
import Hero from '../components/Homepage/Hero';

const Homepage = () => {
  const [globalState] = useGlobal();
  const { authLoading } = globalState;

  return authLoading ? (
    <p>Loading...</p>
  ) : (
    <div className="container">
      <Hero />
    </div>
  );
};

export default Homepage;
