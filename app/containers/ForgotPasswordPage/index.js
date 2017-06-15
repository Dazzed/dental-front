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
import ForgotPasswordForm from 'components/ForgotPasswordForm';
import PageHeader from 'components/PageHeader';

// local
import {
  forgotPasswordRequest,
} from './actions';
import styles from './styles.css';

/*
Redux
------------------------------------------------------------
*/
function mapDispatchToProps(dispatch) {
  return {
    onForgotPasswordRequest: (data) => ( // handle async tasks with sagas
      new Promise((resolve, reject) => {
        dispatch(
          forgotPasswordRequest({
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
class ForgotPasswordPage extends Component {

  static propTypes = {
    onForgotPasswordRequest: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.onForgotPasswordRequest = this.props.onForgotPasswordRequest.bind(this);
  }

  render() {
    return (
      <div styleName="container-wrapper">
        <PageHeader title="Recover Password" />
        <div className="container">
          <div styleName="forgot-password-wrapper">
            <div styleName="forgot-password">
              <ForgotPasswordForm onSubmit={this.onForgotPasswordRequest} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ForgotPasswordPage;
