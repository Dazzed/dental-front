/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
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
class NotFound extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render () {
    return (
      <div styleName="wrapper">
        <div className="container" styleName="container">
          <h1>Sorry, the page you're looking for doesn't exist!</h1>
        </div>
      </div>
    );
  }
}

export default NotFound;
