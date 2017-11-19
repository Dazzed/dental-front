import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { Link } from 'react-router';
import Button from 'react-bootstrap/lib/Button';

import styles from './styles.css';

function MarketplaceHeader (props) {
  const {
    title,
    specialty,
    startingPrice,
    history,
    id
  } = props;

  // const pageHeaderImagePosition = {
  //   backgroundPositionX: imgX !== undefined
  //     ? imgX
  //     : "center",
  //   backgroundPositionY: imgY !== undefined
  //     ? imgY
  //     : "-235px",
  // };

  const borderContent = (
    <div styleName="border-content--user">
      <div>
        {startingPrice !== null && (
          <span>
            PLANS STARTING AT: ${startingPrice.toFixed(2).replace('.00', '')}
          </span>
        )}
        <Button
          styleName="signup--button"
          className="btn-lg"
          bsStyle="success"
          onClick={() => history.push(`/accounts/signup/my-dentist/${id}?frommarketplace=true`)}>
          SIGN UP
        </Button>
      </div>
    </div>
  );

  return (
    <div>
      <div styleName="page-header">
        <div styleName="page-header__overlay">
          <div className="container">
            <span styleName="large-title">
              {title}
            </span>
            <br />
            <span styleName="small-title">
              {specialty}
            </span>
          </div>
        </div>
      </div>

      <div styleName="border-content">
        <div className="container">
          {borderContent}
        </div>
      </div>
    </div>
  );
}

MarketplaceHeader.propTypes = {
  children: React.PropTypes.node,
  borderContent: React.PropTypes.node,
  pathname: React.PropTypes.string,
  title: PropTypes.string,
  user: React.PropTypes.oneOfType([
    React.PropTypes.bool, // will be `false` until loaded
    React.PropTypes.object,
  ]),
};

export default CSSModules(styles, { allowMultiple: true })(MarketplaceHeader);

/*if (false) {
    if (user.type === "dentist") {
      borderContent = (
        <div styleName="border-content--user">
          <div className="pull-left">
            Welcome
            {' '}
            <span styleName="user-name">
              {user.firstName} {user.lastName}
            </span>
          </div>

          <div className="pull-right">
            <span styleName={"header-link" + (dashboardPages.indexOf(pathname) > -1 ? " header-link--current" : "")}>
              <Link to="/dentist/new-members">Dashboard</Link>
            </span>
            |
            <span styleName="header-link">
              <Link to="/faq">Help &amp; FAQ</Link>
            </span>
            |
            <span styleName={"header-link" + (pathname === "/dentist/contact-admin" ? " header-link--current" : "")}>
              <Link to="/dentist/contact-admin">Contact Admin</Link>
            </span>
            |
            <span styleName="header-link">
              <Link to="/accounts/logout">Logout</Link>
            </span>
          </div>
        </div>
      );
    }

    else if (user.type === "client") {
      borderContent = (
        <div styleName="border-content--user">
          <div className="pull-left">
            Welcome
            {' '}
            <span styleName="user-name">
              {user.firstName} {user.lastName}
            </span>
          </div>

          <div className="pull-right">
            <span styleName={"header-link" + (dashboardPages.indexOf(pathname) > -1 ? " header-link--current" : "")}>
              <Link to="/patient/profile">Dashboard</Link>
            </span>
            |
            <span styleName="header-link">
              <Link to="/faq">Help &amp; FAQ</Link>
            </span>
            |
            <span styleName="header-link">
              <Link to="/accounts/logout">Logout</Link>
            </span>
          </div>
        </div>
      );
    }

    else if (user.type === "admin") {
      borderContent = (
        <div styleName="border-content--user">
          <div className="pull-left">
            ADMIN DASHBOARD
          </div>

          <div className="pull-right">
            <span styleName={"header-link" + (pathname === '/admin/manage' ? " header-link--current" : "")}>
              <Link to="/admin/manage">Manage Admins</Link>
            </span>
            |
            <span styleName={"header-link" + (pathname === '/admin/dentists' ? " header-link--current" : "")}>
              <Link to="/admin/dentists">Dashboard</Link>
            </span>
            |
            <span styleName="header-link">
              <Link to="/accounts/logout">Logout</Link>
            </span>
          </div>
        </div>
      );
    }

    // else unknown user type, leave the borderContent prop as is
  }*/
