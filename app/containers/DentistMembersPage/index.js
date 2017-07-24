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

import CheckoutFormModal from 'components/CheckoutFormModal';
import DentistDashboardHeader from 'components/DentistDashboardHeader';
import DentistDashboardTabs from 'components/DentistDashboardTabs';
import LoadingSpinner from 'components/LoadingSpinner';
import MemberFormModal from 'components/MemberFormModal';
import PatientsList from 'components/PatientsList';
import PatientProfileFormModal from 'components/PatientProfileFormModal';
import { changePageTitle } from 'containers/App/actions';
import { selectCurrentUser } from 'containers/App/selectors';
import ConfirmModal from 'components/ConfirmModal';

// local
import {
  // fetch
  fetchDentistInfo,
  fetchPatients,
  fetchDentistReports,

  // search / sort patients
  searchMembers,
  sortMembers,

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
} from './actions';
import {
  // fetch
  selectDataLoaded,
  selectDentistInfo,
  selectProcessedPatients,
  selectDentistReports,

  // search / sort patients
  selectMemberSearchTerm,
  selectMemberSortTerm,

  // add / edit member
  selectEditingMember,

  // edit patient profile
  selectEditingPatientProfile,

  // edit patient payment info
  selectEditingPatientPayment,
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
    // dentist: selectDentist(state),
    dentistInfo: selectDentistInfo(state),
    patients: selectProcessedPatients(state),
    reports: selectDentistReports(state),
    user: selectCurrentUser(state),

    // search / sort patients
    currentSearchTerm: selectMemberSearchTerm(state),
    currentSortTerm: selectMemberSortTerm(state),

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
    sortMembers: (status) => dispatch(sortMembers(status)),

    // add / edit member
    resetMemberForm: () => dispatch(resetForm('familyMember')),
    setEditingMember: (patient, member) => dispatch(setEditingMember(patient, member)),
    clearEditingMember: () => dispatch(clearEditingMember()),
    submitMemberForm: (patient, values) => dispatch(submitMemberForm(patient, values)),

    // remove member
    setRemovingMember: (patient, member, dentistId) => dispatch(setRemovingMember(patient, member, dentistId)),

    // edit patient profile
    resetPatientProfileForm: () => dispatch(resetForm('patientProfile')),
    setEditingPatientProfile: (patient) => dispatch(setEditingPatientProfile(patient)),
    clearEditingPatientProfile: () => dispatch(clearEditingPatientProfile()),
    submitPatientProfileForm: (values) => dispatch(submitPatientProfileForm(values)),

    // edit patient payment info
    resetPatientPaymentForm: () => dispatch(resetForm('checkout')),
    setEditingPatientPayment: (patient, paymentInfo) => dispatch(setEditingPatientPayment(patient, paymentInfo)),
    clearEditingPatientPayment: () => dispatch(clearEditingPatientPayment()),
    submitPatientPaymentForm: (patient, values) => dispatch(submitPatientPaymentForm(patient, values)),

    // toggle waive patient fees
    setTogglingWaivePatientFees: (patient, updatedFees, toggleType) => dispatch(setTogglingWaivePatientFees(patient, updatedFees, toggleType)),

    // download report
    downloadReport: (reportName, reportUrl) => dispatch(downloadReport(reportName, reportUrl)),
  };
}


/*
Members
================================================================================
*/
@connect(mapStateToProps, mapDispatchToProps)
@CSSModules(styles, { allowMultiple: true })
class DentistMembersPage extends React.Component {

  static propTypes = {
    // app - dispatch
    changePageTitle: React.PropTypes.func.isRequired,

    // fetch - state
    dataLoaded: React.PropTypes.bool.isRequired,
    patients: React.PropTypes.arrayOf(React.PropTypes.object), // will be `null` until loaded
    reports: React.PropTypes.arrayOf(React.PropTypes.object),
    user: React.PropTypes.oneOfType([
      React.PropTypes.bool, // will be `false` until loaded
      React.PropTypes.object,
    ]).isRequired,

    // fetch - dispatch
    fetchDentistInfo: React.PropTypes.func.isRequired,
    fetchPatients: React.PropTypes.func.isRequired,
    fetchDentistReports: React.PropTypes.func.isRequired,

    // search / sort patients - state
    currentSearchTerm: React.PropTypes.string,
    currentSortTerm: React.PropTypes.string,

    // search / sort patients - dispatch
    searchMembers: React.PropTypes.func.isRequired,
    sortMembers: React.PropTypes.func.isRequired,

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
    this.state = { dialog: {} };
  }

  componentDidMount() {
    this.props.changePageTitle('Members');
  }

  /*
  Page Actions
  ------------------------------------------------------------
  */
  addMember = (patient) => {
    this.props.resetMemberForm();
    this.props.setEditingMember(patient, null);
  }

  reEnrollMember = (patient, member, type) => {
    const { user: { memberships } } = this.props;
    const enrollmentDiv = patient.reEnrollmentFee && <div>
      <h3>Membership Fees</h3>
      {memberships.map(({ name, price, discount }, idx) => <p key={idx}>{name.ucFirst()} <b>${price}</b>, Discount: <b>{discount}%</b></p>)}
    </div>;

    const dialog = {
      message: <div>A re-enrollment fee will be charged in addition to the prorated membership fee.
        {enrollmentDiv}</div>,
      showDialog: true,
      title: 'Re-enroll Member',
      confirm: () => {
        member.isEnrolling = true;
        this.updateMember(patient, member);
        this.handleCloseDialog();
      }
    };
    
    this.setState({ dialog });
  }

