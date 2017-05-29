/*
Patient Membership Info Page
================================================================================
Route: `/patient/membership-info`
*/

/*
Imports
------------------------------------------------------------
*/
// lib
import React from 'react';
import CSSModules from 'react-css-modules';
import FaCheck from 'react-icons/lib/fa/check';
import { connect } from 'react-redux';
import { reset as resetForm } from 'redux-form';

// app
import LoadingSpinner from 'components/LoadingSpinner';
import MemberFormModal from 'components/MemberFormModal';
import NavBar from 'components/NavBar';
import PatientDashboardHeader from 'components/PatientDashboardHeader';
import PatientDashboardTabs from 'components/PatientDashboardTabs';
import { changePageTitle } from 'containers/App/actions';
import { selectCurrentUser } from 'containers/App/selectors';
import {
  // fetch
  fetchDentist,
  fetchFamilyMembers,

  // add member
  setEditingMember,
  clearEditingMember,
  submitMemberForm,
} from 'containers/PatientProfilePage/actions';
import {
  // fetch
  dentistSelector,
  membersSelector,

  // add member
  editingMemberSelector,
} from 'containers/PatientProfilePage/selectors';

// local
import {
  // fetch
  selectDataLoaded,
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
    dentist: dentistSelector(state),
    members: membersSelector(state),
    user: selectCurrentUser(state),

    // add member
    editingMember: editingMemberSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // app
    changePageTitle: (title) => dispatch(changePageTitle(title)),

    // fetch
    fetchDentist: () => dispatch(fetchDentist()),
    fetchFamilyMembers: () => dispatch(fetchFamilyMembers()),

    // add member
    resetForm: () => dispatch(resetForm('familyMember')),
    setEditingMember: (member) => dispatch(setEditingMember(member)),
    clearEditingMember: () => dispatch(clearEditingMember()),
    submitMemberForm: (values, userId) => dispatch(submitMemberForm(values, userId)),
  };
}


/*
Patient Membership Info
================================================================================
*/
@connect(mapStateToProps, mapDispatchToProps)
@CSSModules(styles, { allowMultiple: true })
class PatientMembershipInfoPage extends React.Component {

