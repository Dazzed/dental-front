/*
 *
 * Logout
 *
 */

import React from 'react';
import { connect } from 'react-redux';

import { logout } from 'containers/LoginPage/actions';


export class Logout extends React.Component {

  static propTypes = {
    logout: React.PropTypes.func.isRequired,
  }

  componentWillMount () {
    this.props.logout();
  }

  render () {
    return (<div>Logout</div>);
  }
}


function mapDispatchToProps (dispatch) {
  return {
    dispatch,
    logout: () => dispatch(logout()),
  };
}

export default connect(null, mapDispatchToProps)(Logout);