  removeMember = (patient, member, dentistId) => {
    this.props.setRemovingMember(patient, member, dentistId);
  }

  updateMemberConfirm = (patient, member, submit) => {
    /* TODO, UNVERIFIED */
    alert('TODO: renewMember');
  }

  toggleCancelationFee = (patient, updatedFees) => {
    this.props.setTogglingWaivePatientFees(patient, updatedFees, 'cancel');
  }

  toggleReEnrollmentFee = (patient, updatedFees) => {
    this.props.setTogglingWaivePatientFees(patient, updatedFees, 'reenroll');
  }

  confirmUpdateMember = (user, member, submit) => {
    const { dentist: { dentistInfo: { membership: { yearly, monthly, discount } } } } = this.props;
    const cost = { monthly, yearly, discount };
    const enrollmentDiv = user.reEnrollmentFee && <div>
      <h3>{cost.discount}% Discount</h3>
      <p>Yearly: <b>${cost.yearly}</b>, Monthly: <b>${cost.monthly}</b></p>
    </div>;

    const dialog = {
      message: <div>A re-enrollment fee will be charged in addition to the prorated membership fee.
        {enrollmentDiv}</div>,
      showDialog: true,
      title: 'Confirm Member Update',
      confirm: () => {
        submit();
        this.handleCloseDialog();
      }
    };

    this.setState({ dialog });
  };

  updateMember = (patient, member) => {
    this.props.resetMemberForm();
    member.fromDentist = true;

    console.log('can upate member');
    this.props.setEditingMember(patient, member, (submit) => {
      this.updateMemberConfirm(patient, member, submit);
    });
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

  handlePatientProfileFormSubmit = (values) => {
    this.props.submitPatientProfileForm(values, values.id);
  };

  // payment
  handlePatientPaymentFormSubmit = (values) => {
    this.props.submitPatientPaymentForm(this.props.editingPatientPayment.patient, values);
  }

  cancelPatientPaymentFormAction = () => {
    this.props.clearEditingPatientPayment();
  }

  // sort
  onSortSelect = (evt) => {
    this.props.sortMembers(evt.target.value);
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
  Render
  ------------------------------------------------------------
  */
  render() {
    const {
      // fetch
      dataLoaded,
      dentistInfo,
      patients,
      reports,
      user,

      // search / sort patients
      currentSearchTerm,
      currentSortTerm,

      // add / edit member
      editingMember,

      // edit patient profile
      editingPatientProfile,

      // edit patient payment info
      editingPatientPayment,
    } = this.props;

    const {
      dialog
    } = this.state;
    /*
    Precondition Renders
    ------------------------------------------------------------
    */
    // precondition: the data must be loaded, otherwise wait for it
    console.log(dataLoaded, 'dataLoaded');
    if (dataLoaded === false) {
      return (
        <div>
          <DentistDashboardTabs active="members" />

          <div styleName="content content--filler">
            Drosss
            <LoadingSpinner showOnlyIcon={false} />
          </div>
        </div>
      );
    }

    // precondition: there are no patients to list
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
          <DentistDashboardTabs active="members" />

          <div styleName="content content--filler">
            <p>
              It looks like you just got your DentalHQ account and haven't signed up any of your patients yet.  Of course you'll need to get them on one of your DentalHQ plans before you can see them here in your dashboard.
            </p>
          </div>
        </div>
      );
    }

    /*
    Main Render
    ------------------------------------------------------------
    */
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
        <DentistDashboardTabs active="members" />

        <div styleName="content">
          <div styleName="patient-sort">
            <span>Sort By: </span>

            <select styleName="patient-sort__selector" value={currentSortTerm} onChange={this.onSortSelect}>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="late">Late</option>
            </select>
          </div>

          {/* TODO: onUpdateMember was removed so that the `update` action would
              be hidden until the extra fields can be removed, and there are
              multiple membership types for a dentist to choose from.

              onUpdateMember={this.updateMember}

              https://trello.com/c/kPVhpLAB/98-dentist-limit-update-to-membership-type
          */}
          <PatientsList
            patients={patients}
            dentist={dentistInfo}
            onAddMember={this.addMember}
            onReEnrollMember={this.reEnrollMember}
            onRemoveMember={this.removeMember}
            onUpdateMember={this.updateMember}
            onRenewMember={this.renewMember}
            onToggleCancelationFee={this.toggleCancelationFee}
            onToggleReEnrollmentFee={this.toggleReEnrollmentFee}
            onUpdatePatientProfile={this.updatePatientProfile}
            onUpdatePatientPayment={this.updatePatientPaymentInfo}
          />
        </div>

        <CheckoutFormModal
          show={editingPatientPayment !== null}
          onCancel={this.cancelPatientPaymentFormAction}

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

        <ConfirmModal
          showModal={dialog.showDialog}
          message={dialog.message}
          onCancel={this.handleCloseDialog}
          onConfirm={dialog.confirm}
          title={dialog.title}
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

export default DentistMembersPage;
