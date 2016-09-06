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
import { push } from 'react-router-redux';

import DentistSignupForm from 'components/DentistSignupForm';
import { dentistSpecialtiesRequest } from 'containers/App/actions';

import styles from './styles.css';
import * as actions from './actions';


@connect(
  state => ({
    isSignedUp: state.dentistSignup.get('dentistCreated'),
    fullName: state.dentistSignup.get('fullName'),
  }),
  mapDispatchToProps)
@CSSModules(styles)
export default class SignupPage extends Component {

  static propTypes = {
    onSignupRequest: React.PropTypes.func,
    goToLoginPage: React.PropTypes.func,
    getDentistSpecialties: React.PropTypes.func,
    isSignedUp: React.PropTypes.bool,
    fullName: React.PropTypes.string,
  };

  constructor (props) {
    super(props);
    this.onSignupRequest = this.props.onSignupRequest.bind(this);
    this.goToLoginPage = this.props.goToLoginPage.bind(this);
  }

  componentWillMount () {
    this.props.getDentistSpecialties();
  }

  render () {
    const { isSignedUp, fullName } = this.props;

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

            <Modal show={isSignedUp}>
              <Modal.Body styleName="modal-background">
                <div className="row" styleName="no-padding">
                  <div className="col-md-5"> Icon should go here</div>
                  <div className="col-md-7" styleName="main-content">
                    <h2>{ fullName },</h2>

                    <p>Welcome to My Dental Marketplace!</p>

                    <p>
                      Your all-star dental office is now registered in
                      My Dental Marketplace portal!.
                    </p>
                    <br />
                    <p>
                      Get started on your journey towards connecting
                      with more potential dental patients!
                    </p>
                    <br />
                    <button
                      className="btn-bg btn-green btn-round btn-outline"
                      onClick={this.goToLoginPage}
                    >
                      Get Started
                    </button>
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
    getDentistSpecialties: () => {
      dispatch(dentistSpecialtiesRequest());
    },
    goToLoginPage: () => {
      dispatch(push('/accounts/login'));
    },
  };
}
