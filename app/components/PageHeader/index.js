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
import Header from 'react-bootstrap/lib/PageHeader';
import Grid from 'react-bootstrap/lib/Grid';
import Col from 'react-bootstrap/lib/Col';

// local
import styles from './styles.css';


/*
Page Header
================================================================================
TODO: Remove the `userType` prop.  New designs are blue regardless of dentist / client.
*/
function PageHeader ({ title, userType, children }) {
  let content = children;
  if (title) {
    titleHtml = (<h1 styleName="large-title">{title}</h1>);
  }

  return (
    <div styleName="page-header">
      <div styleName={`page-header__overlay ${userType || ''}`}>
        <div className="container">
          {content}
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
  title: PropTypes.string,
  userType: PropTypes.string,
};

export default CSSModules(styles, { allowMultiple: true })(PageHeader);
