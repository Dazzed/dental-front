/*
Page Header Component
================================================================================
For unauthenticated pages (i.e. the marketing site).
*/

/*
Imports
------------------------------------------------------------
*/
// libs
import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { Link } from 'react-router';

// local
import styles from './styles.css';

const dashboardPages = [
  '/dentist/members',
  '/dentist/new-members',
  '/dentist/new-reviews',

  '/your-dentist',
  '/your-family',
  '/your-profile',
];


/*
Page Header
================================================================================
*/
function PageHeader ({ borderContent, children, pathname, title, user }) {
  let content = children;
  if (title) {
    content = (<h1 styleName="large-title">{title}</h1>);
  }

  if (user && user.type) {
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
          <span styleName="header-link">
            <Link to="/contact-admin">Contact Admin</Link>
          </span>
          |
          <span styleName="header-link">
            <Link to="/accounts/logout">Logout</Link>
          </span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div styleName="page-header">
        {(!user || !user.type) && (
          <div styleName="page-header__overlay">
            <div className="container">
              {content}
            </div>
          </div>
        )}
      </div>

      <div styleName="border-content">
        <div className="container">
          {borderContent}
        </div>
      </div>
    </div>
  );
}

/*
Props
------------------------------------------------------------
*/
PageHeader.propTypes = {
  borderContent: React.PropTypes.node,
  pathname: React.PropTypes.string,
  title: PropTypes.string,
  user: React.PropTypes.oneOfType([
    React.PropTypes.bool, // will be `false` until loaded
    React.PropTypes.object,
  ]),
};

export default CSSModules(styles, { allowMultiple: true })(PageHeader);
