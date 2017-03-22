/*
Dentist New Members Page
================================================================================
Route: `/dentist/new-members`
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
import { changePageTitle } from 'containers/App/actions';
import { selectCurrentUser } from 'containers/App/selectors';
import {
  fetchPatients,
  searchMembers,
  sortMembers,
} from 'containers/DentistMembersPage/actions';
import {
  selectMemberSearchTerm,
  selectMemberSortTerm,
  selectPatients,
} from 'containers/DentistMembersPage/selectors';

// local
import {
  selectDataLoaded,
  selectPatientsWithNewMembers,
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
    currentSearchTerm: selectMemberSearchTerm(state),
    currentSortTerm: selectMemberSortTerm(state),
    dataLoaded: selectDataLoaded(state),
    patients: selectPatients(state),
    patientsWithNewMembers: selectPatientsWithNewMembers(state),
  };
}

function mapDispatchToProps (dispatch) {
  return {
    // app actions
    changePageTitle: (title) => dispatch(changePageTitle(title)),

    // page actions
    fetchPatients: () => dispatch(fetchPatients()),
    searchMembers: (name) => dispatch(searchMembers(name)),
    sortMembers: (status) => dispatch(sortMembers(status)),
  };
}


/*
New Members
================================================================================
*/
@connect(mapStateToProps, mapDispatchToProps)
@CSSModules(styles, { allowMultiple: true })
class DentistNewMembersPage extends React.Component {

  static propTypes = {
    // state - app
    user: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.object,
    ]),

    // dispatch - app
    changePageTitle: React.PropTypes.func.isRequired,

    // state - page
    currentSearchTerm: React.PropTypes.string,
    currentSortTerm: React.PropTypes.string,
    dataLoaded: React.PropTypes.bool.isRequired,
    patients: React.PropTypes.arrayOf(React.PropTypes.object), // will be `null` until loaded
    patientsWithNewMembers: React.PropTypes.arrayOf(React.PropTypes.object), // will be `null` until patients are loded, b/c they have the member lists

    // dispatch - page
    fetchPatients: React.PropTypes.func.isRequired,
    searchMembers: React.PropTypes.func.isRequired,
    sortMembers: React.PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.fetchPatients();
  }

  componentDidMount() {
    this.props.changePageTitle('New Members');
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

  reEnrollMember = (patient, member) => {
    // TODO
  }

  removeMember = (patient, member) => {
    // TODO
  }

  renewMember = (patient, member) => {
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
  Events
  ------------------------------------------------------------
  */
  onSortSelect = (evt) => {
    this.props.sortMembers(evt.target.value);
  }

  /*
  Render
  ------------------------------------------------------------
  */
  render () {
    const {
      currentSearchTerm,
      currentSortTerm,
      dataLoaded,
      patientsWithNewMembers,
      patients,
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
          <DentistDashboardTabs active="new-members" />

          <div styleName="content content--filler">
            <LoadingSpinner showOnlyIcon={false} />
          </div>
        </div>
      );
    }

    // precondition: there are no patients, thus there can be no new ones
    if (patients.length === 0) {
      return (
        <div>
          <DentistDashboardHeader
            currentSearchTerm={currentSearchTerm}
            patients={patients}
            user={user}
            onMemberSearch={this.props.searchMembers}
          />
          <DentistDashboardTabs active="new-members" />

          <div styleName="content content--filler">
            <p>
              It looks like you just got your DentalHQ account and haven't signed up any of your patients yet.  You can now start signing up your patients to see them here!
            </p>
          </div>
        </div>
      );
    }

    // precondition: there are no new members
    if (patientsWithNewMembers.length === 0) {
      return (
        <div>
          <DentistDashboardHeader
            currentSearchTerm={currentSearchTerm}
            patients={patients}
            user={user}
            onMemberSearch={this.props.searchMembers}
          />
          <DentistDashboardTabs active="new-members" />

          <div styleName="content content--filler">
            <p>
              You haven't signed up any new members in the last 30 days.  Seems like your existing patients are giving you quite a handful!
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
            patients={patients}
            user={user}
            onMemberSearch={this.props.searchMembers}
          />
        <DentistDashboardTabs active="new-members" />

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
            patients={patientsWithNewMembers}

            onAddMember={this.addMember}
            onCancelMember={this.cancelMember}
            onReEnrollMember={this.reEnrollMember}
            onRemoveMember={this.removeMember}
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

export default DentistNewMembersPage;
