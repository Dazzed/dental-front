/*
Dentist Members Page
================================================================================
Route: `/dentist/members`
*/

/*
Imports
------------------------------------------------------------
*/
// lib
import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import CSSModules from 'react-css-modules';
import FaUser from 'react-icons/lib/fa/user';
import { connect } from 'react-redux';
import { reset as resetForm } from 'redux-form';

// app
import Avatar from 'components/Avatar';
import DentistDashboardHeader from 'components/DentistDashboardHeader';
import DentistDashboardTabs from 'components/DentistDashboardTabs';
import LoadingSpinner from 'components/LoadingSpinner';
import { changePageTitle } from 'containers/App/actions';
import { selectCurrentUser } from 'containers/App/selectors';

// local
import {
  fetchPatients,
} from './actions';
import {
  selectDataLoaded,
  selectPatients,
} from './selectors';
import styles from './styles.css';

/*
Redux
------------------------------------------------------------
*/
function mapStateToProps (state) {
  return {
    // app state
    user: selectCurrentUser(state),

    // page state
    dataLoaded: selectDataLoaded(state),
    patients: selectPatients(state),
  };
}

function mapDispatchToProps (dispatch) {
  return {
    // app actions
    changePageTitle: (title) => dispatch(changePageTitle(title)),
    
    // page actions
    fetchPatients: () => dispatch(fetchPatients()),
  };
}


/*
Members
================================================================================
*/
@connect(mapStateToProps, mapDispatchToProps)
@CSSModules(styles)
class DentistMembersPage extends React.Component {

  static propTypes = {
    // state - app
    user: React.PropTypes.oneOfType([
      React.PropTypes.bool, // will be `false` until loaded
      React.PropTypes.object,
    ]).isRequired,

    // dispatch - app
    changePageTitle: React.PropTypes.func.isRequired,

    // state - page
    dataLoaded: React.PropTypes.bool.isRequired,
    patients: React.PropTypes.arrayOf(React.PropTypes.object), // will be `null` until loaded

    // dispatch - page
    fetchPatients: React.PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.fetchPatients();
  }

  componentDidMount() {
    this.props.changePageTitle('Members');
  }

  /*
  Page Actions
  ------------------------------------------------------------
  */
  // TODO

  /*
  Form Events
  ------------------------------------------------------------
  */
  // TODO

  /*
  Render
  ------------------------------------------------------------
  */
  render () {
    const {
      dataLoaded,
      patients,
      user,
    } = this.props;

    // precondition: the data must be loaded, otherwise wait for it
    if (dataLoaded === false) {
      return (
        <div>
          {/* TODO */}
          <DentistDashboardHeader revenueToDate="$100,000" />
          <DentistDashboardTabs active="members" />

          <div styleName="content">
            <LoadingSpinner showOnlyIcon={false} />
          </div>
        </div>
      );
    }

    return (
      <div>
        {/* TODO */}
        <DentistDashboardHeader revenueToDate="$100,000" />
        <DentistDashboardTabs active="members" />

        <div styleName="content">
          {/* TODO: remove */}
          Dentist Members Page

          {/* TODO: sort by */}
          {/* TODO: list members */}

        </div>

        {/* TODO: modals */}
      </div>
    );
  }
}

export default DentistMembersPage;
