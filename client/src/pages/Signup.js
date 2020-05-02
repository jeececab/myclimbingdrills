import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useGlobal from '../store';
import SignupForm from '../components/Signup/SignupForm';

function Signup() {
  const [globalState] = useGlobal();
  const { isAuthenticated } = globalState;
  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated) history.replace({ pathname: '/account' });
  }, [isAuthenticated, history]);

  return (
    <div className="container">
      <SignupForm />
    </div>
  );
}

export default Signup;
