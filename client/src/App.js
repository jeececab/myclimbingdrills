import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import useGlobal from './store';
import { getCookie } from './helpers/cookies';
import Header from './components/Layout/Header';
import PrivateRoute from './components/PrivateRoute';
import Homepage from './pages/Homepage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Account from './pages/Account';

const App = () => {
  const [globalState, globalActions] = useGlobal();
  const { token } = globalState;

  /* useEffect(() => {
    async function getToken() {
      const status = await globalActions.users.getToken();
      if (status === 'SUCCESS') {
        console.log(getCookie('auth_token'))
      }
    }

    if (!token) getToken();
  }, [token, globalActions.users]); */

  return (
    <div className="App">
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
        </Switch>
      </BrowserRouter>

      <button onClick={globalActions.users.me}>YO</button>
    </div>
  );
};

export default App;
