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
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';

// app
import LoginForm from 'components/LoginForm';
import PageHeader from 'components/PageHeader';
import SignupForm from 'components/SignupForm';

// local
import styles from './styles.css';
import * as actions from './actions';

/*
Redux
------------------------------------------------------------
*/
function mapDispatchToProps (dispatch) {
  return {
    onLoginRequest: (data) => ( // handle async tasks with sagas
      new Promise((resolve, reject) => {
        dispatch(
          actions.loginRequest({
            data: omit(data, 'unknown'), resolve, reject
          })
        );
      })
    ),

    onSignupRequest: (data) => {
      dispatch(actions.signupRequest(omit(data, 'unknown')));
    },
  };
}


/*
Login
================================================================================
*/
@connect(null, mapDispatchToProps)
@CSSModules(styles)
class LoginPage extends Component {

  static propTypes = {
    onLoginRequest: React.PropTypes.func,
    onSignupRequest: React.PropTypes.func,
  };

  onLoginRequest = (data) => {
    this.props.onLoginRequest(data);
  }

  onSignupRequest = (data) => {
    this.props.onSignupRequest(data);
  }

  render () {
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

                <SignupForm onSubmit={this.onSignupRequest} />
              </div>

            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default LoginPage;
