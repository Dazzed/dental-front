import React from 'react';
import CSSModules from 'react-css-modules';
import { Well } from 'react-bootstrap';

import Money from 'components/Money';
import styles from './RevenueStats.css';

const RevenueStats = ({ total }) => (
  <Well styleName="revenue-stats">
    <span styleName="label">
      Total active patients and total revenue generated to date{' : '}
    </span>
    <Money value={total} styleName="value" />
  </Well>
);

RevenueStats.propTypes = {
  total: React.PropTypes.number.isRequired,
};

export default CSSModules(styles, { allowMultiple: true })(RevenueStats);
