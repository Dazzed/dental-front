/*
Patient Profile Page
================================================================================
Route: `/patient/profile`
*/

/*
Imports
------------------------------------------------------------
*/
// lib
import moment from 'moment';
import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import CSSModules from 'react-css-modules';
import FaUser from 'react-icons/lib/fa/user';
import { connect } from 'react-redux';
import { reset as resetForm } from 'redux-form';

// app
import Avatar from 'components/Avatar';
import LoadingSpinner from 'components/LoadingSpinner';
import FamilyMembersList from 'components/FamilyMembersList';
import MemberFormModal from 'components/MemberFormModal';
import PatientDashboardHeader from 'components/PatientDashboardHeader';
import PatientDashboardTabs from 'components/PatientDashboardTabs';
import { changePageTitle } from 'containers/App/actions';
import { selectCurrentUser } from 'containers/App/selectors';

// local
import {
  // fetch
  fetchFamilyMembers,

  // add / edit member
  setEditingMember,
  clearEditingMember,
  submitMemberForm,
} from './actions';
import {
  // fetch
  membersSelector,

  // add / edit member
  editingActiveSelector,
  editingMemberSelector,
} from './selectors';
import styles from './styles.css';

/*
Redux
------------------------------------------------------------
*/
function mapStateToProps (state) {
  return {
    // fetch
    members: membersSelector(state),
    user: selectCurrentUser(state),

    // add / edit member
    editingActive: editingActiveSelector(state),
    editingMember: editingMemberSelector(state),
  };
}

function mapDispatchToProps (dispatch) {
  return {
    // app
    changePageTitle: (title) => dispatch(changePageTitle(title)),

    // fetch
    fetchFamilyMembers: () => dispatch(fetchFamilyMembers()),

    // add / edit member
    resetForm: () => dispatch(resetForm('familyMember')),
    setEditingMember: (member) => dispatch(setEditingMember(member)),
    clearEditingMember: () => dispatch(clearEditingMember()),
    submitMemberForm: (values, userId) => dispatch(submitMemberForm(values, userId)),
  };
}


/*
Profile
================================================================================
*/
@connect(mapStateToProps, mapDispatchToProps)
@CSSModules(styles)
class PatientProfilePage extends React.Component {

