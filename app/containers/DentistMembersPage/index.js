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
import AccountSecurityFormModal from 'components/AccountSecurityFormModal';
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

  // search / filter patients
  searchMembers,
  filterMembers,

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

  // edit security
  setEditingSecurity,
  clearEditingSecurity,
  submitSecurityForm,
} from './actions';
import {
  // fetch
  selectDataLoaded,
  selectDentistInfo,
  selectProcessedPatients,
  selectDentistReports,

  // search / filter patients
  selectMemberSearchTerm,
  selectMemberFilterTerm,

  // add / edit member
  selectEditingMember,

  // edit patient profile
  selectEditingPatientProfile,

  // edit patient payment info
  selectEditingPatientPayment,

  // edit security
  editingSecuritySelector,
  dentistRatingSelector
} from './selectors';
import styles from './styles.css';

/*
Redux
------------------------------------------------------------
*/
function mapStateToProps (state) {
  return {
    // fetch
    dataLoaded: selectDataLoaded(state),
    // dentist: selectDentist(state),
    dentistInfo: selectDentistInfo(state),
    patients: selectProcessedPatients(state),
    reports: selectDentistReports(state),
    user: selectCurrentUser(state),

    // search / filter patients
    currentSearchTerm: selectMemberSearchTerm(state),
    currentFilterTerm: selectMemberFilterTerm(state),

    // add / edit member
    editingMember: selectEditingMember(state),

    // edit patient profile
    editingPatientProfile: selectEditingPatientProfile(state),

    // edit patient payment info
    editingPatientPayment: selectEditingPatientPayment(state),

    // edit security
    editingSecurity: editingSecuritySelector(state),
    dentistRating: dentistRatingSelector(state)
  };
}

