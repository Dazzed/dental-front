/*
Anonymous Header Nav Component
================================================================================
*/

/*
Import
------------------------------------------------------------
*/
// lib
import React from 'react';
import Nav from 'react-bootstrap/lib/Nav';
import Navbar from 'react-bootstrap/lib/Navbar';
import NavItem from 'react-bootstrap/lib/NavItem';
import CSSModules from 'react-css-modules';

// app
import styles from 'components/NavBar/styles.css';


/*
Anonymous Header Nav
================================================================================
*/
function AnonymousHeaderNav ({ goToLogin }) {
  return (
    <a href="#" onClick={goToLogin} styleName="navbar__text">Login</a>
  );
}

/*
Props
------------------------------------------------------------
*/
AnonymousHeaderNav.propTypes = {
  goToLogin: React.PropTypes.func.isRequired,
};

export default CSSModules(styles, { allowMultiple: true })(AnonymousHeaderNav);
