/**
*
* Footer
*
*/

import React from 'react';
import CSSModules from 'react-css-modules';

import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import { Link } from 'react-router';

import styles from './styles.css';


function Footer () {
  return (
    <div styleName="footer">
      <div className="container">
        <div className="col-md-6">
          &copy; 2016 www.mydentalmarketplace.com all rights reserved
        </div>
        <div className="col-md-6 text-right">
          <Nav bsStyle="pills" pullRight>
            <NavItem styleName="nav-item">
              <Link to="/legal">Legal Information</Link>
            </NavItem>
            <NavItem styleName="nav-item">
              <Link to="/terms">Terms and Conditions</Link>
            </NavItem>
            <NavItem styleName="nav-item">
              <Link to="/faq">FAQ</Link>
            </NavItem>
            <NavItem styleName="nav-item">
              <Link to="/privacy">Privacy Policy</Link>
            </NavItem>
          </Nav>
        </div>
      </div>
    </div>
  );
}

export default CSSModules(styles, { allowMultiple: true })(Footer);
