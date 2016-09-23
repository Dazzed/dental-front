/**
 * SubscribePage
 */

import React from 'react';
import CSSModules from 'react-css-modules';
import { Row, Col } from 'react-bootstrap';
import SubscribeFormDental15 from 'components/SubscribeFormDental15';
import SubscribeFormDental20 from 'components/SubscribeFormDental20';

import styles from './styles.css';


@CSSModules(styles)
class SubscribePage extends React.Component {

  render () {
    return (
      <div styleName="wrapper">
        <div className="container" styleName="container">
          <Row>
            <Col md={6} style={{ fontSize: '1.125rem', paddingLeft: '8rem' }}>
              <h1>Kid's Plan: $15/month</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum
                dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
              </p>

              <SubscribeFormDental15 />
            </Col>

            <Col md={6} style={{ fontSize: '1.125rem', paddingLeft: '8rem' }}>
              <h1>Adult Plan: $20/month</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum
                dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
              </p>

              <SubscribeFormDental20 />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default SubscribePage;
