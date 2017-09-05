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
import CheckoutFormModal from 'components/CheckoutFormModal';
import DentistDashboardHeader from 'components/DentistDashboardHeader';
import DentistDashboardTabs from 'components/DentistDashboardTabs';
import LoadingSpinner from 'components/LoadingSpinner';
import MemberFormModal from 'components/MemberFormModal';
import PatientsList from 'components/PatientsList';
import PatientProfileFormModal from 'components/PatientProfileFormModal';
import PatientReviews from 'components/PatientReviews';
import { changePageTitle } from 'containers/App/actions';
import { selectCurrentUser } from 'containers/App/selectors';
import {
  // fetch
  fetchDentistInfo,
  fetchPatients,
  fetchDentistReports,

  // search / sort patients
  searchMembers,

  // add / edit member
  setEditingMember,
  clearEditingMember,
  submitMemberForm,

  // remove member
  setRemovingMember,

  // edit patient profile
  setEditingPatientProfile,
  clearEditingPatientProfile,
  submitPatientProfileForm,

  // edit patient payment info
  setEditingPatientPayment,
  clearEditingPatientPayment,
  submitPatientPaymentForm,

  // toggle waive patient fees
  setTogglingWaivePatientFees,

  // download report
  downloadReport,
} from 'containers/DentistMembersPage/actions';
import {
  // fetch
  selectDentistInfo,
  selectProcessedPatients,
  selectDentistReports,

  // search / sort patients
  selectMemberSearchTerm,

  // add / edit member
  selectEditingMember,

  // edit patient profile
  selectEditingPatientProfile,

  // edit patient payment info
  selectEditingPatientPayment,
} from 'containers/DentistMembersPage/selectors';

import {
  // fetch
  selectDataLoaded,
  selectRecentReviewers,
} from './selectors';
import styles from './styles.css';

