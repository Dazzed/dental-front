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

import styles from './styles.css';


function LoggedInHeaderNav ({ fullName, avatar }) {
  return (
    <Navbar.Collapse>
      <Image className="pull-right" src={avatar} styleName="avatar" circle />
      <ul className="nav navbar-nav navbar-right" styleName="nav">
        <li role="presentation">
          <span>
            <Link to="#" role="button">Notifications </Link>
            <i className="glyphicon glyphicon-th-list" />
          </span>
        </li>
        <li role="presentation">
          <span>Welcome <Link to="/">{fullName}</Link></span>
        </li>
      </ul>
    </Navbar.Collapse>
  );
}

LoggedInHeaderNav.propTypes = {
  fullName: React.PropTypes.string,
  avatar: React.PropTypes.string,
};


export default CSSModules(styles, { allowMultiple: true })(LoggedInHeaderNav);
