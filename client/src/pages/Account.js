import React from 'react';
import useGlobal from '../store';

const Account = () => {
  const [globalState] = useGlobal();
  const { authLoading, isAuthenticated, user } = globalState;

  return (
    <>
      {!authLoading && isAuthenticated && <h1>Hello {user.name}</h1>}

      {authLoading && <p>Loading...</p>}
    </>
  );
};

export default Account;
