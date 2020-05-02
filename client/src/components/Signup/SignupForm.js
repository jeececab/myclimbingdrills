import React from 'react';
import { useHistory } from 'react-router-dom';
import useGlobal from '../../store';
import styles from './SignupForm.module.css';

function SignupForm() {
  const [, globalActions] = useGlobal();
  const history = useHistory();

  const handleSubmit = async e => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const status = await globalActions.users.signup(name, email, password);

    if (status === 'SUCCESS') history.replace({ pathname: '/account' });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input name="name" type="text" placeholder="Username" required />
      <input name="email" type="email" placeholder="Email address" required />
      <input name="password" type="password" placeholder="Password" required />
      <input name="password-confirm" type="password" placeholder="Confirm password" required />
      <button className="btn btn-primary" type="submit">Submit</button>
    </form>
  );
}

export default SignupForm;
