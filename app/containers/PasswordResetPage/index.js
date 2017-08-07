/*
Password Reset
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
import PasswordResetForm from 'components/PasswordResetForm';
import PageHeader from 'components/PageHeader';

// local
import {
  passwordResetRequest,
  passwordResetAuth
} from './actions';
import styles from './styles.css';

/*
Redux
------------------------------------------------------------
*/
function mapDispatchToProps(dispatch) {
  return {
    onResetPassword: (data) => (// handle async tasks with sagas

      new Promise((resolve, reject) => {
        dispatch(
          passwordResetRequest({
            data: omit(data, 'unknown'), resolve, reject
          })
        );
      })
    ),

    passwordResetAuth: (data) => ( // handle async tasks with sagas
      new Promise((resolve, reject) => {
        dispatch(
          passwordResetAuth({
            data: omit(data, 'unknown'), resolve, reject
          })
        );
      })
    )
  };
}


/*
Login
================================================================================
*/
@connect(null, mapDispatchToProps)
@CSSModules(styles)
class PasswordResetPage extends Component {

  static propTypes = {
    onResetPassword: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.onResetPassword = this.props.onResetPassword.bind(this);
  }

  handleSubmit = data => {
    const { onResetPassword, params: { token } } = this.props;
    data.token = token;
    onResetPassword(data);
  };

  render() {
    return (
      <div styleName="container-wrapper">
        <PageHeader title="Reset Password" />
        <div className="container">
          <div styleName="password-reset-wrapper">
            <div styleName="password-reset">
              <PasswordResetForm token={this.props.params.token} onSubmit={this.handleSubmit} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PasswordResetPage;
