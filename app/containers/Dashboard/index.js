// TODO: DELETE this page
/*
 *
 * Dashboard
 *
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import UserDashboard from 'components/UserDashboard';
import DentistDashboard from 'components/DentistDashboard';
import { selectUserType } from 'containers/App/selectors';
import { USER_TYPES } from 'common/constants';

import { changePageTitle } from 'containers/App/actions';


function mapStateToProps (state) {
  return {
    userType: selectUserType(state),
  };
}


function mapDispatchToProps (dispatch) {
  return {
    changePageTitle: (title) => dispatch(changePageTitle(title)),
  };
}


@connect(mapStateToProps, mapDispatchToProps)
export default class Dashboard extends Component { // eslint-disable-line

  static propTypes = {
    userType: PropTypes.string,
    changePageTitle: PropTypes.func.isRequired,
  };

  componentWillMount () {
    switch (this.props.userType) {
      case USER_TYPES.CLIENT:
        this.props.changePageTitle('User Dashboard');
        break;
      case USER_TYPES.DENTIST:
        this.props.changePageTitle('Dentist Dashboard');
        break;
      default:
        break;
    }
  }

  render () {
    const { userType } = this.props;
    let dashboardInstance;

    if (userType === USER_TYPES.CLIENT) {
      dashboardInstance = <UserDashboard />;
    } else if (userType === USER_TYPES.DENTIST) {
      dashboardInstance = <DentistDashboard />;
    } else {
      dashboardInstance = <div />;
    }

    return dashboardInstance;
  }
}

