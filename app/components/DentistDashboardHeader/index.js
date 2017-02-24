/*
Dentist Dashboard Header Component
================================================================================
*/

/*
Imports
------------------------------------------------------------
*/
// lib
import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { Link } from 'react-router';

// local
import styles from './styles.css';


/*
Dentist Dashboard Header
================================================================================
*/
@CSSModules(styles, { allowMultiple: true })
class DentistDashboardHeader extends React.Component {

  static propTypes = {
    // passed in
    revenueToDate: React.PropTypes.string.isRequired,
  }

  render() {
    const {
      revenueToDate,
    } = this.props;

    return (
      <div className="row" styleName="dentist-dashboard-header">
        <div className="col-sm-9">
          <div styleName="finance-summary">
            <h2 styleName="finance-summary__title">
              Current Membership Fees and Activation Fees
            </h2>
            <p>
              Total revenue generation to date:{' '}
              <strong styleName="finance-summary__amount">{revenueToDate}</strong>
            </p>
          </div>
        </div>

        <div className="col-sm-3">
          <ul styleName="quick-links">
            <li>
              <Link styleName="quick-links__link" to="/dentist/edit-office">Edit Office Info</Link>
            </li>
            <li>
              <Link styleName="quick-links__link" to="/dentist/add-member">Add New Member</Link>
            </li>
            <li>
              <Link styleName="quick-links__link" to="/dentist/custom-membership">Custom Membership</Link>
            </li>
            <li>
              <Link styleName="quick-links__link" to="/dentist/reports">Reports</Link>
            </li>
            <li>
              <Link styleName="quick-links__link" to="/dentist/marketing">Marketing Materials</Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }

};

export default DentistDashboardHeader;
