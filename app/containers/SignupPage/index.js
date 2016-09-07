/**
 * Login Page
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import CSSModules from 'react-css-modules';
import { omit } from 'lodash';

import SignupForm from 'components/SignupForm';

import styles from './styles.css';
import * as actions from './actions';


@connect(null, mapDispatchToProps)
@CSSModules(styles)
class SignupPage extends Component {

  static propTypes = {
    onSignupRequest: React.PropTypes.func,
  };

  constructor (props) {
    super(props);
    this.onSignupRequest = this.props.onSignupRequest.bind(this);
  }

  render () {
    return (
      <div styleName="wrapper">
        <div className="container" styleName="container">
          <Row>
            <Col md={6}>
              <div styleName="form-header">
                <h1>Find an All-star Dentist!</h1>
              </div>

              <SignupForm onSubmit={this.onSignupRequest} />

            </Col>

            <Col md={6} style={{ fontSize: '1.125rem', paddingLeft: '8rem' }}>
              <h2>No more toothache,<br /> no more tooth decay</h2>
              <ul>
                <li>Basic Dental Cleaning every 6 months</li>
                <li>Exams and X-rays as needed</li>
                <li>Fluoride treatment for kids once per year</li>
                <li>Emergency exam and xray once a year</li>
                <li>1 emergency exam and xrays per year</li>
                <li>10% Discount on any needed treatment</li>
                <li>
                  Affordable memberships plans starting as low as $20/month
                </li>
              </ul>
              <Col md={6}>
                <div>Adults</div>
                <div style={{ fontSize: '1.5rem' }}>$20.00/month</div>
              </Col>
              <Col md={6}>
                <div>Kids 12 and under</div>
                <div style={{ fontSize: '1.5rem' }}>$15.00/month</div>
              </Col>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}


function mapDispatchToProps (dispatch) {
  return {
    onSignupRequest: (data) => {
      // Temporary until we decide datepicker lib
      data.birthDate = '1988-05-06'; // eslint-disable-line no-param-reassign
      return new Promise((resolve, reject) => {
        dispatch(
          actions.signupRequest({
            data: omit(data, 'unknown'), resolve, reject
          })
        );
      });
    }
  };
}

export default SignupPage;
