import React from 'react';
import { Link, Routes } from 'react-router-dom';
import classNames from 'classnames';
import { Navbar, Nav } from 'react-bootstrap';
import RouteNavItem from '../RouteNavItem/RouteNavItem';

export class HeaderNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      click: false
    };
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    this.setState({
      click: !this.state.click
    });
  }

  render() {
    const display = classNames({
      'nav-mv': true,
      'display-block': this.state.click,
      'display-none': !this.state.click
    });

    const hamburgerClassName = classNames({
      'float-right': true,
      'mrg-48': true,
      'hamburger-icon': true
    });

    const backgroundClassName = classNames({
      'container-mv-nav': true,
      'hide-mv-view': true,
      'fill-color-white': !this.state.click
    });

    return (
      <header>
        <Navbar collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/home" className="logo-icon" />
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <RouteNavItem href="/order">ORDER</RouteNavItem>
              <RouteNavItem href="/cake">CAKE</RouteNavItem>
              <RouteNavItem href="/track">TRACK</RouteNavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
    );
  }
}

export default HeaderNav;
