/*
Dentist Signup Page
================================================================================
*/

/*
Imports
------------------------------------------------------------
*/
// libs
import omit from 'lodash/omit';
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
import logo from 'assets/images/wells-family-dentistry-logo.png';
import DentistSignupForm from 'components/DentistSignupForm';
import formatDentistSignupFormSubmissionData from 'components/DentistSignupForm/format-submission-data';
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
  signupRequest,
} from './actions';
import {
  dentistSpecialtiesSelector,
  fullNameSelector,
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
    fullName: fullNameSelector(state),
    isSignedUp: isSignedUpSelector(state),
  };
}

function mapDispatchToProps (dispatch) {
  return {
    // fetch
    getDentistSpecialties: () => dispatch(dentistSpecialtiesRequest()),
    getPricingCodes: () => dispatch(pricingCodesRequest()),
    getServices: () => dispatch(requestServices()),

    // signup
    changeRoute: (url) => dispatch(push(url)),
    clearSignupStatus: () => dispatch(clearSignupStatus()),
    makeSignupRequest: (data) => dispatch(signupRequest(omit(data, 'unknown'))),
  };
}


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

    // signup - state
    fullName: React.PropTypes.string,
    isSignedUp: React.PropTypes.bool,

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
  goToHomePage = () => {
    this.props.clearSignupStatus();
    this.props.changeRoute('/');
  }

  goToLoginPage = () => {
    this.props.changeRoute('/accounts/login');
  }

  /*
  Events
  ------------------------------------------------------------
  */
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
      fullName,
      isSignedUp,
    } = this.props;

    const initialDentistSignupFormValues = {
      marketplace: {
        optIn: true,
      },

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
      }
    };

    const borderContent = (
      <span className="text-uppercase">
        Please enter your office details here.  Questions?{' '}
        <Link to="/dentist/contact-admin"><strong>Contact us here &gt;</strong></Link>
      </span>
    );

    return (
      <div styleName="container-wrapper">
        <PageHeader title="Signup for a Dentist Account" borderContent={borderContent} />

        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">

              <div styleName="signup-form-wrapper">
                <h2 styleName="large-title">
                  Join My Dental Marketplace!
                </h2>

                <DentistSignupForm
                  dentistSpecialties={dentistSpecialties}
                  pricingCodes={pricingCodes}
                  services={services}

                  initialValues={initialDentistSignupFormValues}
                  onSubmit={this.onSignupRequest}
                />
              </div>

            </div>
          </div>
        </div>

        <Modal show={isSignedUp} onHide={this.goToHomePage}>
          <Modal.Body styleName="modal-background">
            <div className="row" styleName="row">
              <div className="col-md-5 text-center">
                <Image
                  src={logo}
                  style={{ width: 200 }}
                />
              </div>
              <div className="col-md-7" styleName="main-content">
                <h2>Hi, { fullName }</h2>

                <p>Welcome to My Dental Marketplace!</p>

                <p>
                  Your all-star dental office is now registered in
                  My Dental Marketplace portal!
                </p>
                <br />
                <p>
                  Get started on your journey towards connecting
                  with more potential dental patients!
                </p>
                <br />
                <button
                  className="btn-green btn-round btn-outline"
                  onClick={this.goToLoginPage}
                >
                  Get Started
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal>

      </div>
    );
  }
}
