import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useGlobal from '../store';
import SignupForm from '../components/Signup/SignupForm';

function Signup() {
  const [globalState] = useGlobal();
  const { authLoading, isAuthenticated } = globalState;
  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated) history.replace({ pathname: '/account' });
  }, [isAuthenticated, history]);

  return <>{authLoading ? <p>Loading...</p> : <SignupForm />}</>;
}

export default Signup;
