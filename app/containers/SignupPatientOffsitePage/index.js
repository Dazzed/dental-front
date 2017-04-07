/*
Patient Offsite Signup Page
================================================================================
*/

/*
Imports
------------------------------------------------------------
*/
// libs
import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { push } from 'react-router-redux';
import {
  // form actions
  reset as resetForm,

  // form selectors
  getFormValues,
  getFormNames,
  isValid,
} from 'redux-form';

// app
import CheckoutFormModal from 'components/CheckoutFormModal';
import LoadingSpinner from 'components/LoadingSpinner';
import MemberFormModal from 'components/MemberFormModal';
import PageHeader from 'components/PageHeader';
import SignupPatientForm from 'components/SignupPatientForm';

// local
import {
  // fetch dentist
  fetchDentist,

  // add / edit member
  setEditingMember,
  clearEditingMember,
  submitMemberForm,

  // remove member
  setRemovingMember,

  // checkout
  setEditingCheckout,
  clearEditingCheckout,
  submitCheckoutForm,

  // signup
  signupRequest,
  clearSignupStatus,
} from './actions';
import {
  // fetch dentist
  dentistSelector,
  dentistErrorSelector,

  // fetch members
  sortedMembersSelector,

  // add / edit member
  editingMemberSelector,

  // checkout
  editingCheckoutSelector,

  // signup
  accountInfoSelector,
  isSignedUpSelector,
} from './selectors';
import styles from './styles.css';

/*
Redux
------------------------------------------------------------
*/
function mapStateToProps (state) {
  return {
    // fetch dentist
    dentist: dentistSelector(state),
    dentistError: dentistErrorSelector(state),

    // fetch members
    members: sortedMembersSelector(state),

    // add / edit member
    editingMember: editingMemberSelector(state),

    // checkout
    editingCheckout: editingCheckoutSelector(state),

    // signup
    accountInfo: accountInfoSelector(state),
    isSignedUp: isSignedUpSelector(state),
  };
}

function mapDispatchToProps (dispatch) {
  return {
    // app
    changeRoute: (url) => dispatch(push(url)),

    // fetch dentist
    fetchDentist: (dentistId) => dispatch(fetchDentist(dentistId)),

    // add / edit member
    resetMemberForm: () => dispatch(resetForm('familyMember')),
    setEditingMember: (member) => dispatch(setEditingMember(member)),
    clearEditingMember: () => dispatch(clearEditingMember()),
    submitMemberForm: (values) => dispatch(submitMemberForm(values)),

    // remove member
    setRemovingMember: (memberId) => dispatch(setRemovingMember(memberId)),

    // checkout
    resetCheckoutForm: () => dispatch(resetForm('checkout')),
    setEditingCheckout: (cardDetails) => dispatch(setEditingCheckout(cardDetails)),
    clearEditingCheckout: () => dispatch(clearEditingCheckout()),
    submitCheckoutForm: (values) => dispatch(submitCheckoutForm(values)),

    // signup
    clearSignupStatus: () => dispatch(clearSignupStatus()),
    makeSignupRequest: (data) => dispatch(signupRequest(data)),
  };
}


/*
Patient Offsite Signup
================================================================================
*/
@connect(mapStateToProps, mapDispatchToProps)
@CSSModules(styles)
export default class PatientOffsiteSignupPage extends React.Component {

