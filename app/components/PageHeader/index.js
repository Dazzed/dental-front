/**
*
* AnonymousHeaderNav
*
*/

import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import Header from 'react-bootstrap/lib/PageHeader';
import Grid from 'react-bootstrap/lib/Grid';

import styles from './styles.css';

function PageHeader ({ title, userType }) {
  return (
    <div styleName={`page-header-container ${userType || ''}`}>
      <Grid>
        <Header styleName="page-header">{title}</Header>
      </Grid>
    </div>
  );
}

PageHeader.propTypes = {
  title: PropTypes.string,
  userType: PropTypes.string,
};

export default CSSModules(styles, { allowMultiple: true })(PageHeader);
