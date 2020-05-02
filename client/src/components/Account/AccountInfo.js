import React from 'react';
import useGlobal from '../../store';
import Avatar from './Avatar';
import InfoForm from './InfoForm';
//import styles from './AccountInfo.module.css';

const AccountInfo = () => {
  const [globalState] = useGlobal();
  const { user } = globalState;

  return (
    <div className="content-container">
      <h1>{user.name}</h1>
      <Avatar />
      <InfoForm />
      {/* InfoForm */}
      {/* ChangePasswordForm */}
      {/* DeleteAccount */}
    </div>
  );
};

export default AccountInfo;
