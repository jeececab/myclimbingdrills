import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import useGlobal from '../store';

function Login() {
  const [globalState, globalActions] = useGlobal();
  const { authLoadingStatus, isAuthenticated } = globalState;
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: '/' } };

  useEffect(() => {
    if (isAuthenticated) history.replace({ pathname: '/account' });
  }, [isAuthenticated, history]);

  const handleSubmit = async e => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const a = await globalActions.auth.login(email, password);

    if (a === 'SUCCESS') {
      history.replace(from);
    }
  };

  return (
    <>
      {authLoadingStatus === 'INITIAL' && (
        <form onSubmit={handleSubmit}>
          <input name="email" type="email" placeholder="Email address" required />
          <input name="password" type="password" placeholder="Password" required />
          <button type="submit">Submit</button>
        </form>
      )}

      {authLoadingStatus === 'LOADING' && <p>Loading...</p>}
    </>
  );
}

export default Login;
