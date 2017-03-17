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
    // TODO: Do this data normalization within the DentistSignupForm itself.

    // The User needs a zipCode.
    data.user.zipCode = data.officeInfo.zipCode;

    // Normalize pricing values.
    data.pricing = {
      ...data.pricing, // just incase another field is accidentally added to the form but not added here

      codes: data.pricing.codes.map((priceCodeAmount) => {
        return parseFloat(priceCodeAmount).toFixed(2);
      }),

      adultMonthlyFee: parseFloat(data.pricing.adultMonthlyFee).toFixed(2),
      childMonthlyFee: parseFloat(data.pricing.childMonthlyFee).toFixed(2),
      adultYearlyFee: parseFloat(data.pricing.adultYearlyFee).toFixed(2),
      childYearlyFee: parseFloat(data.pricing.childYearlyFee).toFixed(2),

      adultYearlyFeeActivated: data.pricing.adultYearlyFeeActivated || false,
      childYearlyFeeActivated: data.pricing.childYearlyFeeActivated || false,

      treatmentDiscount: data.pricing.treatmentDiscount,
    };

    // The server needs an array of Service ids. Redux-Form will only included
    // checked Services, so no filtering is necessary.
    data.services = Object.keys(data.services);

    // The server needs an array of WorkingHours objects, not an object of them
    // indexed by day name.
    data.workingHours = Object.keys(data.workingHours).map((dayName) => {
      const dayHours = data.workingHours[dayName];
      dayHours.day = dayName;

      if (dayHours.isOpen === false) {
        delete dayHours.startAt;
        delete dayHours.endAt;
      }

      return dayHours;
    });

    this.props.makeSignupRequest(data);
  }
   

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
        <Link to="/todo"><strong>Contact us here &gt;</strong></Link>
        {/* TODO: dentist contact link */}
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
