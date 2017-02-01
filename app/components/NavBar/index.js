/**
*
* NavBar
*
*/

import React from 'react';
import CSSModules from 'react-css-modules';
// import { Link } from 'react-router';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Navbar from 'react-bootstrap/lib/Navbar';
// import Image from 'react-bootstrap/lib/Image';

import AnonymousHeaderNav from 'components/AnonymousHeaderNav';
import LoggedInHeaderNav from 'components/LoggedInHeaderNav';
// import logo from 'assets/images/logo.png';
// import logo from 'assets/images/wells-family-dentistry-logo.png';
import { selectCurrentUser } from 'containers/App/selectors';

import styles from './styles.css';


@connect(mapStateToProps, mapDispatchToProps)
@CSSModules(styles, { allowMultiple: true })
export default class NavBar extends React.Component {

  static propTypes = {
    changeRoute: React.PropTypes.func,
    loggedInUser: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.bool
    ]),
  };

  goToLogin = () => {
    this.props.changeRoute('/accounts/login');
  }

  goToSignUp = () => {
    this.props.changeRoute('/accounts/signup');
  }

  render () {
    const { firstName, lastName, avatar } = this.props.loggedInUser;
    const fullName = `${firstName} ${lastName}`;

    return (
      <Navbar fixedTop styleName="navbar">
        <Navbar.Header>
          <Navbar.Brand>
            {/*
              * - In the future, if a patient/dentist is logged in
              *   we would show respective logo.
              * - Removed for now
              <Link to="/">
                <Image src={logo} style={{ width: 200 }} />
              </Link>
            */}
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>

        {this.props.loggedInUser ?
          <LoggedInHeaderNav
            fullName={fullName} avatar={avatar}
          /> :
          <AnonymousHeaderNav
            goToLogin={this.goToLogin}
            goToSignUp={this.goToSignUp}
          />}
      </Navbar>
    );
  }
}


function mapStateToProps (state) {
  return {
    loggedInUser: selectCurrentUser(state),
  };
}


function mapDispatchToProps (dispatch) {
  return {
    changeRoute: (url) => dispatch(push(url)),
  };
}
