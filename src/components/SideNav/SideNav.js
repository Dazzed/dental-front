import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { Link } from 'react-router';
import { Nav } from 'react-bootstrap';

import './SideNav.scss';

const menuItems = {
  client: [
    { text: 'Dashboard', link: '/dashboard' },
    { text: 'Edit payment information', link: '/temp_link' },
    { text: 'Manage family members', link: '/temp_link' },
    { text: 'Transfer dental office', link: '/temp_link' },
    { text: 'Help & FAQ', link: '/temp_link' },
    { text: 'Cancel membership', link: '/temp_link' },
  ],
  dentist: [
    { text: 'Dentist dashboard', link: '/dashboard' },
    { text: 'Edit office info', link: '/temp_link' },
    { text: 'Add new member', link: '/temp_link' },
    { text: 'Custom membership', link: '/temp_link' },
    { text: 'Contact support', link: '/temp_link' },
    { text: 'Reports', link: '/temp_link' },
    { text: 'Marketing materials', link: '/temp_link' },
  ]
};

@connect(
  state => ({user: state.auth.user})
)
export default class SideNav extends Component {
  static propTypes = {
    user: PropTypes.object,
  }

  render() {
    const { user } = this.props;
    const items = menuItems[user.type] || [];

    return (user &&
      <div className={classNames('dental-sidenav', user.type)}>
        <Nav bsStyle="pills" stacked>
          {
            items.map((item, index) =>
              <li className="nav-item" key={index}>
                <Link to={item.link} activeClassName="active">{item.text}</Link>
              </li>
            )
          }
        </Nav>
      </div>
    );
  }
}
