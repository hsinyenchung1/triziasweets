import React from 'react';
import  {BrowserRouter as Router, Route, Link, NavLink, Switch} from 'react-router-dom';
import { connect } from 'react-redux'
import {Footer} from './Footer/Footer';
import {Header} from "./Header/Header";
import {Body} from "./Body/Body";
import Test from './Header/test';

// Main Component
export class App extends React.Component{
  render() {
   
    return (
      <Router>
        <div>
            <Header />
            <Body />
            <Footer />
        </div>
      </Router>
      
    );
  }
}

