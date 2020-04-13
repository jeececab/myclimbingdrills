import React from 'react';
import { Link } from 'react-router-dom';
import useGlobal from '../store';

const Account = () => {
  const [globalState, globalActions] = useGlobal();
  const { authLoading, isAuthenticated, user } = globalState;

  return (
    <>
      {!authLoading && isAuthenticated && (
        <>
          <h1>Hello {user.name}</h1>
          <button onClick={globalActions.users.me}>Me!</button>
        </>
      )}

      {authLoading && <p>Loading...</p>}
    </>
  );
};

export default Account;
