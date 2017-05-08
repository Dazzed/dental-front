/*
Dentist Signup Page
================================================================================
*/

/*
Imports
------------------------------------------------------------
*/
// libs
import React, { Component } from 'react';
import Col from 'react-bootstrap/lib/Col';
import Image from 'react-bootstrap/lib/Image';
import Modal from 'react-bootstrap/lib/Modal';
import Row from 'react-bootstrap/lib/Row';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { push } from 'react-router-redux';

// app
import DentistSignupForm from 'components/DentistSignupForm';
import formatDentistSignupFormSubmissionData from 'components/DentistSignupForm/format-submission-data';
import LoadingSpinner from 'components/LoadingSpinner';
import PageHeader from 'components/PageHeader';
import {
  requestServices,
} from 'containers/App/actions';
import {
  selectServices,
} from 'containers/App/selectors';

// local
import {
  clearSignupStatus,
  dentistSpecialtiesRequest,
  pricingCodesRequest,
  uploadImageRequest,
  signupRequest,
} from './actions';
import {
  dentistSpecialtiesSelector,
  accountInfoSelector,
  isSignedUpSelector,
  pricingCodesSelector,
} from './selectors';
import styles from './styles.css';

/*
Redux
------------------------------------------------------------
*/
function mapStateToProps (state) {
  return {
    // fetch
    dentistSpecialties: dentistSpecialtiesSelector(state),
    pricingCodes: pricingCodesSelector(state),
    services: selectServices(state),

    // signup
    accountInfo: accountInfoSelector(state),
    isSignedUp: isSignedUpSelector(state),
  };
}

function mapDispatchToProps (dispatch) {
  return {
    // fetch
    getDentistSpecialties: () => dispatch(dentistSpecialtiesRequest()),
    getPricingCodes: () => dispatch(pricingCodesRequest()),
    getServices: () => dispatch(requestServices()),

    // image upload
    uploadImage: (field, file) => dispatch(uploadImageRequest(field, file)),

    // signup
    changeRoute: (url) => dispatch(push(url)),
    clearSignupStatus: () => dispatch(clearSignupStatus()),
    makeSignupRequest: (values) => dispatch(signupRequest(values)),
  };
}


/*
Redux Form
------------------------------------------------------------
*/
const initialDentistSignupFormValues = {
  pricing: {
    adultYearlyFeeActivated: false,
    childYearlyFeeActivated: false,
  },

  workingHours: {
    monday: {
      isOpen: true,
      startAt: "09:00:00",
      endAt:   "17:00:00",
    },
    tuesday: {
      isOpen: true,
      startAt: "09:00:00",
      endAt:   "17:00:00",
    },
    wednesday: {
      isOpen: true,
      startAt: "09:00:00",
      endAt:   "17:00:00",
    },
    thursday: {
      isOpen: true,
      startAt: "09:00:00",
      endAt:   "17:00:00",
    },
    friday: {
      isOpen: true,
      startAt: "09:00:00",
      endAt:   "17:00:00",
    },
    saturday: {
      isOpen: false,
      startAt: "10:00:00",
      endAt:   "14:00:00",
    },
    sunday: {
      isOpen: false,
      startAt: "10:00:00",
      endAt:   "14:00:00",
    },
  },

  marketplace: {
    optIn: true,
  },
};


/*
Signup
================================================================================
*/
@connect(mapStateToProps, mapDispatchToProps)
@CSSModules(styles)
export default class SignupPage extends Component {

  static propTypes = {
    // fetch - state
    dentistSpecialties: React.PropTypes.arrayOf(React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      name: React.PropTypes.string.isRequired,
      createdAt: React.PropTypes.date,
      updatedAt: React.PropTypes.date,
    })).isRequired,

    pricingCodes: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,

    services: React.PropTypes.arrayOf(React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      name: React.PropTypes.string.isRequired,
      createdAt: React.PropTypes.date,
      updatedAt: React.PropTypes.date,
    })).isRequired,

    // fetch - dispatch
    getDentistSpecialties: React.PropTypes.func.isRequired,
    getServices: React.PropTypes.func.isRequired,

    // image upload - dispatch
    uploadImage: React.PropTypes.func.isRequired,

    // signup - state
    accountInfo: React.PropTypes.shape({
      fullName: React.PropTypes.string.isRequired,
      loginEmail: React.PropTypes.string.isRequired,
    }).isRequired,
    isSignedUp: React.PropTypes.bool.isRequired,

    // signup - dispatch
    changeRoute: React.PropTypes.func.isRequired,
    clearSignupStatus: React.PropTypes.func.isRequired,
    makeSignupRequest: React.PropTypes.func.isRequired,
  };

  componentWillMount () {
    this.props.getDentistSpecialties();
    this.props.getPricingCodes();
    this.props.getServices();
  }

  /*
  Actions
  ------------------------------------------------------------
  */
  goToLoginPage = () => {
    this.props.clearSignupStatus();
    this.props.changeRoute('/accounts/login');
  }

  /*
  Events
  ------------------------------------------------------------
  */
  onImageUpload = (field, file) => {
    this.props.uploadImage(field, file);
  }

  onSignupRequest = (data) => {
    const formattedData = formatDentistSignupFormSubmissionData(data);

    this.props.makeSignupRequest(formattedData);
  }

  /*
  Render
  ------------------------------------------------------------
  */
  render () {
    const {
      // fetch
      dentistSpecialties,
      pricingCodes,
      services,

      // signup
      accountInfo,
      isSignedUp,
    } = this.props;

    const borderContent = (
      <span className="text-uppercase">
        Please enter your office details here.  Questions?{' '}
        <Link to="/dentist/contact-admin"><strong>Contact us here &gt;</strong></Link>
      </span>
    );

    /*
    Precondition Renders
    ------------------------------------------------------------
    */
    // precondition: the data must be loaded, otherwise wait for it
    if (dentistSpecialties.length === 0 || pricingCodes.length === 0 || services.length === 0) {
      return (
        <div styleName="container-wrapper">
          <PageHeader title="Signup for a Dentist Account" borderContent={borderContent} />

          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2">

                <div styleName="signup-form-wrapper">
                  <h2 styleName="large-title">
                    Join DentalHQ!
                  </h2>

                  <LoadingSpinner showOnlyIcon={false} />
                </div>

              </div>
            </div>
          </div>

        </div>
      );
    }

    /*
    Main Render
    ------------------------------------------------------------
    */
    return (
      <div styleName="container-wrapper">
        <PageHeader title="Signup for a Dentist Account" borderContent={borderContent} />

        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">

              <div styleName="signup-form-wrapper">
                <h2 styleName="large-title">
                  Join DentalHQ!
                </h2>

                <DentistSignupForm
                  dentistSpecialties={dentistSpecialties}
                  pricingCodes={pricingCodes}
                  services={services}

                  initialValues={initialDentistSignupFormValues}
                  onSubmit={this.onSignupRequest}

                  onImageUpload={this.onImageUpload}
                />
              </div>

            </div>
          </div>
        </div>

        <Modal
          backdrop={'static'}
          bsSize={'lg'}
          onHide={this.goToLoginPage}
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
                Your all-star dental office is now registered with DentalHQ! You should receive a confirmation email with an activation link shortly. Please check your Contact &amp; Login email address (<a href={`mailto:${accountInfo.loginEmail}`} target="_blank">{accountInfo.loginEmail}</a>), including your spam folder.
              </p>

              <p>
                Once your account is activated, you will be able to access your dashboard and get started on your journey towards connecting with more potential dental patients!
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

      </div>
    );
  }
}
