import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';

import PageHeader from 'components/PageHeader/PageHeader';
import SideNav from 'components/SideNav/SideNav';
import UserDashboard from 'components/UserDashboard/UserDashboard';
import DentistDashboard from 'components/DentistDashboard/DentistDashboard';

@connect(
  state => ({user: state.auth.user})
)
export default class Dashboard extends Component {

  static propTypes = {
    user: PropTypes.object,
  }

  render() {
    const { user } = this.props;
    let dashboardInstance;

    // Stub user details
    user.type = 'client';
    user.id = 1;

    if (user) {
      if (user.type === 'client') {
        dashboardInstance = <UserDashboard userId={user.id} />;
      } else if (user.type === 'dentist') {
        dashboardInstance = <DentistDashboard userId={user.id} />;
      } else {
        dashboardInstance = null;
      }
    }

    return (user &&
      <div>
        <PageHeader title="User Dashboard" />
        <Helmet title="Dashboard"/>
        <div className="container">
          <div className="col-md-3 col-md-push-9">
            <SideNav />
          </div>
          <div className="col-md-9 col-md-pull-3">
            {dashboardInstance}
          </div>
        </div>
      </div>
    );
  }
}