  static propTypes = {
    // react
    location: React.PropTypes.object.isRequired,

    // app - dispatch
    changePageTitle: React.PropTypes.func.isRequired,

    // fetch - state
    dataLoaded: React.PropTypes.bool.isRequired,
    dentist: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.object,
    ]),
    members: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.array,
    ]),
    user: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.object,
    ]),

    // fetch - dispatch
    fetchDentist: React.PropTypes.func.isRequired,
    fetchFamilyMembers: React.PropTypes.func.isRequired,

    // add member - state
    editingMember: React.PropTypes.object,

    // add member - dispatch
    resetForm: React.PropTypes.func.isRequired,
    setEditingMember: React.PropTypes.func.isRequired,
    clearEditingMember: React.PropTypes.func.isRequired,
    submitMemberForm: React.PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.changePageTitle('Your Membership Information');
    this.props.fetchDentist();
    this.props.fetchFamilyMembers();
  }

  /*
  Page Actions
  ------------------------------------------------------------
  */
  addMember = () => {
    this.props.resetForm();
    this.props.setEditingMember({});
  }

  /*
  Events
  ------------------------------------------------------------
  */
  handleMemberFormSubmit = (values) => {
    this.props.submitMemberForm(values, this.props.user.id);
  }

  cancelMemberFormAction = () => {
    this.props.clearEditingMember();
  }

  /*
  Render
  ------------------------------------------------------------
  */
  render() {
    const {
      // react
      location,

      // fetch
      dataLoaded,
      dentist,
      members,
      user,

      // add member
      editingMember,
    } = this.props;



    /*
    Precondition Renders
    ------------------------------------------------------------
    */
    // precondition: the data must be loaded, otherwise wait for it
    if (dataLoaded === false || !dentist.dentistInfo) {
      return (
        <div>
          <NavBar pathname={location.pathname} logo={false} />
          <PatientDashboardTabs active="memberships" />

          <div styleName="content content--filler">
            {
              dataLoaded && !dentist.dentistInfo ?
                <h3 className="text-muted block text-center">You Have No Membership</h3> :
                <LoadingSpinner showOnlyIcon={false} />
            }

          </div>
        </div>
      );
    }

    const adultSavings = dentist.dentistInfo.membership.savings;
    const adultMembership = {
      monthly: dentist.dentistInfo.membership.monthly.replace(".00", ""),
      savings: String(dentist.dentistInfo.membership.savings).replace(".00", ""),
    };

    const childSavings = dentist.dentistInfo.childMembership.savings;
    const childMembership = {
      monthly: dentist.dentistInfo.childMembership.monthly.replace(".00", ""),
      savings: String(dentist.dentistInfo.childMembership.savings).replace(".00", ""),
    };

    /*
    Main Render
    ------------------------------------------------------------
    */
    return (
      <div>
        <NavBar pathname={location.pathname} logo={dentist.dentistInfo.logo || false} />
        <PatientDashboardHeader user={user} />
        <PatientDashboardTabs active="memberships" />

        <div styleName="content">
          <div className="row">

            {/*
            Adult Membership
            ------------------------------------------------------------
            TODO: Pull this & the Child Membership out into their own component?
                  It's also on the Offsite Patient Signup Form.
            */}
            <div className="col-md-6">
              <div styleName="membership">
                <h3 styleName="membership__title">Adult Membership</h3>

                <p styleName="membership__includes-list__label">
                  Includes:
                </p>

                <ul styleName="membership__includes-list">
                  <li><FaCheck /> 2 cleanings/year*</li>
                  <li><FaCheck /> 1-2 exams/year</li>
                  <li><FaCheck /> Xrays as determined necessary</li>
                  <li><FaCheck /> 1 emergency exam with xray/year</li>
                  <li><FaCheck /> 10% off any needed treatment</li>
                </ul>

                <p styleName="membership__cost">
                  ${adultMembership.monthly} A Month
                </p>

                <p styleName="membership__savings">
                  Total Annual Savings: ${adultMembership.savings}**
                </p>

                <p styleName="membership__disclaimer">
                  *If periodontal disease is present additional treatment will be necessary prior to your cleaning.
                </p>

                <p styleName="membership__disclaimer">
                  **Total annual savings if ALL services used.
                </p>
              </div>
            </div>

            {/*
            Child Membership
            ------------------------------------------------------------
            */}
            <div className="col-md-6">
              <div styleName="membership">
                <h3 styleName="membership__title">
                  Child Membership
                  {' '}
                  <small>(13 and under)</small>
                </h3>

                <p styleName="membership__includes-list__label">
                  Includes:
                </p>

                <ul styleName="membership__includes-list">
                  <li><FaCheck /> 2 cleanings/year*</li>
                  <li><FaCheck /> 1-2 exams/year</li>
                  <li><FaCheck /> Xrays as determined necessary</li>
                  <li><FaCheck /> 1 emergency exam with xray/year</li>
                  <li><FaCheck /> 1 Fluoride treatment/year</li>
                  <li><FaCheck /> 10% off any needed treatment</li>
                </ul>

                <p styleName="membership__cost">
                  ${childMembership.monthly} A Month
                </p>

                <p styleName="membership__savings">
                  Total Annual Savings: ${childMembership.savings}**
                </p>

                <p styleName="membership__disclaimer">
                  *If periodontal disease is present additional treatment will be necessary prior to your cleaning.
                </p>

                <p styleName="membership__disclaimer">
                  **Total annual savings if ALL services used.
                </p>
              </div>
            </div>

            {/* End Membership Info */}
          </div>

          <div styleName="add-family-member-wrapper">
            <input
              type="button"
              styleName="button"
              value="ADD FAMILY MEMBER +"
              onClick={this.addMember}
            />
          </div>

          {/* End Content */}
        </div>

        <MemberFormModal
          dentistInfo={dentist.dentistInfo}

          show={editingMember !== null}
          onCancel={this.cancelMemberFormAction}

          initialValues={editingMember}
          onFormSubmit={this.handleMemberFormSubmit}
        />


        {/* End Wrapper Div */}
      </div>
    );
  }

}

export default PatientMembershipInfoPage;
