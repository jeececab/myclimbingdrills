import React from 'react';
import useGlobal from '../../store';
//import styles from './AccountInfo.module.css';

const AccountInfo = () => {
  const [globalState] = useGlobal();
  const { user } = globalState;

  return (
    <div className="content-container">
      <h1>Hello {user.name}</h1>
    </div>
  );
};

export default AccountInfo;
