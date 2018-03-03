import React from 'react';
import { Route, Switch } from 'react-router-dom';
import OrderPage from '../Page/OrderPage';
import CakeMenuPage from '../Page/CakeMenuPage';
import TrackPage from '../Page/TrackPage';

export default () =>
  (<Switch>
    <Route exact path="/" component={OrderPage} />
    <Route path="/home" component={OrderPage} />
    <Route path="/order" component={OrderPage} />
    <Route path="/cake" component={OrderPage} />
    <Route path="/track" component={TrackPage} />
   </Switch>);
