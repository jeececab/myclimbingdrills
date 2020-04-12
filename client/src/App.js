import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Homepage from './pages/Homepage';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path={'/'} render={() => <Homepage />} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
