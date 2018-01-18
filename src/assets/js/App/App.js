import React from 'react';
import  {BrowserRouter as Router, Route, Link, NavLink, Switch} from 'react-router-dom';
import OrderPage from './Page/OrderPage';
import TrackPage from './Page/TrackPage';

export class App extends React.Component{
  render() {
   
    return (
      <Router>
      	<Switch>
    			<Route exact path="/" component={OrderPage}/>
    			<Route path="/home" component={OrderPage}/>
    			<Route path="/order" component={OrderPage}/>
    			<Route path="/track" component={TrackPage}/>
	     </Switch>
      </Router>
    );
  }
}
