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
      <div className="row">

        <div className="col-md-3">
          <div styleName="powered-by">
            Powered By
            <img src={logo} alt="DentalHQ" styleName="powered-by--logo" />
          </div>
        </div>

        <div className="col-md-6">
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

        <div className="col-md-3">
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

      </div>

      {props.showDisclaimer && (
        <p styleName="disclaimer">
          ***DentalHQ is an innovative directory of participating dental offices that offer In-House Dental Membership Plans. Dental Membership Plans are NOT DENTAL INSURANCE. A Dental Membership Plan is a package of services that the dental office offers for the prices listed. The Dental Membership Plans on the DentalHQ directory are between you and your selected dentist, and are active immediately upon payment with no waiting period. Payments made using the DentalHQ platform go directly to the dental office. You may cancel your Dental Membership Plan for any reason after 90 days. You may cancel your Dental Membership Plan for a full refund before 90 days by contacting your dentist, however, payment in full for any services utilized must be made directly to your dentist before your Dental Membership Plan can be canceled.***
        </p>
      )}

    </div>
  );
}

export default CSSModules(styles, { allowMultiple: true })(Footer);