  static propTypes = {
    // app - dispatch
    changePageTitle: React.PropTypes.func.isRequired,


    // fetch - state
    members: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.array,
    ]),
    user: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.object,
    ]),

    // fetch - dispatch
    fetchFamilyMembers: React.PropTypes.func.isRequired,

    // add / edit member - state
    editingActive: React.PropTypes.bool.isRequired,
    editingMember: React.PropTypes.object,

    // add / edit member - dispatch
    resetForm: React.PropTypes.func.isRequired,
    setEditingMember: React.PropTypes.func.isRequired,
    clearEditingMember: React.PropTypes.func.isRequired,
    submitMemberForm: React.PropTypes.func.isRequired,
  }

  componentDidMount () {
    this.props.changePageTitle('Your Profile');
    this.props.fetchFamilyMembers();
  }

  /*
  Page Actions
  ------------------------------------------------------------
  */
  // members
  addMember = () => {
    this.props.resetForm();
    this.props.setEditingMember(null);
  }

  reEnrollMember = () => {
    alert('TODO: re-enroll member');
  }

  removeMember = (member) => {
    alert('TODO: remove member');
  }

  renewMember = () => {
    alert('TODO: renew member');
  }

  updateMember = (member) => {
    alert('TODO: update member');
  }

  // other
  changePaymentMethod = () => {
    alert('TODO: change payment method');
  }

  editProfile = () => {
    alert('TODO: edit profile');
  }

  editSecuritySettings = () => {
    alert('TODO: edit security settings');
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
  render () {
    const {
      // fetch
      members,
      user,

      // add / edit member
      editingActive,
      editingMember,
    } = this.props;

    /*
    Precondition Renders
    ------------------------------------------------------------
    */
    // precondition: the data must be loaded, otherwise wait for it
    if (user === false || members === false) {
      return (
        <div>
          <PatientDashboardTabs active="profile" />

          <div styleName="content">
            <LoadingSpinner showOnlyIcon={false} />
          </div>
        </div>
      );
    }

    /*
    Main Render
    ------------------------------------------------------------
    */
    user.members = members;

    const aggregateSubscription = {
      status: members.reduce(
        function(aggregateStatus, member) {
          if ( member.subscription.status === 'past_due'
            || aggregateStatus === 'past_due'
          ) {
            aggregateStatus = 'past_due';
          }

          else if (
               member.subscription.status === 'active'
            || aggregateStatus === 'active'
          ) {
            aggregateStatus = 'active';
          }

          // else
          // member status is 'inactive' or 'canceled'
          // aggregate status is 'inactive'
          // leave it as is

          return aggregateStatus;
        },
        'inactive'
      ),

      total: members.reduce(
        function(aggregateTotal, member) {
          return aggregateTotal + parseFloat(member.subscription.total);
        },
        0
      ),

      dueDate: members.reduce(
        function(nearestPaymentDueDate, member) {
          const memberDueDate = moment(member.subscription.endAt);
          
          if (memberDueDate.isBefore(nearestPaymentDueDate)) {
            nearestPaymentDueDate = memberDueDate;
          }

          return nearestPaymentDueDate;
        },
        moment().add(100, 'years'), // obviously larger than any paid subscription period
      ),
    };

    if (aggregateSubscription.status === 'active') {
      aggregateSubscription.status = 'Active';
    }
    else if (aggregateSubscription.status === 'past_due') {
      aggregateSubscription.status = 'Late';
    }
    else {
      aggregateSubscription.status = 'Inactive';
    }
    aggregateSubscription.total = aggregateSubscription.total.toFixed(2).replace(".00", "");
    aggregateSubscription.dueDate = aggregateSubscription.dueDate.format("MMMM D, YYYY");

    return (
      <div>
        <PatientDashboardHeader user={user} />
        <PatientDashboardTabs active="profile" />

        <div styleName="content">

          {/*
          Account Status
          ------------------------------------------------------------
          */}
          <div styleName="segment">
            <div styleName="account-status">
              <p>
                <span styleName="text--inline-label">Primary Account Hoder:</span>
                <span styleName="text--primary--bold">{user.firstName} {user.lastName}</span>
              </p>

              <p>
                <span styleName="text--inline-label">Account Status:</span>
                <span styleName="text--primary--bold">{aggregateSubscription.status}</span>
              </p>

              <p>
                <span styleName="text--inline-label">Current Balance:</span>
                <span styleName="text--bold">${aggregateSubscription.total}</span>
              </p>

              <p>
                <span styleName="text--inline-label">Payment Due Date:</span>
                <span styleName="text--bold">{aggregateSubscription.dueDate}</span>
              </p>
            </div>
          </div>

          {/*
          Your Members
          ------------------------------------------------------------
          */}
          <div styleName="segment">

            <div className="row">
              <div className="col-sm-6">
                <div styleName="align-with-button">
                  <p styleName="text--label">
                    Your Memberships:
                  </p>
                </div>
              </div>

              <div className="col-sm-6">
                <div styleName="add-family-member-wrapper">
                  <input
                    type="button"
                    styleName="button--wide"
                    value="ADD MEMBER"
                    onClick={this.addMember}
                  />
                </div>
              </div>
            </div>

            <div styleName="patients-list-wrapper">
              <FamilyMembersList
                patient={user}

                onReEnrollMember={this.reEnrollMember}
                onRemoveMember={this.removeMember}
                onRenewMember={this.renewMember}
                onUpdateMember={this.updateMember}
              />
            </div>

          </div>

          {/*
          Profile & Payment Info
          ------------------------------------------------------------
          */}
          <div styleName="segment">
            <div className="row" styleName="personal-info">

              <div className="col-md-7">
                <p>
                  <span styleName="text--label">Address:</span>
                  <br />
                  {user.address}
                  <br />
                  {user.city}, {user.state} {user.zipCode}
                </p>

                <p>
                  <span styleName="text--label">Phone:</span>
                  <br />
                  {user.phone}
                </p>

                <p>
                  <span styleName="personal-info__change-link" onClick={this.editProfile}>
                    Edit Profile
                  </span>

                  <span styleName="personal-info__change-link" onClick={this.editSecuritySettings}>
                    Login &amp; Security Settings
                  </span>
                </p>
              </div>

              <div className="col-md-5">
                <p>
                  <span styleName="text--label">Payment Info:</span>

                  <span styleName="personal-info__change-link" onClick={this.changePaymentMethod}>
                    Edit / Add Payment Method
                  </span>
                </p>

                <p>
                  <span styleName="text--bold">Card Number</span>
                  <br />
                  Visa ending in 1731 {/* TODO */}
                </p>

                <p>
                  <span styleName="text--bold">Name</span>
                  <br />
                  Bob Sample {/* TODO */}
                </p>

                <p>
                  <span styleName="text--bold">Exp. Date</span>
                  <br />
                  02/2019 {/* TODO */}
                </p>
              </div>

            </div>
          </div>

        {/* End Content */}
        </div>

        <MemberFormModal
          show={editingActive}
          onCancel={this.cancelMemberFormAction}

          initialValues={editingMember}
          onSubmit={this.handleMemberFormSubmit}
        />

      {/* End Wrapper Div */}
      </div>
    );
  }
}

export default PatientProfilePage;
