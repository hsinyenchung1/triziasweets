import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

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
        <div className="container-nav hide-dt-view">
          <div alt="logo" className="logo logo-icon" />
          <nav>
            <ul>
              <li><NavLink to="/home">HOME</NavLink></li>
              <li><NavLink to="/order">CAKE</NavLink></li>
              <li><NavLink to="/order">ORDER</NavLink></li>
              <li><NavLink to="/track">TRACK</NavLink></li>
            </ul>
          </nav>
        </div>

        <div className={backgroundClassName}>
          <div>
            <div alt="logo" className="logo logo-icon mrg-16" />
            <div
              role="button"
              tabIndex={0}
              onClick={this.clickHandler.bind(this)}
              onKeyPress={this.clickHandler}
              alt="hamburger"
              className={hamburgerClassName}
            />
          </div>
          <div className="">
            <nav className={display}>
              <ul>
                <li><NavLink to="/home">HOME</NavLink></li>
                <li><NavLink to="/order">CAKE</NavLink></li>
                <li><NavLink to="/order">ORDER</NavLink></li>
                <li><NavLink to="/track">TRACK</NavLink></li>
              </ul>
            </nav>
          </div>

        </div>
      </header>
    );
  }
}

export default HeaderNav;
