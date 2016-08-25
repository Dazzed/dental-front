/**
 * Login Page
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import { omit } from 'lodash';

import styles from './styles.css';
import LoginForm from 'components/LoginForm';
import * as actions from './actions';

@connect(null, mapDispatchToProps)
@CSSModules(styles)
class LoginPage extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = propTypes;

  constructor (props) {
    super(props);
    this.onLoginRequest = this.props.onLoginRequest.bind(this);
  }

  render () {
    const { onLoginRequest } = this.props;

    return (
      <div styleName="wrapper">
        <div className="container" styleName="form-wrapper">
          <div styleName="form-header">
            <h3 styleName="form-heading">User Login</h3>
          </div>
          <LoginForm onSubmit={this.onLoginRequest} />
        </div>
      </div>
    );
  }
}

const propTypes = {
  onLoginRequest: React.PropTypes.func,
};

function mapDispatchToProps (dispatch) {
  return {
    onLoginRequest: (data, dispatch) => {
      // handle async tasks with sagas
      // https://github.com/yelouafi/redux-saga/issues/161#issuecomment-191312502
      return new Promise((resolve, reject) => {
        dispatch(
          actions.loginRequest({
            data: omit(data, 'unknown'), resolve, reject
          })
        );
      });
    }
  };
}

export default LoginPage;