/*
Redux
------------------------------------------------------------
*/
function mapStateToProps(state) {
  return {
    // fetch
    dataLoaded: selectDataLoaded(state),
    dentistInfo: selectDentistInfo(state),
    patients: selectProcessedPatients(state),
    recentReviewers: selectRecentReviewers(state),
    reports: selectDentistReports(state),
    user: selectCurrentUser(state),

    // search / sort patients
    currentSearchTerm: selectMemberSearchTerm(state),

    // add / edit member
    editingMember: selectEditingMember(state),

    // edit patient profile
    editingPatientProfile: selectEditingPatientProfile(state),

    // edit patient payment info
    editingPatientPayment: selectEditingPatientPayment(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // app
    changePageTitle: (title) => dispatch(changePageTitle(title)),

    // fetch
    fetchDentistInfo: () => dispatch(fetchDentistInfo()),
    fetchPatients: () => dispatch(fetchPatients()),
    fetchDentistReports: () => dispatch(fetchDentistReports()),

    // search / sort patients
    searchMembers: (name) => dispatch(searchMembers(name)),

    // add / edit member
    resetMemberForm: () => dispatch(resetForm('familyMember')),
    setEditingMember: (patient, member) => dispatch(setEditingMember(patient, member)),
    clearEditingMember: () => dispatch(clearEditingMember()),
    submitMemberForm: (patient, values) => dispatch(submitMemberForm(patient, values)),

    // remove member
    setRemovingMember: (patient, member) => dispatch(setRemovingMember(patient, member)),

    // edit patient profile
    resetPatientProfileForm: () => dispatch(resetForm('patientProfile')),
    setEditingPatientProfile: (patient) => dispatch(setEditingPatientProfile(patient)),
    clearEditingPatientProfile: () => dispatch(clearEditingPatientProfile()),
    submitPatientProfileForm: (patient) => dispatch(submitPatientProfileForm(patient)),

    // edit patient payment info
    resetPatientPaymentForm: () => dispatch(resetForm('checkout')),
    setEditingPatientPayment: (patient, paymentInfo) => dispatch(setEditingPatientPayment(patient, paymentInfo)),
    clearEditingPatientPayment: () => dispatch(clearEditingPatientPayment()),
    submitPatientPaymentForm: (patient, values) => dispatch(submitPatientPaymentForm(patient, values)),

    // toggle waive patient fees
    setTogglingWaivePatientFees: (patient, updatedFees) => dispatch(setTogglingWaivePatientFees(patient, updatedFees)),

    // download report
    downloadReport: (reportName, reportUrl) => dispatch(downloadReport(reportName, reportUrl)),
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
    // app - dispatch
    changePageTitle: React.PropTypes.func.isRequired,

    // fetch - state
    dataLoaded: React.PropTypes.bool.isRequired,
    patients: React.PropTypes.arrayOf(React.PropTypes.object), // will be `null` until loaded
    recentReviewers: React.PropTypes.object, // will be `null` until patients are loded, b/c they have the reviews
    reports: React.PropTypes.arrayOf(React.PropTypes.object),
    user: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.object,
    ]),

    // fetch - dispatch
    fetchDentistInfo: React.PropTypes.func.isRequired,
    fetchPatients: React.PropTypes.func.isRequired,
    fetchDentistReports: React.PropTypes.func.isRequired,

    // search / sort patients - state
    currentSearchTerm: React.PropTypes.string,

    // search / sort patients - dispatch
    searchMembers: React.PropTypes.func.isRequired,

    // add / edit member - state
    editingMember: React.PropTypes.object,

    // add / edit member - dispatch
    resetMemberForm: React.PropTypes.func.isRequired,
    setEditingMember: React.PropTypes.func.isRequired,
    clearEditingMember: React.PropTypes.func.isRequired,
    submitMemberForm: React.PropTypes.func.isRequired,

    // remove member - dispatch
    setRemovingMember: React.PropTypes.func.isRequired,

    // edit patient profile - state
    editingPatientProfile: React.PropTypes.object,

    // edit patient profile - dispatch
    resetPatientProfileForm: React.PropTypes.func.isRequired,
    setEditingPatientProfile: React.PropTypes.func.isRequired,
    clearEditingPatientProfile: React.PropTypes.func.isRequired,
    submitPatientProfileForm: React.PropTypes.func.isRequired,

    // edit patient payment info - state
    editingPatientPayment: React.PropTypes.object,

    // edit patient payment - dispatch
    resetPatientPaymentForm: React.PropTypes.func.isRequired,
    setEditingPatientPayment: React.PropTypes.func.isRequired,
    clearEditingPatientPayment: React.PropTypes.func.isRequired,
    submitPatientPaymentForm: React.PropTypes.func.isRequired,

    // toggle waive patient fees - dispatch
    setTogglingWaivePatientFees: React.PropTypes.func.isRequired,

    // download report - dispatch
    downloadReport: React.PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.fetchDentistInfo();
    this.props.fetchPatients();
    this.props.fetchDentistReports();
  }

  componentDidMount() {
    this.props.changePageTitle('New Reviews');
  }

  /*
  Page Actions
  ------------------------------------------------------------
  */
  addMember = (patient) => {
    this.props.resetMemberForm();
    this.props.setEditingMember(patient, null);
  }

  reEnrollMember = (patient, member) => {
    /* TODO, UNVERIFIED */
    alert('TODO: re-enroll member');
  }

  removeMember = (patient, member) => {
    this.props.setRemovingMember(patient, member);
  }

  renewMember = (patient, member) => {
    /* TODO, UNVERIFIED */
    alert('TODO: renewMember');
  }

  toggleCancelationFee = (patient, updatedFees) => {
    this.props.setTogglingWaivePatientFees(patient, updatedFees);
  }

  toggleReEnrollmentFee = (patient, updatedFees) => {
    this.props.setTogglingWaivePatientFees(patient, updatedFees);
  }

  updateMember = (patient, member) => {
    this.props.resetMemberForm();
    this.props.setEditingMember(patient, member);
  }

  updatePatientProfile = (patient) => {
    this.props.resetPatientProfileForm();
    this.props.setEditingPatientProfile(patient);
  }

  // payments
  updatePatientPaymentInfo = (patient) => {
    this.props.resetPatientPaymentForm();
    this.props.setEditingPatientPayment(patient, {});
  }

  /*
  Events
  ------------------------------------------------------------
  */
  // member
  cancelMemberFormAction = () => {
    this.props.clearEditingMember();
  }

  handleMemberFormSubmit = (values) => {
    this.props.submitMemberForm(this.props.editingMember.patient, values);
  }

  // profile
  cancelPatientProfileFormAction = () => {
    this.props.clearEditingPatientProfile();
  }

  handlePatientProfileFormSubmit = (patient) => {
    this.props.submitPatientProfileForm(patient);
  };

  // payment
  handlePatientPaymentFormSubmit = (values) => {
    this.props.submitPatientPaymentForm(this.props.editingPatientPayment.patient, values);
  }

  cancelPatientPaymentFormAction = () => {
    this.props.clearEditingPatientPayment();
  }

  // reports
  onReportSelected = ({ month, year, url }) => {
    const {
      user: { firstName, lastName },
    } = this.props;

    const reportName = `dentist_${lastName}_${firstName}_${year}_${month}.pdf`;
    this.props.downloadReport(reportName, url);
  }

  /*
  UI Functions
  ------------------------------------------------------------
  */
  getRecentPatientReviews = (patient) => {
    const {
      recentReviewers,
      user,
    } = this.props;

    // precondition: the patient is not a recent reviewer
    if (recentReviewers.hasOwnProperty(patient.id) === false) {
      return null;
    }

    const reviews = recentReviewers[patient.id].reviews;

    return (
      <PatientReviews reviewer={patient} reviews={reviews} user={user} />
    );
  }

  /*
  Render
  ------------------------------------------------------------
  */
  render() {
    const {
      // fetch
      dataLoaded,
      dentistInfo,
      dentist,
      patients,
      recentReviewers,
      reports,
      user,

      // search / sort patients
      currentSearchTerm,

      // add / edit member
      editingMember,

      // edit patient profile
      editingPatientProfile,

      // edit patient payment info
      editingPatientPayment,
    } = this.props;

    /*
    Precondition Renders
    ------------------------------------------------------------
    */
    // precondition: the data must be loaded, otherwise wait for it
    if (dataLoaded === false) {
      return (
        <div>
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
          <DentistDashboardHeader
            currentSearchTerm={currentSearchTerm}
            dentistInfo={dentistInfo}
            patients={patients}
            reports={reports}
            user={user}
            onMemberSearch={this.props.searchMembers}
            onReportSelected={this.onReportSelected}
          />
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
          <DentistDashboardHeader
            currentSearchTerm={currentSearchTerm}
            dentistInfo={dentistInfo}
            patients={patients}
            reports={reports}
            user={user}
            onMemberSearch={this.props.searchMembers}
            onReportSelected={this.onReportSelected}
          />
          <DentistDashboardTabs active="new-reviews" />

          <div styleName="content content--filler">
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
    const recentReviewerPatients = Object.keys(recentReviewers)
      .map((reviewerId) => {
        return recentReviewers[reviewerId].reviewer;
      })
      .sort((reviewerA, reviewerB) => {
        // NOTE: Reviews are already sorted from most recent to least.
        const mostRecentReviewA = recentReviewers[reviewerA.id].reviews[0];
        const mostRecentReviewB = recentReviewers[reviewerB.id].reviews[0];

        if (mostRecentReviewA.createdAt > mostRecentReviewB.createdAt) {
          return -1;
        }
        else if (mostRecentReviewA.createdAt < mostRecentReviewB.createdAt) {
          return 1;
        }

        return 0;
      });


    return (
      <div>
        <DentistDashboardHeader
          currentSearchTerm={currentSearchTerm}
          dentistInfo={dentistInfo}
          patients={patients}
          reports={reports}
          user={user}
          onMemberSearch={this.props.searchMembers}
          onReportSelected={this.onReportSelected}
        />
        <DentistDashboardTabs active="new-reviews" />

        <div styleName="content">
          {/* TODO: onUpdateMember was removed so that the `update` action would
              be hidden until the extra fields can be removed, and there are
              multiple membership types for a dentist to choose from.

              onUpdateMember={this.updateMember}

              https://trello.com/c/kPVhpLAB/98-dentist-limit-update-to-membership-type
          */}
          <PatientsList
            patients={recentReviewerPatients}
            dentist={dentistInfo}
            getAdditionalMembershipContent={this.getRecentPatientReviews}
          />
        </div>

        <CheckoutFormModal
          show={editingPatientPayment !== null}
          onCancel={this.cancelPatientPaymentFormAction}
          showWaiverCheckboxes={true}

          initialValues={editingPatientPayment !== null ? editingPatientPayment.paymentInfo : null}
          onSubmit={this.handlePatientPaymentFormSubmit}
        />

        <MemberFormModal
          dentist={user}
          show={editingMember !== null}
          onCancel={this.cancelMemberFormAction}
          initialValues={editingMember !== null ? editingMember.member : null}
          onFormSubmit={this.handleMemberFormSubmit}
        />

        <PatientProfileFormModal
          show={editingPatientProfile !== null}
          onCancel={this.cancelPatientProfileFormAction}
          dentist={user}
          initialValues={editingPatientProfile}
          onSubmit={this.handlePatientProfileFormSubmit}
        />
      </div>
    );
  }
}

export default DentistNewReviewsPage;
