import React from 'react';
import { Route, Switch } from 'react-router-dom';
import OrderPage from '../Page/OrderPage';
import CakeMenuPage from '../Page/CakeMenuPage';
import TrackPage from '../Page/TrackPage';
import CakePage from '../Page/CakePage';

export default () =>
  (<Switch>
    <Route exact path="/" component={OrderPage} />
    <Route path="/home" component={OrderPage} />
    <Route path="/order" component={OrderPage} />
    <Route path="/gallery" component={CakePage} />
    <Route path="/track" component={TrackPage} />
   </Switch>);
