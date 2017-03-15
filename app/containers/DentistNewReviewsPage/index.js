/*
Dentist New Reviews Page
================================================================================
Route: `/dentist/new-reviews`
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
import LoadingSpinner from 'components/LoadingSpinner';
import DentistDashboardHeader from 'components/DentistDashboardHeader';
import DentistDashboardTabs from 'components/DentistDashboardTabs';
import { changePageTitle } from 'containers/App/actions';
import { selectCurrentUser } from 'containers/App/selectors';
import { fetchPatients } from 'containers/DentistMembersPage/actions';
import { selectPatients } from 'containers/DentistMembersPage/selectors';

// TODO: Refactor common dentist-dashboard actions / selectors out into an
//       independent file?  Or possibly import them from the DentistMembersPage
//       into the local './actions' and './selectors' files?

import {
  selectDataLoaded,
  selectNewReviews,
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
    newReviews: selectNewReviews(state),
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
New Reviews
================================================================================
*/
@connect(mapStateToProps, mapDispatchToProps)
@CSSModules(styles, { allowMultiple: true })
class DentistNewReviewsPage extends React.Component {

  static propTypes = {
    // state - app
    user: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.object,
    ]),

    // dispatch - app
    changePageTitle: React.PropTypes.func.isRequired,

    // state - page
    dataLoaded: React.PropTypes.bool.isRequired,
    patients: React.PropTypes.arrayOf(React.PropTypes.object), // will be `null` until loaded
    newReviews: React.PropTypes.arrayOf(React.PropTypes.object), // will be `null` until patients (and thus patientReviews) are loaded

    // dispatch - page
    fetchPatients: React.PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.fetchPatients();
  }

  componentDidMount() {
    this.props.changePageTitle('New Reviews');
  }

  /*
  Page Actions
  ------------------------------------------------------------
  */
  searchForMember = (name) => {
    // TODO
  }

  sortMembers = (criteria) => {
    // TODO
  }

  /*
  Render
  ------------------------------------------------------------
  */
  render () {
    const {
      dataLoaded,
      patients,
      newReviews,
      user,
    } = this.props;

    // precondition: the data must be loaded, otherwise wait for it
    if (dataLoaded === false) {
      return (
        <div>
          {/* TODO */}
          <DentistDashboardHeader revenueToDate="$100,000" />
          <DentistDashboardTabs active="new-reviews" />

          <div styleName="content content--filler">
            <LoadingSpinner showOnlyIcon={false} />
          </div>
        </div>
      );
    }

    // precondition: there are no patients, thus there can be no reviews
    if (patients.length === 0) {
      return (
        <div>
          {/* TODO */}
          <DentistDashboardHeader revenueToDate="$100,000" />
          <DentistDashboardTabs active="new-reviews" />

          <div styleName="content content--filler">
            <p>
              It looks like you just got your DentalHQ account and haven't signed up any of your patients yet.  Of course you'll need to get them on one of your DentalHQ plans before they can start leaving you five star reviews!
            </p>
          </div>
        </div>
      );
    }

    if (newReviews.length === 0) {
      return (
        <div>
          {/* TODO */}
          <DentistDashboardHeader revenueToDate="$100,000" />
          <DentistDashboardTabs active="new-reviews" />

          <div styleName="content content--filler">
            {/* TODO: add link to dentist review page in dentist marketplace? */}
            <p>
              No new reviews were posted by your patients in the past 7 days.  Great job keeping up with your patients!
            </p>
          </div>
        </div>
      );
    }

    return (
      <div>
        {/* TODO */}
        <DentistDashboardHeader revenueToDate="$100,000" />
        <DentistDashboardTabs active="new-reviews" />

        <div styleName="content">
          TODO: list reviews here

          {/* TODO: sort by */}
          {/* TODO: list reviews */}

        </div>
      </div>
    );
  }
}

export default DentistNewReviewsPage;
