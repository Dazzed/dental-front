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
import FaFacebook from 'react-icons/lib/fa/facebook-square';
import FaInstagram from 'react-icons/lib/fa/instagram';
import FaTwitter from 'react-icons/lib/fa/twitter-square';
import FaLinkedIn from 'react-icons/lib/fa/linkedin-square';
import FaYouTube from 'react-icons/lib/fa/youtube-square';
import { Link } from 'react-router';


// app
import logo from 'assets/images/logo-white-n-blue.png';

// local
import styles from './styles.css';


/*
Footer
================================================================================
*/
function Footer (props) {
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

      {props.showSocialLinks && (
        <ul styleName="social-links">
          <li>
            <a href="https://www.facebook.com/dentalhq/" target="_blank"><FaFacebook /></a>
          </li>
          <li>
            <a href="https://www.instagram.com/dentalhqofficial/" target="_blank"><FaInstagram /></a>
          </li>
          <li>
            <a href="https://twitter.com/Dental_HQ" target="_blank"><FaTwitter /></a>
          </li>
          <li>
            <a href="https://www.linkedin.com/company/11333322/" target="_blank"><FaLinkedIn /></a>
          </li>
          <li>
            <a href="https://www.youtube.com/channel/UCkY8VWfg9cSLap3hrG0Ccog" target="_blank"><FaYouTube /></a>
          </li>
        </ul>
      )}
    </div>
  );
}

export default CSSModules(styles, { allowMultiple: true })(Footer);
