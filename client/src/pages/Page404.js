import React from 'react';
import useGlobal from '../store';

function Page404() {
  const [globalState] = useGlobal();
  const { authLoading } = globalState;

  return authLoading ? (
    <p>Loading...</p>
  ) : (
    <div className="container">
      <h1>404 - Not found...</h1>
    </div>
  );
}

export default Page404;
