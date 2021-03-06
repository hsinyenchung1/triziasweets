import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { Footer } from './containers/Footer/Footer';
import RouteNavItem from './components/RouteNavItem/RouteNavItem';
import Routes from './Routes/Routes';


export const App = () => (

  <div>
    <Navbar collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/home" href="/" className="logo-icon" />
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullRight>
          <RouteNavItem href="/order">Order</RouteNavItem>
          <RouteNavItem href="/gallery">Gallery</RouteNavItem>
          <RouteNavItem href="/track">Track</RouteNavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    <Routes />
    <Footer />
  </div>
);

export default withRouter(App);
