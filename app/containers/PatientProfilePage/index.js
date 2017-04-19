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
import AccountSecurityFormModal from 'components/AccountSecurityFormModal';
import Avatar from 'components/Avatar';
import CheckoutFormModal from 'components/CheckoutFormModal';
import FamilyMembersList from 'components/FamilyMembersList';
import LoadingSpinner from 'components/LoadingSpinner';
import MemberFormModal from 'components/MemberFormModal';
import PatientDashboardHeader from 'components/PatientDashboardHeader';
import PatientDashboardTabs from 'components/PatientDashboardTabs';
import PatientProfileFormModal from 'components/PatientProfileFormModal';
import ReviewFormModal from 'components/ReviewFormModal';
import { changePageTitle } from 'containers/App/actions';
import { selectCurrentUser } from 'containers/App/selectors';

// local
import {
  // fetch
  fetchDentist,
  fetchFamilyMembers,

  // add / edit member
  setEditingMember,
  clearEditingMember,
  submitMemberForm,

  // edit profile
  setEditingProfile,
  clearEditingProfile,
  submitProfileForm,

  // add / edit review
  setEditingReview,
  clearEditingReview,
  submitReviewForm,

  // edit security
  setEditingSecurity,
  clearEditingSecurity,
  submitSecurityForm,

  // edit payment info
  setEditingPayment,
  clearEditingPayment,
  submitPaymentForm,
} from './actions';
import {
  // fetch
  dentistSelector,
  membersSelector,

  // add / edit member
  editingMemberSelector,

  // edit profile
  editingProfileSelector,

  // add / edit review
  editingReviewSelector,

  // edit security
  editingSecuritySelector,

  // edit payment info
  editingPaymentSelector,
} from './selectors';
import styles from './styles.css';

/*
Redux
------------------------------------------------------------
*/
function mapStateToProps (state) {
  return {
    // fetch
    dentist: dentistSelector(state),
    members: membersSelector(state),
    user: selectCurrentUser(state),

    // add / edit member
    editingMember: editingMemberSelector(state),

    // edit profile
    editingProfile: editingProfileSelector(state),

    // add / edit review
    editingReview: editingReviewSelector(state),

    // edit security
    editingSecurity: editingSecuritySelector(state),

    // edit payment info
    editingPayment: editingPaymentSelector(state),
  };
}

