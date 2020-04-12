import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Account from './pages/Account';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path={'/'}>
            <Homepage />
          </Route>
          <Route exact path={'/login'}>
            <Login />
          </Route>
          <PrivateRoute path="/account">
            <Account />
          </PrivateRoute>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
