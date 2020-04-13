import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import useGlobal from './store';
import Header from './components/Layout/Header';
import PrivateRoute from './components/PrivateRoute';
import Homepage from './pages/Homepage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Account from './pages/Account';
import Page404 from './pages/Page404';

const App = () => {
  const [globalState, globalActions] = useGlobal();
  const { authLoading, isAuthenticated } = globalState;

  useEffect(() => {
    async function initUser() {
      await globalActions.users.me();
    }

    if (!isAuthenticated) initUser();
  }, [isAuthenticated, globalActions.users]);

  return (
    <div className="App">
      {authLoading ? (
        <p>Loading...</p>
      ) : (
        <BrowserRouter>
          <Header />

          <Switch>
            <Route exact path={'/'}>
              <Homepage />
            </Route>
            <Route exact path={'/signup'}>
              <Signup />
            </Route>
            <Route exact path={'/login'}>
              <Login />
            </Route>
            <PrivateRoute path="/account">
              <Account />
            </PrivateRoute>
            <Route component={Page404} />
          </Switch>
        </BrowserRouter>
      )}
    </div>
  );
};

export default App;
