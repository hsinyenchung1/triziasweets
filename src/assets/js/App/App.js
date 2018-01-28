import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import OrderPage from './Page/OrderPage';
import TrackPage from './Page/TrackPage';

export const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={OrderPage} />
      <Route path="/home" component={OrderPage} />
      <Route path="/order" component={OrderPage} />
      <Route path="/track" component={TrackPage} />
    </Switch>
  </Router>
);

export default App;
