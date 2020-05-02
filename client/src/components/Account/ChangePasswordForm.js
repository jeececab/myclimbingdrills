import React, { useRef } from 'react';
import useGlobal from '../../store';
import style from './ChangePasswordForm.module.scss';

const ChangePasswordForm = () => {
  const [, globalActions] = useGlobal();
  const oldInput = useRef(null);
  const newInput = useRef(null);
  const confirmNewInput = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    const oldPassword = e.target.old.value;
    const newPassword = e.target.new.value;
    const confirmPassword = e.target.confirm_new.value;

    if (newPassword !== confirmPassword) {
      globalActions.ui.showMessage("Confirmed password doesn't match");
    } else {
      const update = { oldPassword, password: newPassword };
      globalActions.user.updateUserInfo(update);
    }

    oldInput.current.value = '';
    newInput.current.value = '';
    confirmNewInput.current.value = '';
  }

  return (
    <>
      <form onSubmit={handleSubmit} className={style.form}>
        <h2>Change password</h2>
        <p>
          <label>Old password</label>
          <input ref={newInput} name="old" type="password" required />
        </p>
        <p>
          <label>New password</label>
          <input ref={oldInput} name="new" type="password" required />
        </p>
        <p>
          <label>Confirm new password</label>
          <input ref={confirmNewInput} name="confirm_new" type="password" required />
        </p>
        <button className="btn btn-primary" type="submit">
          Save new password
        </button>
      </form>
    </>
  );
};

export default ChangePasswordForm;
