import React from 'react';
import useGlobal from '../store';
import Calendar from '../components/Calendar/Calendar'

const Account = () => {
  const [globalState] = useGlobal();
  const { authLoading, isAuthenticated, user } = globalState;

  return (
    <>
      {!authLoading && isAuthenticated && (
        <div className="container">
          <h1>Hello {user.name}</h1>
          <Calendar />
        </div>
      )}

      {authLoading && <p>Loading...</p>}
    </>
  );
};

export default Account;
