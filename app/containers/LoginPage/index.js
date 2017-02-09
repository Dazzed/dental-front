/*
Login Page
================================================================================
*/

/*
Imports
------------------------------------------------------------
*/
// libs
import omit from 'lodash/omit';
import React, { Component } from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

// app
import LoginForm from 'components/LoginForm';
import PageHeader from 'components/PageHeader';
import SignupForm from 'components/SignupForm';

// local
import {
  fetchOffices,
  loginRequest,
  signupRequest,
  clearSignupStatus
} from './actions';
import {
  fullNameSelector,
  isSignedUpSelector,
  officesSelector
} from './selectors';
import styles from './styles.css';

/*
Redux
------------------------------------------------------------
*/
function mapStateToProps (state) {
  return {
    // fetch
    offices: officesSelector(state),

    // signup
    fullName: fullNameSelector(state),
    isSignedUp: isSignedUpSelector(state),
  };
}

function mapDispatchToProps (dispatch) {
  return {
    // fetch
    fetchOffices: () => dispatch(fetchOffices()),

    // login
    onLoginRequest: (data) => ( // handle async tasks with sagas
      new Promise((resolve, reject) => {
        dispatch(
          loginRequest({
            data: omit(data, 'unknown'), resolve, reject
          })
        );
      })
    ),

    // signup
    changeRoute: (url) => dispatch(push(url)),
    clearSignupStatus: () => dispatch(clearSignupStatus()),
    onSignupRequest: (data) => {
      dispatch(signupRequest(omit(data, 'unknown')));
    },
  };
}


/*
Login
================================================================================
*/
@connect(mapStateToProps, mapDispatchToProps)
@CSSModules(styles)
class LoginPage extends Component {

  static propTypes = {
    // fetch - state
    offices: React.PropTypes.array,

    // fetch - dispatch
    fetchOffices: React.PropTypes.func,

    // login - dispatch
    onLoginRequest: React.PropTypes.func,

    // signup - state
    fullName: React.PropTypes.string,
    isSignedUp: React.PropTypes.bool,

    // signup - dispatch
    changeRoute: React.PropTypes.func,
    clearSignupStatus: React.PropTypes.func,
    onSignupRequest: React.PropTypes.func,
  };

  componentWillMount () {
    this.props.fetchOffices();
  }

  goToHomePage = () => {
    this.props.clearSignupStatus();
    this.props.changeRoute('/');
  }

  onLoginRequest = (data) => {
    this.props.onLoginRequest(data);
  }

  onSignupRequest = (data) => {
    this.props.onSignupRequest(data);
  }

  render () {
    const { isSignedUp, fullName, offices } = this.props;

    const borderContent = (
      <span>
        Not a member yet? No problem! <strong>Sign Up below:</strong>
      </span>
    );

    return (
      <div styleName="container-wrapper">
        <PageHeader borderContent={borderContent}>
          <LoginForm onSubmit={this.onLoginRequest} />
        </PageHeader>

        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">

              <div styleName="signup-form-wrapper">
                <h2 styleName="large-title">
                  Step 1 &gt; Tell Us About Yourself
                </h2>

                <SignupForm
                  offices={offices}
                  onSubmit={this.onSignupRequest}
                />
              </div>

            </div>
          </div>
        </div>

        <Modal show={isSignedUp} onHide={this.goToHomePage}>
          <Modal.Body styleName="modal-background">
            <div className="row" styleName="row">
              <div className="col-md-5 text-center" />
              <div className="col-md-7" styleName="main-content">
                <h2>Hi, { fullName }</h2>
                <br />

                <p>
                  Thank you for signing up!<br />
                  Please check your email to complete your account set up.
                </p>
                <br />
              </div>
            </div>
          </Modal.Body>
        </Modal>

      </div>
    );
  }
}

export default LoginPage;
