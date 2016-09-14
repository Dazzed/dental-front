import React from 'react';
import { Well } from 'react-bootstrap';

// import Money from 'components/Money/Money';

const RevenueStats = (/* props */) => (
  <Well className="revenue-stats" >
    <span className="desc" >
      Total active patients and total revenue generated to date :
    </span>
    {/* <Money value={props.total} className="value" /> */}
  </Well>
);

RevenueStats.propTypes = {
  total: React.PropTypes.number.isRequired,
};

export default RevenueStats;
