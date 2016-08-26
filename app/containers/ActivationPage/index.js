/**
 * Login Page
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import CSSModules from 'react-css-modules';
import { get } from 'lodash';

import { activateRequest } from './actions';
import { selectActivationPage } from './selectors';
import styles from './styles.css';

@connect(mapStateToProps, mapDispatchToProps)
@CSSModules(styles)
class ActivationPage extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = propTypes;

  componentWillMount () {
    const activationKey = get(this.props, 'routeParams.activationKey');
    this.props.activateRequest({ key: activationKey });
  }

  render () {
    const { activationPage: { loading, activated, error } } = this.props;

    return (
      <div styleName="wrapper">
        <div className="container" styleName="container">
          { loading &&
            <h3>Activation in progress...please wait</h3>
          }
          { activated &&
            <h3>
              Your account has been activated successfully! Please log in <Link to="/login">here</Link>.
            </h3>
          }
          { error &&
            <h3>
              Sorry, account activation failed.
            </h3>
          }
          {/* Sorry, account activation failed. please resend activation code again <Link to="/accounts/activate/resend">here</Link>. */}
        </div>
      </div>
    );
  }
}

const propTypes = {
  activationPage: React.PropTypes.object,
  activateRequest: React.PropTypes.func,
};

function mapStateToProps (state) {
  return {
    activationPage: selectActivationPage(state),
  };
}

function mapDispatchToProps (dispatch) {
  return {
    ...bindActionCreators({ activateRequest }, dispatch),
  };
}

export default ActivationPage;
