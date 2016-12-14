/**
 * Login Page
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Modal from 'react-bootstrap/lib/Modal';
import Image from 'react-bootstrap/lib/Image';
import CSSModules from 'react-css-modules';
import omit from 'lodash/omit';

import logo from 'assets/images/logo2.png';
import SignupForm from 'components/SignupForm';

import * as actions from './actions';
import styles from './styles.css';


@connect(
  state => ({
    isSignedUp: state.signup.patientCreated,
    fullName: state.signup.fullName,
  }),
  mapDispatchToProps)
@connect(null, mapDispatchToProps)
@CSSModules(styles)
class SignupPage extends Component {

  static propTypes = {
    onSignupRequest: React.PropTypes.func,
    clearSignupStatus: React.PropTypes.func,
    location: React.PropTypes.object,
    isSignedUp: React.PropTypes.bool,
    fullName: React.PropTypes.string,
    changeRoute: React.PropTypes.func,
  };

  onSignupRequest = (data) => {
    this.props.onSignupRequest(data);
  }

  goToHomePage = () => {
    this.props.clearSignupStatus();
    this.props.changeRoute('/');
  }

  render () {
    const {
      isSignedUp,
      fullName,
    } = this.props;

    return (
      <div styleName="wrapper">
        <div className="container" styleName="container">
          <Row>
            <Col md={6}>
              <div styleName="form-header">
                <h1>Create your Membership Account</h1>
              </div>

              <SignupForm
                onSubmit={this.onSignupRequest}
              />

            </Col>

            <Col md={6} style={{ fontSize: '1.125rem', paddingLeft: '8rem' }}>
              <Row>
                <Col md={12}>
                  <h2>
                    Our Loyalty Memberships
                  </h2>
                  <br />
                </Col>
              </Row>

              <Row>
                <Col md={12}>
                  <div><h3>Adult Membership $33/month</h3></div>
                  <ul>
                    <li>2 cleanings/year</li>
                    <li>2 exams with necessary xrays/year</li>
                    <li>Panorex xray once every 3 years</li>
                    <li>1 emergency exam and xray/year</li>
                    <li>10% of any needed treatment</li>
                  </ul>
                  <h3 styleName="savings-dollar">Total Savings/year=$118</h3>
                </Col>
              </Row>
              <br />
              <Row>
                <Col md={12}>
                  <div><h3>Child Membership $29/month</h3></div>
                  <ul>
                    <li>2 cleanings/year</li>
                    <li>2 exams with necessary xrays/year</li>
                    <li>Panorex xray once every 3 years</li>
                    <li>1 emergency exam with xray/year</li>
                    <li>1 Fluoride treatment/year</li>
                    <li>10% off any needed treatment</li>
                  </ul>
                  <h3 styleName="savings-dollar">Total Savings=$151/year</h3>
                </Col>
              </Row>
            </Col>

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
                    <br />

                    <p>
                      Thank you for signing up!
                      Please check your email to activate your account.
                    </p>
                    <br />
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          </Row>
        </div>
      </div>
    );
  }
}


function mapDispatchToProps (dispatch) {
  return {
    onSignupRequest: (data) => {
      dispatch(actions.signupRequest(omit(data, 'unknown')));
    },
    clearSignupStatus: () => dispatch(actions.clearSignupStatus()),
    changeRoute: (url) => dispatch(push(url)),
  };
}


export default SignupPage;
