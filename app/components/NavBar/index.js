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

import logo from 'assets/images/dental-logo.png';
import styles from './styles.css';


@connect(null, mapDispatchToProps)
@CSSModules(styles, { allowMultiple: true })
class NavBar extends React.Component {

  static propTypes = {
    changeRoute: React.PropTypes.func,
  };

  constructor (props) {
    super(props);
    this.goToLogin = this.goToLogin.bind(this);
    this.goToSignUp = this.goToSignUp.bind(this);
  }

  goToLogin () {
    this.props.changeRoute('/accounts/login');
  }

  goToSignUp () {
    this.props.changeRoute('/signup');
  }

  render () {
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
              <button
                className="btn-green btn-round"
                onClick={this.goToLogin}
              >
                Log In
              </button>
            </NavItem>
            <NavItem>
              <button
                className="btn-cyan btn-round"
                onClick={this.goToSignUp}
              >
                Sign Up
              </button>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}


function mapDispatchToProps (dispatch) {
  return {
    changeRoute: (url) => dispatch(push(url)),
  };
}

export default NavBar;
