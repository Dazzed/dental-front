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

// local
import {
  clearSignupStatus,
  dentistSpecialtiesRequest,
  signupRequest,
} from './actions';
import {
  dentistSpecialtiesSelector,
  fullNameSelector,
  isSignedUpSelector,
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

    // signup
    fullName: fullNameSelector(state),
    isSignedUp: isSignedUpSelector(state),
  };
}

function mapDispatchToProps (dispatch) {
  return {
    // fetch
    getDentistSpecialties: () => dispatch(dentistSpecialtiesRequest()),

    // signup
    changeRoute: (url) => dispatch(push(url)),
    clearSignupStatus: () => dispatch(clearSignupStatus()),
    onSignupRequest: (data) => dispatch(signupRequest(omit(data, 'unknown'))),
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
    })),

    // fetch - dispatch
    getDentistSpecialties: React.PropTypes.func,

    // signup - state
    fullName: React.PropTypes.string,
    isSignedUp: React.PropTypes.bool,

    // signup - dispatch
    changeRoute: React.PropTypes.func,
    clearSignupStatus: React.PropTypes.func,
    onSignupRequest: React.PropTypes.func,
  };

  componentWillMount () {
    this.props.getDentistSpecialties();
  }

  goToHomePage = () => {
    this.props.clearSignupStatus();
    this.props.changeRoute('/');
  }

  goToLoginPage = () => {
    this.props.changeRoute('/accounts/login');
  }

  onSignupRequest = (data) => {
    this.props.onSignupRequest(data);
  }

  render () {
    const { isSignedUp, fullName, dentistSpecialties } = this.props;

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
