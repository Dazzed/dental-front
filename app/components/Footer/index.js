/**
*
* Footer
*
*/

import React from 'react';
import CSSModules from 'react-css-modules';

import Nav from 'react-bootstrap/lib/Nav';
import { Link } from 'react-router';

import styles from './styles.css';


function Footer () {
  return (
    <div styleName="footer">
      <div className="container">
        <div className="col-md-5">
          &copy; Powered by DentalHQ.com 2016
        </div>
        <div className="col-md-7 text-right">
          <Nav bsStyle="pills" pullRight>
            <li>
              <Link to="/legal" activeClassName="active">
                Legal Information
              </Link>
            </li>
            <li>
              <Link to="/terms" activeClassName="active">
                Terms and Conditions
              </Link>
            </li>
            <li>
              <Link to="/faq" activeClassName="active">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/privacy" activeClassName="active">
                Privacy Policy
              </Link>
            </li>
          </Nav>
        </div>
      </div>
    </div>
  );
}

export default CSSModules(styles, { allowMultiple: true })(Footer);
