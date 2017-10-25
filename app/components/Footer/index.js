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

      {props.showDisclaimer && (
        <p styleName="disclaimer">
          DentalHQ is an innovative directory of dental offices offering In house Dental Membership Plans. Dental Membership plans ARE NOT DENTAL INSURANCE. The dental membership plan is a package of services that the dental offices have chosen to offer for the set prices listed. These plans are between you and your selected dentist and are active immediately upon payment with no waiting periods. Payments made through the DentalHQ signup process go directly to the dentist. You may cancel your membership for any reason after 90 days.
        </p>
      )}

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
