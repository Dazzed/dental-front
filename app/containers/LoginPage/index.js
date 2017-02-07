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
    )
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
  };

  constructor (props) {
    super(props);
    this.onLoginRequest = this.props.onLoginRequest.bind(this);
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

        </div>

      </div>
    );
  }
}

export default LoginPage;
