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
import SignupFinalForm from 'components/SignupFinalForm';
import { selectCurrentUser } from 'containers/App/selectors';

import * as actions from './actions';
import { officesSelector, signupCompleteSelector } from './selectors';
import styles from './styles.css';


@connect(mapStateToProps, mapDispatchToProps)
@CSSModules(styles)
class SignupFinalPage extends Component {

  static propTypes = {
    onFinalSignupRequest: React.PropTypes.func,
    clearFinalSignupStatus: React.PropTypes.func,
    fetchOffices: React.PropTypes.func,
    currentUser: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.bool
    ]),
    isSignedUp: React.PropTypes.bool,
    changeRoute: React.PropTypes.func,
    offices: React.PropTypes.array,
  };

  componentWillMount () {
    this.props.fetchOffices();
  }

  onSignupRequest = (data) => {
    this.props.onFinalSignupRequest(data);
  }

  goToHomePage = () => {
    this.props.clearFinalSignupStatus();
    this.props.changeRoute('/');
  }

  goToLogout = () => {
    this.props.clearFinalSignupStatus();
    this.props.changeRoute('/accounts/logout');
  }

  render () {
    const { isSignedUp, currentUser, offices } = this.props;
    const fullName = `${currentUser.firstName} ${currentUser.lastName}`;

    return (
      <div styleName="wrapper">
        <div className="container" styleName="container">
          <Row>
            <Col md={6}>
              <div styleName="form-header">
                <h1>Complete Your Signup</h1>
              </div>

              <SignupFinalForm
                onSubmit={this.onSignupRequest}
                offices={offices}
                onLogout={this.goToLogout}
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
                      Thank you for completing signing up!
                      Now you have full access to all features.
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


function mapStateToProps (state) {
  return {
    currentUser: selectCurrentUser(state),
    isSignedUp: signupCompleteSelector(state),
    offices: officesSelector(state),
  };
}

function mapDispatchToProps (dispatch) {
  return {
    onFinalSignupRequest: (data) => {
      dispatch(actions.finalSignupRequest(
        omit(data, [ 'unknown', 'firstName', 'middleName', 'lastName' ])
      ));
    },
    clearFinalSignupStatus: () => dispatch(actions.clearFinalSignupStatus()),
    fetchOffices: () => dispatch(actions.fetchOffices()),
    changeRoute: (url) => dispatch(push(url)),
  };
}

export default SignupFinalPage;
