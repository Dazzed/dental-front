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
import PatientsList from 'components/PatientsList';
import PatientReviews from 'components/PatientReviews';
import { changePageTitle } from 'containers/App/actions';
import { selectCurrentUser } from 'containers/App/selectors';
import { fetchPatients } from 'containers/DentistMembersPage/actions';
import { selectPatients } from 'containers/DentistMembersPage/selectors';

// TODO: Refactor common dentist-dashboard actions / selectors out into an
//       independent file?  Or possibly import them from the DentistMembersPage
//       into the local './actions' and './selectors' files?

import {
  selectDataLoaded,
  selectRecentReviewers,
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
    recentReviewers: selectRecentReviewers(state),
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
    recentReviewers: React.PropTypes.object, // will be `null` until patients are loded, b/c they have the reviews

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
  addMember = (patient) => {
    // TODO
  }

  cancelMember = (patient, member) => {
    // TODO
  }

  renewMember = (patient, member) => {
    // TODO
  }

  reEnrollMember = (patient, member) => {
    // TODO
  }

  searchForMember = (name) => {
    // TODO
  }

  sortMembers = (criteria) => {
    // TODO
  }

  toggleCancelationFee = (patient) => {
    // TODO
  }

  toggleReEnrollmentFee = (patient) => {
    // TODO
  }

  updateMember = (patient, member) => {
    // TODO
  }

  /*
  UI Functions
  ------------------------------------------------------------
  */
  getRecentPatientReviews = (patient) => {
    const {
      recentReviewers,
    } = this.props;

    // precondition: the patient is not a recent reviewer
    if (recentReviewers.hasOwnProperty(patient.id) === false) {
      return null;
    }

    const reviews = recentReviewers[patient.id].reviews;

    return (
      <PatientReviews reviewer={patient} reviews={reviews} />
    );
  }

  /*
  Render
  ------------------------------------------------------------
  */
  render () {
    const {
      dataLoaded,
      patients,
      recentReviewers,
      user,
    } = this.props;

    /*
    Precondition Renders
    ------------------------------------------------------------
    */
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

    // precondition: there are no recent reviewers
    if (Object.keys(recentReviewers).length === 0) {
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
    
    /*
    Main Render
    ------------------------------------------------------------
    */
    const recentReviewerPatients = Object.keys(recentReviewers).map((key) => {
      return recentReviewers[key].reviewer;
    });

    return (
      <div>
        {/* TODO */}
        <DentistDashboardHeader revenueToDate="$100,000" />
        <DentistDashboardTabs active="new-reviews" />

        <div styleName="content">
          {/* TODO: sort by */}

          <PatientsList
            patients={recentReviewerPatients}

            getAdditionalMembershipContent={this.getRecentPatientReviews}

            onAddMember={this.addMember}
            onCancelMember={this.cancelMember}
            onReEnrollMember={this.reEnrollMember}
            onRenewMember={this.renewMember}
            onToggleCancelationFee={this.toggleCancelationFee}
            onToggleReEnrollmentFee={this.toggleReEnrollmentFee}
            onUpdateMember={this.updateMember}
          />
        </div>

        {/* TODO: modals */}
      </div>
    );
  }
}

export default DentistNewReviewsPage;
