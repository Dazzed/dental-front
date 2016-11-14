import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Well from 'react-bootstrap/lib/Well';

import styles from './Intro.css';

function Intro ({ name, changeRoute }) {
  return (
    <Well styleName="intro-container">
      <Row>
        <Col md={8}>
          <div styleName="hello-name">Hello {name},</div>
          <div
            styleName="membership-link"
            onClick={() => changeRoute('/custom-membership')}
          >
            Current membership fees and activation fees
          </div>
        </Col>
        <Col md={4} />
      </Row>
    </Well>
  );
}

Intro.propTypes = {
  name: PropTypes.string,
  changeRoute: PropTypes.func,
};

export default CSSModules(styles, { allowMultiple: true })(Intro);
