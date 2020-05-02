import React from 'react';
import style from './InfoForm.module.css';

const InfoForm = () => {
  return (
    <>
      <form className={style.form}>
        <h2>Account info</h2>
        <p>
          <label>Username</label>
          <input type="text" />
        </p>
        <p>
          <label>Email</label>
          <input type="text" />
        </p>
        <p>
          <label>Bio</label>
          <textarea style={{}} />
        </p>
        <button className="btn btn-primary" type="submit">
          Save changes
        </button>
      </form>
    </>
  );
};

export default InfoForm;
