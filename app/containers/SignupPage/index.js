/**
 * Login Page
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Modal from 'react-bootstrap/lib/Modal';
import CSSModules from 'react-css-modules';
import omit from 'lodash/omit';

import SignupForm from 'components/SignupForm';

import styles from './styles.css';
import * as actions from './actions';

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
    location: React.PropTypes.object,
    isSignedUp: React.PropTypes.bool,
    fullName: React.PropTypes.string,
  };

  onSignupRequest = (data) => {
    const { location: { query: { dentist } } } = this.props;

    if (dentist) {
      data.dentistId = parseInt(dentist, 10); // eslint-disable-line
      this.props.onSignupRequest(data);
    }
  }

  render () {
    const {
      isSignedUp,
      fullName,
      location: { query: { dentist } }
    } = this.props;

    return (
      <div styleName="wrapper">
        <div className="container" styleName="container">
          <Row>
            <Col md={6}>
              <div styleName="form-header">
                <h1>Find an All-star Dentist!</h1>
              </div>

              <SignupForm
                onSubmit={this.onSignupRequest}
                dentistId={dentist}
              />

            </Col>

            <Col md={6} style={{ fontSize: '1.125rem', paddingLeft: '8rem' }}>
              <Row>
                <Col md={12}>
                  <h2>
                    No more toothache,<br /> no more tooth decay
                  </h2>
                  <br />
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <div>Adults</div>
                  <div style={{ fontSize: '1.5rem' }}>$20.00/month</div>
                </Col>
                <Col md={6}>
                  <div>Kids 12 and under</div>
                  <div style={{ fontSize: '1.5rem' }}>$15.00/month</div>
                </Col>
              </Row>

              <h3>Adult membership will include</h3>
              <ul>
                <li>2 Cleanings per year</li>
                <li>1 comprehensive Exam/year</li>
                <li>
                  1 Periodic Exam-This is completed with cleaning every time
                   after the comp exam
                </li>
                <li>1 bitewing xray per year</li>
                <li>1 Panorex Xray Completed once every 3 years</li>
                <li>Emergency exam Allowance of 1 per year</li>
                <li>
                  Periapical film used with emergency exam Allowance of
                  1 per year
                </li>
              </ul>

              <h3>Child membership will include</h3>
              <ul>
                <li>2 Cleanings per year</li>
                <li>1 comprehensive Exam/year</li>
                <li>
                  1 Periodic Exam-This is completed with cleaning every time
                   after the comp exam
                </li>
                <li>1 bitewing xray per year</li>
                <li>1 Panorex Xray Completed once every 3 years</li>
                <li>Emergency exam Allowance of 1 per year</li>
                <li>
                  Periapical film used with emergency exam Allowance of
                  1 per year
                </li>
                <li>
                  1 fluoride treatment
                </li>
              </ul>
            </Col>

            <Modal show={isSignedUp}>
              <Modal.Body styleName="modal-background">
                <div className="row" styleName="no-padding">
                  <div className="col-md-5" />
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
  };
}


export default SignupPage;
