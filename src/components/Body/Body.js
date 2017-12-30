import React from 'react';
import  {BrowserRouter as Router, Route, Link, NavLink, Switch} from 'react-router-dom';
import { OrderForm } from "./OrderForm/OrderForm";
import { OrderDashBoard } from "./OrderDashBoard/OrderDashBoard";

export class Body extends React.Component{
	  render() {
	    return (
	        <div className="body">
	              <Switch>
	                <Route exact path="/" component={OrderForm}/>
	                <Route path="/order" component={OrderForm}/>
	                <Route path="/track" component={OrderDashBoard}/>
	              </Switch>
            </div>
	    );
	}
}