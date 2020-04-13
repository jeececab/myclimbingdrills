import React from 'react';
import useGlobal from '../store';

const Homepage = () => {
  const [globalState] = useGlobal();
  const { authLoading } = globalState;

  return <>{authLoading ? <p>Loading...</p> : <h1>Homepage</h1>}</>;
};

export default Homepage;
