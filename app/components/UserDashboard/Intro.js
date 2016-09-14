import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Well from 'react-bootstrap/lib/Well';
import Image from 'react-bootstrap/lib/Image';

import toothImg from 'assets/images/tooth-mag.png';
import styles from './Intro.css';

function Intro ({ fullName }) {
  return (
    <Well styleName="intro-container">
      <Row>
        <Col md={8}>
          <div styleName="hello-name">Hello {fullName},</div>
          <div>
            Welcome to your personal dashboard.
            Here you can edit your account, write reviews and contact
            your dentist.
          </div>
        </Col>
        <Col md={4}>
          <Image src={toothImg} />
        </Col>
      </Row>
    </Well>
  );
}

Intro.propTypes = {
  fullName: PropTypes.string,
};

export default CSSModules(styles, { allowMultiple: true })(Intro);
