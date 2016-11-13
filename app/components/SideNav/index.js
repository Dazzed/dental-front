import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';

import { Link } from 'react-router';
import { Nav, Row, Col } from 'react-bootstrap';

import styles from './styles.css';

const navItems = {
  client: [
    { text: 'Dashboard', link: '/dashboard' },
    { text: 'Edit your info', link: '/accounts/profile' },
    // { text: 'Payment info', link: '/subscribe' },
    // { text: 'Manage family members', link: '/my-family-members' },
    // { text: 'Transfer dental office', link: '/temp_link' },
    { text: 'Help & FAQ', link: '/temp_link' },
    // { text: 'Cancel membership', link: '/temp_link' },
    { text: 'Logout', link: '/accounts/logout' },
  ],
  dentist: [
    { text: 'Dentist dashboard', link: '/dashboard' },
    // { text: 'Edit your info', link: '/accounts/profile' },
    { text: 'Edit office info', link: '/dentist/office/edit' },
    { text: 'Manage members', link: '/dentist/family-members' },
    // { text: 'Edit membership', link: '/custom-membership' },
    { text: 'Contact support', link: '/dentist/contact-support' },
    // { text: 'Reports', link: '/temp_link' },
    { text: 'Logout', link: '/accounts/logout' },
  ]
};

function offerings (userType) {
  if (userType === 'client') {
    return (
      <div>
        <Row>
          <Col md={12}>
            <div>Adult Membership $33/month</div>
            <ul>
              <li>2 cleanings/year</li>
              <li>2 exams with necessary xrays/year</li>
              <li>Panorex xray once every 3 years</li>
              <li>1 emergency exam and xray/year</li>
              <li>10% of any needed treatment</li>
            </ul>
            <h4 style={{color: 'red', textDecoration: 'underline'}}>Total Savings/year=$118</h4>
          </Col>
        </Row>
        <br />
        <Row>
          <Col md={12}>
            <div>Child Membership $29/month</div>
            <ul>
              <li>2 cleanings/year</li>
              <li>2 exams with necessary xrays/year</li>
              <li>Panorex xray once every 3 years</li>
              <li>1 emergency exam with xray/year</li>
              <li>1 Fluoride treatment/year</li>
              <li>10% off any needed treatment</li>
            </ul>
            <h4 style={{color: 'red', textDecoration: 'underline'}}>Total Savings=$151/year</h4>
          </Col>
        </Row>
      </div>
    );
  }
}

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
      {offerings(userType)}
    </div>
  );
}

SideNav.propTypes = {
  userType: PropTypes.string,
};

export default CSSModules(styles, { allowMultiple: true })(SideNav);
