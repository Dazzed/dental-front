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
import MemberFormModal from 'components/MemberFormModal';
import PatientsList from 'components/PatientsList';
import { changePageTitle } from 'containers/App/actions';
import { selectCurrentUser } from 'containers/App/selectors';

// local
import {
  // fetch
  fetchDentistInfo,
  fetchPatients,

  // search / sort patients
  searchMembers,
  sortMembers,

  // add / edit member
  setEditingMember,
  clearEditingMember,
  submitMemberForm,

  // remove member
  setRemovingMember,
} from './actions';
import {
  // fetch
  selectDataLoaded,
  selectDentistInfo,
  selectProcessedPatients,

  // search / sort patients
  selectMemberSearchTerm,
  selectMemberSortTerm,

  // add / edit member
  selectEditingActive,
  selectEditingMember,
  selectEditingPatient,
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
    dentistInfo: selectDentistInfo(state),
    patients: selectProcessedPatients(state),
    user: selectCurrentUser(state),

    // search / sort patients
    currentSearchTerm: selectMemberSearchTerm(state),
    currentSortTerm: selectMemberSortTerm(state),

    // add / edit member
    editingActive: selectEditingActive(state),
    editingMember: selectEditingMember(state),
    editingPatient: selectEditingPatient(state),
  };
}

function mapDispatchToProps (dispatch) {
  return {
    // app 
    changePageTitle: (title) => dispatch(changePageTitle(title)),
    
    // fetch
    fetchDentistInfo: () => dispatch(fetchDentistInfo()),
    fetchPatients: () => dispatch(fetchPatients()),

    // search / sort patients
    searchMembers: (name) => dispatch(searchMembers(name)),
    sortMembers: (status) => dispatch(sortMembers(status)),

    // add / edit member
    resetForm: () => dispatch(resetForm('familyMember')),
    setEditingMember: (patient, member) => dispatch(setEditingMember(patient, member)),
    clearEditingMember: () => dispatch(clearEditingMember()),
    submitMemberForm: (patient, values) => dispatch(submitMemberForm(patient, values)),

    // remove member
    setRemovingMember: (patient, member) => dispatch(setRemovingMember(patient, member)),
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
    user: React.PropTypes.oneOfType([
      React.PropTypes.bool, // will be `false` until loaded
      React.PropTypes.object,
    ]).isRequired,

    // fetch - dispatch
    fetchDentistInfo: React.PropTypes.func.isRequired,
    fetchPatients: React.PropTypes.func.isRequired,

    // search / sort patients - state
    currentSearchTerm: React.PropTypes.string,
    currentSortTerm: React.PropTypes.string,

    // search / sort patients - dispatch
    searchMembers: React.PropTypes.func.isRequired,
    sortMembers: React.PropTypes.func.isRequired,

    // add / edit member - state
    editingActive: React.PropTypes.bool.isRequired,
    editingMember: React.PropTypes.object,
    editingPatient: React.PropTypes.object,

    // add / edit member - dispatch
    resetForm: React.PropTypes.func.isRequired,
    setEditingMember: React.PropTypes.func.isRequired,
    clearEditingMember: React.PropTypes.func.isRequired,
    submitMemberForm: React.PropTypes.func.isRequired,

    // remove member - dispatch
    setRemovingMember: React.PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.fetchDentistInfo();
    this.props.fetchPatients();
  }

  componentDidMount() {
    this.props.changePageTitle('Members');
  }

  /*
  Page Actions
  ------------------------------------------------------------
  */
  addMember = (patient) => {
    this.props.resetForm();
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

  toggleCancelationFee = (patient) => {
    /* TODO, verified it's called */
    alert('TODO: toggle cancelation fee');
  }

  toggleReEnrollmentFee = (patient) => {
    /* TODO, verified it's called */
    alert('TODO: toggle re-enrollment fee');
  }

  updateMember = (patient, member) => {
    this.props.resetForm();
    this.props.setEditingMember(patient, member);
  }

  /*
  Events
  ------------------------------------------------------------
  */
  cancelMemberFormAction = () => {
    this.props.clearEditingMember();
  }

  handleMemberFormSubmit = (values) => {
    this.props.submitMemberForm(this.props.editingPatient, values);
  }

  onSortSelect = (evt) => {
    this.props.sortMembers(evt.target.value);
  }

  /*
  Render
  ------------------------------------------------------------
  */
  render () {
    const {
      // fetch
      dataLoaded,
      dentistInfo,
      patients,
      user,

      // search / sort patients
      currentSearchTerm,
      currentSortTerm,

      // add / edit member
      editingActive,
      editingMember,
    } = this.props;

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
    if (patients.length === 0) {
      return (
        <div>
          <DentistDashboardHeader
            currentSearchTerm={currentSearchTerm}
            dentistInfo={dentistInfo}
            patients={patients}
            user={user}
            onMemberSearch={this.props.searchMembers}
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
            user={user}
            onMemberSearch={this.props.searchMembers}
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

          <PatientsList
            patients={patients}

            onAddMember={this.addMember}
            onReEnrollMember={this.reEnrollMember}
            onRemoveMember={this.removeMember}
            onRenewMember={this.renewMember}
            onToggleCancelationFee={this.toggleCancelationFee}
            onToggleReEnrollmentFee={this.toggleReEnrollmentFee}
            onUpdateMember={this.updateMember}
          />
        </div>

        <MemberFormModal
          show={editingActive}
          onCancel={this.cancelMemberFormAction}

          initialValues={editingMember}
          onSubmit={this.handleMemberFormSubmit}
        />
      </div>
    );
  }
}

export default DentistMembersPage;
