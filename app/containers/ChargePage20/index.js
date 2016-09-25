/**
 * ChargePage20
 */

import React from 'react';
import CSSModules from 'react-css-modules';

import styles from './styles.css';


@CSSModules(styles)
class ChargePage20 extends React.Component {

  render () {
    return (
      <div styleName="wrapper">
        <div className="container" styleName="container">
          <h1>Yay -- you subscribed to Dental 20!!</h1>
        </div>
      </div>
    );
  }
}

export default ChargePage20;