function mapDispatchToProps (dispatch) {
  return {
    // app
    changePageTitle: (title) => dispatch(changePageTitle(title)),

    // fetch
    fetchDentistInfo: () => dispatch(fetchDentistInfo()),
    fetchPatients: () => dispatch(fetchPatients()),
    fetchDentistReports: () => dispatch(fetchDentistReports()),

    // search / filter patients
    searchMembers: (name) => dispatch(searchMembers(name)),
    filterMembers: (status) => dispatch(filterMembers(status)),

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

    // edit security
    resetSecurityForm: () => dispatch(resetForm('accountSecurity')),
    setEditingSecurity: (securityInfo) => dispatch(setEditingSecurity(securityInfo)),
    clearEditingSecurity: () => dispatch(clearEditingSecurity()),
    submitSecurityForm: (values, user) => dispatch(submitSecurityForm(values, user)),
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
    reports: React.PropTypes.object,
    user: React.PropTypes.oneOfType([
      React.PropTypes.bool, // will be `false` until loaded
      React.PropTypes.object,
    ]).isRequired,

    // fetch - dispatch
    fetchDentistInfo: React.PropTypes.func.isRequired,
    fetchPatients: React.PropTypes.func.isRequired,
    fetchDentistReports: React.PropTypes.func.isRequired,

    // search / filter patients - state
    currentSearchTerm: React.PropTypes.string,
    currentFilterTerm: React.PropTypes.string,

    // search / filter patients - dispatch
    searchMembers: React.PropTypes.func.isRequired,
    filterMembers: React.PropTypes.func.isRequired,

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

    // edit security - state
    editingSecurity: React.PropTypes.object,

    // edit security - dispatch
    resetSecurityForm: React.PropTypes.func.isRequired,
    setEditingSecurity: React.PropTypes.func.isRequired,
    clearEditingSecurity: React.PropTypes.func.isRequired,
    submitSecurityForm: React.PropTypes.func.isRequired,
  }

  componentWillMount() {
    if (this.props.user && (!this.props.dentistInfo || !this.props.patients)) {
      this.props.fetchDentistInfo();
      this.props.fetchPatients();
      this.props.fetchDentistReports();
    }
    this.state = { dialog: {} };
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
  }

  componentDidMount() {
    this.props.changePageTitle('Members');
  }

  handleCloseDialog() {
    this.setState({ dialog: {} });
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
    let { user: { memberships } } = this.props;
    memberships = memberships.filter(m => m && m.active);
    const enrollmentDiv = patient.reEnrollmentFee && <div>
      <h3>Membership Fees</h3>
      {memberships.map(({ name, price, discount }, idx) => <p key={idx}>{name.ucFirst()} <b>${price}</b>, Discount: <b>{discount}%</b></p>)}
    </div>;
    let dialog;
    if (member.subscription.stripeSubscriptionIdUpdatedAt) {
      dialog = {
        message: <div>If you are re-enrolling from a monthly membership into a monthly membership a $99 fee plus your membership payment will apply. Do you wish to continue?
          {enrollmentDiv}</div>,
        showDialog: true,
        title: 'Re-enroll Member',
        confirm: () => {
          member.isEnrolling = true;
          this.updateMember(patient, member);
          this.handleCloseDialog();
        }
      };
    } else {
      dialog = {
        message: <div>It seems like you are Enrolling for the first time. There will be no Re-enrollment penality applicable.
          {enrollmentDiv}</div>,
        showDialog: true,
        title: 'Enroll Member',
        confirm: () => {
          member.isEnrolling = true;
          this.updateMember(patient, member);
          this.handleCloseDialog();
        }
      };
    }

    this.setState({ dialog });
  };

  removeMember = (patient, member, dentistId) => {
    let message;
    if (member.subscription.membership.type == 'month') {
      message = "We're sorry you have decided to cancel your monthly membership. There is no penalty to cancel your membership, however should you chose to re-enroll, a $99 re-enrollment fee will apply.  Are you sure you wish to cancel?";
    } else {
      message = "Were sorry you have decided to cancel your annual membership. It will be active until your expiration date listed on your dashboard. Are you sure you wish to proceed?";
    }
    const dialog = {
      message: <div>{message}</div>,
      showDialog: true,
      title: 'Confirm Member Cancel',
      confirm: () => {
        this.props.setRemovingMember(patient, member, dentistId);
        this.handleCloseDialog();
      }
    };

    this.setState({ dialog });
  }

  updateMemberConfirm = (patient, member, submit) => {
    /* TODO, UNVERIFIED */
    alert('TODO: renewMember');
  }

  toggleReEnrollmentFee = (patient, updatedFees) => {
    this.props.setTogglingWaivePatientFees(patient, updatedFees);
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

  // security
  updateSecuritySettings = () => {
    this.props.resetSecurityForm();
    this.props.setEditingSecurity({
      changeEmail: true,
      changePassword: true,
    });
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

  // filter
  onFilterSelect = (evt) => {
    this.props.filterMembers(evt.target.value);
  }

  // reports
  onReportSelected = ({ month, year, url }) => {
    const {
      user: { firstName, lastName },
    } = this.props;

    const reportName = `dentist_${lastName}_${firstName}_${year}_${month}.pdf`;
    this.props.downloadReport(reportName, url);
  }

  // secruity
  handleSecurityFormSubmit = (values) => {
    this.props.submitSecurityForm(values, this.props.user);
  }

  cancelSecurityFormAction = () => {
    this.props.clearEditingSecurity();
  }

  renderHeaderAndTabs = () => {
    const {
      currentSearchTerm,
      dentistInfo,
      patients,
      reports,
      user,
      dentistRating
    } = this.props;
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
          onSecurityLinkClicked={this.updateSecuritySettings}
          dentistRating={dentistRating}
        />
        <DentistDashboardTabs active="members" />
      </div>
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
      patients,
      user,

      // search / filter
      currentSearchTerm,
      currentFilterTerm,

      // add / edit member
      editingMember,

      // edit patient profile
      editingPatientProfile,

      // edit patient payment info
      editingPatientPayment,

      // edit security
      editingSecurity,
    } = this.props;

    const {
      dialog
    } = this.state;
    /*
    Precondition Renders
    ------------------------------------------------------------
    */
    // precondition: the data must be loaded, otherwise wait for it
    if (dataLoaded === false) {
      return (
        <div>
          <DentistDashboardTabs active="members" />

          <div styleName="content content--filler">
            <LoadingSpinner showOnlyIcon={false} />
          </div>
        </div>
      );
    }

    // precondition: there are no patients to list
    if (patients.length === 0 && currentSearchTerm === '' && currentFilterTerm === 'all') {
      return (
        <div>
          {this.renderHeaderAndTabs()}

          <div styleName="content content--filler">
            <div styleName="patient-filter">
              <span>Filter By Status: </span>

              <select styleName="patient-filter__selector" value={currentFilterTerm} onChange={this.onFilterSelect}>
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="late">Late</option>
              </select>
            </div>

            <p>
              It looks like you just got your DentalHQ account and haven't signed up any of your patients yet.  Of course you'll need to get them on one of your DentalHQ plans before you can see them here in your dashboard.
            </p>
          </div>

          <AccountSecurityFormModal
            show={editingSecurity !== null}
            onCancel={this.cancelSecurityFormAction}

            initialValues={editingSecurity}
            onSubmit={this.handleSecurityFormSubmit}
          />
        </div>
      );
    }

    // precondition: the search / filter is too restrictive
    else if (patients.length === 0) {
      return (
        <div>
          {this.renderHeaderAndTabs()}

          <div styleName="content content--filler">
            <div styleName="patient-filter">
              <span>Filter By Status: </span>

              <select styleName="patient-filter__selector" value={currentFilterTerm} onChange={this.onFilterSelect}>
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="late">Late</option>
              </select>
            </div>

            <p>
              We can't find any patients that match your search term and/or status filter.
            </p>
          </div>

          <AccountSecurityFormModal
            show={editingSecurity !== null}
            onCancel={this.cancelSecurityFormAction}

            initialValues={editingSecurity}
            onSubmit={this.handleSecurityFormSubmit}
          />
        </div>
      );
    }

    /*
    Main Render
    ------------------------------------------------------------
    */
    return (
      <div>
        {this.renderHeaderAndTabs()}

        <div styleName="content">
          <div styleName="patient-filter">
            <span>Filter By Status: </span>

            <select styleName="patient-filter__selector" value={currentFilterTerm} onChange={this.onFilterSelect}>
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="late">Late</option>
            </select>
          </div>

          <PatientsList
            patients={patients}
            dentist={dentistInfo}
            onAddMember={this.addMember}
            onReEnrollMember={this.reEnrollMember}
            onRemoveMember={this.removeMember}
            onUpdateMember={this.updateMember}
            onRenewMember={this.renewMember}
            onToggleReEnrollmentFee={this.toggleReEnrollmentFee}
            onUpdatePatientProfile={this.updatePatientProfile}
            onUpdatePatientPayment={this.updatePatientPaymentInfo}
          />
        </div>

        <CheckoutFormModal
          dentist={user}

          show={editingPatientPayment !== null}
          onCancel={this.cancelPatientPaymentFormAction}
          showWaiverCheckboxes={false}

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

        <AccountSecurityFormModal
          show={editingSecurity !== null}
          onCancel={this.cancelSecurityFormAction}

          initialValues={editingSecurity}
          onSubmit={this.handleSecurityFormSubmit}
        />

      </div>
    );
  }
}

export default DentistMembersPage;
