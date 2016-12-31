/**
*
* AnonymousHeaderNav
*
*/

import React from 'react';
import CSSModules from 'react-css-modules';

import Nav from 'react-bootstrap/lib/Nav';
import Navbar from 'react-bootstrap/lib/Navbar';
import NavItem from 'react-bootstrap/lib/NavItem';

import styles from './styles.css';


function AnonymousHeaderNav ({ goToLogin }) {
  return (
    <Navbar.Collapse>
      <Nav pullRight styleName="nav">
        <NavItem>
          <button
            className="btn btn-padding btn-green btn-round"
            onClick={goToLogin}
          >
            Log In
          </button>
        </NavItem>
      </Nav>
    </Navbar.Collapse>
  );
}

AnonymousHeaderNav.propTypes = {
  goToLogin: React.PropTypes.func.isRequired,
};

export default CSSModules(styles, { allowMultiple: true })(AnonymousHeaderNav);
