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
import NavBar from 'components/NavBar';
import PatientDashboardHeader from 'components/PatientDashboardHeader';
import PatientDashboardTabs from 'components/PatientDashboardTabs';
import ConfirmModal from 'components/ConfirmModal';
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

  //remove member
  setRemovingMember,
} from './actions';
import {
  // fetch
  dentistSelector,
  familyMembersSelector,

  // add / edit member
  editingMemberSelector,

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
function mapStateToProps(state) {
  return {
    // fetch
    dentist: dentistSelector(state),
    familyMembers: familyMembersSelector(state),
    user: selectCurrentUser(state),

    // add / edit member
    editingMember: editingMemberSelector(state),

    // add / edit review
    editingReview: editingReviewSelector(state),

    // edit security
    editingSecurity: editingSecuritySelector(state),

    // edit payment info
    editingPayment: editingPaymentSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // app
    changePageTitle: (title) => dispatch(changePageTitle(title)),

    // fetch
    fetchDentist: () => dispatch(fetchDentist()),
    fetchFamilyMembers: () => dispatch(fetchFamilyMembers()),

    // add / edit member
    resetMemberForm: () => dispatch(resetForm('familyMember')),
    setEditingMember: (patient, member) => dispatch(setEditingMember(patient, member)),
    clearEditingMember: () => dispatch(clearEditingMember()),
    submitMemberForm: (patient, values) => dispatch(submitMemberForm(patient, values)),

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

    // remove member
    setRemovingMember: (patient, member, dentistId) => dispatch(setRemovingMember(patient, member, dentistId)),
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
    // react
    location: React.PropTypes.object.isRequired,

    // app - dispatch
    changePageTitle: React.PropTypes.func.isRequired,

    // fetch - state
    fetchDentist: React.PropTypes.func.isRequired,
    familyMembers: React.PropTypes.oneOfType([
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

    // remove member - dispatch
    setRemovingMember: React.PropTypes.func.isRequired,
  }

  componentWillMount = () => {
    this.state = { dialog: {} };
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
  };

  componentDidMount() {
    this.props.changePageTitle('Your Profile');
    this.props.fetchDentist();
    this.props.fetchFamilyMembers();
  }

  handleCloseDialog() {
    this.setState({ dialog: {} });
  }

  /*
  Page Actions
  ------------------------------------------------------------
  */
  // members
  addMember = (patient) => {
    this.props.resetMemberForm();
    patient.client = {};
    patient.client.id = patient.id;
    patient.client.email = patient.email;
    this.props.setEditingMember(patient, null);
  }

  reEnrollMember = (patient, member, type) => {
    let { dentist: { memberships } } = this.props;
    memberships = memberships.filter(m => m && m.active);
    const enrollmentDiv = patient.reEnrollmentFee && <div>
      <h3>Membership Fees</h3>
      {memberships.map(({ name, price, discount }, idx) => <p key={idx}>{name.ucFirst()} <b>${price}</b>, Discount: <b>{discount}%</b></p>)}
    </div>;

    const dialog = {
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

    this.setState({ dialog });
  };

  removeMember = (patient, member, dentistId) => {
    let message;
    if (member.clientSubscription.membership.type == 'month') {
      message = "We're sorry you have decided to cancel your membership. If you are cancelling prior to 3 payment a $20 cancellation fee will apply. Also should you chose to re-enroll into a monthly membership a $99 re-enrollment fee will apply. Are you sure you wish to proceed?";
    } else {
      message = "Were sorry you have decided to cancel your membership, your membership will be active until your expiration date listed on your dashboard. Are you sure you wish to proceed?";
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

  renewMember = (user, member) => {
    alert('TODO: renew member');
  }

  updateMember = (patient, member) => {
    this.props.resetMemberForm();

    this.props.setEditingMember(patient, member, (submit) => {
      this.updateMemberConfirm(patient, member, submit);
    });
  }

  // reviews
  addReview = () => {
    this.props.resetReviewForm();
    this.props.setEditingReview({});
  }

  handleCloseDialog = () => {
    let dialog = this.state.dialog;
    dialog.showDialog = false;
    this.setState({ dialog });
  }

  // security
  updateSecuritySettings = () => {
    this.props.resetSecurityForm();
    this.props.setEditingSecurity({
      changeEmail: true,
      changePassword: true,
    });
  }

  // payments
  updatePaymentInfo = (user) => {
    this.props.resetPaymentForm();
    this.props.setEditingPayment(user);
  }

  /*
  Events
  ------------------------------------------------------------
  */
  // members
  handleMemberFormSubmit = (values) => {
    this.props.submitMemberForm(this.props.editingMember.patient, values);
  }

  cancelMemberFormAction = () => {
    this.props.clearEditingMember();
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

  // payment
  handlePaymentFormSubmit = (values) => {
    this.props.submitPaymentForm(values, this.props.user);
  }

  cancelPaymentFormAction = () => {
    this.props.clearEditingPayment();
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
      dentist,
      familyMembers,
      user,

      // add / edit
      editingMember,
      editingReview,
      editingSecurity,
      editingPayment,
    } = this.props;

    const {
      dialog
    } = this.state;

    /*
    Precondition Renders
    ------------------------------------------------------------
    */
    // precondition: the data must be loaded, otherwise wait for it
    if (user === false || !familyMembers || dentist === false || !dentist.dentistInfo) {
      console.log(user, '-user-', familyMembers, '-members-', dentist, '-dentist-');
      return (
        <div>
          <NavBar pathname={location.pathname} logo={false} />
          <PatientDashboardTabs active="profile" />
          <div styleName="content">
            {
              user && familyMembers  && dentist && !dentist.dentistInfo ?
                <h3 className="text-muted block text-center">You Have No Membership</h3> :
                <LoadingSpinner showOnlyIcon={false} />
            }
          </div>

        </div>
      );
    }

    /*
    Main Render
    ------------------------------------------------------------
    */

    user.members = familyMembers;

    const aggregateSubscription = {
      status: familyMembers.reduce(
        function (aggregateStatus, member) {
          if ((member.subscription && member.subscription.status === 'past_due')
            || aggregateStatus === 'past_due'
          ) {
            aggregateStatus = 'past_due';
          }

          else if (
            (member.subscription && member.subscription.status === 'active')
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

      total: familyMembers.reduce(
        function (aggregateTotal, member) {
          if (member.subscription && member.subscription.status === 'active' && member.subscription.monthly) {
            aggregateTotal += parseFloat(member.subscription.monthly);
          }
          return aggregateTotal;
        },
        0
      ),

      dueDate: familyMembers.reduce(
        function (nearestPaymentDueDate, member) {
          const memberDueDate = moment(member.subscription ? member.subscription.endAt : null);

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
        <NavBar pathname={location.pathname} logo={dentist.dentistInfo.logo || false} />
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
                    <span styleName="text--inline-label">Primary Account Holder:</span>
                    <span styleName="text--primary--bold">{user.firstName} {user.lastName}</span>
                  </p>
                  <p>
                    <span styleName="text--inline-label">Account Status:</span>
                    <span styleName="text--primary--bold">{aggregateSubscription.status}</span>
                  </p>
                  <p>
                    <span styleName="text--inline-label">Current Balance:</span>
                    <span styleName="text--bold">${user.subscription.balance || 0}</span>
                  </p>

                  <p>
                    <span styleName="text--inline-label">Last Payment Date:</span>
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
                    onClick={this.addMember.bind(this, user)}
                  />
                </div>
              </div>
            </div>

            <div styleName="patients-list-wrapper">
              <FamilyMembersList
                patient={user}
                dentist={dentist}
                familyMembers={familyMembers}
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
                  <span styleName="text--label">Phone:</span>
                  <br />
                  {user.phone}
                </p>

                <p>
                  <span styleName="personal-info__change-link" onClick={this.updateSecuritySettings}>
                    Login &amp; Security Settings
                  </span>
                </p>
              </div>

              <div className="col-md-5">
                <p>
                  <span styleName="text--label">Payment Info:</span>

                  <span styleName="personal-info__change-link" onClick={() => this.updatePaymentInfo(user)}>
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
          show={editingSecurity !== null}
          onCancel={this.cancelSecurityFormAction}

          initialValues={editingSecurity}
          onSubmit={this.handleSecurityFormSubmit}
        />

        <CheckoutFormModal
          show={editingPayment !== null}
          onCancel={this.cancelPaymentFormAction}
          showWaiverCheckboxes={false}

          initialValues={editingPayment}
          onSubmit={this.handlePaymentFormSubmit}
        />

        <MemberFormModal
          dentist={dentist}
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
