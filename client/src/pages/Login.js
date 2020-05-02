import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useGlobal from '../store';
import LoginForm from '../components/Login/LoginForm';

function Login() {
  const [globalState] = useGlobal();
  const { isAuthenticated } = globalState;
  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated) history.replace({ pathname: '/account' });
  }, [isAuthenticated, history]);

  return (
    <div className="container">
      <LoginForm />
    </div>
  );
}

export default Login;