function mapDispatchToProps (dispatch) {
  return {
    // app
    changePageTitle: (title) => dispatch(changePageTitle(title)),

    // fetch
    fetchDentist: () => dispatch(fetchDentist()),
    fetchFamilyMembers: () => dispatch(fetchFamilyMembers()),

    // add / edit member
    resetMemberForm: () => dispatch(resetForm('familyMember')),
    setEditingMember: (member) => dispatch(setEditingMember(member)),
    clearEditingMember: () => dispatch(clearEditingMember()),
    submitMemberForm: (values, userId) => dispatch(submitMemberForm(values, userId)),

    // edit profile
    resetProfileForm: () => dispatch(resetForm('patientProfile')),
    setEditingProfile: (user) => dispatch(setEditingProfile(user)),
    clearEditingProfile: () => dispatch(clearEditingProfile()),
    submitProfileForm: (values, userId) => dispatch(submitProfileForm(values, userId)),

    // add / edit review
    resetReviewForm: () => dispatch(resetForm('review')),
    setEditingReview: (review) => dispatch(setEditingReview(review)),
    clearEditingReview: () => dispatch(clearEditingReview()),
    submitReviewForm: (values, dentistId) => dispatch(submitReviewForm(values, dentistId)),

    // edit security
    resetSecurityForm: () => dispatch(resetForm('accountSecurity')),
    setEditingSecurity: (securityInfo) => dispatch(setEditingSecurity(securityInfo)),
    clearEditingSecurity: () => dispatch(clearEditingSecurity()),
    submitSecurityForm: (values, user) => dispatch(submitSecurityForm(values, user)),

    // edit payment info
    resetPaymentForm: () => dispatch(resetForm('checkout')),
    setEditingPayment: (paymentInfo) => dispatch(setEditingPayment(paymentInfo)),
    clearEditingPayment: () => dispatch(clearEditingPayment()),
    submitPaymentForm: (values, userId) => dispatch(submitPaymentForm(values, userId)),
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
    fetchDentist: React.PropTypes.func.isRequired,
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
    editingMember: React.PropTypes.object,

    // add / edit member - dispatch
    resetMemberForm: React.PropTypes.func.isRequired,
    setEditingMember: React.PropTypes.func.isRequired,
    clearEditingMember: React.PropTypes.func.isRequired,
    submitMemberForm: React.PropTypes.func.isRequired,

    // edit profile - state
    editingProfile: React.PropTypes.object,

    // edit profile - dispatch
    resetProfileForm: React.PropTypes.func.isRequired,
    setEditingProfile: React.PropTypes.func.isRequired,
    clearEditingProfile: React.PropTypes.func.isRequired,
    submitProfileForm: React.PropTypes.func.isRequired,

    // add / edit review - state
    editingReview: React.PropTypes.object,

    // add / edit review - dispatch
    resetReviewForm: React.PropTypes.func.isRequired,
    setEditingReview: React.PropTypes.func.isRequired,
    clearEditingReview: React.PropTypes.func.isRequired,
    submitReviewForm: React.PropTypes.func.isRequired,

    // edit security - state
    editingSecurity: React.PropTypes.object,

    // edit security - dispatch
    resetSecurityForm: React.PropTypes.func.isRequired,
    setEditingSecurity: React.PropTypes.func.isRequired,
    clearEditingSecurity: React.PropTypes.func.isRequired,
    submitSecurityForm: React.PropTypes.func.isRequired,

    // edit payment info - state
    editingPayment: React.PropTypes.object,

    // edit payment - dispatch
    resetPaymentForm: React.PropTypes.func.isRequired,
    setEditingPayment: React.PropTypes.func.isRequired,
    clearEditingPayment: React.PropTypes.func.isRequired,
    submitPaymentForm: React.PropTypes.func.isRequired,
  }

  componentDidMount () {
    this.props.changePageTitle('Your Profile');
    this.props.fetchDentist();
    this.props.fetchFamilyMembers();
  }

  /*
  Page Actions
  ------------------------------------------------------------
  */
  // members
  addMember = (user) => {
    this.props.resetMemberForm();
    this.props.setEditingMember({});
  }

  reEnrollMember = (user, member) => {
    alert('TODO: re-enroll member');
  }

  removeMember = (user, member) => {
    alert('TODO: remove member');
  }

  renewMember = (user, member) => {
    alert('TODO: renew member');
  }

  updateMember = (user, member) => {
    this.props.resetMemberForm();
    this.props.setEditingMember(member);
  }

  // profile
  updateProfile = () => {
    this.props.resetProfileForm();
    this.props.setEditingProfile(this.props.user);
  }

  // reviews
  addReview = () => {
    this.props.resetReviewForm();
    this.props.setEditingReview({});
  }

  // security
  updateSecuritySettings = () => {
    this.props.resetSecurityForm();
    this.props.setEditingSecurity({});
  }

  // payments
  updatePaymentInfo = () => {
    this.props.resetPaymentForm();
    this.props.setEditingPayment({});
  }

  /*
  Events
  ------------------------------------------------------------
  */
  // members
  handleMemberFormSubmit = (values) => {
    this.props.submitMemberForm(values, this.props.user.id);
  }

  cancelMemberFormAction = () => {
    this.props.clearEditingMember();
  }

  // profile
  handleProfileFormSubmit = (values) => {
    // Update the actual phone # / address objects, instead of just the
    // shortcut property derived from them.
    values.addresses[0].value = values.address;
    values.phoneNumbers[0].number = values.phone;

    this.props.submitProfileForm(values, this.props.user.id);
  }

  cancelProfileFormAction = () => {
    this.props.clearEditingProfile();
  }

  goToProfileForm = () => {
    this.cancelSecurityFormAction();
    this.updateProfile();
  }

  // reviews
  handleReviewFormSubmit = (values) => {
    this.props.submitReviewForm(values, this.props.dentist.id);
  }

  cancelReviewFormAction = () => {
    this.props.clearEditingReview();
  }

  // secruity
  handleSecurityFormSubmit = (values) => {
    this.props.submitSecurityForm(values, this.props.user);
  }

  cancelSecurityFormAction = () => {
    this.props.clearEditingSecurity();
  }

  goToSecurityForm = () => {
    this.cancelProfileFormAction();
    this.updateSecuritySettings();
  }

  // payment
  handlePaymentFormSubmit = (values) => {
    this.props.submitPaymentForm(values, this.props.user.id);
  }

  cancelPaymentFormAction = () => {
    this.props.clearEditingPayment();
  }

  /*
  Render
  ------------------------------------------------------------
  */
  render () {
    const {
      // fetch
      dentist,
      members,
      user,

      // add / edit
      editingMember,
      editingProfile,
      editingReview,
      editingSecurity,
      editingPayment,
    } = this.props;

    /*
    Precondition Renders
    ------------------------------------------------------------
    */
    // precondition: the data must be loaded, otherwise wait for it
    if (user === false || members === false || dentist === false) {
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
            <div className="row">
              <div className="col-sm-9">
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

              <div className="col-sm-3">
                <div className="text-right">
                  <a href={`mailto:${dentist.dentistInfo.email}`} target="_blank">
                    <input
                      type="button"
                      styleName="button--full-width"
                      value="MESSAGE DENTIST"
                    />
                  </a>
                  <input
                    type="button"
                    styleName="button--full-width"
                    value="REVIEW DENTIST"
                    onClick={this.addReview}
                  />
                </div>
              </div>

            </div>
          </div>

          {/*
          Your Members
          ------------------------------------------------------------
          */}
          <div styleName="segment">

            <div className="row">
              <div className="col-sm-9">
                <div styleName="align-with-button">
                  <p styleName="text--label">
                    Your Memberships:
                  </p>
                </div>
              </div>

              <div className="col-sm-3">
                <div className="text-right">
                  <input
                    type="button"
                    styleName="button--full-width"
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
                  <span styleName="personal-info__change-link" onClick={this.updateProfile}>
                    Edit Profile
                  </span>

                  <span styleName="personal-info__change-link" onClick={this.updateSecuritySettings}>
                    Login &amp; Security Settings
                  </span>
                </p>
              </div>

              <div className="col-md-5">
                <p>
                  <span styleName="text--label">Payment Info:</span>

                  <span styleName="personal-info__change-link" onClick={this.updatePaymentInfo}>
                    Update Payment Method
                  </span>
                </p>

                {/* Hiding mocked-up portions of the UI.  Just uncomment to enable. */}
                {/*
                <p>
                  <span styleName="text--bold">Card Number</span>
                  <br />
                  Visa ending in 1731
                </p>

                <p>
                  <span styleName="text--bold">Name</span>
                  <br />
                  Bob Sample
                </p>

                <p>
                  <span styleName="text--bold">Exp. Date</span>
                  <br />
                  02/2019
                </p>
                */}
              </div>

            </div>
          </div>

        {/* End Content */}
        </div>

        <AccountSecurityFormModal
          goToProfileForm={this.goToProfileForm}

          show={editingSecurity !== null}
          onCancel={this.cancelSecurityFormAction}

          initialValues={editingSecurity}
          onSubmit={this.handleSecurityFormSubmit}
        />

        <CheckoutFormModal
          show={editingPayment !== null}
          onCancel={this.cancelPaymentFormAction}

          initialValues={editingPayment}
          onSubmit={this.handlePaymentFormSubmit}
        />

        <MemberFormModal
          dentistInfo={dentist.dentistInfo}

          show={editingMember !== null}
          onCancel={this.cancelMemberFormAction}

          initialValues={editingMember}
          onFormSubmit={this.handleMemberFormSubmit}
        />

        <PatientProfileFormModal
          goToSecurityForm={this.goToSecurityForm}

          show={editingProfile !== null}
          onCancel={this.cancelProfileFormAction}

          initialValues={editingProfile}
          onSubmit={this.handleProfileFormSubmit}
        />

        <ReviewFormModal
          show={editingReview !== null}
          onCancel={this.cancelReviewFormAction}

          initialValues={editingReview}
          onSubmit={this.handleReviewFormSubmit}
        />

      {/* End Wrapper Div */}
      </div>
    );
  }
}

export default PatientProfilePage;
