/**
 * Login Page
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import omit from 'lodash/omit';

import LoginForm from 'components/LoginForm';

import styles from './styles.css';
import * as actions from './actions';


@connect(null, mapDispatchToProps)
@CSSModules(styles)
class LoginPage extends Component {

  static propTypes = {
    onLoginRequest: React.PropTypes.func,
  };

  constructor (props) {
    super(props);
    this.onLoginRequest = this.props.onLoginRequest.bind(this);
  }

  render () {
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
    )
  };
}

export default LoginPage;
