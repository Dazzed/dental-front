/**
*
* Footer
*
*/

import React from 'react';
import CSSModules from 'react-css-modules';

import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';

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
            <NavItem
              styleName="nav-item"
              href="/legal"
            >
              Legal Information
            </NavItem>
            <NavItem
              styleName="nav-item"
              href="/tos"
            >
              Terms of Service
            </NavItem>
            <NavItem
              styleName="nav-item"
              href="/privacy"
            >
              Privacy Policy
            </NavItem>
          </Nav>
        </div>
      </div>
    </div>
  );
}

export default CSSModules(styles, { allowMultiple: true })(Footer);
