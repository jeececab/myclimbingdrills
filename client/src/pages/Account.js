import React from 'react';
import useGlobal from '../store';
import AccountInfo from '../components/Account/AccountInfo';

const Account = () => {
  const [globalState] = useGlobal();
  const { isAuthenticated } = globalState;

  return (
    <>
      {isAuthenticated && (
        <div className="container">
          <AccountInfo />
        </div>
      )}
    </>
  );
};

export default Account;
