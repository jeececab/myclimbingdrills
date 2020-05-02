import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import useGlobal from '../../store';

function PrivateRoute({ children, ...rest }) {
  const [globalState] = useGlobal();
  const { isAuthenticated } = globalState;

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
