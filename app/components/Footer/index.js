/*
Footer Component
================================================================================
*/

/*
Imports
------------------------------------------------------------
*/
// libs
import React from 'react';
import CSSModules from 'react-css-modules';
import { Link } from 'react-router';

// app
import logo from 'assets/images/logo-white-n-blue.png';

// local
import styles from './styles.css';


/*
Footer
================================================================================
*/
function Footer () {
  return (
    <div styleName="footer">
      <div styleName="powered-by">
        Powered By
        <img src={logo} alt="DentalHQ" styleName="powered-by--logo" />
      </div>

      <ul styleName="footer__nav">
        <li>
          <Link to="/faq">FAQ's</Link>
        </li>

        <li>
          <Link to="/terms">Terms of Service</Link>
        </li>

        <li>
          <Link to="/privacy">Privacy Policy</Link>
        </li>
      </ul>
    </div>
  );
}

export default CSSModules(styles, { allowMultiple: true })(Footer);
