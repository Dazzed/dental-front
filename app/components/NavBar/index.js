/**
*
* NavBar
*
*/

import React from 'react';
import CSSModules from 'react-css-modules';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Navbar, Nav, NavItem, Image } from 'react-bootstrap';

import styles from './styles.css';
import logo from 'assets/images/dental-logo.png';

@CSSModules(styles, { allowMultiple: true })

class NavBar extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.goToLogin = this.goToLogin.bind(this);
    this.goToSignUp = this.goToSignUp.bind(this);
  }

  goToLogin() {
    this.props.changeRoute('/login');
  }

  goToSignUp() {
    this.props.changeRoute('/signup');
  }

  render() {
    return (
      <Navbar fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">
              <Image src={logo} />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>

        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem>
              <button className="btn-green btn-round" onClick={this.goToLogin}>Log In</button>
            </NavItem>
            <NavItem>
              <button className="btn-cyan btn-round" onClick={this.goToSignUp}>Dentist Portal</button>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

NavBar.propTypes = {
  changeRoute: React.PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    changeRoute: (url) => dispatch(push(url)),
  };
}

export default connect(null, mapDispatchToProps)(NavBar);
