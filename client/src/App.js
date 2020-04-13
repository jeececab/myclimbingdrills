import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Layout/Header';
import PrivateRoute from './components/PrivateRoute';
import Homepage from './pages/Homepage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Account from './pages/Account';

const App = () => {
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
    </div>
  );
};

export default App;
