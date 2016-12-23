/**
*
* LoggedInHeaderNav
*
*/

import React from 'react';
import CSSModules from 'react-css-modules';
import { Link } from 'react-router';

import Navbar from 'react-bootstrap/lib/Navbar';
import Image from 'react-bootstrap/lib/Image';
import FaListUl from 'react-icons/lib/fa/list-ul';

import styles from './styles.css';


function LoggedInHeaderNav ({ fullName, avatar }) {
  // temporary default face icon for now
  const avatarURL = avatar ?
    avatar.location : 'http://www.teenink.com/images/default_face.gif';

  return (
    <Navbar.Collapse>
      <Link to="/accounts/profile">
        <Image
          className="pull-right"
          src={avatarURL}
          styleName="avatar"
          circle
        />
      </Link>
      <ul className="nav navbar-nav navbar-right" styleName="nav">
        <li role="presentation">
          <span>
            <Link to="#" role="button">Notifications </Link>
            <FaListUl size={16} />
          </span>
        </li>
        <li role="presentation">
          <span>Welcome <Link to="/accounts/profile">{fullName}</Link></span>
        </li>
      </ul>
    </Navbar.Collapse>
  );
}

LoggedInHeaderNav.propTypes = {
  fullName: React.PropTypes.string,
  avatar: React.PropTypes.shape([
  ]),
};


export default CSSModules(styles, { allowMultiple: true })(LoggedInHeaderNav);
