/*
 *
 * Dashboard
 *
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import PageHeader from 'components/PageHeader';
import SideNav from 'components/SideNav';
import UserDashboard from 'components/UserDashboard';
// import DentistDashboard from 'components/DentistDashboard';
import { selectUserType } from 'containers/App/selectors';
import selectDashboard from 'containers/Dashboard/selectors';
import { USER_TYPES } from 'containers/Dashboard/constants';

export class Dashboard extends Component { // eslint-disable-line

  static propTypes = {
    userType: PropTypes.string,
  }

  render () {
    const { userType } = this.props;
    let dashboardInstance;
    let title;

    if (userType === USER_TYPES.CLIENT) {
      dashboardInstance = <UserDashboard />;
      title = 'User Dashboard';
    } else if (userType === USER_TYPES.DENTIST) {
      // dashboardInstance = <DentistDashboard />;
      dashboardInstance = <div />;
      title = 'Dentist Dashboard';
    } else {
      dashboardInstance = <div />;
    }

    return (
      <div>
        <PageHeader title={title} userType={userType} />
        <div className="container">
          <div className="col-md-3 col-md-push-9">
            {userType &&
              <SideNav userType={userType} />
            }
          </div>
          <div className="col-md-9 col-md-pull-3">
            {dashboardInstance}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    userType: selectUserType(state),
    dashboard: selectDashboard(state),
  };
}

function mapDispatchToProps (dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
