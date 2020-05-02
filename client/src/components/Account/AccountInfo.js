import React from 'react';
import useGlobal from '../../store';
import { useHistory } from 'react-router-dom';
import Avatar from './Avatar';
import InfoForm from './InfoForm';
import ChangePasswordForm from './ChangePasswordForm';
import styles from './AccountInfo.module.css';

const AccountInfo = () => {
  const [globalState, globalActions] = useGlobal();
  const { user } = globalState;
  const history = useHistory();

  function deleteAccount() {
    globalActions.user.deleteAccount(history);
  }

  return (
    <div className="content-container">
      <div className={styles.top}>
        <Avatar />
        <h1>{user.name}</h1>
      </div>
      <InfoForm />
      <ChangePasswordForm />
      <button onClick={deleteAccount} className="btn btn-primary--outline btn-center">
        Delete account
      </button>
    </div>
  );
};

export default AccountInfo;
