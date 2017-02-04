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
import { Link } from 'react-router';

// app
import styles from 'components/NavBar/styles.css';


/*
Anonymous Header Nav
================================================================================
*/
function AnonymousHeaderNav () {
  return (
    <Link to="/accounts/login" styleName="navbar__text">Login</Link>
  );
}

export default CSSModules(styles, { allowMultiple: true })(AnonymousHeaderNav);
