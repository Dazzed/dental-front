import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';

import { Link } from 'react-router';
import { Nav } from 'react-bootstrap';

import styles from './styles.css';

const navItems = {
  client: [
    { text: 'Dashboard', link: '/dashboard' },
    { text: 'Edit payment information', link: '/temp_link' },
    { text: 'Manage family members', link: '/my-family-members' },
    { text: 'Transfer dental office', link: '/temp_link' },
    { text: 'Help & FAQ', link: '/temp_link' },
    { text: 'Cancel membership', link: '/temp_link' },
    { text: 'Logout', link: '/accounts/logout' },
  ],
  dentist: [
    { text: 'Dentist dashboard', link: '/dashboard' },
    { text: 'Edit office info', link: '/dentist/office/edit' },
    { text: 'Add new member', link: '/temp_link' },
    { text: 'Edit membership', link: '/custom-membership' },
    { text: 'Contact support', link: '/temp_link' },
    { text: 'Reports', link: '/temp_link' },
    { text: 'Logout', link: '/accounts/logout' },
  ]
};

function SideNav ({ userType }) {
  const items = navItems[userType] || [];

  return (
    <div styleName={`dental-sidenav ${userType}`} className="dental-sidenav">
      <Nav bsStyle="pills" stacked>
        {
          items.map((item, index) =>
            <li key={index} styleName="nav-item">
              <Link to={item.link} activeClassName="active">{item.text}</Link>
            </li>
          )
        }
      </Nav>
    </div>
  );
}

SideNav.propTypes = {
  userType: PropTypes.string,
};

export default CSSModules(styles, { allowMultiple: true })(SideNav);
