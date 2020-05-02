import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import useGlobal from '../../store';
import styles from './LoginForm.module.css';

function LoginForm() {
  const [, globalActions] = useGlobal();
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: '/' } };

  const handleSubmit = async e => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const status = await globalActions.user.login(email, password);

    if (status === 'SUCCESS') {
      history.replace(from);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input name="email" type="email" placeholder="Email address" required />
      <input name="password" type="password" placeholder="Password" required />
      <button className="btn btn-primary" type="submit">Submit</button>
    </form>
  );
}

export default LoginForm;
