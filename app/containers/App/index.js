/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a neccessity for you then you can refactor it and remove
 * the linting exception.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CSSModules from 'react-css-modules';
import { omit } from 'lodash';

import * as actions from './actions';
import NavBar from 'components/NavBar';
import styles from './styles.css';

const mapDispatchToProps = {
  loadUserFromToken: actions.meFromToken
};

@connect(null, mapDispatchToProps)
@CSSModules(styles)
export default class App extends Component {

  static propTypes = {
    children: React.PropTypes.node,
    loadUserFromToken: React.PropTypes.func,
  };

  componentWillMount () {
    // Always load user details from the localStorage Token
    this.props.loadUserFromToken();
  }

  render () {
    return (
      <div styleName="wrapper">
        <NavBar />
        {React.Children.toArray(this.props.children)}
      </div>
    );
  }
}
