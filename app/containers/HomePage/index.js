/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a neccessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import CSSModules from 'react-css-modules';

import styles from './styles.css';

@CSSModules(styles)
export default class HomePage extends React.Component {

  render () {
    return (
      <div styleName="wrapper">
        <div className="container">
          <h2>Dental Home</h2>
        </div>
      </div>
    );
  }
}
