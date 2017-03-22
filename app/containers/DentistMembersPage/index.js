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
import PatientsList from 'components/PatientsList';
import { changePageTitle } from 'containers/App/actions';
import { selectCurrentUser } from 'containers/App/selectors';

// local
import {
  fetchPatients,
  searchMembers,
  sortMembers,
} from './actions';
import {
  selectDataLoaded,
  selectMemberSearchTerm,
  selectMemberSortTerm,
  selectProcessedPatients,
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
    patients: selectProcessedPatients(state),
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
Members
================================================================================
*/
@connect(mapStateToProps, mapDispatchToProps)
@CSSModules(styles, { allowMultiple: true })
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
    currentSearchTerm: React.PropTypes.string,
    currentSortTerm: React.PropTypes.string,
    dataLoaded: React.PropTypes.bool.isRequired,
    patients: React.PropTypes.arrayOf(React.PropTypes.object), // will be `null` until loaded

    // dispatch - page
    fetchPatients: React.PropTypes.func.isRequired,
    searchMembers: React.PropTypes.func.isRequired,
    sortMembers: React.PropTypes.func.isRequired,
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

export default DentistMembersPage;
