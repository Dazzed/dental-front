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
import Popover from 'react-bootstrap/lib/Popover';
import CSSModules from 'react-css-modules';
import FaCheck from 'react-icons/lib/fa/check';
import FaClose from 'react-icons/lib/fa/close';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { push } from 'react-router-redux';
import { actions as toastrActions } from 'react-redux-toastr';
import {
  // form actions
  reset as resetForm,
} from 'redux-form';

// app
import CheckoutFormModal from 'components/CheckoutFormModal';
import LoadingSpinner from 'components/LoadingSpinner';
import MemberFormModal from 'components/MemberFormModal';
import MembersList from 'components/MembersList/checkout';
import NavBar from 'components/NavBar';
import PageHeader from 'components/PageHeader';
import SignupPatientForm from 'components/SignupPatientForm';

// local
import {
  // fetch dentist
  fetchDentist,

  // update user
  submitUserForm,

  // add / edit member
  setEditingMember,
  clearEditingMember,
  submitMemberForm,

  // remove member
  setRemovingMember,

  // checkout
  setEditingCheckout,
  clearEditingCheckout,
  createStripeToken,
  // signup
  signupRequest,
  clearSignupStatus,
} from './actions';
import {
  // fetch dentist
  dentistSelector,
  dentistErrorSelector,

  // fetch stages
  stagesSelector,

  // fetch user
  userSelector,

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
function mapStateToProps(state) {
  return {
    // fetch dentist
    dentist: dentistSelector(state),
    dentistError: dentistErrorSelector(state),

    // fetch stages
    stages: stagesSelector(state),

    // fetch user
    user: userSelector(state),

    // add / edit member
    editingMember: editingMemberSelector(state),

    // checkout
    editingCheckout: editingCheckoutSelector(state),

    // signup
    accountInfo: accountInfoSelector(state),
    isSignedUp: isSignedUpSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // app
    changeRoute: (url) => dispatch(push(url)),
    toastError: (message) => dispatch(toastrActions.error(message)),

    // fetch dentist
    fetchDentist: (dentistId) => dispatch(fetchDentist(dentistId)),

    // update user
    submitUserForm: (values) => dispatch(submitUserForm(values)),

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
    createStripeToken: (cardDetails, user, paymentInfo) => dispatch(createStripeToken(cardDetails, user, paymentInfo)),

    // signup
    clearSignupStatus: () => dispatch(clearSignupStatus()),
    makeSignupRequest: (user, paymentInfo) => dispatch(signupRequest(user, paymentInfo)),
  };
}


/*
Patient Offsite Signup
================================================================================
*/
@connect(mapStateToProps, mapDispatchToProps)
@CSSModules(styles, { allowMultiple: true })
export default class PatientOffsiteSignupPage extends React.Component {

  static propTypes = {
    // react
    location: React.PropTypes.object.isRequired,

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

    // fetch stages - state
    stages: React.PropTypes.shape({
      one: React.PropTypes.bool,
      two: React.PropTypes.bool,
      three: React.PropTypes.bool,
    }),

    // fetch user - state
    user: React.PropTypes.object.isRequired,

    // update user - dispatch
    submitUserForm: React.PropTypes.func.isRequired,

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

  constructor(props) {
    super(props);

    this.state = {
      soloAccountMemberConfirmation: false,
    };
  }

  componentWillMount() {
    this.props.fetchDentist(this.props.routeParams.dentistId);
    if (!window.Stripe) {
      this.props.toastError('There was an error embedding Stripe, please reload the page');
    }
  }

  /*
  Actions
  ------------------------------------------------------------
  */
  goToLoginPage = () => {
    this.props.clearSignupStatus();
    this.props.changeRoute('/accounts/login');
  };

  // members
  addMember = () => {
    this.props.resetMemberForm();
    this.props.setEditingMember({});
  };

  removeMember = (user, member) => {
    this.props.setRemovingMember(member.id);
  };

  updateMember = (user, member) => {
    this.props.resetMemberForm();
    this.props.setEditingMember(member);
  };

  // checkout
  checkout = () => {
    const {
      user
    } = this.props;

    const {
      soloAccountMemberConfirmation,
    } = this.state;

    if (user.members.length === 1
      && user.payingMember === true
      && soloAccountMemberConfirmation === false
    ) {
      this.setState({
        ...this.state,
        soloAccountMemberConfirmation: true,
      });
    }

    else {
      this.props.resetCheckoutForm();
      this.props.setEditingCheckout({});

      if (soloAccountMemberConfirmation !== false) {
        this.clearSoloAccountMemberConfirmation();
      }
    }
  };

  clearSoloAccountMemberConfirmation = () => {
    this.setState({
      ...this.state,
      soloAccountMemberConfirmation: false,
    });
  };

  /*
  Events
  ------------------------------------------------------------
  */
  // user
  handleUserFormSubmit = (values) => {
    this.props.submitUserForm(values);
  };

  // members
  handleMemberFormSubmit = (values) => {
    this.props.submitMemberForm(values);
  };

  cancelMemberFormAction = () => {
    this.props.clearEditingMember();
  };

  // checkout
  handleCheckoutFormSubmit = (paymentInfo) => {
    this.props.createStripeToken({
      number: paymentInfo.number,
      name: paymentInfo.fullName,
      cvc: paymentInfo.cvc,
      expiry: paymentInfo.expiry
    }, this.props.user, paymentInfo);
    // this.props.makeSignupRequest(this.props.user, paymentInfo);
  };

  cancelCheckoutFormAction = () => {
    this.props.clearEditingCheckout();
  };

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
      dentistError,
      stages,
      user,

      // add / edit
      editingMember,
      editingCheckout,

      // signup
      accountInfo,
      isSignedUp,
    } = this.props;

    const {
      soloAccountMemberConfirmation,
    } = this.state;

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
          <NavBar pathname={location.pathname} logo={false} />
          <PageHeader title="Signup for a Patient Account" borderContent={borderContent} />

          <div className="container">
            <div className="row">
              <div className="col-md-offset-2 col-md-8 col-sm-12">

                <div styleName="stage">
                  <h2 styleName="large-title">
                    Dentist Not Found
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
          <NavBar pathname={location.pathname} logo={false} />
          <PageHeader title="Signup for a Patient Account" borderContent={borderContent} />

          <div className="container">
            <div className="row">
              <div className="col-md-offset-2 col-md-8 col-sm-12">

                <div styleName="stage">
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
    // OLD CODE
    // const adultSavings = dentist.dentistInfo.membership.savings;
    // const adultMembership = {
    //   monthly: dentist.dentistInfo.membership.price.replace(".00", ""),
    //   savings: String(dentist.dentistInfo.membership.savings).replace(".00", ""),
    // };

    // const childSavings = dentist.dentistInfo.childMembership.savings;
    // const childMembership = {
    //   monthly: dentist.dentistInfo.childMembership.price.replace(".00", ""),
    //   savings: String(dentist.dentistInfo.childMembership.savings).replace(".00", ""),
    // };

    // NEW CODE
    let { memberships } = dentist;
    memberships = memberships.filter(m => m.active);
    const adultMembership = (() => {
      let adultMonthly = memberships.find(m => m.subscription_age_group === 'adult' && m.active && m.type === 'month');
      // let adultAnnual = memberships.find(m => m.name === 'default annual membership');
      if (adultMonthly) {
        let savings = Number(adultMonthly.price) * 4;
        return {
          monthly: adultMonthly.price.replace('.00', ''),
          savings: String(Math.floor(savings))
        };
      } else {
        return {
          monthly: '',
          savings: '',
        };
      }
    })();

    const adultMonthly = memberships.find(m => m.subscription_age_group === 'adult' && m.active && m.type === 'month');
    const adultDiscount = adultMonthly.discount;

    const childMembership = (() => {
      let childMonthly = memberships.find(m => m.subscription_age_group === 'child' && m.active && m.type === 'month');
      if (childMonthly) {
        let savings = Number(childMonthly.price) * (36/7);
        return {
          monthly: childMonthly.price.replace('.00', ''),
          savings: String(Math.floor(savings))
        };
      } else {
          return {
            monthly: '',
            savings: '',
          };
      }
    })();

    const childMonthly = memberships.find(m => m.subscription_age_group === 'child' && m.active && m.type === 'month');
    const childDiscount = childMonthly.discount;

    dentist.dentistInfo.membership = adultMembership;
    dentist.dentistInfo.childMembership = childMembership;

    const soloAccountMemberConfirmationPopover = soloAccountMemberConfirmation === false
      ? null
      : (<Popover
        className="popover--large"
        id="solo-account-member-confirmation-popover"
        placement="right"
        positionLeft={68}
        positionTop={-44}
        title="No additional members?"
      >
        <p>
          Please confirm that you are the only member you are adding at this time.
            </p>

        <div styleName="popover__controls">
          <span
            styleName="popover__control popover__control--close"
            onClick={this.clearSoloAccountMemberConfirmation}
          >
            <FaClose />
          </span>

          <input
            type="button"
            styleName="popover__control button--short"
            onClick={this.checkout}
            value="Yes"
          />
        </div>
      </Popover>
      );

    return (
      <div styleName="container-wrapper">
        <NavBar pathname={location.pathname} logo={dentist.dentistInfo.logo || false} />
        <PageHeader title="Signup for a Patient Account" borderContent={borderContent} imgY={0}>
          <div className="row">

            {/*
            Adult Membership
            ------------------------------------------------------------
            TODO: Pull this & the Child Membership out into their own component?
                  It's also on the Patient Membership Info Page.
            */}
            <div className="col-md-offset-1 col-md-4">
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
                  <li><FaCheck /> {adultDiscount}% off any needed treatment</li>
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
            <div className="col-md-offset-1 col-md-5">
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
                  <li><FaCheck /> {childDiscount}% off any needed treatment</li>
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
        </PageHeader>

        <div className="container">
          <div className="row">
            <div className="col-md-offset-2 col-md-8 col-sm-12">

              {/*
                Stage 1: Signup Patient Form
                ------------------------------------------------------------
                NOTE: `stages.one` should always be true.  The code is written as such
                to keep it consistent with the other stages.

                NOTE: The initialValues presented by `user` are just it's preset
                uniqueID.
                */}
              {stages.one && (
                <div styleName="stage">
                  <h2 styleName="large-title">
                    Step 1 &gt; Tell Us About Yourself
                    </h2>

                  <p styleName="instructions">
                    Grown Ups, this part is for you, so be sure to enter your name and contact information. You will be able to add yourself and your family as members of your plan in Step 2
                    </p>

                  <SignupPatientForm
                    autosubmit={true}
                    dentist={dentist}
                    initialValues={user}
                    onSubmit={this.handleUserFormSubmit}
                  />
                </div>
              )}

              {/*
                Stage 2: Add / Edit Members
                ------------------------------------------------------------
                */}
              {stages.two && (
                <div styleName="stage">
                  <h2 styleName="large-title">
                    Step 2 &gt; Add a Member
                    </h2>

                  <p styleName="instructions">
                    Add your family members to your plan here.  If you also want to be covered under the plan, please check "I Will Also Be A Member" in Step 1.
                    </p>

                  <MembersList
                    patient={user}
                    dentist={dentist}
                    onRemoveMember={this.removeMember}
                    onUpdateMember={this.updateMember}
                    canRemove={true}
                  />

                  <div className="text-center">
                    <input
                      type="button"
                      styleName="large-button--secondary"
                      value="ADD MEMBER"
                      onClick={this.addMember}
                    />
                  </div>
                </div>
              )}

              {stages.three && (
                <div styleName="stage">
                  <h2 styleName="large-title">
                    Step 3 &gt; Checkout
                    </h2>

                  <p styleName="instructions">
                    After you have added all of the members you wish to include in your plan, you should procede to checkout.
                    </p>

                  <div className="text-center">
                    <div styleName="popover__container">
                      {soloAccountMemberConfirmationPopover}
                    </div>

                    <input
                      type="button"
                      styleName="large-button--secondary"
                      disabled={soloAccountMemberConfirmation === true}
                      onClick={this.checkout}
                      value="CHECKOUT"
                    />
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>

        {/*
        Modals
        ------------------------------------------------------------
        */}
        <MemberFormModal
          dentist={dentist}
          show={editingMember !== null}
          onCancel={this.cancelMemberFormAction}
          initialValues={editingMember}
          onFormSubmit={this.handleMemberFormSubmit}
        />

        <CheckoutFormModal
          listMembers={true}
          user={user}
          show={editingCheckout !== null}
          dentist={dentist}
          onCancel={this.cancelCheckoutFormAction}
          showWaiverCheckboxes={true}


          initialValues={editingCheckout}
          onSubmit={this.handleCheckoutFormSubmit}
        />

        <Modal
          backdrop={'static'}
          bsSize={'lg'}
          onHide={this.goToLoginPage}
          show={isSignedUp}
        >
          <Modal.Header closeButton>
            <Modal.Title>Welcome to {dentist.dentistInfo.officeName}!</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div styleName="letter">
              <p styleName="letter__to">
                Hi {accountInfo.fullName},
              </p>

              <p>
                You are now registered for our dental membership plan! You should receive a confirmation email with an activation link shortly. Please check your email address (<a href={`mailto:${accountInfo.loginEmail}`} target="_blank">{accountInfo.loginEmail}</a>), including your spam folder.
              </p>

              <p>
                Once your account is activated, you will be able to access your dashboard where you can discover more about your dentist, members, and membership plans.
              </p>

              <p styleName="letter__from">
                Cheers,
                <br />
                {dentist.dentistInfo.officeName}
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
