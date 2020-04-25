import React from 'react';
import useGlobal from '../store';

function Page404() {
  const [globalState] = useGlobal();
  const { authLoading } = globalState;

  return authLoading ? <p>Loading...</p> : <h1>404 - Not found...</h1>;
}

export default Page404;