  static propTypes = {
    // app - dispatch
    changeRoute: React.PropTypes.func.isRequired,

    // route - state
    routeParams: React.PropTypes.shape({
      dentistId: React.PropTypes.string.isRequired,
    }).isRequired,

    // fetch dentist - state
    dentist: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.object,
    ]).isRequired,
    dentistError: React.PropTypes.object,

    // fetch dentist - dispatch
    fetchDentist: React.PropTypes.func.isRequired,

    // fetch members - state
    members: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,

    // add / edit member - state
    editingMember: React.PropTypes.object,

    // add / edit member - dispatch
    resetMemberForm: React.PropTypes.func.isRequired,
    setEditingMember: React.PropTypes.func.isRequired,
    clearEditingMember: React.PropTypes.func.isRequired,
    submitMemberForm: React.PropTypes.func.isRequired,

    // remove member - dispatch
    setRemovingMember: React.PropTypes.func.isRequired,

    // checkout - state
    editingCheckout: React.PropTypes.object,

    // checkout - dispatch
    resetCheckoutForm: React.PropTypes.func.isRequired,
    setEditingCheckout: React.PropTypes.func.isRequired,
    clearEditingCheckout: React.PropTypes.func.isRequired,
    submitCheckoutForm: React.PropTypes.func.isRequired,

    // signup - state
    accountInfo: React.PropTypes.shape({
      fullName: React.PropTypes.string.isRequired,
      loginEmail: React.PropTypes.string.isRequired,
    }).isRequired,
    isSignedUp: React.PropTypes.bool,

    // signup - dispatch
    clearSignupStatus: React.PropTypes.func,
    makeSignupRequest: React.PropTypes.func,
  };

  componentWillMount () {
    this.props.fetchDentist(this.props.routeParams.dentistId);
  }

  /*
  Actions
  ------------------------------------------------------------
  */
  goToHomePage = () => {
    this.props.clearSignupStatus();
    this.props.changeRoute('/');
  }

  goToLoginPage = () => {
    this.props.clearSignupStatus();
    this.props.changeRoute('/accounts/login');
  }

  // members
  addMember = () => {
    this.props.resetMemberForm();
    this.props.setEditingMember({});
  }

  removeMember = (member) => {
    this.props.setRemovingMember(member.id);
  }

  updateMember = (member) => {
    this.props.resetMemberForm();
    this.props.setEditingMember(member);
  }

  // checkout
  showCheckoutStep = () => {
    this.props.resetCheckoutForm();
    this.props.setEditingCheckout({});
  }

  /*
  Events
  ------------------------------------------------------------
  */
  // user
  handleSignupPatientFormSubmit = (values) => {
    console.log("YEEEESS");
    console.log(values);
    // TODO: actions n shit
  }

  // members
  handleMemberFormSubmit = (values) => {
    this.props.submitMemberForm(values);
  }

  cancelMemberFormAction = () => {
    this.props.clearEditingMember();
  }

  // checkout
  handleCheckoutFormSubmit = (values) => {
    this.props.submitCheckoutForm(values);
    // TODO: complete signup - but here or as part of the submit checkout form action?
    //                       - checkout form action will likely need saga,
    //                         so have the saga call the complete signup action
    //                         on success
  }

  cancelCheckoutFormAction = () => {
    this.props.clearEditingCheckout();
  }

  // signup
  onSignupRequest = (data) => {
    this.props.makeSignupRequest(data);
  }   

  /*
  Render
  ------------------------------------------------------------
  */
  render () {
    const {
      // fetch
      dentist,
      dentistError,
      members,

      // add / edit
      editingMember,
      editingCheckout,

      // signup
      accountInfo,
      isSignedUp,
    } = this.props;

    const borderContent = (
      <span>
        Already A Member?
        {' '}
        <Link to="/accounts/login"><strong>Login Here</strong></Link>
      </span>
    );

    /*
    Precondition Renders
    ------------------------------------------------------------
    */
    // precondition: There were no issues loading the data, such as an invalid
    //               `dentistId` in the URL.
    if (dentistError !== null) {
      return (
        <div styleName="container-wrapper">
          <PageHeader title="Signup for a Patient Account" borderContent={borderContent} />

          <div className="container">
            <div className="row">
              <div className="col-md-offset-2 col-md-8 col-sm-12">

                <div styleName="signup-form-wrapper">
                  <h2 styleName="large-title">
                    Dentit Not Found
                  </h2>

                  <p styleName="error-message">
                    Unfortunately there is no dentist office associated with this
                    signup link.

                    Please double check the website address (URL) in
                    your browser and make sure it matches the link that you were
                    provided.  If this does not resolve the issue, please contact
                    your dentist office.  They will be able to send you a new
                    signup link.
                  </p>
                </div>

              </div>
            </div>
          </div>

        {/* End Wrapper Div */}
        </div>
      );
    }

    // precondition: the data must be loaded, otherwise wait for it
    if (dentist === false) {
      return (
        <div styleName="container-wrapper">
          <PageHeader title="Signup for a Patient Account" borderContent={borderContent} />

          <div className="container">
            <div className="row">
              <div className="col-md-offset-2 col-md-8 col-sm-12">

                <div styleName="signup-form-wrapper">
                  <LoadingSpinner showOnlyIcon={false} />
                </div>

              </div>
            </div>
          </div>

        {/* End Wrapper Div */}
        </div>
      );
    }

    /*
    Main Render
    ------------------------------------------------------------
    */
    return (
      <div styleName="container-wrapper">
        <PageHeader title="Signup for a Patient Account" borderContent={borderContent} />

        {/*
        Content
        ------------------------------------------------------------
        */}
        <div className="container">
          <div className="row">
            <div className="col-md-offset-2 col-md-8 col-sm-12">

              <div styleName="signup-form-wrapper">
                <h2 styleName="large-title">
                  Step 1 &gt; Tell Us About Yourself
                </h2>

                <p styleName="instructions">
                  <strong>Parents:</strong> this part is for you, so be sure to enter <strong>your</strong> name and contact information.  You will be able to add your children as members of your plan in Step 2.
                </p>

                <SignupPatientForm
                  autosubmit={true}
                  offices={dentist.offices}

                  onSubmit={this.handleSignupPatientFormSubmit}
                />
              </div>

            </div>
          </div>
        </div>

        {/*
        Modals
        ------------------------------------------------------------
        */}
        <MemberFormModal
          show={editingMember !== null}
          onCancel={this.cancelMemberFormAction}

          initialValues={editingMember}
          onSubmit={this.handleMemberFormSubmit}
        />

        <CheckoutFormModal
          show={editingCheckout !== null}
          onCancel={this.cancelCheckoutFormAction}

          initialValues={editingCheckout}
          onSubmit={this.handleCheckoutFormSubmit}
        />

        <Modal
          backdrop={'static'}
          bsSize={'lg'}
          onHide={this.goToHomePage}
          show={isSignedUp}
        >
          <Modal.Header closeButton>
            <Modal.Title>Welcome to DentalHQ!</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div styleName="letter">
              <p styleName="letter__to">
                Hi {accountInfo.fullName},
              </p>

              <p>
                You are now registered with DentalHQ! You should receive a confirmation email with an activation link shortly. Please check your email address (<a href="mailto:{accountInfo.loginEmail}" target="_blank">{accountInfo.loginEmail}</a>), including your spam folder.
              </p>

              <p>
                Once your account is activated, you will be able to access your dashboard where you can discover more about your dentist, members, and membership plans.
              </p>

              <p styleName="letter__from">
                Cheers,
                <br />
                The DentalHQ Team
              </p>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <div className="modal-controls">
              <input
                type="button"
                className="modal-control"
                onClick={this.goToLoginPage}
                value="Login Page >"
              />
            </div>
          </Modal.Footer>
        </Modal>

      {/* End Wrapper Div */}
      </div>
    );
  }
   
}
