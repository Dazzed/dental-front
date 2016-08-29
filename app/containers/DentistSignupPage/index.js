/**
 * Login Page
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import CSSModules from 'react-css-modules';
import { omit } from 'lodash';

import styles from './styles.css';
import DentistSignupForm from 'components/DentistSignupForm';
import * as actions from './actions';


@connect(null, mapDispatchToProps)
@CSSModules(styles)
export default class SignupPage extends Component {

  static propTypes = {
    onSignupRequest: React.PropTypes.func,
  };

  constructor (props) {
    super(props);
    this.onSignupRequest = this.props.onSignupRequest.bind(this);
  }

  render () {
    const { onSignupRequest } = this.props;

    return (
      <div styleName="wrapper">
        <div className="container" styleName="container">
          <Row>
            <Col md={6}>
              <div styleName="form-header">
                <h1>Join My Dental Marketplace!</h1>
              </div>
              <DentistSignupForm onSubmit={this.onSignupRequest} />
            </Col>
            <Col md={6}>
              <h2>Connecting your office with dental patients</h2>
              <ul>
                <li>
                  <div>Reach out to your dental patients</div>
                  <div style={{ marginLeft: '5px' }}>
                    Showcase your dental offices
                  </div>
                </li>
                <li>Display your quality and affordable dental services</li>
                <li>Give the chance to be heard, seen, and visited</li>
              </ul>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onSignupRequest: (data, dispatch) => {
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
