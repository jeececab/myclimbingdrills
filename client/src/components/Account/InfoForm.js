import React from 'react';
import useGlobal from '../../store';
import style from './InfoForm.module.scss';

const InfoForm = () => {
  const [globalState, globalActions] = useGlobal();
  const { user } = globalState;

  function handleSubmit(e) {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const bio = e.target.bio.value;

    const update = { name, email, bio };
    globalActions.user.updateUserInfo(update);
  }

  return (
    <>
      <form onSubmit={handleSubmit} className={style.form}>
        <h2>Account info</h2>
        <p>
          <label>Username</label>
          <input name="name" type="text" defaultValue={user.name} />
        </p>
        <p>
          <label>Email</label>
          <input name="email" type="text" defaultValue={user.email} />
        </p>
        <p>
          <label>Bio</label>
          <textarea name="bio" style={{}} defaultValue={user.bio} />
        </p>
        <button className="btn btn-primary" type="submit">
          Save info
        </button>
      </form>
    </>
  );
};

export default InfoForm;
