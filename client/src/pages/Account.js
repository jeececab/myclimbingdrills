import React from 'react';
import useGlobal from '../store';
import AccountInfo from '../components/Account/AccountInfo';
import Avatar from '../components/Account/Avatar';

const Account = () => {
  const [globalState] = useGlobal();
  const { authLoading, isAuthenticated } = globalState;

  return (
    <>
      {!authLoading && isAuthenticated && (
        <div className="container">
          <AccountInfo />
          <Avatar />
        </div>
      )}

      {authLoading && <p>Loading...</p>}
    </>
  );
};

export default Account;
